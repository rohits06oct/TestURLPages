@echo off
echo ==========================================
echo   Starting TinyBigTalks Full System...
echo ==========================================

:: 1. Start UI (Python Server)
echo [1/2] Launching UI at http://localhost:8000
start "TinyBigTalks-UI" python -m http.server 8000

:: 2. Start Backend (Node Server)
echo [2/2] Launching Backend at http://localhost:3000
cd backend
start "TinyBigTalks-Backend" npm start

echo.
echo [DONE] Both systems are launching in separate windows.
echo Ensure Redis is running on localhost:6379!
echo.
pause
