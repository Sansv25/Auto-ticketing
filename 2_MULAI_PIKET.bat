@echo off
title 2. Menjalankan Bot Piket ICONNET
color 0B
cls
echo ========================================================
echo           BOT OTOMASI TIKET PIKET ICONNET
echo ========================================================
echo.
echo Memeriksa instalasi Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 goto NO_NODE

echo Node.js terdeteksi!
cd /d "%~dp0"

if not exist "node_modules\@supabase\supabase-js" (
    echo Mengunduh dependensi awal bot - cukup sekali...
    call npm install --omit=dev
)

echo.
echo Menjalankan bot runner...
node runner.mjs
pause
exit /b 0

:NO_NODE
color 0C
echo [ERROR] Node.js belum terpasang di komputer ini!
echo Silakan unduh dan instal Node.js dari: https://nodejs.org/ - pilih versi LTS
echo Setelah instal, tutup dan buka kembali file ini.
pause
exit /b 1
