import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Welcome to <span className="text-primary-600">PrimeTask</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            A powerful task management system with secure authentication.
            Organize your work, boost productivity, and achieve your goals.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-primary-600 text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with bcrypt password hashing for maximum security
            </p>
          </div>
          <div className="card text-center">
            <div className="text-primary-600 text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">
              Create, update, and organize tasks with priorities and status tracking
            </p>
          </div>
          <div className="card text-center">
            <div className="text-primary-600 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
            <p className="text-gray-600">
              Powerful search and filtering capabilities to find tasks instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
