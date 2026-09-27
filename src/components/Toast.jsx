import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useEmployeeContext();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle2 size={18} className="text-success" />;
      case 'danger': return <AlertCircle size={18} className="text-danger" />;
      case 'warning': return <AlertTriangle size={18} className="text-warning" />;
      default: return <Info size={18} className="text-info" />;
    }
  };

  return (
    <div className={`toast-container toast-${toast.type}`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>

      <style>{`
        .toast-container {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 200;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          border-radius: var(--radius-lg);
          background: var(--bg-secondary);
          border: 1px solid var(--border-glow);
          box-shadow: var(--shadow-lg);
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          animation: toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .toast-success { border-color: rgba(16, 185, 129, 0.4); }
        .toast-danger { border-color: rgba(239, 68, 68, 0.4); }
        .toast-warning { border-color: rgba(245, 158, 11, 0.4); }
        .toast-info { border-color: rgba(99, 102, 241, 0.4); }

        @keyframes toastSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};
