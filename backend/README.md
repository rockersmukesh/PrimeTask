# Backend API Server

FastAPI backend for PrimeTrade Task Management application.

## Quick Start

1. Create virtual environment:
```cmd
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:
```cmd
pip install -r requirements.txt
```

3. Setup database:
```cmd
copy .env.example .env
```

Edit `.env` with your MySQL credentials.

4. Run server:
```cmd
uvicorn app.main:app --reload
```

Visit http://localhost:8000/docs for API documentation.

## Environment Variables

- `DATABASE_URL`: MySQL connection string
- `SECRET_KEY`: JWT secret key (min 32 chars)
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time

## API Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Database Models

### User
- id, username, email, full_name
- hashed_password, is_active
- created_at, updated_at

### Task
- id, title, description
- status (pending/in_progress/completed)
- priority (low/medium/high)
- owner_id, created_at, updated_at
