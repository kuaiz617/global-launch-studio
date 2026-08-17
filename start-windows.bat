@echo off
setlocal

echo [1/4] Installing backend dependencies...
call npm install
if errorlevel 1 goto :error

echo [2/4] Installing React frontend dependencies...
call npm --prefix web install
if errorlevel 1 goto :error

echo [3/4] Building React frontend...
call npm run build:web
if errorlevel 1 goto :error

echo [4/4] Starting GlobalLaunch Studio...
start http://127.0.0.1:4173
call npm run demo
goto :eof

:error
echo.
echo Setup failed. Review the error above, then run this file again.
exit /b 1
