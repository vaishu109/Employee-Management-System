import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export const DeleteConfirmModal = () => {
  const { 
    deletingEmployeeId, 
    setDeletingEmployeeId, 
    deleteEmployee, 
    employees 
  } = useEmployeeContext();

  if (!deletingEmployeeId) return null;

  const emp = employees.find(e => e.id === deletingEmployeeId);

  const handleConfirmDelete = () => {
    deleteEmployee(deletingEmployeeId);
    setDeletingEmployeeId(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setDeletingEmployeeId(null)}>
      <div className="modal-content glass-card delete-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <div className="danger-icon-circle">
            <AlertTriangle size={24} className="text-danger" />
          </div>
          <h3>Confirm Delete Employee</h3>
        </div>

        <div className="delete-modal-body">
          <p>
            Are you sure you want to permanently delete the employee record for <strong>{emp ? emp.name : deletingEmployeeId}</strong>?
          </p>
          <div className="emp-summary-pill">
            <span>ID: {emp?.id}</span> • <span>Dept: {emp?.department}</span> • <span>Role: {emp?.role}</span>
          </div>
          <p className="text-muted text-xs">This action will remove all associated compensation and personnel records.</p>
        </div>

        <div className="delete-modal-footer">
          <button className="btn btn-outline" onClick={() => setDeletingEmployeeId(null)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleConfirmDelete}>
            <Trash2 size={16} /> Yes, Delete Record
          </button>
        </div>
      </div>

      <style>{`
        .delete-modal-box {
          max-width: 480px;
          padding: 1.5rem;
          text-align: center;
        }

        .delete-modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .danger-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .delete-modal-header h3 {
          font-size: 1.2rem;
        }

        .delete-modal-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .emp-summary-pill {
          background: var(--bg-primary);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .delete-modal-footer {
          display: flex;
          justify-content: center;
          gap: 0.85rem;
        }
      `}</style>
    </div>
  );
};
