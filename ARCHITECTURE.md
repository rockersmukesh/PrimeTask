# Architecture & Design Overview

## System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   React Client  │ ◄─────► │  FastAPI Server │ ◄─────► │  MySQL Database │
│   (Port 3000)   │  HTTPS  │   (Port 8000)   │         │   (Port 3306)   │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                            │
        │                            │
        ▼                            ▼
┌─────────────────┐         ┌─────────────────┐
│  TailwindCSS    │         │ JWT Auth Layer  │
│  React Router   │         │ SQLAlchemy ORM  │
│  Axios Client   │         │ Pydantic Schema │
└─────────────────┘         └─────────────────┘
```

## Authentication Flow

```
┌────────┐                ┌────────┐                ┌──────────┐
│ Client │                │ Server │                │ Database │
└───┬────┘                └───┬────┘                └─────┬────┘
    │                         │                           │
    │  POST /api/auth/signup  │                           │
    │────────────────────────►│                           │
    │                         │  Hash password (bcrypt)   │
    │                         │──────────┐                │
    │                         │          │                │
    │                         │◄─────────┘                │
    │                         │                           │
    │                         │  INSERT user              │
    │                         │──────────────────────────►│
    │                         │                           │
    │   201 Created + User    │                           │
    │◄────────────────────────│                           │
    │                         │                           │
    │  POST /api/auth/login   │                           │
    │────────────────────────►│                           │
    │                         │  SELECT user              │
    │                         │──────────────────────────►│
    │                         │◄──────────────────────────│
    │                         │                           │
    │                         │  Verify password          │
    │                         │──────────┐                │
    │                         │          │                │
    │                         │◄─────────┘                │
    │                         │                           │
    │                         │  Generate JWT token       │
    │                         │──────────┐                │
    │                         │          │                │
    │                         │◄─────────┘                │
    │                         │                           │
    │   200 OK + JWT Token    │                           │
    │◄────────────────────────│                           │
    │                         │                           │
    │  Store token in         │                           │
    │  localStorage           │                           │
    │────────┐                │                           │
    │        │                │                           │
    │◄───────┘                │                           │
    │                         │                           │
```

## Protected Route Flow

```
┌────────┐                ┌────────┐                ┌──────────┐
│ Client │                │ Server │                │ Database │
└───┬────┘                └───┬────┘                └─────┬────┘
    │                         │                           │
    │  GET /api/tasks         │                           │
    │  Header: Bearer <token> │                           │
    │────────────────────────►│                           │
    │                         │                           │
    │                         │  Verify JWT token         │
    │                         │──────────┐                │
    │                         │          │                │
    │                         │◄─────────┘                │
    │                         │                           │
    │                         │  Decode token → user_id   │
    │                         │──────────┐                │
    │                         │          │                │
    │                         │◄─────────┘                │
    │                         │                           │
    │                         │  SELECT tasks             │
    │                         │  WHERE owner_id = user_id │
    │                         │──────────────────────────►│
    │                         │◄──────────────────────────│
    │                         │                           │
    │   200 OK + tasks[]      │                           │
    │◄────────────────────────│                           │
    │                         │                           │
```

## Database Schema

```sql
┌─────────────────────────────────────────┐
│              Users Table                │
├──────────────┬──────────────────────────┤
│ id           │ INTEGER (PK)             │
│ username     │ VARCHAR(100) UNIQUE      │
│ email        │ VARCHAR(255) UNIQUE      │
│ full_name    │ VARCHAR(255)             │
│ hashed_pwd   │ VARCHAR(255)             │
│ is_active    │ BOOLEAN                  │
│ created_at   │ DATETIME                 │
│ updated_at   │ DATETIME                 │
└──────────────┴──────────────────────────┘
                       │
                       │ 1:N
                       │
                       ▼
┌─────────────────────────────────────────┐
│              Tasks Table                │
├──────────────┬──────────────────────────┤
│ id           │ INTEGER (PK)             │
│ title        │ VARCHAR(255)             │
│ description  │ TEXT                     │
│ status       │ VARCHAR(50)              │
│ priority     │ VARCHAR(50)              │
│ owner_id     │ INTEGER (FK → users.id)  │
│ created_at   │ DATETIME                 │
│ updated_at   │ DATETIME                 │
└──────────────┴──────────────────────────┘
```

## Component Hierarchy

```
App.jsx
├── AuthProvider (Context)
│   └── Router
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   └── User Menu
│       │
│       └── Routes
│           ├── Home (Public)
│           │   ├── Hero Section
│           │   ├── Features
│           │   └── CTA Buttons
│           │
│           ├── Login (Public)
│           │   └── LoginForm
│           │       ├── Input (username)
│           │       ├── Input (password)
│           │       └── Submit Button
│           │
│           ├── Signup (Public)
│           │   └── SignupForm
│           │       ├── Input (username)
│           │       ├── Input (email)
│           │       ├── Input (full_name)
│           │       ├── Input (password)
│           │       ├── Input (confirm_password)
│           │       └── Submit Button
│           │
│           ├── Dashboard (Protected)
│           │   ├── Statistics Cards
│           │   │   ├── Pending Count
│           │   │   ├── In Progress Count
│           │   │   └── Completed Count
│           │   │
│           │   ├── Filters Bar
│           │   │   ├── Search Input
│           │   │   ├── Status Filter
│           │   │   ├── Priority Filter
│           │   │   └── Create Button
│           │   │
│           │   ├── TaskCard[] (Grid)
│           │   │   ├── Title
│           │   │   ├── Description
│           │   │   ├── Badges (status, priority)
│           │   │   └── Actions (edit, delete)
│           │   │
│           │   └── TaskModal
│           │       ├── Form Fields
│           │       └── Submit/Cancel
│           │
│           └── Profile (Protected)
│               ├── User Info Display
│               ├── Edit Form
│               │   ├── Input (email)
│               │   ├── Input (full_name)
│               │   └── Save/Cancel Buttons
│               └── Account Stats
```

## API Request/Response Flow

### Create Task Example

```
Request:
POST /api/tasks
Headers: Authorization: Bearer eyJhbG...
Body: {
  "title": "Complete documentation",
  "description": "Write API docs",
  "status": "pending",
  "priority": "high"
}

┌─────────────────────────────────┐
│    FastAPI Request Pipeline     │
├─────────────────────────────────┤
│ 1. CORS Middleware              │
│    ↓                            │
│ 2. Route Matching               │
│    ↓                            │
│ 3. JWT Dependency               │
│    - Extract token              │
│    - Verify signature           │
│    - Decode user info           │
│    ↓                            │
│ 4. Pydantic Validation          │
│    - Check required fields      │
│    - Validate data types        │
│    - Regex pattern matching     │
│    ↓                            │
│ 5. Business Logic               │
│    - Create Task object         │
│    - Set owner_id from token    │
│    ↓                            │
│ 6. Database Operation           │
│    - INSERT into tasks table    │
│    - Get generated ID           │
│    ↓                            │
│ 7. Response Serialization       │
│    - Convert to TaskResponse    │
│    - Add timestamps             │
│    ↓                            │
│ 8. Return 201 Created           │
└─────────────────────────────────┘

Response:
201 Created
Body: {
  "id": 1,
  "title": "Complete documentation",
  "description": "Write API docs",
  "status": "pending",
  "priority": "high",
  "owner_id": 1,
  "created_at": "2025-11-19T10:30:00",
  "updated_at": null
}
```

## State Management Flow

```
┌───────────────────────────────────────────────┐
│           AuthContext (Global State)          │
├───────────────────────────────────────────────┤
│  State:                                       │
│  - user: { id, username, email, ... }         │
│  - loading: boolean                           │
│  - isAuthenticated: boolean                   │
│                                               │
│  Actions:                                     │
│  - login(username, password)                  │
│  - signup(userData)                           │
│  - logout()                                   │
└───────────────────────────────────────────────┘
                       │
                       │ Provides to
                       ▼
┌───────────────────────────────────────────────┐
│            All Child Components               │
├───────────────────────────────────────────────┤
│  Navbar → useAuth() → { user, logout }        │
│  Dashboard → useAuth() → { user }             │
│  Profile → useAuth() → { user }               │
│  ProtectedRoute → useAuth() → { isAuth }      │
└───────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────┐
│         Frontend Security Layer             │
├─────────────────────────────────────────────┤
│  1. Client-side Validation                  │
│     - Form validation before submit         │
│     - Input sanitization                    │
│                                             │
│  2. Token Management                        │
│     - Store JWT in localStorage             │
│     - Auto-attach to requests               │
│     - Auto-redirect on 401                  │
│                                             │
│  3. Route Protection                        │
│     - ProtectedRoute wrapper                │
│     - Check auth state                      │
│     - Redirect to login if needed           │
└─────────────────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────┐
│         Backend Security Layer              │
├─────────────────────────────────────────────┤
│  1. CORS Configuration                      │
│     - Whitelist frontend origin             │
│     - Allow credentials                     │
│                                             │
│  2. Password Security                       │
│     - Bcrypt hashing (cost factor 12)       │
│     - Never store plain text               │
│                                             │
│  3. JWT Authentication                      │
│     - Sign with SECRET_KEY                  │
│     - Set expiration time                   │
│     - Verify on each request                │
│                                             │
│  4. Input Validation                        │
│     - Pydantic schema validation            │
│     - Type checking                         │
│     - Regex patterns                        │
│                                             │
│  5. Database Security                       │
│     - SQLAlchemy ORM (SQL injection safe)   │
│     - Parameterized queries                 │
│     - Connection pooling                    │
└─────────────────────────────────────────────┘
```

## Deployment Architecture (Production)

```
                    ┌──────────────────┐
                    │   DNS / CDN      │
                    │  (Cloudflare)    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Load Balancer   │
                    │     (Nginx)      │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌──────────────┐         ┌──────────────┐
        │   Frontend   │         │   Backend    │
        │   (Vercel)   │         │  (Railway)   │
        │              │         │              │
        │ Static Files │         │ FastAPI      │
        │ React Build  │         │ Container    │
        └──────────────┘         └───────┬──────┘
                                         │
                                         ▼
                                ┌──────────────┐
                                │   Database   │
                                │ (AWS RDS)    │
                                │   MySQL      │
                                └──────────────┘
                                         │
                                         ▼
                                ┌──────────────┐
                                │    Redis     │
                                │   (Cache)    │
                                └──────────────┘
```

## Error Handling Flow

```
Backend Error → FastAPI Exception Handler
                         │
                         ├─ 400: Validation Error
                         │  └─ Return detailed field errors
                         │
                         ├─ 401: Unauthorized
                         │  └─ Invalid/expired token
                         │
                         ├─ 404: Not Found
                         │  └─ Resource doesn't exist
                         │
                         ├─ 500: Internal Server Error
                         │  └─ Log error, return generic message
                         │
                         ▼
                   JSON Error Response
                         │
                         │ HTTPS
                         ▼
Frontend Axios Interceptor
                         │
                         ├─ 401 → Auto logout & redirect
                         │
                         ├─ Other errors → Display message
                         │
                         ▼
                   User sees error toast/alert
```

## Performance Optimization Strategy

```
Frontend:
├─ Code Splitting (React.lazy)
├─ Memoization (useMemo, useCallback)
├─ Debounced Search
├─ Optimistic UI Updates
└─ Asset Optimization (Vite)

Backend:
├─ Database Indexing
├─ Connection Pooling
├─ Query Optimization
├─ Response Caching (Redis)
└─ Async Operations

Network:
├─ Gzip Compression
├─ HTTP/2
├─ CDN for Static Assets
└─ API Response Pagination
```
