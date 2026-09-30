const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/check-auth');

// 管理者だけが通れる。社員のアカウント作成・パスワード再発行に使う
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: '管理者だけが使えます' });
    }
    next();
};

// 以前はログインなしで誰でもアカウントを作れ、既存ユーザーのパスワードまで書き換えられた
router.post('/register', checkAuth, requireAdmin, authController.register);
router.get('/users', checkAuth, requireAdmin, authController.listUsers);
router.post('/login', authController.login);
router.post('/2fa/setup', checkAuth, authController.setup2FA);
router.post('/2fa/verify', authController.verify2FA);

router.put('/password', checkAuth, authController.changePassword);

router.post('/forgot-password', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);
router.post('/initial-password-change', authController.changeInitialPassword);

// LINE Integration
// LINEログインはLINE側の確認をしておらず、送られたIDだけでログインできてしまうため止めている。
// 使うときは LIFF のIDトークンをサーバーで検証してから有効にすること
router.post('/line-login', (req, res) => res.status(410).json({ message: 'LINEログインは現在使えません' }));
router.post('/line-link', checkAuth, authController.linkLineAccount);

module.exports = router;
