// ============================================
// バックアップ機能
// 見積・顧客・テンプレート・会社情報・テーマ設定をまとめて退避／復元する
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

// 現在のデータを1つのオブジェクトにまとめる
function collectBackupData() {
    const data = {};
    BACKUP_KEYS.forEach(key => {
        const value = localStorage.getItem(key);
        if (value !== null) data[key] = value;
    });

    return {
        type: 'shaken_full_backup',
        version: '1.0',
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
        customers: count('shaken_customers'),
        templates: count('shaken_templates')
    };
}

// --------------------------------------------
// ファイルへ保存 / ファイルから復元
// --------------------------------------------

function exportBackupToFile() {
    const payload = collectBackupData();
    const counts = countBackupItems();

    if (counts.estimates === 0 && counts.customers === 0) {
        if (!confirm('保存されている見積・顧客データがありません。\nこのままバックアップしますか？')) return;
    }

    const d = new Date();
    const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `車検見積りバックアップ_${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    markBackupDone();
    alert(`バックアップを保存しました。\n\n見積 ${counts.estimates}件 / 顧客 ${counts.customers}件 / テンプレート ${counts.templates}件\n\nダウンロードフォルダのファイルを、USBやクラウドなど別の場所にも控えておくと安全です。`);
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

// バックアップ内容を実際にlocalStorageへ書き戻す
function restoreBackup(payload, label) {
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
        '⚠️ 現在のデータはすべて上書きされ、元に戻せません。\n' +
        '実行してよろしいですか？';

    if (!confirm(message)) return;

    BACKUP_KEYS.forEach(key => {
        if (payload.data[key] !== undefined) {
            localStorage.setItem(key, payload.data[key]);
        }
    });

    alert('復元しました。画面を再読み込みします。');
    location.reload();
}

// --------------------------------------------
// サーバーへの自動バックアップ
// 保存先は server/backups/（OneDrive配下なので自動で同期される）
// --------------------------------------------

function getBackupHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// silent=true のときは成功時に何も表示しない（保存のたびに裏で走らせる用）
async function backupToServer(silent = true) {
    try {
        const res = await fetch(`${API_BASE_URL}/backup`, {
            method: 'POST',
            headers: getBackupHeaders(),
            body: JSON.stringify(collectBackupData())
        });

        if (res.status === 401) {
            // トークン切れ。黙って失敗するとバックアップされていないことに気づけないため必ず知らせる
            if (!silent) alert('ログインの有効期限が切れています。\n一度ログインし直すと自動バックアップが再開します。');
            return { ok: false, reason: 'auth' };
        }

        if (!res.ok) {
            if (!silent) alert('サーバーへのバックアップに失敗しました。');
            return { ok: false, reason: 'server' };
        }

        const result = await res.json();
        markBackupDone();
        if (!silent) alert(`サーバーにバックアップしました。\n\nファイル名: ${result.filename}`);
        return { ok: true, filename: result.filename };

    } catch (err) {
        // サーバーが起動していない場合はここに来る
        if (!silent) alert('サーバーに接続できませんでした。\nサーバーが起動しているか確認してください。');
        return { ok: false, reason: 'offline' };
    }
}

// サーバー上のバックアップ一覧を取得して画面に出す
async function loadServerBackups() {
    const container = document.getElementById('serverBackupList');
    if (!container) return;

    container.innerHTML = '<div style="color:#999;padding:12px;">読み込み中...</div>';

    try {
        const res = await fetch(`${API_BASE_URL}/backup`, { headers: getBackupHeaders() });

        if (res.status === 401) {
            container.innerHTML = '<div style="color:#c00;padding:12px;">ログインの有効期限が切れています。ログインし直してください。</div>';
            return;
        }
        if (!res.ok) throw new Error('取得失敗');

        const result = await res.json();

        if (!result.backups || result.backups.length === 0) {
            container.innerHTML = '<div style="color:#999;padding:12px;">サーバー上のバックアップはまだありません。</div>';
            return;
        }

        container.innerHTML = result.backups.map(b => {
            const date = new Date(b.savedAt).toLocaleString('ja-JP');
            const kb = Math.max(1, Math.round(b.size / 1024));
            return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-bottom:1px solid #eee;gap:8px;">
                    <div>
                        <div style="font-weight:bold;">${date}</div>
                        <div style="font-size:0.85em;color:#777;">${b.filename} (${kb}KB)</div>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="restoreFromServer('${b.filename}')">復元</button>
                </div>
            `;
        }).join('');

    } catch (err) {
        container.innerHTML = '<div style="color:#c00;padding:12px;">サーバーに接続できませんでした。サーバーが起動しているか確認してください。</div>';
    }
}

async function restoreFromServer(filename) {
    try {
        const res = await fetch(`${API_BASE_URL}/backup/${filename}`, { headers: getBackupHeaders() });
        if (!res.ok) throw new Error('取得失敗');

        const payload = await res.json();
        restoreBackup(payload, filename);
    } catch (err) {
        alert('バックアップの取得に失敗しました。');
    }
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
    loadServerBackups();
    document.getElementById('backupModal').classList.add('active');
}

function closeBackupModal() {
    document.getElementById('backupModal').classList.remove('active');
}

// 見積を保存したタイミングで、裏側でサーバーにも退避しておく
function autoBackupAfterSave() {
    backupToServer(true);
}

// 起動時：最終バックアップから7日以上経っていたら画面上部で知らせる
window.addEventListener('load', () => {
    updateBackupStatus();

    const last = localStorage.getItem(BACKUP_LAST_KEY);
    const days = last ? Math.floor((Date.now() - new Date(last).getTime()) / 86400000) : 999;

    if (days >= 7) {
        setTimeout(() => {
            const el = document.getElementById('backupReminder');
            if (el) el.style.display = 'block';
        }, 1500);
    }
});
