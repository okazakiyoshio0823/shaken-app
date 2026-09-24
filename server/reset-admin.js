// ローカル環境でadminのパスワードを初期状態（admin/admin）に戻す保守用スクリプト
// 使い方: cd server && npm run reset-admin
const bcrypt = require('bcrypt');
const User = require('./src/models/User');
const sequelize = require('./src/config/database');

async function resetAdmin() {
    try {
        await sequelize.sync();

        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = await User.findOne({ where: { username: 'admin' } });

        if (admin) {
            admin.password_hash = hashedPassword;
            admin.is_initial_password = true;
            admin.is_2fa_enabled = false;
            admin.two_factor_secret = null;
            await admin.save();
            console.log('✅ adminのパスワードを初期状態に戻しました');
        } else {
            await User.create({
                username: 'admin',
                password_hash: hashedPassword,
                email: 'admin@example.com',
                role: 'admin',
                is_initial_password: true
            });
            console.log('✅ adminユーザーを作成しました');
        }

        console.log('ユーザー名: admin / パスワード: admin');
        console.log('⚠️  ログイン後、初回パスワード設定画面で必ず変更してください');
        process.exit(0);
    } catch (error) {
        console.error('❌ リセット失敗:', error.message);
        process.exit(1);
    }
}

resetAdmin();
