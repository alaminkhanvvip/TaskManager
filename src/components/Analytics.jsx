import { useAnalytics } from '../hooks/useTasks';
import { BarChart3, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function Analytics() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) return <div className="loading loading-spinner"></div>;
  if (!analytics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="stat bg-primary text-primary-content rounded-lg">
        <div className="stat-figure">
          <BarChart3 size={32} />
        </div>
        <div className="stat-title text-primary-content">Total Tasks</div>
        <div className="stat-value">{analytics.total}</div>
      </div>
      
      <div className="stat bg-success text-success-content rounded-lg">
        <div className="stat-figure">
          <CheckCircle size={32} />
        </div>
        <div className="stat-title text-success-content">Completed</div>
        <div className="stat-value">{analytics.completed}</div>
      </div>
      
      <div className="stat bg-warning text-warning-content rounded-lg">
        <div className="stat-figure">
          <Clock size={32} />
        </div>
        <div className="stat-title text-warning-content">Pending</div>
        <div className="stat-value">{analytics.pending}</div>
      </div>
      
      <div className="stat bg-error text-error-content rounded-lg">
        <div className="stat-figure">
          <AlertTriangle size={32} />
        </div>
        <div className="stat-title text-error-content">Overdue</div>
        <div className="stat-value">{analytics.overdue}</div>
      </div>
    </div>
  );
}