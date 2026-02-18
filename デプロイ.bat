@echo off
chcp 65001 > nul
cd /d "c:\Users\user\OneDrive\Desktop\shaken_app"

echo.
echo ========================================
echo   車検見積システム デプロイツール
echo ========================================
echo.

:: 変更ファイルを確認
git status --short > temp_status.txt 2>&1
for %%A in (temp_status.txt) do if %%~zA==0 (
    echo [!] 変更されたファイルがありません。
    del temp_status.txt
    pause
    exit /b
)
del temp_status.txt

echo [変更されたファイル]
git status --short
echo.

:: コミットメッセージ入力
set /p commitMsg="コミットメッセージを入力 (空白でEnterすると日時を自動入力): "
if "%commitMsg%"=="" (
    for /f "tokens=1-2 delims= " %%a in ('powershell -command "Get-Date -Format 'yyyy-MM-dd HH:mm'"') do set commitMsg=Update %%a %%b
)

echo.
echo [デプロイ開始]
echo.

echo   (1/3) ファイルを追加中...
git add .

echo   (2/3) コミット中: %commitMsg%
git commit -m "%commitMsg%"

echo   (3/3) GitHubにプッシュ中...
git push origin main

if %errorlevel%==0 (
    echo.
    echo ========================================
    echo   [完了] デプロイ成功！
    echo ========================================
    echo.
    echo   アプリURL:
    echo   https://okazakiyoshio0823.github.io/shaken-app/index.html
    echo.
    echo   ※ GitHub Pagesの反映まで1〜2分かかります。
    echo.
    set /p openBrowser="ブラウザでアプリを開きますか？ [y/n]: "
    if /i "%openBrowser%"=="y" (
        start https://okazakiyoshio0823.github.io/shaken-app/index.html
        echo   ブラウザを開きました！
    )
    if "%openBrowser%"=="" (
        start https://okazakiyoshio0823.github.io/shaken-app/index.html
        echo   ブラウザを開きました！
    )
) else (
    echo.
    echo [エラー] デプロイに失敗しました。
    echo 上記のエラーメッセージを確認してください。
)

echo.
pause
