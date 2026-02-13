# LINE連携 設定ガイド

LINEでログイン機能を使うための設定手順です。

## ⚠️ 必要なもの

- LINEアカウント
- **LIFF ID** (フロントエンド用)
- **Channel ID** (バックエンド用)

---

## 1. LINE Developersでチャネル作成

1. [LINE Developers](https://developers.line.biz/ja/) にアクセスしてログイン
2. **「新規プロバイダー作成」**
   - プロバイダー名: `Mechaniq` など

3. **「LINEログイン」チャネルを作成**
   - チャネル名: `Mechaniq Login` など
   - 種類: LINEログイン
   - アプリタイプ: ウェブアプリ
   - メールアドレス: 自分のメール

---

## 2. LIFFアプリの設定 (重要！)

QRコードログインや、スムーズなログインのために「LIFF」を使います。

1. 作成したチャネルの **「LIFF」タブ** を選択
2. **「追加」** をクリック
   - **LIFFアプリ名**: `Login`
   - **サイズ**: `Full`
   - **エンドポイントURL**:
     - デプロイ済みの場合: `https://YOUR-GITHUB-ID.github.io/shaken-app/login.html`
     - まだの場合(仮): `https://example.com` (後で変更可能)
   - **Scopes**: `profile`, `openid` にチェック ✅
   - **bot link**: Off

3. 作成後、表示される **LIFF ID** をコピー
   - 例: `12345678-AbCdEfGh`

4. **`login.html`** を編集して貼り付け

   ```javascript
   // 110行目付近
   const MY_LIFF_ID = "ここにLIFF IDを貼り付け"; 
   ```

---

## 3. バックエンド設定 (Render用)

1. チャネルの **「チャネル基本設定」タブ** を選択
2. **チャネルID** をコピー
   - 例: `1657000000`

3. [Render.com](https://render.com/) のダッシュボードへ
4. **Environment Variables** (環境変数) に以下を追加
   - Key: `LINE_CHANNEL_ID`
   - Value: (コピーしたチャネルID)

---

## 4. 完成

これで、「LINEでログイン」ボタンからログインできるようになります！
