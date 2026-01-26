@echo off
echo Starting Backend Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create a .env file with your configuration.
    echo See START_SERVER.md for details.
    echo.
    pause
    exit /b 1
)

echo Starting server...
echo.
call npm start

pause

