@echo off
chcp 65001 > nul
cd /d "c:\Users\user\OneDrive\Desktop\shaken_app"

echo.
echo ========================================
echo   Deploy Tool - Shaken App
echo ========================================
echo.

echo [1] Checking changes...
git status --short
echo.

echo [2] Adding all files...
git add .

echo [3] Committing...
git commit -m "Update %date% %time%"

echo [4] Pulling latest from GitHub (rebase)...
git pull origin main --rebase
if %errorlevel% neq 0 (
    echo ERROR: git pull failed. Please check the error above.
    pause
    exit /b 1
)

echo [5] Pushing to GitHub...
git push origin main
if %errorlevel%==0 (
    echo.
    echo ========================================
    echo   SUCCESS! Deploy complete!
    echo ========================================
    echo.
    echo   URL: https://okazakiyoshio0823.github.io/shaken-app/index.html
    echo.
    echo   Note: GitHub Pages may take 1-2 min to update.
    echo.
    echo Opening browser...
    start https://okazakiyoshio0823.github.io/shaken-app/index.html
) else (
    echo.
    echo ERROR: Push failed. See error above.
)

echo.
pause
