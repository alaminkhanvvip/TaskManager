import { useState, useMemo } from 'react';
import { useCreateTask, useUpdateTask, useDeleteTask, useTasks, useBulkUpdate } from '../hooks/useTasks';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import SearchAndFilter from '../components/SearchAndFilter';
import Analytics from '../components/Analytics';
import { Trash2, CheckSquare, Square } from 'lucide-react';

export default function TaskManager() {
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [filters, setFilters] = useState({
    search: '',
    priority: '',
    category: '',
    completed: '',
    sortBy: 'createdAt',
    order: 'desc'
  });
  
  const { data: tasks = [], isLoading, error } = useTasks(filters);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const bulkUpdate = useBulkUpdate();
  
  const handleCreateTask = (taskData) => {
    createTask.mutate(taskData);
  };
  
  const handleUpdateTask = (taskData) => {
    updateTask.mutate({ id: editingTask._id, ...taskData });
    setEditingTask(null);
  };
  
  const handleToggleTask = (id, completed) => {
    updateTask.mutate({ id, completed });
  };
  
  const handleDeleteTask = (id) => {
    deleteTask.mutate(id);
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };
  
  const handleSelectTask = (id, selected) => {
    setSelectedTasks(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };
  
  const handleSelectAll = () => {
    if (selectedTasks.size === tasks.length) {
      setSelectedTasks(new Set());
    } else {
      setSelectedTasks(new Set(tasks.map(t => t._id)));
    }
  };
  
  const handleBulkComplete = () => {
    bulkUpdate.mutate({
      ids: Array.from(selectedTasks),
      updates: { completed: true }
    });
    setSelectedTasks(new Set());
  };
  
  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedTasks.size} selected tasks?`)) {
      selectedTasks.forEach(id => deleteTask.mutate(id));
      setSelectedTasks(new Set());
    }
  };
  
  const handleSearch = (searchTerm) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };
  
  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      overdue: tasks.filter(t => t.dueDate && !t.completed && new Date(t.dueDate) < new Date()).length
    };
  }, [tasks]);
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Error loading tasks. Please check if the backend server is running.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Task Manager 2025
        </h1>
        <p className="text-base-content/70">Modern task management with AI-powered insights</p>
      </div>
      
      <Analytics />
      
      <TaskForm 
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialTask={editingTask}
      />
      
      {editingTask && (
        <div className="alert alert-info mb-4">
          <span>Editing: {editingTask.title}</span>
          <button onClick={() => setEditingTask(null)} className="btn btn-sm btn-ghost">
            Cancel
          </button>
        </div>
      )}
      
      <SearchAndFilter 
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={handleSearch}
      />
      
      {selectedTasks.size > 0 && (
        <div className="card bg-base-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <span>{selectedTasks.size} tasks selected</span>
            <div className="flex gap-2">
              <button onClick={handleBulkComplete} className="btn btn-sm btn-success">
                <CheckSquare size={16} /> Complete All
              </button>
              <button onClick={handleBulkDelete} className="btn btn-sm btn-error">
                <Trash2 size={16} /> Delete All
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button onClick={handleSelectAll} className="btn btn-sm btn-outline">
            {selectedTasks.size === tasks.length ? <Square size={16} /> : <CheckSquare size={16} />}
            {selectedTasks.size === tasks.length ? 'Deselect All' : 'Select All'}
          </button>
          <div className="stats stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total</div>
              <div className="stat-value text-sm">{stats.total}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Pending</div>
              <div className="stat-value text-sm text-warning">{stats.pending}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-sm text-success">{stats.completed}</div>
            </div>
          </div>
        </div>
        
        <select
          className="select select-bordered select-sm"
          value={`${filters.sortBy}-${filters.order}`}
          onChange={(e) => {
            const [sortBy, order] = e.target.value.split('-');
            setFilters(prev => ({ ...prev, sortBy, order }));
          }}
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="dueDate-asc">Due Date (Soon)</option>
          <option value="priority-desc">Priority (High)</option>
          <option value="title-asc">Title (A-Z)</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={setEditingTask}
              selected={selectedTasks.has(task._id)}
              onSelect={handleSelectTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-base-content/70">Create your first task to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}