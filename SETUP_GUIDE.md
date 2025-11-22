# PrimeTrade - Scalable Web App

Full-stack task management application with secure authentication.

## Setup Instructions

### Backend (FastAPI + MySQL)
1. Navigate to `backend/` directory
2. Create virtual environment: `python -m venv venv`
3. Activate: `venv\Scripts\activate`
4. Install: `pip install -r requirements.txt`
5. Setup MySQL database: Create `primetrade_db`
6. Configure `.env` file (copy from `.env.example`)
7. Run: `uvicorn app.main:app --reload`

### Frontend (React + TailwindCSS)
1. Navigate to `frontend/` directory
2. Install: `npm install`
3. Run: `npm run dev`

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Features
✅ JWT Authentication with bcrypt
✅ User signup/login/profile management
✅ CRUD operations on tasks
✅ Search & filter functionality
✅ Protected routes
✅ Form validation (client + server)
✅ Responsive design with TailwindCSS
✅ MySQL database integration

## Documentation
- See `README.md` for comprehensive documentation
- Import `PrimeTrade_API.postman_collection.json` for API testing
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
