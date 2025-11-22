# PrimeTrade - Scalable Web App with Authentication & Dashboard

A full-stack web application built with **React** (frontend) and **FastAPI** (backend), featuring secure JWT authentication, task management with CRUD operations, and a responsive dashboard.

## 🚀 Features

### Core Functionality
- ✅ **Secure Authentication**: JWT-based auth with bcrypt password hashing
- ✅ **User Management**: Signup, login, logout, profile management
- ✅ **Task Management**: Full CRUD operations on tasks
- ✅ **Search & Filter**: Real-time search and multi-filter capabilities
- ✅ **Responsive Design**: Mobile-first design with TailwindCSS
- ✅ **Protected Routes**: Route guards for authenticated-only pages
- ✅ **Form Validation**: Client-side and server-side validation
- ✅ **Error Handling**: Comprehensive error handling and user feedback

### Security Features
- 🔒 Password hashing with bcrypt
- 🔒 JWT token authentication with expiration
- 🔒 Protected API endpoints with middleware
- 🔒 CORS configuration for cross-origin requests
- 🔒 Input validation and sanitization


## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.104.1
- **Database**: MySQL with SQLAlchemy ORM
- **Authentication**: JWT (python-jose) + bcrypt (passlib)
- **Server**: Uvicorn
- **Validation**: Pydantic

### Frontend
- **Framework**: React 18.2
- **Routing**: React Router v6
- **Styling**: TailwindCSS 3.3
- **HTTP Client**: Axios
- **Build Tool**: Vite 5.0

## 📦 Installation & Setup

### Backend Setup

1. **Navigate to backend directory**:
```cmd
cd backend
```

2. **Create virtual environment**:
```cmd
python -m venv venv
venv\Scripts\activate
```

3. **Install dependencies**:
```cmd
pip install -r requirements.txt
```

4. **Setup MySQL database**:
```sql
CREATE DATABASE primetrade_db;
```

5. **Configure environment variables**:
```cmd
copy .env.example .env
```

Edit `.env` file with your settings:
```
DATABASE_URL=mysql+pymysql://root:your_password@localhost:3306/primetrade_db
SECRET_KEY=your-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

6. **Run the server**:
```cmd
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

### Frontend Setup

1. **Navigate to frontend directory**:
```cmd
cd frontend
```

2. **Install dependencies**:
```cmd
npm install
```

3. **Run development server**:
```cmd
npm run dev
```

Application will be available at: `http://localhost:3000`

![home](screenshots/home.png)

#### localhost:3000/register
![register](screenshots/register.png)

#### localhost:3000/login
![login](screenshots/login.png)

![register](screenshots/dashboard.png)

