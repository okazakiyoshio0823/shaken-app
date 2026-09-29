// ============================================
// 保存フォルダ（デスクトップの「車検データ」）
// 見積書PDFとバックアップを、PCの決まったフォルダへ直接書き込む。
//   車検データ\見積書PDF\2026\2026-09-28_品川500あ1234_山田太郎様_車検見積書.pdf
//   車検データ\バックアップ\バックアップ_20260928.json
// フォルダを選べないブラウザ（スマホなど）では、今までどおりダウンロードに保存する。
// ============================================

const DATA_FOLDER_NAME = '車検データ';
const DATA_FOLDER_DB = 'shaken_data_folder';
const DATA_FOLDER_STORE = 'handles';
const DATA_FOLDER_KEY = 'root';

function hasDataFolderSupport() {
    return typeof window.showDirectoryPicker === 'function';
}

// 選んだフォルダはIndexedDBに覚えておく（localStorageにはフォルダを保存できないため）
function openDataFolderDb() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DATA_FOLDER_DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(DATA_FOLDER_STORE);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

let dataFolderInMemory = null;

async function loadDataFolderHandle() {
    if (dataFolderInMemory) return dataFolderInMemory;
    try {
        const db = await openDataFolderDb();
        return await new Promise((resolve) => {
            const req = db.transaction(DATA_FOLDER_STORE).objectStore(DATA_FOLDER_STORE).get(DATA_FOLDER_KEY);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
        });
    } catch (e) {
        return null;
    }
}

async function storeDataFolderHandle(handle) {
    const db = await openDataFolderDb();
    await new Promise((resolve, reject) => {
        const tx = db.transaction(DATA_FOLDER_STORE, 'readwrite');
        tx.objectStore(DATA_FOLDER_STORE).put(handle, DATA_FOLDER_KEY);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
    });
}

// 保存フォルダを選ぶ。デスクトップそのものはEdgeが選ばせてくれないため、
// デスクトップに作った「車検データ」を選んでもらう。選んだフォルダをそのまま使う
async function chooseDataFolder() {
    if (!hasDataFolderSupport()) {
        alert('この端末ではフォルダを選べません。\nPDFやバックアップは「ダウンロード」に保存されます。');
        return null;
    }

    let picked;
    try {
        picked = await window.showDirectoryPicker({ id: 'shaken-data', mode: 'readwrite', startIn: 'desktop' });
    } catch (e) {
        if (e.name !== 'AbortError') {
            alert('フォルダを開けませんでした。\n\n' + e.name + ': ' + e.message);
        }
        return null; // キャンセル
    }

    // アプリのフォルダ（GitHubに公開している）の中に顧客データを置かないようにする
    try {
        await picked.getFileHandle('sw.js');
        alert('ここはアプリ本体のフォルダです。\nお客様の情報がもれないよう、ここには保存できません。\n\nデスクトップの「車検データ」フォルダを選んでください。');
        return null;
    } catch (e) {
        // sw.js が無い＝アプリのフォルダではない
    }

    // 覚えておけなくても、開いている間はこのフォルダに保存できるようにする
    dataFolderInMemory = picked;
    try {
        await storeDataFolderHandle(picked);
    } catch (e) {
        console.error('保存フォルダを覚えておけませんでした:', e);
        alert('保存先を覚えておけませんでした。画面を開き直したら、もう一度選んでください。\n\n' + e.name + ': ' + e.message);
    }
    updateDataFolderStatus();
    return picked;
}

// 「保存先を選ぶ」ボタン。選んだらその場でバックアップを1つ書き、保存できることを確かめる
async function chooseDataFolderAndTest() {
    const folder = await chooseDataFolder();
    if (!folder) return;

    try {
        const path = await writeToDataFolder(folder, ['バックアップ'], backupFileName(), backupBlob());
        markBackupDone();
        alert(`✅ 保存先を「${folder.name}」にしました。\n\n試しにバックアップを保存しました。\n📁 ${path}`);
    } catch (e) {
        console.error('保存フォルダへの書き込みに失敗:', e);
        alert('保存先は選べましたが、ファイルを書き込めませんでした。\n\n' + e.name + ': ' + e.message);
    }
}

// 保存フォルダを取り出す。
// ask=true のときは、ブラウザを開き直して許可が切れていれば許可を求める（ボタンを押した直後に呼ぶこと）
async function getDataFolder(ask) {
    if (!hasDataFolderSupport()) return null;

    const handle = await loadDataFolderHandle();
    if (!handle) return null;

    try {
        const opts = { mode: 'readwrite' };
        if (await handle.queryPermission(opts) === 'granted') return handle;
        if (ask && await handle.requestPermission(opts) === 'granted') return handle;
    } catch (e) {
        console.error('保存フォルダの許可の確認に失敗:', e);
    }
    return null;
}

// Windowsのファイル名に使えない文字を置き換える
function toSafeFileName(name) {
    return String(name).replace(/[\\/:*?"<>|\r\n\t]/g, '_').replace(/\s+/g, '').trim();
}

// folder の中の dirs（例: ['見積書PDF', '2026']）へ書き込む。途中のフォルダは作る
async function writeToDataFolder(folder, dirs, filename, blob) {
    let dir = folder;
    for (const name of dirs) {
        dir = await dir.getDirectoryHandle(name, { create: true });
    }
    const file = await dir.getFileHandle(toSafeFileName(filename), { create: true });
    const writable = await file.createWritable();
    await writable.write(blob);
    await writable.close();
    return [folder.name, ...dirs, toSafeFileName(filename)].join('\\');
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = toSafeFileName(filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 保存フォルダがあればそこへ、無ければダウンロードに保存する。
// 戻り値: { where: 'folder' | 'download', path, error }
async function saveToDataFolderOrDownload(folder, dirs, filename, blob) {
    let error = '';
    if (folder) {
        try {
            const path = await writeToDataFolder(folder, dirs, filename, blob);
            return { where: 'folder', path };
        } catch (e) {
            // フォルダが消された・移動された など。控えを失わないようダウンロードに回す
            console.error('保存フォルダへの書き込みに失敗:', e);
            error = `（保存フォルダに書き込めませんでした: ${e.name}）`;
        }
    }
    downloadBlob(blob, filename);
    return { where: 'download', path: toSafeFileName(filename), error };
}

// 保存結果を知らせる文の「保存場所」部分
function describeSavedPlace(result) {
    return result.where === 'folder'
        ? `📁 ${result.path}`
        : `📁 ダウンロード\\${result.path}${result.error ? '\n' + result.error : ''}`;
}

// バックアップ画面の「保存先」表示を更新
async function updateDataFolderStatus() {
    const el = document.getElementById('dataFolderStatus');
    if (!el) return;

    if (!hasDataFolderSupport()) {
        el.innerHTML = 'この端末ではフォルダを選べないため、<b>ダウンロード</b>に保存されます。';
        return;
    }
    const handle = await loadDataFolderHandle();
    el.innerHTML = handle
        ? `保存先: <b>📁 ${escapeHtml(handle.name)}</b>`
        : '<span style="color:#c00;">保存先がまだ決まっていません。「保存先を選ぶ」で、デスクトップの「車検データ」フォルダを選んでください。</span>';
}
