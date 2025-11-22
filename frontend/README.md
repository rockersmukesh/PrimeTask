# Frontend Application

React frontend for PrimeTask Task Management application.

## Quick Start

#### cd frontend

1. Install dependencies:
```cmd
npm install
```

2. Run development server:
```cmd
npm run dev
```

Visit http://localhost:3000

## Build for Production

```cmd
npm run build
npm run preview
```

## Tech Stack

- React 18.2
- React Router v6
- TailwindCSS 3.3
- Axios
- Vite

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React context (Auth)
├── pages/           # Page components
├── services/        # API services
├── App.jsx          # Main app
└── main.jsx         # Entry point
```

## Features

- JWT authentication with auto-refresh
- Protected routes
- Form validation
- Responsive design
- Search and filter
- CRUD operations on tasks
- Profile management

## Environment

Backend API URL is configured in `src/services/api.js` and proxied through Vite.
