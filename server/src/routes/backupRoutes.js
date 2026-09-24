const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

// バックアップの保存先。プロジェクトがOneDrive配下にあるため、
// ここに書けばOneDriveが自動でクラウドへ同期してくれる。
const BACKUP_DIR = path.join(__dirname, '../../backups');
const MAX_BACKUPS = 60; // 古いものから自動削除

function ensureDir() {
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }
}

// 世代が増えすぎないよう、古いバックアップを削除
function pruneOldBackups() {
    const files = fs.readdirSync(BACKUP_DIR)
        .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
        .sort()
        .reverse();

    files.slice(MAX_BACKUPS).forEach(f => {
        try {
            fs.unlinkSync(path.join(BACKUP_DIR, f));
        } catch (e) {
            console.error('古いバックアップの削除に失敗:', f, e.message);
        }
    });
}

router.use(checkAuth);

// バックアップを保存
router.post('/', (req, res) => {
    try {
        const payload = req.body;
        if (!payload || !payload.data) {
            return res.status(400).json({ message: 'バックアップデータがありません' });
        }

        ensureDir();

        const d = new Date();
        const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
            + `-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}${String(d.getSeconds()).padStart(2, '0')}`;
        const filename = `backup-${stamp}.json`;
        const body = JSON.stringify(payload, null, 2);

        fs.writeFileSync(path.join(BACKUP_DIR, filename), body, 'utf8');
        // 最新版は固定名でも保持しておき、復元時に迷わないようにする
        fs.writeFileSync(path.join(BACKUP_DIR, 'latest.json'), body, 'utf8');

        pruneOldBackups();

        res.json({ message: 'バックアップを保存しました', filename, savedAt: d.toISOString() });
    } catch (error) {
        console.error('バックアップ保存エラー:', error);
        res.status(500).json({ message: 'バックアップの保存に失敗しました' });
    }
});

// バックアップ一覧（新しい順）
router.get('/', (req, res) => {
    try {
        ensureDir();

        const files = fs.readdirSync(BACKUP_DIR)
            .filter(f => f.startsWith('backup-') && f.endsWith('.json'))
            .sort()
            .reverse()
            .map(f => {
                const stat = fs.statSync(path.join(BACKUP_DIR, f));
                return { filename: f, size: stat.size, savedAt: stat.mtime.toISOString() };
            });

        res.json({ backups: files, directory: BACKUP_DIR });
    } catch (error) {
        console.error('バックアップ一覧エラー:', error);
        res.status(500).json({ message: 'バックアップ一覧の取得に失敗しました' });
    }
});

// バックアップを1件取得（復元用）
router.get('/:filename', (req, res) => {
    try {
        // ディレクトリトラバーサル防止：ファイル名の形式を厳密に検査する
        const name = req.params.filename;
        if (!/^(backup-\d{8}-\d{6}|latest)\.json$/.test(name)) {
            return res.status(400).json({ message: 'ファイル名が不正です' });
        }

        const filePath = path.join(BACKUP_DIR, name);
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'バックアップが見つかりません' });
        }

        res.type('application/json').send(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        console.error('バックアップ取得エラー:', error);
        res.status(500).json({ message: 'バックアップの取得に失敗しました' });
    }
});

module.exports = router;
