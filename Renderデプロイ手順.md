# 🚀 Render (サーバー) デプロイ手順

GitHub Pagesだけでは「データ保存」ができないため、**Render (レンダー)** という無料サービスにサーバーを置きます。

GitHubのリポジトリはそのままで、Renderと連携させるだけでOKです！

---

## ステップ1: 準備（ファイルをGitHubにアップロード）

以下の変更したファイルをGitHubにアップロード（上書き）してください：

1. **`render.yaml`** (新規ファイル)
2. **`server/src/config/database.js`** (修正済み)
3. **`js/api.js`** (修正済み)

---

## ステップ2: Renderでデプロイ

1. [Render.com](https://render.com/) にアクセスして登録/ログイン（GitHubアカウントでログインがおすすめ）
2. ダッシュボードの「**New +**」ボタンをクリック
3. 「**Blueprint**」を選択
4. GitHubリポジトリ (`shaken-app`) を選択して「Connect」
5. 「Service Name」などはそのままで「**Apply Blueprint**」をクリック

→ これで自動的に **サーバーとデータベース** が作成されます！
（完了まで数分かかります）

---

## ステップ3: 接続設定

デプロイが完了すると、RenderのダッシュボードにURLが表示されます。
（例: `https://shaken-app-server.onrender.com`）

1. このURLをコピー
2. ローカルの **`js/api.js`** を開く
3. 60行目付近の `RENDER_BACKEND_URL` を書き換える：

```javascript
const RENDER_BACKEND_URL = 'https://あなたのアプリ名.onrender.com/api';
```

1. 修正した `js/api.js` を再度GitHubにアップロード

---

## 🎉 これで完了

- **GitHub Pages** (画面) を開くと、自動的に **Render** (サーバー) につながります。
- ユーザー登録やデータ保存ができるようになります！
