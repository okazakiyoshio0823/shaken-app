const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');

// Register (Admin only in real app, open for dev)
exports.register = async (req, res) => {
    try {
        console.log('[REGISTER] Starting registration:', req.body.username);
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if user exists
        console.log('[REGISTER] Checking if user exists...');
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            // Development helper: Update password if exists (to allow reset)
            console.log('[REGISTER] User exists, updating password');
            existingUser.password_hash = hashedPassword;
            // Also update email if provided
            if (req.body.email) existingUser.email = req.body.email;
            await existingUser.save();
            await AuditLog.create({ action: 'REGISTER_UPDATE_PASS', details: { username } });
            return res.status(200).json({ message: 'User updated' });
        }

        console.log('[REGISTER] Creating new user...');
        const user = await User.create({
            username,
            password_hash: hashedPassword,
            email: req.body.email || null
        });

        console.log('[REGISTER] User created successfully:', user.id);
        await AuditLog.create({ action: 'REGISTER', details: { username } });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error('[REGISTER] ERROR:', error.message);
        console.error('[REGISTER] STACK:', error.stack);
        res.status(500).json({ error: error.message });
    }
};

// Login (Step 1: Check password)
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            await AuditLog.create({ action: 'LOGIN_FAIL', details: { username } });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if initial password needs to be changed
        if (user.is_initial_password) {
            await AuditLog.create({ action: 'LOGIN_INITIAL_PASSWORD', user_id: user.id });
            return res.json({
                requirePasswordChange: true,
                userId: user.id,
                username: user.username
            });
        }

        // If 2FA is enabled, return 2FA requirement
        if (user.is_2fa_enabled) {
            return res.json({ message: '2FA verification required', require2fa: true, userId: user.id });
        }

        // Generate Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });

        await AuditLog.create({ action: 'LOGIN_SUCCESS', user_id: user.id });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Setup 2FA (Generate secret and QR)
exports.setup2FA = async (req, res) => {
    try {
        // In real app, verify user is logged in via token
        const { userId } = req.body;
        const user = await User.findByPk(userId);

        const secret = speakeasy.generateSecret({ name: `ShakenApp (${user.username})` });
        user.two_factor_secret = secret.base32;
        await user.save();

        qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
            res.json({ secret: secret.base32, qrCode: data_url });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify 2FA (Step 2 or Enable)
exports.verify2FA = async (req, res) => {
    try {
        const { userId, token } = req.body;
        const user = await User.findByPk(userId);

        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: token
        });

        if (verified) {
            user.is_2fa_enabled = true;
            await user.save();
            const jwtToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });

            await AuditLog.create({ action: '2FA_SUCCESS', user_id: user.id });
            res.json({ message: 'Verified', token: jwtToken });
        } else {
            await AuditLog.create({ action: '2FA_FAIL', user_id: user.id });
            res.status(400).json({ message: 'Invalid Token' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        // Authenticated user via middleware (req.user.id)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { currentPassword, newPassword } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
            return res.status(400).json({ message: '現在のパスワードが間違っています' });
        }

        user.password_hash = await bcrypt.hash(newPassword, 10);
        await user.save();

        await AuditLog.create({ action: 'PASSWORD_CHANGE', user_id: user.id });
        res.json({ message: 'Password updated successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // Security: Don't reveal if user exists
            return res.json({ message: 'If that email exists, a reset link has been sent.' });
        }

        // Generate critical token
        const resetToken = speakeasy.generateSecret({ length: 20 }).base32;
        user.reset_password_token = resetToken;
        user.reset_password_expires = Date.now() + 3600000; // 1 hour
        await user.save();

        // In a real app with SMTP:
        // await sendEmail(user.email, resetToken);

        // For Local/Dev: Log to console and Return it (for demo purposes)
        const resetLink = `http://localhost:5000/reset_password.html?token=${resetToken}`;
        console.log(`[PEMULIHAN] Reset Link for ${user.username}: ${resetLink}`);

        // In production, NEVER return the token. But for this local desktop app user request:
        res.json({ message: 'Reset link generated', debugLink: resetLink });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            where: {
                reset_password_token: token,
                /* Sequelize operator for GT would be better, but keeping simple */
            }
        });

        if (!user || user.reset_password_expires < Date.now()) {
            return res.status(400).json({ message: 'Token is invalid or has expired' });
        }

        user.password_hash = await bcrypt.hash(newPassword, 10);
        user.reset_password_token = null;
        user.reset_password_expires = null;
        await user.save();

        await AuditLog.create({ action: 'PASSWORD_RESET_SUCCESS', user_id: user.id });
        res.json({ message: 'Password has been reset. Please login.' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Change Initial Password (First Time Setup)
exports.changeInitialPassword = async (req, res) => {
    try {
        const { userId, newUsername, newPassword, email } = req.body;

        // Validation
        if (!newUsername || !newPassword) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Password strength check (minimum 8 characters)
        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user still has initial password
        if (!user.is_initial_password) {
            return res.status(400).json({ message: 'Initial password has already been changed' });
        }

        // Check if new username is different and not already taken
        if (newUsername !== user.username) {
            const existingUser = await User.findOne({ where: { username: newUsername } });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            user.username = newUsername;
        }

        // Update user
        const oldUsername = user.username; // Keep old username for email
        user.password_hash = await bcrypt.hash(newPassword, 10);
        if (email) {
            user.email = email;
        }
        user.is_initial_password = false;
        user.last_password_change = new Date();
        await user.save();

        // Send confirmation email if email address is provided
        if (user.email) {
            try {
                const emailService = require('../services/emailService');
                await emailService.sendPasswordChangeConfirmation(
                    user.email,
                    oldUsername,
                    user.username
                );
                console.log(`[EMAIL] Password change confirmation sent to ${user.email}`);
            } catch (emailError) {
                console.error('[EMAIL] Failed to send confirmation:', emailError.message);
                // メール送信失敗してもパスワード変更は成功とする
            }
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });

        await AuditLog.create({ action: 'INITIAL_PASSWORD_CHANGED', user_id: user.id, details: { newUsername } });
        res.json({ token, message: 'Password changed successfully' });

    } catch (error) {
        console.error('[INITIAL_PASSWORD_CHANGE] ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// LINE Login
exports.lineLogin = async (req, res) => {
    try {
        const { lineUserId, displayName, email } = req.body;

        if (!lineUserId) {
            return res.status(400).json({ message: 'LINE User ID is required' });
        }

        // Check if user with this LINE ID exists
        let user = await User.findOne({ where: { line_user_id: lineUserId } });

        if (user) {
            // User exists, log them in
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });
            await AuditLog.create({ action: 'LINE_LOGIN_SUCCESS', user_id: user.id });
            return res.json({ token, message: 'Login successful' });
        }

        // User doesn't exist - create new user with LINE account
        const username = `line_${lineUserId.substring(0, 8)}`;
        const randomPassword = Math.random().toString(36).slice(-16);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user = await User.create({
            username,
            password_hash: hashedPassword,
            email: email || null,
            line_user_id: lineUserId,
            is_initial_password: false // LINE users don't need initial password setup
        });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '8h' });
        await AuditLog.create({ action: 'LINE_REGISTER_SUCCESS', user_id: user.id });

        res.json({ token, message: 'Account created and logged in' });

    } catch (error) {
        console.error('[LINE_LOGIN] ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Link LINE Account to Existing User
exports.linkLineAccount = async (req, res) => {
    try {
        // User must be authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { lineUserId } = req.body;

        if (!lineUserId) {
            return res.status(400).json({ message: 'LINE User ID is required' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if LINE ID is already linked to another account
        const existingLink = await User.findOne({ where: { line_user_id: lineUserId } });
        if (existingLink && existingLink.id !== user.id) {
            return res.status(400).json({ message: 'This LINE account is already linked to another user' });
        }

        // Link the LINE account
        user.line_user_id = lineUserId;
        await user.save();

        await AuditLog.create({ action: 'LINE_ACCOUNT_LINKED', user_id: user.id });
        res.json({ message: 'LINE account linked successfully' });

    } catch (error) {
        console.error('[LINE_LINK] ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
};
