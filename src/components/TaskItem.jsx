import { Calendar, Clock, Tag, Edit, Trash2, Check, Undo } from 'lucide-react';
import { formatDistanceToNow, isAfter, format } from 'date-fns';

export default function TaskItem({ task, onToggle, onDelete, onEdit, selected, onSelect }) {
  const priorityColors = {
    low: 'badge-success',
    medium: 'badge-warning', 
    high: 'badge-error',
    urgent: 'badge-error animate-pulse'
  };
  
  const categoryIcons = {
    work: '🏢',
    personal: '👤',
    shopping: '🛒',
    health: '🏥',
    other: '📝'
  };
  
  const isOverdue = task.dueDate && !task.completed && isAfter(new Date(), new Date(task.dueDate));

  return (
    <div className={`card bg-base-100 shadow-xl mb-4 transition-all hover:shadow-2xl ${
      task.completed ? 'opacity-60' : ''
    } ${selected ? 'ring-2 ring-primary' : ''} ${isOverdue ? 'border-l-4 border-error' : ''}`}>
      <div className="card-body">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="checkbox checkbox-primary mt-1"
            checked={selected}
            onChange={(e) => onSelect(task._id, e.target.checked)}
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{categoryIcons[task.category]}</span>
              <h3 className={`card-title text-lg ${task.completed ? 'line-through' : ''}`}>
                {task.title}
              </h3>
              {isOverdue && <span className="badge badge-error badge-sm">Overdue</span>}
            </div>
            
            {task.description && (
              <p className={`text-sm mb-3 ${task.completed ? 'line-through' : ''}`}>
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`badge ${priorityColors[task.priority]} badge-sm`}>
                {task.priority}
              </span>
              
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs">
                  <Calendar size={12} />
                  <span className={isOverdue ? 'text-error' : ''}>
                    {format(new Date(task.dueDate), 'MMM dd')}
                  </span>
                </div>
              )}
              
              {task.estimatedTime && (
                <div className="flex items-center gap-1 text-xs">
                  <Clock size={12} />
                  <span>{task.estimatedTime}m</span>
                </div>
              )}
            </div>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {task.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline badge-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="text-xs text-base-content/60">
              Created {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </div>
          </div>
          
          <div className="card-actions flex-col">
            <button
              onClick={() => onToggle(task._id, !task.completed)}
              className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
            >
              {task.completed ? <Undo size={16} /> : <Check size={16} />}
            </button>
            <button onClick={() => onEdit(task)} className="btn btn-sm btn-info">
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete(task._id)} className="btn btn-sm btn-error">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}