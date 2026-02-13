# API定義書 - Mechaniq（メカニーク）

## API概要

### ベースURL

```
開発環境: http://localhost:5000/api
本番環境: /api
```

### 認証方式

- Bearer Token (JWT)
- ヘッダー: `Authorization: Bearer <token>`

### レスポンス形式

- JSON形式

### 共通エラーレスポンス

```json
{
    "message": "エラーメッセージ",
    "error": "詳細エラー情報"
}
```

---

## エンドポイント一覧

| メソッド | エンドポイント | 認証 | 説明 |
|---------|---------------|------|------|
| POST | /api/auth/register | 不要 | ユーザー登録 |
| POST | /api/auth/login | 不要 | ログイン |
| POST | /api/auth/2fa/setup | 任意 | 2FA設定 |
| POST | /api/auth/2fa/verify | 不要 | 2FA検証 |
| PUT | /api/auth/password | 必須 | パスワード変更 |
| POST | /api/auth/forgot-password | 不要 | パスワードリセット依頼 |
| POST | /api/auth/reset-password | 不要 | パスワードリセット |
| GET | /api/customers | 必須 | 顧客一覧取得 |
| GET | /api/customers/:id | 必須 | 顧客詳細取得 |
| POST | /api/customers | 必須 | 顧客作成 |
| PUT | /api/customers/:id | 必須 | 顧客更新 |
| DELETE | /api/customers/:id | 必須 | 顧客削除 |
| POST | /api/upload | 必須 | ファイルアップロード |

---

## 認証API

### POST /api/auth/register

ユーザー登録

**リクエスト:**

```json
{
    "username": "admin",
    "password": "password123",
    "email": "admin@example.com"
}
```

**レスポンス (201 Created):**

```json
{
    "message": "User created"
}
```

**レスポンス (200 OK - 既存ユーザー更新時):**

```json
{
    "message": "User updated"
}
```

---

### POST /api/auth/login

ログイン認証

**リクエスト:**

```json
{
    "username": "admin",
    "password": "password123"
}
```

**レスポンス (200 OK - 通常ログイン):**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**レスポンス (200 OK - 2FA必要時):**

```json
{
    "message": "2FA verification required",
    "require2fa": true,
    "userId": "uuid-string"
}
```

**エラーレスポンス (401 Unauthorized):**

```json
{
    "message": "Invalid credentials"
}
```

---

### POST /api/auth/2fa/setup

2要素認証の設定

**リクエスト:**

```json
{
    "userId": "uuid-string"
}
```

**レスポンス (200 OK):**

```json
{
    "secret": "BASE32SECRET",
    "qrCode": "data:image/png;base64,..."
}
```

---

### POST /api/auth/2fa/verify

2要素認証の検証

**リクエスト:**

```json
{
    "userId": "uuid-string",
    "token": "123456"
}
```

**レスポンス (200 OK):**

```json
{
    "message": "Verified",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**エラーレスポンス (400 Bad Request):**

```json
{
    "message": "Invalid Token"
}
```

---

### PUT /api/auth/password

パスワード変更（認証必須）

**ヘッダー:**

```
Authorization: Bearer <token>
```

**リクエスト:**

```json
{
    "currentPassword": "oldpassword",
    "newPassword": "newpassword123"
}
```

**レスポンス (200 OK):**

```json
{
    "message": "Password updated successfully"
}
```

**エラーレスポンス (400 Bad Request):**

```json
{
    "message": "現在のパスワードが間違っています"
}
```

---

### POST /api/auth/forgot-password

パスワードリセット依頼

**リクエスト:**

```json
{
    "email": "user@example.com"
}
```

**レスポンス (200 OK):**

```json
{
    "message": "If that email exists, a reset link has been sent.",
    "debugLink": "http://localhost:5000/reset_password.html?token=XXXXX"
}
```

> ⚠️ `debugLink` は開発環境でのみ返却。本番ではメール送信を実装すること。

---

### POST /api/auth/reset-password

パスワードリセット実行

**リクエスト:**

```json
{
    "token": "RESET_TOKEN_STRING",
    "newPassword": "newpassword123"
}
```

**レスポンス (200 OK):**

```json
{
    "message": "Password has been reset. Please login."
}
```

**エラーレスポンス (400 Bad Request):**

```json
{
    "message": "Token is invalid or has expired"
}
```

---

## 顧客API

> すべての顧客APIは認証必須です

### GET /api/customers

顧客一覧取得

**ヘッダー:**

```
Authorization: Bearer <token>
```

**レスポンス (200 OK):**

```json
[
    {
        "id": "uuid-string",
        "name": "山田太郎",
        "name_kana": "ヤマダタロウ",
        "phone": "03-1234-5678",
        "address": "東京都...",
        "email": "yamada@example.com",
        "createdAt": "2026-02-03T10:00:00.000Z",
        "updatedAt": "2026-02-03T10:00:00.000Z",
        "Estimates": [
            {
                "id": "uuid-string",
                "vehicle_info": {...},
                "maintenance_items": [...],
                "total_amount": 150000,
                "status": "saved",
                "photo_urls": []
            }
        ]
    }
]
```

---

### GET /api/customers/:id

顧客詳細取得

**パラメータ:**

| 名前 | 型 | 説明 |
|-----|-----|------|
| id | UUID | 顧客ID |

**レスポンス (200 OK):**

```json
{
    "id": "uuid-string",
    "name": "山田太郎",
    "name_kana": "ヤマダタロウ",
    "phone": "03-1234-5678",
    "address": "東京都...",
    "email": "yamada@example.com",
    "Estimates": [...]
}
```

**エラーレスポンス (404 Not Found):**

```json
{
    "message": "Customer not found"
}
```

---

### POST /api/customers

顧客作成（見積含む）

**リクエスト:**

```json
{
    "userName": "山田太郎",
    "userNameKana": "ヤマダタロウ",
    "userTel": "03-1234-5678",
    "userAddress": "東京都○○区...",
    "userEmail": "yamada@example.com",
    "plateRegion": "品川",
    "plateClass": "500",
    "plateHiragana": "あ",
    "plateSerial": "1234",
    "carName": "プリウス",
    "carModel": "ZVW50",
    "chassisNumber": "ZVW50-1234567",
    "typeDesignationNumber": "12345",
    "categoryClassificationNumber": "0001",
    "firstRegistration": "2020-04-01",
    "mileage": "50000",
    "vehicleWeight": "1500",
    "vehicleAge": "normal",
    "shakenExpiryDate": "2026-04-01",
    "maintenanceItems": [
        {
            "id": 1,
            "name": "24ヶ月法定点検基本料金",
            "qty": 1,
            "parts": 0,
            "wage": 15000,
            "taxIncludedPrice": 16500
        }
    ]
}
```

**レスポンス (201 Created):**

```json
{
    "id": "uuid-string",
    "name": "山田太郎",
    "name_kana": "ヤマダタロウ",
    "phone": "03-1234-5678",
    "address": "東京都○○区...",
    "email": "yamada@example.com",
    "createdAt": "2026-02-03T10:00:00.000Z",
    "updatedAt": "2026-02-03T10:00:00.000Z"
}
```

---

### PUT /api/customers/:id

顧客更新

**パラメータ:**

| 名前 | 型 | 説明 |
|-----|-----|------|
| id | UUID | 顧客ID |

**リクエスト:**
（POST /api/customers と同じ構造）

**レスポンス (200 OK):**

```json
{
    "id": "uuid-string",
    "name": "山田太郎",
    ...
}
```

---

### DELETE /api/customers/:id

顧客削除

**パラメータ:**

| 名前 | 型 | 説明 |
|-----|-----|------|
| id | UUID | 顧客ID |

**レスポンス (200 OK):**

```json
{
    "message": "Customer deleted"
}
```

---

## アップロードAPI

### POST /api/upload

ファイルアップロード

**ヘッダー:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**リクエスト:**

- フォームデータ: `file` (画像ファイル)

**レスポンス (200 OK):**

```json
{
    "url": "/uploads/filename.jpg"
}
```

---

## エラーコード一覧

| HTTPステータス | コード | 説明 |
|---------------|--------|------|
| 200 | OK | 正常終了 |
| 201 | Created | リソース作成成功 |
| 400 | Bad Request | リクエスト不正 |
| 401 | Unauthorized | 認証失敗・トークン無効 |
| 404 | Not Found | リソース未存在 |
| 429 | Too Many Requests | レート制限超過 |
| 500 | Internal Server Error | サーバーエラー |

---

## レート制限

```javascript
{
    windowMs: 15 * 60 * 1000,  // 15分間
    max: 100                   // 最大100リクエスト
}
```

**制限超過時のレスポンス (429):**

```json
{
    "message": "Too many requests from this IP, please try again later."
}
```

---

## フロントエンド API クライアント

### api オブジェクト（js/api.js）

```javascript
const api = {
    // ヘッダー生成
    getHeaders() {
        const headers = { 'Content-Type': 'application/json' };
        const token = localStorage.getItem('authToken');
        if (token) headers['Authorization'] = 'Bearer ' + token;
        return headers;
    },
    
    // 顧客一覧取得
    async getCustomers() { ... },
    
    // 顧客保存
    async saveCustomer(data) { ... },
    
    // 顧客削除
    async deleteCustomer(id) { ... },
    
    // ログアウト
    logout() { ... },
    
    // パスワード変更
    async changePassword(currentPassword, newPassword) { ... }
};

// グローバル公開
window.shakenApi = api;
```

---

## 更新履歴

| バージョン | 日付 | 更新者 | 内容 |
|-----------|------|--------|------|
| 1.0 | 2026-02-03 | - | 初版作成 |
