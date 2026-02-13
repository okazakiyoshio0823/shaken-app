# Mechaniq - 自動車整備管理システム

車検（Shaken）管理のための包括的な整備管理システム。顧客管理、見積もり作成、ファイルアップロード、セキュアな認証機能を提供します。

## 🚀 主な機能

### セキュリティ機能

- ✅ **ユーザー認証** - JWT トークンベース
- ✅ **2要素認証 (2FA)** - Google Authenticator対応
- ✅ **初回パスワード強制変更** - デフォルトパスワードからの自動切り替え
- ✅ **パスワードリセット** - メールベースの安全なリセット
- ✅ **メール通知** - パスワード変更時の確認メール
- ✅ **監査ログ** - すべての重要なアクションを記録

### 業務機能

- 📋 顧客管理
- 💰 見積もり作成
- 📁 ファイルアップロード（車両画像など）
- 👥 ユーザー管理（admin/staff権限）

## 📦 セットアップ手順

### 1. リポジトリをクローン

```bash
git clone <repository-url>
cd shaken_app
```

### 2. サーバーの依存関係をインストール

```bash
cd server
npm install
```

### 3. 環境変数を設定

```bash
# .env.exampleをコピー
cp .env.example .env

# .envファイルを編集して必要な値を設定
# - JWT_SECRET: ランダムな文字列に変更
# - EMAIL_MODE: development（開発）または production（本番）
# - SMTP設定: 本番環境でメール送信する場合
```

### 4. サーバーを起動

```bash
npm start
```

サーバーは `http://localhost:5000` で起動します。

### 5. ブラウザでアクセス

```bash
# プロジェクトルートディレクトリから
# login.htmlをブラウザで開く
```

## 🔐 初回ログイン

1. `login.html`を開く
2. 「adminを作成」ボタンをクリック
3. デフォルト認証情報でログイン:
   - ユーザー名: `admin`
   - パスワード: `admin`
4. 初回パスワード設定画面が自動で開く
5. 新しいユーザー名とパスワードを設定
6. （任意）メールアドレスを登録

## 📁 プロジェクト構造

```
shaken_app/
├── index.html                      # メインアプリ
├── login.html                      # ログイン画面
├── initial_password_setup.html     # 初回パスワード設定
├── forgot_password.html            # パスワードリセット申請
├── reset_password.html             # パスワードリセット
├── css/                            # スタイルシート
├── js/                             # クライアントサイドJS
└── server/                         # バックエンド
    ├── src/
    │   ├── app.js                  # サーバーエントリーポイント
    │   ├── config/                 # データベース設定
    │   ├── controllers/            # ビジネスロジック
    │   ├── middleware/             # 認証ミドルウェア
    │   ├── models/                 # データモデル
    │   ├── routes/                 # APIルート
    │   └── services/               # 外部サービス（メール等）
    └── uploads/                    # アップロードファイル保存先
```

## 🔧 技術スタック

### フロントエンド

- HTML5/CSS3/JavaScript
- Fetch API（REST通信）

### バックエンド

- Node.js + Express.js
- Sequelize ORM
- SQLite（開発）/ PostgreSQL（本番推奨）
- JWT認証
- bcrypt（パスワードハッシュ）
- Speakeasy（2FA）
- nodemailer（メール送信）

### セキュリティ

- Helmet（セキュリティヘッダー）
- CORS
- Rate Limiting
- 2要素認証

## 📧 メール設定

### 開発モード（デフォルト）

- メールはコンソールに出力されます
- 実際には送信されません

### 本番モード

1. `.env`で`EMAIL_MODE=production`に設定
2. SMTP設定（Gmail例）:

   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

3. Gmailの場合、アプリパスワードを生成してください

## 🧪 テスト

```bash
# 認証フローのテスト
node test_auth.js

# メール送信のテスト
node test_email_confirmation.js
```

## 🚀 デプロイ

### Heroku / Render / Railway などで推奨

1. 環境変数を設定
2. PostgreSQLアドオンを追加（推奨）
3. `npm start`でサーバー起動

### GitHub Pages（フロントエンドのみ）

- 静的HTMLファイルのみホスティング可能
- バックエンドは別途デプロイが必要

## 📝 ライセンス

Private Project

## 👨‍💻 開発者

Mechaniq Development Team
