# GitHubデプロイ手順書

## 📦 準備完了したファイル

### ✅ 作成済み

- `.gitignore` - 除外ファイルの設定
- `README.md` - プロジェクト説明書
- `server/.env.example` - 環境変数のサンプル
- `server/uploads/.gitkeep` - uploadsフォルダを保持

---

## 🚀 GitHubへのデプロイ手順

### ステップ1: Gitリポジトリの初期化（まだの場合）

```bash
cd c:\Users\user\OneDrive\Desktop\shaken_app
git init
```

### ステップ2: リモートリポジトリを追加

GitHubで新しいリポジトリを作成してから：

```bash
git remote add origin https://github.com/YOUR_USERNAME/shaken_app.git
```

### ステップ3: ファイルをステージング

```bash
# すべてのファイルを追加（.gitignoreで除外されるファイルは自動的に除外）
git add .
```

### ステップ4: コミット

```bash
git commit -m "feat: 初回パスワード変更とメール通知機能を実装

- ユーザー認証システム（JWT + 2FA）
- 初回パスワード強制変更機能
- メール通知機能（パスワード変更確認）
- 顧客管理機能
- 見積もり作成機能
- ファイルアップロード機能"
```

### ステップ5: GitHubにプッシュ

```bash
git push -u origin main
```

または `master` ブランチの場合：

```bash
git push -u origin master
```

---

## ✅ デプロイ前チェックリスト

### 含まれるべきファイル

- [x] すべてのHTMLファイル（login.html, index.html など）
- [x] CSS/JSファイル
- [x] serverディレクトリ（src/, package.json など）
- [x] .gitignore
- [x] README.md
- [x] server/.env.example
- [x] server/uploads/.gitkeep

### 除外されるファイル（.gitignoreで自動除外）

- [ ] node_modules/
- [ ] .env（機密情報）
- [ ] database.sqlite
- [ ] test_*.js
- [ ] ログファイル

### 確認コマンド

デプロイ前に、何がコミットされるか確認：

```bash
git status
```

---

## 🌐 本番環境での起動

### Heroku / Render / Railway の場合

1. **環境変数を設定**:

   ```
   JWT_SECRET=<ランダムな長い文字列>
   EMAIL_MODE=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=<your-email>
   SMTP_PASS=<your-app-password>
   ```

2. **PostgreSQLアドオンを追加**（推奨）

3. **ビルドコマンド**:

   ```bash
   cd server && npm install
   ```

4. **起動コマンド**:

   ```bash
   cd server && npm start
   ```

---

## 🧪 デプロイ後の動作確認

1. ブラウザでアプリにアクセス
2. `login.html`を開く
3. 新規ユーザーを作成
4. ログイン → 初回パスワード設定画面が表示される
5. 新しいユーザー名とパスワードを設定
6. メールアドレスを入力（本番環境の場合、実際にメールが届く）
7. メインアプリにログインできることを確認

---

## ⚠️ 重要な注意事項

### セキュリティ

- ✅ `.env`ファイルは絶対にコミットしない
- ✅ `JWT_SECRET`は本番環境で強力なランダム文字列に変更
- ✅ データベースファイル（.sqlite）はコミットしない

### データベース

- ✅ 開発環境: SQLite（自動作成）
- ✅ 本番環境: PostgreSQL推奨

---

## 📝 次のステップ

デプロイ完了後：

1. ブラウザで動作確認
2. 問題があれば修正してプッシュ
3. LINE連携機能の追加（次のフェーズ）

---

## 🆘 トラブルシューティング

### エラー: "Please tell me who you are"

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

### エラー: "remote origin already exists"

```bash
git remote remove origin
git remote add origin <your-repo-url>
```

### プッシュできない

```bash
# 最新の状態を取得
git pull origin main --rebase

# 再度プッシュ
git push origin main
```
