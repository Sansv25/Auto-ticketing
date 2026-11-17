@echo off
title 1. Login Akun Instagram - Bot Piket ICONNET
color 0E
cls
echo ========================================================
echo   LANGKAH 1: LOGIN AKUN INSTAGRAM (CUKUP SEKALI SAJA)
echo ========================================================
echo.
echo Jendela browser Chrome akan terbuka ke Instagram.
echo Silakan login dengan akun pelapor tim Anda.
echo Setelah berhasil masuk ke Beranda / DM, TUTUP jendela Chrome.
echo.

set "CHROME_EXE="
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
if not defined CHROME_EXE if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "CHROME_EXE=%ProgramFiles%\Google\Chrome\Application\chrome.exe"

if not defined CHROME_EXE (
    color 0C
    echo [ERROR] Google Chrome tidak ditemukan di komputer ini!
    echo Silakan instal Google Chrome terlebih dahulu.
    pause
    exit /b 1
)

set "PROFILE_DIR=%~dp0.chrome_profile"
echo Membuka Chrome dari: %CHROME_EXE%
echo Sesi disimpan di   : %PROFILE_DIR%
echo.

"%CHROME_EXE%" --user-data-dir="%PROFILE_DIR%" --no-first-run --no-default-browser-check --new-window "https://www.instagram.com/accounts/login/"

echo.
echo ========================================================
echo Selesai! Sesi Instagram Anda telah tersimpan permanen.
echo Anda sekarang bisa langsung menjalankan: 2_MULAI_PIKET.bat
echo ========================================================
pause
