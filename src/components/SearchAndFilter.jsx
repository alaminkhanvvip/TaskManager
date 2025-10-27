import { Search, Filter, Calendar, Tag } from 'lucide-react';

export default function SearchAndFilter({ filters, onFiltersChange, onSearch }) {
  return (
    <div className="card bg-base-100 shadow-xl p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="form-control flex-1 min-w-64">
          <div className="input-group">
            <span><Search size={20} /></span>
            <input
              type="text"
              placeholder="Search tasks..."
              className="input input-bordered flex-1"
              value={filters.search || ''}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        
        <select
          className="select select-bordered"
          value={filters.priority || ''}
          onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        
        <select
          className="select select-bordered"
          value={filters.category || ''}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
        
        <select
          className="select select-bordered"
          value={filters.completed || ''}
          onChange={(e) => onFiltersChange({ ...filters, completed: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>
    </div>
  );
}