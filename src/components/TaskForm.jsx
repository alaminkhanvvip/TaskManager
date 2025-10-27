import { useState } from 'react';
import { Calendar, Clock, Tag, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskForm({ onSubmit, initialTask = null }) {
  const [task, setTask] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    priority: initialTask?.priority || 'medium',
    category: initialTask?.category || 'other',
    dueDate: initialTask?.dueDate ? format(new Date(initialTask.dueDate), 'yyyy-MM-dd') : '',
    estimatedTime: initialTask?.estimatedTime || '',
    tags: initialTask?.tags || []
  });
  
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    
    const submitData = {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      estimatedTime: task.estimatedTime ? parseInt(task.estimatedTime) : undefined
    };
    
    onSubmit(submitData);
    if (!initialTask) {
      setTask({ title: '', description: '', priority: 'medium', category: 'other', dueDate: '', estimatedTime: '', tags: [] });
    }
  };
  
  const addTag = () => {
    if (newTag.trim() && !task.tags.includes(newTag.trim())) {
      setTask({ ...task, tags: [...task.tags, newTag.trim()] });
      setNewTag('');
    }
  };
  
  const removeTag = (tagToRemove) => {
    setTask({ ...task, tags: task.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Task title"
            className="input input-bordered"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        
        <div className="form-control">
          <select
            className="select select-bordered"
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
          >
            <option value="work">🏢 Work</option>
            <option value="personal">👤 Personal</option>
            <option value="shopping">🛒 Shopping</option>
            <option value="health">🏥 Health</option>
            <option value="other">📝 Other</option>
          </select>
        </div>
      </div>
      
      <div className="form-control mb-4">
        <textarea
          placeholder="Description (optional)"
          className="textarea textarea-bordered"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="form-control">
          <select
            className="select select-bordered"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="urgent">🔴 Urgent</option>
          </select>
        </div>
        
        <div className="form-control">
          <div className="input-group">
            <span><Calendar size={20} /></span>
            <input
              type="date"
              className="input input-bordered flex-1"
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            />
          </div>
        </div>
        
        <div className="form-control">
          <div className="input-group">
            <span><Clock size={20} /></span>
            <input
              type="number"
              placeholder="Minutes"
              className="input input-bordered flex-1"
              value={task.estimatedTime}
              onChange={(e) => setTask({ ...task, estimatedTime: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      <div className="form-control mb-4">
        <div className="input-group mb-2">
          <span><Tag size={20} /></span>
          <input
            type="text"
            placeholder="Add tag"
            className="input input-bordered flex-1"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <button type="button" className="btn btn-square" onClick={addTag}>
            <Plus size={20} />
          </button>
        </div>
        
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag, index) => (
              <div key={index} className="badge badge-outline gap-2">
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-error">
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <button type="submit" className="btn btn-primary">
        {initialTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}