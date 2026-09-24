@echo off
chcp 65001 > nul
cd /d "%~dp0"
title 車検見積もりアプリ

echo.
echo ========================================
echo    車検見積もりアプリ を起動します
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
    echo [エラー] Node.js が見つかりません。
    echo         https://nodejs.org からインストールしてください。
    echo.
    pause
    exit /b 1
)

if not exist "server\node_modules" (
    echo [1/3] 初回セットアップ中です。数分かかります...
    pushd server
    call npm install
    popd
    echo.
)

netstat -ano | findstr ":5000" | findstr "LISTENING" >nul
if not errorlevel 1 goto ready

echo [2/3] サーバーを起動しています...
start "車検アプリ サーバー" /min cmd /c "cd /d "%~dp0server" && npm start"

set /a tries=0
:waitloop
ping -n 2 127.0.0.1 >nul
netstat -ano | findstr ":5000" | findstr "LISTENING" >nul
if not errorlevel 1 goto ready
set /a tries+=1
if %tries% lss 30 goto waitloop
echo.
echo [警告] サーバーの起動を確認できませんでした。
echo        最小化されている「車検アプリ サーバー」ウィンドウのエラー内容を確認してください。
echo.
pause
exit /b 1

:ready
echo [3/3] ブラウザで見積画面を開きます...
REM ログイン済みならそのまま見積画面。未ログインなら index.html が login.html へ自動転送
start "" "%~dp0index.html"

echo.
echo ----------------------------------------
echo  起動しました。
echo  終了するときは、最小化されている
echo  「車検アプリ サーバー」ウィンドウを閉じてください。
echo ----------------------------------------
echo.
ping -n 6 127.0.0.1 >nul
