# データベース定義書 - Mechaniq（メカニーク）

## データベース概要

### 使用データベース

| 環境 | DBMS | 詳細 |
|------|------|------|
| 開発 | SQLite | ファイルベース（database.sqlite） |
| 本番 | PostgreSQL | リレーショナルDB（推奨） |

### ORM

**Sequelize v6.37.7**

- 自動マイグレーション対応
- モデル定義からテーブル自動生成

---

## ER図

```
┌─────────────────┐       ┌─────────────────┐
│      User       │       │    AuditLog     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │───┐   │ id (PK)         │
│ username        │   │   │ user_id (FK)    │←──┐
│ password_hash   │   │   │ action          │   │
│ role            │   │   │ ip_address      │   │
│ email           │   │   │ details (JSON)  │   │
│ two_factor_secret│  │   │ timestamp       │   │
│ is_2fa_enabled  │   └───┤                 │   │
│ reset_password_token│   └─────────────────┘   │
│ reset_password_expires│                       │
│ createdAt       │                             │
│ updatedAt       │─────────────────────────────┘
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│    Customer     │       │    Estimate     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │───────│ id (PK)         │
│ name            │   1:N │ CustomerId (FK) │
│ name_kana       │       │ vehicle_info (JSON)│
│ phone           │       │ maintenance_items (JSON)│
│ address         │       │ total_amount    │
│ email           │       │ status          │
│ createdAt       │       │ photo_urls (JSON)│
│ updatedAt       │       │ createdAt       │
└─────────────────┘       │ updatedAt       │
                          └─────────────────┘
```

---

## テーブル定義

### 1. Users テーブル

ユーザー（認証）情報を管理するテーブル

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|----------|------|-----------|------|
| id | UUID | NO | UUIDV4 | 主キー |
| username | STRING | NO | - | ユーザー名（一意） |
| password_hash | STRING | NO | - | bcryptハッシュ化パスワード |
| role | ENUM | NO | 'staff' | 権限（admin/staff） |
| email | STRING | YES | NULL | メールアドレス |
| two_factor_secret | STRING | YES | NULL | 2FA秘密鍵（Base32） |
| is_2fa_enabled | BOOLEAN | NO | false | 2FA有効フラグ |
| reset_password_token | STRING | YES | NULL | パスワードリセットトークン |
| reset_password_expires | DATE | YES | NULL | トークン有効期限 |
| createdAt | DATETIME | NO | NOW | 作成日時 |
| updatedAt | DATETIME | NO | NOW | 更新日時 |

**インデックス:**

- PRIMARY KEY: `id`
- UNIQUE: `username`

**モデル定義 (`server/src/models/User.js`):**

```javascript
const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'staff'),
        defaultValue: 'staff'
    },
    two_factor_secret: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_2fa_enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isEmail: true }
    },
    reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    reset_password_expires: {
        type: DataTypes.DATE,
        allowNull: true
    }
});
```

---

### 2. Customers テーブル

顧客情報を管理するテーブル

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|----------|------|-----------|------|
| id | UUID | NO | UUIDV4 | 主キー |
| name | STRING | NO | - | 顧客名（使用者名） |
| name_kana | STRING | YES | NULL | フリガナ |
| phone | STRING | YES | NULL | 電話番号 |
| address | TEXT | YES | NULL | 住所 |
| email | STRING | YES | NULL | メールアドレス |
| createdAt | DATETIME | NO | NOW | 作成日時 |
| updatedAt | DATETIME | NO | NOW | 更新日時 |

**モデル定義 (`server/src/models/Customer.js`):**

```javascript
const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name_kana: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING
    }
});
```

---

### 3. Estimates テーブル

見積情報を管理するテーブル

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|----------|------|-----------|------|
| id | UUID | NO | UUIDV4 | 主キー |
| CustomerId | UUID | NO | - | 外部キー（Customers.id） |
| vehicle_info | JSON | NO | - | 車両情報 |
| maintenance_items | JSON | NO | - | 整備項目リスト |
| total_amount | INTEGER | NO | 0 | 合計金額 |
| status | ENUM | NO | 'draft' | ステータス |
| photo_urls | JSON | YES | [] | 写真URLリスト |
| createdAt | DATETIME | NO | NOW | 作成日時 |
| updatedAt | DATETIME | NO | NOW | 更新日時 |

**ステータス値:**

| 値 | 説明 |
|---|------|
| draft | 下書き |
| saved | 保存済み |
| billed | 請求済み |

**vehicle_info JSON構造:**

```json
{
    "plateRegion": "品川",
    "plateClass": "500",
    "plateHiragana": "あ",
    "plateSerial": "1234",
    "carName": "トヨタ プリウス",
    "carModel": "ZVW50",
    "chassisNumber": "ZVW50-1234567",
    "typeDesignationNumber": "12345",
    "categoryClassificationNumber": "0001",
    "firstRegistration": "2020-04-01",
    "mileage": "50000",
    "vehicleWeight": "1500",
    "vehicleAge": "normal",
    "shakenExpiryDate": "2026-04-01"
}
```

**maintenance_items JSON構造:**

```json
[
    {
        "id": 1,
        "name": "24ヶ月法定点検基本料金",
        "qty": 1,
        "parts": 0,
        "wage": 15000,
        "isFluid": false,
        "taxIncludedPrice": 16500
    }
]
```

**モデル定義 (`server/src/models/Estimate.js`):**

```javascript
const Estimate = sequelize.define('Estimate', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    vehicle_info: {
        type: DataTypes.JSON,
        allowNull: false
    },
    maintenance_items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total_amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.ENUM('draft', 'saved', 'billed'),
        defaultValue: 'draft'
    },
    photo_urls: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

// リレーション
Estimate.belongsTo(Customer);
Customer.hasMany(Estimate);
```

---

### 4. AuditLogs テーブル

操作ログを管理するテーブル

| カラム名 | データ型 | NULL | デフォルト | 説明 |
|---------|----------|------|-----------|------|
| id | UUID | NO | UUIDV4 | 主キー |
| user_id | UUID | YES | NULL | ユーザーID |
| action | STRING | NO | - | アクション種別 |
| ip_address | STRING | YES | NULL | IPアドレス |
| details | JSON | YES | NULL | 詳細情報 |
| timestamp | DATETIME | NO | NOW | タイムスタンプ |
| createdAt | DATETIME | NO | NOW | 作成日時 |
| updatedAt | DATETIME | NO | NOW | 更新日時 |

**アクション種別:**

| アクション | 説明 |
|-----------|------|
| REGISTER | ユーザー登録 |
| REGISTER_UPDATE_PASS | パスワード更新（登録時） |
| LOGIN_SUCCESS | ログイン成功 |
| LOGIN_FAIL | ログイン失敗 |
| 2FA_SUCCESS | 2FA認証成功 |
| 2FA_FAIL | 2FA認証失敗 |
| PASSWORD_CHANGE | パスワード変更 |
| PASSWORD_RESET_SUCCESS | パスワードリセット成功 |

**モデル定義 (`server/src/models/AuditLog.js`):**

```javascript
const AuditLog = sequelize.define('AuditLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    details: {
        type: DataTypes.JSON,
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});
```

---

## リレーション

### Customer - Estimate

```
Customer 1 ──────< N Estimate
```

- 1人の顧客が複数の見積を持つことができる
- 見積は必ず1人の顧客に紐づく

---

## ローカルストレージ（フロントエンド）

サーバー接続不可時のオフラインデータ保存

### shaken_customers

```javascript
// キー: 'shaken_customers'
// 形式: JSON配列
[
    {
        "id": "local_12345",
        "savedAt": "2026-02-03T10:00:00.000Z",
        "userName": "山田太郎",
        "userNameKana": "ヤマダタロウ",
        "userTel": "03-1234-5678",
        "userAddress": "東京都...",
        "plateRegion": "品川",
        "plateClass": "500",
        "plateHiragana": "あ",
        "plateSerial": "1234",
        "carName": "プリウス",
        "carModel": "ZVW50",
        "maintenanceItems": [...]
    }
]
```

### shaken_company

```javascript
// キー: 'shaken_company'
// 形式: JSONオブジェクト
{
    "name": "サンプル自動車整備",
    "tel": "03-1234-5678",
    "address": "〒123-4567 東京都○○区..."
}
```

### authToken

```javascript
// キー: 'authToken'
// 形式: 文字列（JWTトークン）
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## データベース設定

### 開発環境（SQLite）

```javascript
// server/src/config/database.js
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'),
    logging: false
});
```

### 本番環境（PostgreSQL）

```javascript
// server/src/config/database.js
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
);
```

---

## マイグレーション

Sequelizeの`sync()`による自動マイグレーション

```javascript
// server/src/app.js
sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
```

### 注意事項

- 開発環境では`sync()`で十分
- 本番環境では`sequelize-cli`によるマイグレーション推奨
- スキーマ変更時はデータバックアップ必須

---

## バックアップ

### SQLite

```bash
# データベースファイルのコピー
cp server/database.sqlite server/database_backup_$(date +%Y%m%d).sqlite
```

### PostgreSQL

```bash
# pg_dump使用
pg_dump -U postgres mechaniq > backup_$(date +%Y%m%d).sql
```

---

## 更新履歴

| バージョン | 日付 | 更新者 | 内容 |
|-----------|------|--------|------|
| 1.0 | 2026-02-03 | - | 初版作成 |
