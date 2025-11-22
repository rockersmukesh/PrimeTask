import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await taskAPI.getAllTasks(params);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleSaveTask = () => {
    setIsModalOpen(false);
    fetchTasks();
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      priority: '',
    });
  };

  const getStatusCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user?.full_name || user?.username}!
          </h1>
          <p className="mt-2 text-gray-600">Manage your tasks efficiently</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-blue-50 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-blue-900">Pending Tasks</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {getStatusCount('pending')}
            </p>
          </div>
          <div className="card bg-yellow-50 border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-yellow-900">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {getStatusCount('in_progress')}
            </p>
          </div>
          <div className="card bg-green-50 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-green-900">Completed</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {getStatusCount('completed')}
            </p>
          </div>
        </div>

        {/* Filters and Create Button */}
        <div className="card mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                name="search"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={handleFilterChange}
                className="input-field flex-1"
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {(filters.search || filters.status || filters.priority) && (
                <button onClick={clearFilters} className="btn-secondary whitespace-nowrap">
                  Clear Filters
                </button>
              )}
            </div>
            <button onClick={handleCreateTask} className="btn-primary whitespace-nowrap">
              + New Task
            </button>
          </div>
        </div>

        {/* Tasks List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found</p>
            <button onClick={handleCreateTask} className="btn-primary mt-4">
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Dashboard;
