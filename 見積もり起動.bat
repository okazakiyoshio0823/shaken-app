@echo off
chcp 65001 > nul
cd /d "%~dp0"
title 車検見積もりアプリ

echo.
echo ========================================
echo    車検見積もりアプリ を起動します
echo ========================================
echo.

REM データはインターネット上のサーバー(Render)に保存し、スマホと共有する。
REM このPCでサーバーを動かす必要はない。
REM Render無料プランは使わない間スリープするので、先に起こしておく(最大1分ほど)
echo [1/2] サーバーに接続しています（初回は1分ほどかかることがあります）...
curl -s -o nul -m 90 https://shaken-app-server.onrender.com/api/health
if errorlevel 1 (
    echo.
    echo [注意] サーバーに接続できませんでした。インターネット接続を確認してください。
    echo        このまま開くと、このPCだけで作業し、つながったときに同期します。
    echo.
)

echo [2/2] ブラウザで見積画面を開きます...
REM 見積データはブラウザごとに別保存になるため、必ず同じブラウザ(Edge)で開く
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%EDGE%" (
    start "" "%EDGE%" "%~dp0index.html"
) else (
    echo [警告] Edge が見つからないため既定のブラウザで開きます。
    echo        別のブラウザで開くと、保存済みの見積が表示されません。
    start "" "%~dp0index.html"
)

ping -n 3 127.0.0.1 >nul
