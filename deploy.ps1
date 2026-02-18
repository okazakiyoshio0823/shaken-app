# =============================================
# 車検見積システム - ワンクリックデプロイスクリプト
# =============================================
# 使い方: 右クリック → 「PowerShellで実行」
# =============================================

# 文字コード設定（文字化け防止）
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 | Out-Null

$projectDir = "c:\Users\user\OneDrive\Desktop\shaken_app"
$appUrl = "https://okazakiyoshio0823.github.io/shaken-app/index.html"

Set-Location $projectDir

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  車検見積システム デプロイツール" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 変更ファイルを確認
$changes = git status --short
if (-not $changes) {
    Write-Host "[!] 変更されたファイルがありません。" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Enterキーで終了"
    exit
}

Write-Host "[変更されたファイル]" -ForegroundColor Yellow
git status --short
Write-Host ""

# コミットメッセージを入力
$commitMsg = Read-Host "コミットメッセージを入力 (空白でEnter → 日時を自動入力)"
if (-not $commitMsg) {
    $now = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMsg = "Update $now"
}

Write-Host ""
Write-Host "[デプロイ開始]" -ForegroundColor Green
Write-Host ""

# git add
Write-Host "  (1/3) ファイルを追加中..." -ForegroundColor Gray
git add .

# git commit
Write-Host "  (2/3) コミット中: $commitMsg" -ForegroundColor Gray
git commit -m $commitMsg

# git push
Write-Host "  (3/3) GitHubにプッシュ中..." -ForegroundColor Gray
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  [完了] デプロイ成功！" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  アプリURL:" -ForegroundColor Cyan
    Write-Host "  $appUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "  ※ GitHub Pagesの反映まで1〜2分かかります。" -ForegroundColor Yellow
    Write-Host ""

    # ブラウザで開く
    $openBrowser = Read-Host "ブラウザでアプリを開きますか？ [y/n]"
    if ($openBrowser -eq "y" -or $openBrowser -eq "Y" -or $openBrowser -eq "") {
        Start-Process $appUrl
        Write-Host "  ブラウザを開きました！" -ForegroundColor Green
    }
}
else {
    Write-Host ""
    Write-Host "[エラー] デプロイに失敗しました。" -ForegroundColor Red
    Write-Host "上記のエラーメッセージを確認してください。" -ForegroundColor Red
}

Write-Host ""
Read-Host "Enterキーで終了"
