# 技術要件定義書 - Mechaniq（メカニーク）

## システム構成

### アーキテクチャ概要

```
┌─────────────────────────────────────────────────────────────┐
│                    クライアント層                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  index.html / login.html / forgot_password.html          │ │
│  │  reset_password.html                                     │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  JavaScript (Vanilla JS)                             │ │ │
│  │  │  - main.js (3,100行): メインロジック                  │ │ │
│  │  │  - api.js: API通信                                   │ │ │
│  │  │  - data.js: マスターデータ                            │ │ │
│  │  │  - cardb.js: 車両データベース                         │ │ │
│  │  │  - upload_client.js: ファイルアップロード              │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     サーバー層                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  Express.js Application (app.js)                        │ │
│  │  Port: 5000                                              │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  Middleware: Helmet, CORS, Rate Limiter             │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │  Routes → Controllers → Models                      │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Sequelize ORM
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    データベース層                            │
│  SQLite (開発環境) / PostgreSQL (本番環境)                   │
│  database.sqlite                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 技術スタック

### フロントエンド

| カテゴリ | 技術 | バージョン/詳細 |
|---------|------|----------------|
| HTML/CSS | Vanilla | HTML5, CSS3 |
| JavaScript | Vanilla JS | ES6+ |
| フォント | Google Fonts | Noto Sans JP |
| PDF生成 | html2pdf.js | 0.10.1 |
| QRコード読取 | jsQR | 1.4.0 |
| QRコード生成 | qrcode-generator | 1.4.4 |

### バックエンド

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| ランタイム | Node.js | 18.x以上推奨 |
| フレームワーク | Express.js | 4.18.2 |
| ORM | Sequelize | 6.37.7 |
| 認証 | jsonwebtoken | 9.0.2 |
| パスワード | bcrypt | 5.1.1 |
| 2FA | speakeasy | 2.0.0 |
| QRコード生成 | qrcode | 1.5.4 |
| ファイルアップロード | multer | 1.4.5-lts.1 |

### セキュリティ

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| セキュリティヘッダー | helmet | 8.1.0 |
| CORS | cors | 2.8.5 |
| レート制限 | express-rate-limit | 8.2.1 |

### データベース

| 環境 | データベース | 詳細 |
|------|-------------|------|
| 開発 | SQLite | sqlite3 5.1.7 |
| 本番 | PostgreSQL | pg 8.11.3, pg-hstore 2.3.4 |

### 開発ツール

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| 環境変数 | dotenv | 16.3.1 |
| ホットリロード | nodemon | 3.0.2（dev） |

---

## ディレクトリ構成

```
shaken_app/
├── index.html              # メインアプリケーション
├── login.html              # ログイン画面
├── forgot_password.html    # パスワード忘れ画面
├── reset_password.html     # パスワードリセット画面
├── start_app.bat           # アプリケーション起動スクリプト
│
├── css/
│   └── style.css           # メインスタイルシート (17KB)
│
├── js/
│   ├── main.js             # メインロジック (145KB, 3,100行)
│   ├── api.js              # API通信モジュール (5KB)
│   ├── data.js             # マスターデータ (8KB)
│   ├── cardb.js            # 車両データベース (150KB)
│   ├── upload_client.js    # ファイルアップロード (3KB)
│   └── pdf.js              # PDF関連処理
│
├── server/
│   ├── package.json        # npm依存関係
│   ├── database.sqlite     # SQLiteデータベース
│   ├── uploads/            # アップロードファイル保存先
│   └── src/
│       ├── app.js          # Expressアプリケーション
│       ├── config/
│       │   └── database.js # Sequelize設定
│       ├── controllers/
│       │   ├── authController.js      # 認証コントローラー
│       │   ├── customerController.js  # 顧客コントローラー
│       │   └── uploadController.js    # アップロードコントローラー
│       ├── middleware/
│       │   └── check-auth.js          # 認証ミドルウェア
│       ├── models/
│       │   ├── User.js                # ユーザーモデル
│       │   ├── Customer.js            # 顧客モデル
│       │   ├── Estimate.js            # 見積モデル
│       │   └── AuditLog.js            # 監査ログモデル
│       └── routes/
│           ├── authRoutes.js          # 認証ルート
│           ├── customerRoutes.js      # 顧客ルート
│           └── uploadRoutes.js        # アップロードルート
│
└── docs/                   # ドキュメント
```

---

## 通信仕様

### APIベースURL

```javascript
// 開発環境（ローカル）
http://localhost:5000/api

// 本番環境
/api
```

### 自動判定ロジック

```javascript
const isLocal = window.location.protocol === 'file:' 
             || window.location.hostname === 'localhost' 
             || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocal ? 'http://localhost:5000/api' : '/api';
```

### 認証ヘッダー

```javascript
{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <JWT_TOKEN>'
}
```

---

## セキュリティ実装

### パスワードハッシュ化

```javascript
// bcrypt使用（ソルトラウンド: 10）
const hashedPassword = await bcrypt.hash(password, 10);
```

### JWTトークン

| 項目 | 設定値 |
|------|--------|
| 有効期限 | 8時間 |
| シークレット | `process.env.JWT_SECRET` or 'dev_secret' |
| ペイロード | `{ id: user.id, role: user.role }` |

### Rate Limiting

```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15分
    max: 100,                   // 100リクエスト/15分
    message: 'Too many requests from this IP'
});
```

### セキュリティヘッダー（Helmet）

- Cross-Origin-Resource-Policy: cross-origin（画像読み込み許可）

---

## データストレージ

### ローカルストレージ（フロントエンド）

| キー | 用途 |
|------|------|
| `authToken` | 認証JWTトークン |
| `shaken_customers` | 顧客データキャッシュ |
| `shaken_company` | 会社情報 |

### SQLiteデータベース（開発環境）

- ファイル: `server/database.sqlite`
- Sequelize ORMによる自動マイグレーション

---

## 外部ライブラリ（CDN）

### フロントエンド

```html
<!-- QRコード読み取り -->
<script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"></script>

<!-- QRコード生成 -->
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>

<!-- PDF生成 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 環境変数

### サーバー設定（.env）

```env
# サーバー設定
PORT=5000

# JWT設定
JWT_SECRET=your_secret_key_here

# データベース設定（本番PostgreSQL時）
DB_NAME=mechaniq
DB_USER=postgres
DB_PASS=password
DB_HOST=localhost
```

---

## 起動方法

### 開発環境

```bash
# サーバー起動
cd server
npm install
npm run dev

# または
npm start
```

### バッチファイル起動

```batch
:: start_app.bat
cd server
npm start
```

---

## エラーハンドリング

### フロントエンド

- API呼び出し時のtry-catch
- 401エラー時の自動ログイン画面リダイレクト
- ユーザーへのalert表示

### バックエンド

- Express error middleware
- HTTP適切なステータスコード返却
- JSON形式のエラーメッセージ

---

## 動作環境要件

### クライアント

| 項目 | 要件 |
|------|------|
| ブラウザ | Chrome/Edge/Safari（最新版） |
| JavaScript | 有効 |
| カメラ | QRスキャン機能使用時に必要 |

### サーバー

| 項目 | 要件 |
|------|------|
| Node.js | 18.x以上 |
| メモリ | 512MB以上推奨 |
| ストレージ | 100MB以上（DB含む） |

---

## 更新履歴

| バージョン | 日付 | 更新者 | 内容 |
|-----------|------|--------|------|
| 1.0 | 2026-02-03 | - | 初版作成 |
