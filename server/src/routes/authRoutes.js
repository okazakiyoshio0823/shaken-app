const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/2fa/setup', authController.setup2FA); // Should be protected in prod
router.post('/2fa/verify', authController.verify2FA);


const checkAuth = require('../middleware/check-auth');
router.put('/password', checkAuth, authController.changePassword);

router.post('/forgot-password', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);
router.post('/initial-password-change', authController.changeInitialPassword);

// LINE Integration
router.post('/line-login', authController.lineLogin);
router.post('/line-link', checkAuth, authController.linkLineAccount);

module.exports = router;
