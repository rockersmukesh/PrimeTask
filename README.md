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

## 📁 Project Structure

```
PrimeTrade intern assign/
├── backend/                    # FastAPI Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI application entry
│   │   ├── config.py          # Settings and configuration
│   │   ├── database.py        # Database connection
│   │   ├── models.py          # SQLAlchemy models
│   │   ├── schemas.py         # Pydantic schemas
│   │   ├── auth.py            # Authentication utilities
│   │   └── routers/           # API routes
│   │       ├── auth.py        # Auth endpoints
│   │       ├── users.py       # User endpoints
│   │       └── tasks.py       # Task endpoints
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskModal.jsx
    │   ├── context/           # React context
    │   │   └── AuthContext.jsx
    │   ├── pages/             # Page components
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── Profile.jsx
    │   ├── services/          # API services
    │   │   └── api.js
    │   ├── App.jsx            # Main app component
    │   ├── main.jsx           # Entry point
    │   └── index.css          # Tailwind styles
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

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

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL 8.0+

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

## 🔑 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Register a new user.

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "password": "securepassword123"
}
```

**Response** (201):
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2025-11-19T10:30:00"
}
```

#### POST `/api/auth/login`
Login and receive JWT token.

**Request Body** (form-data):
```
username=johndoe
password=securepassword123
```

**Response** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### GET `/api/auth/me`
Get current user info (requires authentication).

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200):
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "is_active": true,
  "created_at": "2025-11-19T10:30:00"
}
```

### User Endpoints

#### GET `/api/users/profile`
Get user profile (requires authentication).

#### PUT `/api/users/profile`
Update user profile (requires authentication).

**Request Body**:
```json
{
  "full_name": "John Smith",
  "email": "johnsmith@example.com"
}
```

### Task Endpoints

#### POST `/api/tasks`
Create a new task (requires authentication).

**Request Body**:
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high"
}
```

#### GET `/api/tasks`
Get all tasks with optional filters (requires authentication).

**Query Parameters**:
- `skip`: Pagination offset (default: 0)
- `limit`: Items per page (default: 100, max: 100)
- `status`: Filter by status (pending, in_progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `search`: Search in title and description

**Example**: `/api/tasks?status=pending&priority=high&search=documentation`

#### GET `/api/tasks/{task_id}`
Get a specific task (requires authentication).

#### PUT `/api/tasks/{task_id}`
Update a task (requires authentication).

**Request Body**:
```json
{
  "title": "Updated title",
  "status": "in_progress",
  "priority": "medium"
}
```

#### DELETE `/api/tasks/{task_id}`
Delete a task (requires authentication).

## 📬 Postman Collection

Import this collection to test the API:

```json
{
  "info": {
    "name": "PrimeTrade API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"full_name\": \"Test User\",\n  \"password\": \"password123\"\n}"
            },
            "url": "http://localhost:8000/api/auth/signup"
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/x-www-form-urlencoded"}],
            "body": {
              "mode": "urlencoded",
              "urlencoded": [
                {"key": "username", "value": "testuser"},
                {"key": "password", "value": "password123"}
              ]
            },
            "url": "http://localhost:8000/api/auth/login"
          }
        }
      ]
    },
    {
      "name": "Tasks",
      "item": [
        {
          "name": "Create Task",
          "request": {
            "method": "POST",
            "header": [
              {"key": "Content-Type", "value": "application/json"},
              {"key": "Authorization", "value": "Bearer {{token}}"}
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Sample Task\",\n  \"description\": \"Task description\",\n  \"status\": \"pending\",\n  \"priority\": \"medium\"\n}"
            },
            "url": "http://localhost:8000/api/tasks"
          }
        },
        {
          "name": "Get All Tasks",
          "request": {
            "method": "GET",
            "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
            "url": "http://localhost:8000/api/tasks"
          }
        }
      ]
    }
  ]
}
```

Save this as `PrimeTrade_API.postman_collection.json` and import into Postman.

## 🎨 Frontend Features

### Pages
1. **Home** - Landing page with feature showcase
2. **Login** - User authentication
3. **Signup** - New user registration with validation
4. **Dashboard** - Task management interface with:
   - Statistics cards (pending, in progress, completed)
   - Search and filter functionality
   - Task creation modal
   - Task cards with edit/delete actions
5. **Profile** - User profile management

### Components
- **Navbar** - Responsive navigation with auth state
- **ProtectedRoute** - Route guard component
- **TaskCard** - Reusable task display component
- **TaskModal** - Task creation/editing modal

### Form Validation
- Client-side validation for all forms
- Real-time error feedback
- Server-side validation enforcement
- Password strength requirements
- Email format validation
- Username uniqueness check

## 🚀 Scaling for Production

### Backend Scaling Strategy

#### 1. **Database Optimization**
```python
# Use connection pooling
engine = create_engine(
    settings.DATABASE_URL,
    pool_size=20,          # Increase pool size
    max_overflow=40,       # Allow overflow connections
    pool_pre_ping=True,    # Verify connections
    pool_recycle=3600      # Recycle connections
)

# Add database indexes
class Task(Base):
    __tablename__ = "tasks"
    # Add composite indexes for common queries
    __table_args__ = (
        Index('idx_owner_status', 'owner_id', 'status'),
        Index('idx_owner_priority', 'owner_id', 'priority'),
    )
```

#### 2. **Caching Layer**
```python
# Add Redis for caching
from redis import Redis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

@app.on_event("startup")
async def startup():
    redis = Redis(host='localhost', port=6379)
    FastAPICache.init(RedisBackend(redis), prefix="primetrade:")

# Cache frequently accessed data
@router.get("/tasks")
@cache(expire=60)  # Cache for 60 seconds
async def get_tasks(...):
    pass
```

#### 3. **Async Database Operations**
```python
# Use async SQLAlchemy
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

engine = create_async_engine(
    "mysql+aiomysql://user:pass@localhost/db",
    echo=False,
    future=True
)
```

#### 4. **Load Balancing**
```nginx
# Nginx configuration
upstream backend {
    least_conn;
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

#### 5. **Containerization**
```dockerfile
# Dockerfile for backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

### Frontend Scaling Strategy

#### 1. **Code Splitting**
```javascript
// Lazy load routes
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

<Suspense fallback={<LoadingSpinner />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Suspense>
```

#### 2. **State Management**
```javascript
// Use Redux or Zustand for complex state
import create from 'zustand';

const useStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
}));
```

#### 3. **Performance Optimization**
```javascript
// Memoization
import { useMemo, useCallback } from 'react';

const Dashboard = () => {
  const filteredTasks = useMemo(() => 
    tasks.filter(t => t.status === filter),
    [tasks, filter]
  );
  
  const handleDelete = useCallback((id) => {
    // Handler logic
  }, []);
};
```

#### 4. **CDN & Asset Optimization**
```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react'],
        }
      }
    }
  }
});
```

#### 5. **Progressive Web App (PWA)**
```javascript
// Add service worker for offline support
import { registerSW } from 'virtual:pwa-register';

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
```

### Infrastructure Scaling

#### Docker Compose Setup
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: primetrade_db
    volumes:
      - mysql_data:/var/lib/mysql
  
  redis:
    image: redis:alpine
    
  backend:
    build: ./backend
    depends_on:
      - mysql
      - redis
    environment:
      DATABASE_URL: mysql+pymysql://root:password@mysql:3306/primetrade_db
    deploy:
      replicas: 3
  
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - backend
      - frontend

volumes:
  mysql_data:
```

### Monitoring & Logging

```python
# Add structured logging
import logging
from pythonjsonlogger import jsonlogger

logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger = logging.getLogger()
logger.addHandler(logHandler)

# Add Prometheus metrics
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

### Security Enhancements

1. **Rate Limiting**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/auth/login")
@limiter.limit("5/minute")
async def login(...):
    pass
```

2. **HTTPS & Security Headers**
```python
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["example.com"])
```

## 📝 Testing

### Backend Tests
```python
# tests/test_auth.py
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_signup():
    response = client.post("/api/auth/signup", json={
        "username": "testuser",
        "email": "test@test.com",
        "password": "password123"
    })
    assert response.status_code == 201

def test_login():
    response = client.post("/api/auth/login", data={
        "username": "testuser",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
```

### Frontend Tests
```javascript
// src/__tests__/Login.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created as part of the PrimeTrade internship assignment.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- TailwindCSS documentation
- PrimeTrade team for the opportunity
