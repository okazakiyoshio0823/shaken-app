// ============================================
// 見積の同期
// PCとスマホなど複数の端末で同じ見積履歴を共有する。
// 保存のたびにサーバーへ送り、サーバー側の一覧を受け取って置き換える。
// サーバーに繋がらないときは何もしない（ローカルだけで動き続ける）。
// ============================================

const SYNC_DELETED_KEY = 'shaken_deleted_estimates'; // 削除した見積のID
const SYNC_LAST_KEY = 'shaken_last_sync';

let syncInProgress = false;

function getDeletedIds() {
    try {
        const v = JSON.parse(localStorage.getItem(SYNC_DELETED_KEY) || '[]');
        return Array.isArray(v) ? v : [];
    } catch (e) {
        return [];
    }
}

// 削除した見積のIDを覚えておく。これを送らないと他の端末から復活してしまう
function rememberDeletedId(id) {
    const ids = getDeletedIds();
    const key = String(id);
    if (!ids.includes(key)) {
        ids.push(key);
        localStorage.setItem(SYNC_DELETED_KEY, JSON.stringify(ids));
    }
}

function getSyncHeaders() {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// 本体。silent=false のときだけ結果をダイアログで知らせる
async function syncEstimates(silent = true) {
    if (syncInProgress) return { ok: false, reason: 'busy' };
    syncInProgress = true;
    updateSyncStatus('同期中...');

    try {
        const local = (typeof savedEstimates !== 'undefined' && Array.isArray(savedEstimates))
            ? savedEstimates
            : JSON.parse(localStorage.getItem('shaken_estimates') || '[]');

        const res = await fetch(`${API_BASE_URL}/estimates/sync`, {
            method: 'POST',
            headers: getSyncHeaders(),
            body: JSON.stringify({ estimates: local, deletedIds: getDeletedIds() })
        });

        if (res.status === 401) {
            updateSyncStatus('ログインの期限切れ', true);
            if (!silent) alert('ログインの有効期限が切れています。\n一度ログインし直すと同期が再開します。');
            return { ok: false, reason: 'auth' };
        }

        if (!res.ok) {
            updateSyncStatus('同期できませんでした', true);
            if (!silent) alert('同期に失敗しました。');
            return { ok: false, reason: 'server' };
        }

        const result = await res.json();

        // サーバー側のマージ結果で置き換える
        const merged = Array.isArray(result.estimates) ? result.estimates : [];
        merged.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

        localStorage.setItem('shaken_estimates', JSON.stringify(merged));
        if (typeof savedEstimates !== 'undefined') {
            savedEstimates.length = 0;
            merged.forEach(e => savedEstimates.push(e));
        }

        // 削除がサーバーに伝わったので、手元の削除リストは消してよい
        localStorage.removeItem(SYNC_DELETED_KEY);
        localStorage.setItem(SYNC_LAST_KEY, new Date().toISOString());

        // 履歴画面が開いていれば表示を更新する
        const historyModal = document.getElementById('estimateHistoryModal');
        if (historyModal && historyModal.classList.contains('active') && typeof renderEstimateHistory === 'function') {
            renderEstimateHistory(document.getElementById('estimateHistorySearch')?.value || '');
        }

        updateSyncStatus(`同期済み（${merged.length}件）`);
        if (!silent) alert(`同期しました。\n\n見積 ${merged.length}件`);
        return { ok: true, count: merged.length };

    } catch (err) {
        // サーバーが起動していない／オフライン
        updateSyncStatus('オフライン', true);
        if (!silent) alert('サーバーに接続できませんでした。\nこの端末だけで作業を続けられます。');
        return { ok: false, reason: 'offline' };

    } finally {
        syncInProgress = false;
    }
}

// 画面上部に同期状態を出す
function updateSyncStatus(text, isWarning = false) {
    const el = document.getElementById('syncStatus');
    if (!el) return;

    el.textContent = text;
    el.style.color = isWarning ? '#c00' : '#2a7';
}

// 見積の保存・削除のあとに呼ぶ
function syncAfterChange() {
    syncEstimates(true);
}

// 起動時に一度だけ同期して、他の端末で作った見積を取り込む
window.addEventListener('load', () => {
    if (!localStorage.getItem('authToken')) return;

    // 画面の初期化（DOMContentLoadedでのlocalStorage読み込み）が済んでから走らせる
    setTimeout(() => syncEstimates(true), 800);
});
