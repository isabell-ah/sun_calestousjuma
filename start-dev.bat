@echo off
echo Starting Bestie Development Environment...

echo.
echo Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start "Frontend" cmd /k "cd web && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:1312
echo.
pause