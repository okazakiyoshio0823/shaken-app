# セキュリティ定義書 - Mechaniq（メカニーク）

## セキュリティ概要

本ドキュメントでは、Mechaniq（メカニーク）システムにおけるセキュリティ対策について定義します。

---

## 認証・認可

### 認証方式

#### パスワード認証

| 項目 | 仕様 |
|------|------|
| ハッシュアルゴリズム | bcrypt |
| ソルトラウンド | 10 |
| 最小パスワード長 | 4文字（推奨: 8文字以上） |

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, user.password_hash);
```

#### JWTトークン

| 項目 | 仕様 |
|------|------|
| アルゴリズム | HS256 |
| 有効期限 | 8時間 |
| シークレット | 環境変数 `JWT_SECRET` |

```javascript
const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '8h' }
);
```

#### 2要素認証（2FA）

| 項目 | 仕様 |
|------|------|
| 方式 | TOTP (Time-based One-Time Password) |
| ライブラリ | speakeasy |
| エンコーディング | Base32 |
| 対応アプリ | Google Authenticator, Authy等 |

---

### 認可

#### ロール定義

| ロール | 権限 |
|--------|------|
| admin | 全機能アクセス可 |
| staff | 通常業務機能のみ |

#### 認証ミドルウェア

```javascript
// server/src/middleware/check-auth.js
const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
```

---

## 通信セキュリティ

### HTTPS

- 本番環境ではHTTPS通信を必須とする
- SSL/TLS証明書の導入推奨

### CORS設定

```javascript
app.use(cors());
```

- 開発環境: 全オリジン許可
- 本番環境: 特定オリジンのみ許可に変更推奨

---

## HTTPセキュリティヘッダー

### Helmet.js使用

```javascript
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
```

### 設定されるヘッダー

| ヘッダー | 効果 |
|---------|------|
| X-Content-Type-Options: nosniff | MIMEタイプスニッフィング防止 |
| X-Frame-Options: SAMEORIGIN | クリックジャッキング防止 |
| X-XSS-Protection: 1; mode=block | XSS攻撃緩和 |
| Strict-Transport-Security | HTTPS強制 |
| Content-Security-Policy | コンテンツセキュリティポリシー |

---

## レート制限

### 設定

```javascript
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15分間
    max: 100,                   // 最大100リクエスト
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);
```

### 目的

- ブルートフォース攻撃防止
- DoS攻撃緩和
- API乱用防止

---

## 入力検証

### フロントエンド

- HTML5バリデーション属性
- JavaScript入力チェック

### バックエンド

| 検証対象 | 方法 |
|---------|------|
| メールアドレス | Sequelize validate: isEmail |
| 必須フィールド | allowNull: false |
| データ型 | Sequelize DataTypes |

### SQLインジェクション対策

- Sequelize ORMによるパラメータバインディング
- 直接SQLクエリの不使用

---

## XSS対策

### HTMLエスケープ

```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### 使用箇所

- プレビュー表示時
- ユーザー入力の表示時

---

## パスワードリセット

### セキュリティ対策

| 対策 | 実装 |
|------|------|
| トークン生成 | speakeasy.generateSecret (20文字) |
| 有効期限 | 1時間 |
| ユーザー存在確認回避 | 一律の成功メッセージ返却 |

```javascript
// ユーザーが存在しない場合でも同じメッセージ
res.json({ message: 'If that email exists, a reset link has been sent.' });
```

### リセット後の処理

```javascript
user.reset_password_token = null;
user.reset_password_expires = null;
await user.save();
```

---

## 監査ログ

### AuditLogテーブル

| カラム | 用途 |
|--------|------|
| user_id | 操作ユーザー |
| action | 操作種別 |
| ip_address | クライアントIP |
| details | 詳細情報(JSON) |
| timestamp | 操作日時 |

### 記録される操作

| アクション | 説明 |
|-----------|------|
| REGISTER | 新規ユーザー登録 |
| REGISTER_UPDATE_PASS | パスワード更新 |
| LOGIN_SUCCESS | ログイン成功 |
| LOGIN_FAIL | ログイン失敗 |
| 2FA_SUCCESS | 2FA認証成功 |
| 2FA_FAIL | 2FA認証失敗 |
| PASSWORD_CHANGE | パスワード変更 |
| PASSWORD_RESET_SUCCESS | パスワードリセット成功 |

---

## クライアントサイドセキュリティ

### トークン管理

```javascript
// トークン保存
localStorage.setItem('authToken', data.token);

// トークン削除（ログアウト時）
localStorage.removeItem('authToken');
```

### 自動リダイレクト

```javascript
// 未認証時のリダイレクト
if (!token && !window.location.href.includes('login.html')) {
    window.location.href = 'login.html';
}
```

### 401エラーハンドリング

```javascript
handleAuthError(res) {
    if (res.status === 401) {
        alert('セッションが切れました。ログインし直してください。');
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
        throw new Error('Unauthorized');
    }
}
```

---

## ファイルアップロード

### セキュリティ対策

| 対策 | 実装 |
|------|------|
| ファイルタイプ制限 | accept="image/*" |
| アップロード先 | /uploads ディレクトリ |
| 認証必須 | checkAuth ミドルウェア |

### 静的ファイル配信

```javascript
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
```

---

## 本番環境推奨設定

### 必須対応

1. **HTTPS化**
   - SSL/TLS証明書の導入
   - HTTP→HTTPSリダイレクト

2. **JWT_SECRET変更**

   ```env
   JWT_SECRET=your_very_long_and_random_secret_key_here
   ```

3. **CORS制限**

   ```javascript
   app.use(cors({
       origin: 'https://your-domain.com'
   }));
   ```

4. **デバッグ情報非表示**
   - パスワードリセットの`debugLink`を削除
   - エラー詳細の非表示

### 推奨対応

1. **データベース暗号化**
   - PostgreSQL使用時のSSL接続

2. **ログ監視**
   - 異常アクセスの検知

3. **定期的なパスワード変更**
   - ポリシーの策定

4. **バックアップ**
   - 定期的なデータバックアップ

---

## 脆弱性対応

### 既知の開発環境制限

| 項目 | 現状 | 本番対応 |
|------|------|---------|
| JWT_SECRET | 'dev_secret' ハードコード | 環境変数必須 |
| CORS | 全オリジン許可 | 特定オリジン制限 |
| パスワードリセットリンク | 画面表示 | メール送信 |
| ユーザー登録 | オープン | 管理者のみ |

---

## セキュリティチェックリスト

### 開発時

- [ ] bcryptでパスワードハッシュ化
- [ ] JWTトークン使用
- [ ] 入力値のエスケープ処理
- [ ] SQLインジェクション対策（ORM使用）
- [ ] レート制限設定

### 本番デプロイ時

- [ ] HTTPS有効化
- [ ] JWT_SECRET環境変数設定
- [ ] CORS制限設定
- [ ] デバッグ情報削除
- [ ] アクセスログ設定
- [ ] ファイアウォール設定

---

## 更新履歴

| バージョン | 日付 | 更新者 | 内容 |
|-----------|------|--------|------|
| 1.0 | 2026-02-03 | - | 初版作成 |
