const nodemailer = require('nodemailer');

// メール送信モード（development または production）
const EMAIL_MODE = process.env.EMAIL_MODE || 'development';

// メール送信設定
const emailConfig = {
    development: {
        // 開発モード: コンソールにログ出力（実際には送信しない）
        host: 'localhost',
        port: 1025,
        secure: false,
        // ethereal.email などのテストアカウントも使用可能
    },
    production: {
        // 本番モード: 実際のSMTP設定
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
};

// トランスポーター作成
let transporter;
if (EMAIL_MODE === 'development') {
    // 開発モード: ダミートランスポーター（コンソール出力のみ）
    transporter = {
        sendMail: async (mailOptions) => {
            console.log('\n=== [EMAIL - DEVELOPMENT MODE] ===');
            console.log('To:', mailOptions.to);
            console.log('Subject:', mailOptions.subject);
            console.log('HTML Content:\n', mailOptions.html);
            console.log('=================================\n');
            return { messageId: 'dev-message-id' };
        }
    };
} else {
    // 本番モード: 実際のSMTP
    transporter = nodemailer.createTransport(emailConfig.production);
}

/**
 * パスワード変更確認メールを送信
 * @param {string} email - 送信先メールアドレス
 * @param {string} oldUsername - 旧ユーザー名
 * @param {string} newUsername - 新ユーザー名
 */
async function sendPasswordChangeConfirmation(email, oldUsername, newUsername) {
    const subject = '【重要】パスワードが変更されました - Mechaniq';

    const htmlContent = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>パスワード変更確認</title>
</head>
<body style="font-family: 'Noto Sans JP', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 24px;">🔒 Mechaniq</h1>
                            <p style="margin: 10px 0 0 0; color: #e3f2fd; font-size: 14px;">セキュリティ通知</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #007bff; margin-top: 0; font-size: 20px;">パスワードが変更されました</h2>
                            
                            <p style="font-size: 16px; margin-bottom: 20px;">
                                Mechaniqアカウントのパスワードが正常に変更されました。
                            </p>
                            
                            <!-- Info Box -->
                            <div style="background-color: #f0f8ff; border-left: 4px solid #007bff; padding: 20px; margin: 25px 0; border-radius: 4px;">
                                <h3 style="margin-top: 0; color: #007bff; font-size: 16px;">📝 新しいログイン情報</h3>
                                <p style="margin: 10px 0;"><strong>ユーザー名:</strong> <span style="color: #007bff; font-size: 18px;">${newUsername}</span></p>
                                <p style="margin: 10px 0;"><strong>パスワード:</strong> （あなたが設定したパスワード）</p>
                            </div>
                            
                            <!-- Warning Box -->
                            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 4px;">
                                <p style="margin: 0; font-size: 14px;">
                                    <strong>⚠️ 重要:</strong> この情報を安全な場所に保存してください。他人と共有しないでください。
                                </p>
                            </div>
                            
                            <p style="font-size: 15px; color: #666; margin-top: 30px;">
                                次回ログイン時には、新しいユーザー名とパスワードを使用してください。
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8f9fa; padding: 20px 30px; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; font-size: 13px; color: #6c757d; text-align: center;">
                                このパスワード変更を行っていない場合は、すぐに管理者に連絡してください。
                            </p>
                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #adb5bd; text-align: center;">
                                © 2026 Mechaniq - 自動車整備管理システム
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'Mechaniq <noreply@mechaniq.com>',
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] Message sent successfully: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('[EMAIL] Error sending email:', error.message);
        throw error;
    }
}

module.exports = {
    sendPasswordChangeConfirmation
};
