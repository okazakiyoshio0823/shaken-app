// ============================================
// バックアップ機能
// 見積・顧客・テンプレート・会社情報・テーマ設定をまとめて退避／復元する
// 保存先はデスクトップの「車検データ\バックアップ」（savefolder.js）
// ============================================

// バックアップ対象のlocalStorageキー
const BACKUP_KEYS = [
    'shaken_estimates',   // 見積履歴
    'shaken_customers',   // 顧客データ
    'shaken_templates',   // テンプレート
    'shaken_company',     // 自社情報
    'shaken_theme'        // テーマ設定
];

const BACKUP_LAST_KEY = 'shaken_last_backup'; // 最終バックアップ日時（バックアップ対象外）

// 画面に読み込んでいるお客様一覧（サーバーの分も含む）。
// お客様はサーバーに保存されていて localStorage にはほとんど残らないため、こちらを使う
function currentCustomersForBackup() {
    if (typeof savedCustomers !== 'undefined' && Array.isArray(savedCustomers) && savedCustomers.length > 0) {
        return savedCustomers;
    }
    try {
        const v = JSON.parse(localStorage.getItem('shaken_customers') || '[]');
        return Array.isArray(v) ? v : [];
    } catch (e) {
        return [];
    }
}

// 現在のデータを1つのオブジェクトにまとめる
function collectBackupData() {
    const data = {};
    BACKUP_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = value;
    });
    data['shaken_customers'] = JSON.stringify(currentCustomersForBackup());

    return {
        type: 'shaken_full_backup',
        version: '1.1',
        exportDate: new Date().toISOString(),
        data: data
    };
}

// 件数を数える（画面表示用）
function countBackupItems() {
    const count = (key) => {
        try {
            const v = JSON.parse(localStorage.getItem(key) || '[]');
            return Array.isArray(v) ? v.length : 0;
        } catch (e) {
            return 0;
        }
    };

    return {
        estimates: count('shaken_estimates'),
        customers: currentCustomersForBackup().length,
        templates: count('shaken_templates')
    };
}

// --------------------------------------------
// 保存フォルダ（車検データ\バックアップ）へ保存 / ファイルから復元
// --------------------------------------------

// 同じ日のうちは上書きして、1日1ファイルにする
function backupFileName() {
    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
    return `バックアップ_${stamp}.json`;
}

function backupBlob() {
    return new Blob([JSON.stringify(collectBackupData(), null, 2)], { type: 'application/json' });
}

// 見積を保存するたびに裏で呼ぶ。保存フォルダが決まっていなければ何もしない
async function backupToDataFolder(folder) {
    if (!folder) return { ok: false };
    try {
        const path = await writeToDataFolder(folder, ['バックアップ'], backupFileName(), backupBlob());
        markBackupDone();
        return { ok: true, path };
    } catch (e) {
        console.error('バックアップの書き込みに失敗:', e);
        return { ok: false };
    }
}

// 「今すぐバックアップ」ボタン
async function exportBackupToFile() {
    let folder = await getDataFolder(true);
    if (!folder && hasDataFolderSupport()) {
        if (!confirm('バックアップの保存先がまだ決まっていません。\n\n次の画面で、デスクトップの「車検データ」フォルダを選んでください。')) return;
        folder = await chooseDataFolder();
        if (!folder) return;
    }

    const counts = countBackupItems();
    if (counts.estimates === 0 && counts.customers === 0) {
        if (!confirm('保存されている見積・顧客データがありません。\nこのままバックアップしますか？')) return;
    }

    const result = await saveToDataFolderOrDownload(folder, ['バックアップ'], backupFileName(), backupBlob());
    markBackupDone();

    alert(`バックアップを保存しました。\n\n見積 ${counts.estimates}件 / 顧客 ${counts.customers}件 / テンプレート ${counts.templates}件\n\n${describeSavedPlace(result)}`);
}

function importBackupFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';

    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            try {
                const payload = JSON.parse(ev.target.result);
                restoreBackup(payload, file.name);
            } catch (err) {
                alert('ファイルを読み込めませんでした。\nバックアップファイル（.json）を選んでください。');
            }
        };
        reader.readAsText(file);
    };

    input.click();
}

// バックアップのお客様のうち、サーバーから消えている方だけを残す。
// 手元のIDに付け替えておけば、再読み込み時に migrateLocalCustomersToServer がサーバーへ送り直す。
// サーバーに残っている方まで送ると二重登録になるため外す
async function customersToRestore(backupCustomers) {
    let serverIds;
    try {
        serverIds = new Set((await window.shakenApi.getCustomers()).map(c => c.id));
    } catch (e) {
        return backupCustomers; // サーバーにつながらない。そのまま手元に置いておく
    }

    const isServerId = (id) => typeof id === 'string' && id.length > 20;
    return backupCustomers
        .filter(c => !(isServerId(c.id) && serverIds.has(c.id)))
        .map((c, i) => isServerId(c.id) ? { ...c, id: Date.now() + i } : c);
}

// バックアップ内容を実際にlocalStorageへ書き戻す
async function restoreBackup(payload, label) {
    if (!payload || payload.type !== 'shaken_full_backup' || !payload.data) {
        alert('このファイルは見積アプリのバックアップではありません。');
        return;
    }

    const countIn = (key) => {
        try {
            const v = JSON.parse(payload.data[key] || '[]');
            return Array.isArray(v) ? v.length : 0;
        } catch (e) {
            return 0;
        }
    };

    const now = countBackupItems();
    const date = payload.exportDate ? new Date(payload.exportDate).toLocaleString('ja-JP') : '不明';

    const message =
        '【復元の確認】\n\n' +
        `復元するバックアップ: ${label}\n` +
        `作成日時: ${date}\n` +
        `　見積 ${countIn('shaken_estimates')}件 / 顧客 ${countIn('shaken_customers')}件\n\n` +
        '現在のデータ:\n' +
        `　見積 ${now.estimates}件 / 顧客 ${now.customers}件\n\n` +
        '⚠️ 見積・テンプレート・設定は上書きされ、元に戻せません。\n' +
        '（お客様は、サーバーから消えている方だけを戻します）\n' +
        '実行してよろしいですか？';

    if (!confirm(message)) return;

    for (const key of BACKUP_KEYS) {
        if (payload.data[key] === undefined) continue;
        if (key === 'shaken_customers') {
            let list;
            try {
                list = JSON.parse(payload.data[key] || '[]');
            } catch (e) {
                list = [];
            }
            const restored = await customersToRestore(Array.isArray(list) ? list : []);
            localStorage.setItem(key, JSON.stringify(restored));
        } else {
            localStorage.setItem(key, payload.data[key]);
        }
    }

    alert('復元しました。画面を再読み込みします。');
    location.reload();
}

// --------------------------------------------
// 最終バックアップ日時の記録・表示
// --------------------------------------------

function markBackupDone() {
    localStorage.setItem(BACKUP_LAST_KEY, new Date().toISOString());
    updateBackupStatus();
}

function updateBackupStatus() {
    const el = document.getElementById('backupStatusText');
    if (!el) return;

    const last = localStorage.getItem(BACKUP_LAST_KEY);
    if (!last) {
        el.innerHTML = '<span style="color:#c00;">まだ一度もバックアップしていません</span>';
        return;
    }

    const d = new Date(last);
    const days = Math.floor((Date.now() - d.getTime()) / 86400000);
    const dateStr = d.toLocaleString('ja-JP');

    if (days >= 7) {
        el.innerHTML = `<span style="color:#c00;">最終バックアップ: ${dateStr}（${days}日前）</span>`;
    } else {
        el.innerHTML = `<span style="color:#2a7;">最終バックアップ: ${dateStr}</span>`;
    }
}

// --------------------------------------------
// バックアップ画面
// --------------------------------------------

function showBackupModal() {
    const counts = countBackupItems();
    const el = document.getElementById('backupCountText');
    if (el) {
        el.textContent = `見積 ${counts.estimates}件 / 顧客 ${counts.customers}件 / テンプレート ${counts.templates}件`;
    }

    updateBackupStatus();
    updateDataFolderStatus();
    document.getElementById('backupModal').classList.add('active');
}

function closeBackupModal() {
    document.getElementById('backupModal').classList.remove('active');
}


// 催促バーを閉じる。閉じたら1週間は出さない
const REMINDER_DISMISSED_KEY = 'shaken_reminder_dismissed';

function dismissBackupReminder() {
    localStorage.setItem(REMINDER_DISMISSED_KEY, new Date().toISOString());
    const el = document.getElementById('backupReminder');
    if (el) el.classList.remove('show');
}

// 起動時：最終バックアップから7日以上経っていたら画面上部で知らせる
window.addEventListener('load', () => {
    updateBackupStatus();

    const daysSince = (iso) => iso ? Math.floor((Date.now() - new Date(iso).getTime()) / 86400000) : 999;

    // フォルダに控えを取れない端末（スマホ）では案内しても何もできないので出さない
    if (typeof hasDataFolderSupport === 'function' && !hasDataFolderSupport()) return;

    // 閉じてから1週間経っていなければ出さない
    if (daysSince(localStorage.getItem(REMINDER_DISMISSED_KEY)) < 7) return;
    if (daysSince(localStorage.getItem(BACKUP_LAST_KEY)) < 7) return;

    setTimeout(() => {
        const el = document.getElementById('backupReminder');
        if (el) el.classList.add('show');
    }, 1500);
});
