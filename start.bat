@echo off
echo Starting PrimeTrade Application...
echo.

REM Start Backend
start "PrimeTrade Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload"

REM Wait a moment for backend to initialize
timeout /t 5 /nobreak > nul

REM Start Frontend
start "PrimeTrade Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to stop all servers...
pause > nul

REM Kill the processes
taskkill /FI "WindowTitle eq PrimeTrade Backend*" /T /F
taskkill /FI "WindowTitle eq PrimeTrade Frontend*" /T /F
