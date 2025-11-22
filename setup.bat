@echo off
echo ========================================
echo PrimeTrade Setup Script
echo ========================================
echo.

REM Check if MySQL is running
echo Checking MySQL...
net start | find "MySQL" > nul
if %errorlevel% equ 0 (
    echo [OK] MySQL is running
) else (
    echo [WARNING] MySQL might not be running
    echo Please ensure MySQL is installed and running
)
echo.

REM Backend Setup
echo ========================================
echo Setting up Backend...
echo ========================================
cd backend

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -r requirements.txt

if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit backend\.env with your MySQL credentials
    echo Then run this script again.
    pause
    exit /b
)

cd ..

REM Frontend Setup
echo.
echo ========================================
echo Setting up Frontend...
echo ========================================
cd frontend

if not exist node_modules (
    echo Installing Node.js dependencies...
    call npm install
)

cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Backend (Terminal 1):
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn app.main:app --reload
echo.
echo 2. Frontend (Terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo Then visit: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
pause
