import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { formatCurrency } from '../data/mockEmployees';
import { 
  Eye, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  UserX,
  Briefcase
} from 'lucide-react';

export const EmployeeGrid = () => {
  const { 
    filteredEmployees, 
    currency, 
    setEditingEmployee, 
    setIsFormModalOpen, 
    setSelectedDetailEmployee, 
    setDeletingEmployeeId 
  } = useEmployeeContext();

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setIsFormModalOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <span className="badge badge-success">Active</span>;
      case 'Remote': return <span className="badge badge-info">Remote</span>;
      case 'On Leave': return <span className="badge badge-warning">On Leave</span>;
      case 'Terminated': return <span className="badge badge-danger">Terminated</span>;
      default: return <span className="badge badge-secondary">{status}</span>;
    }
  };

  if (filteredEmployees.length === 0) {
    return (
      <div className="glass-card empty-state-box">
        <UserX size={48} className="text-muted mb-2" />
        <h3>No Employees Found</h3>
        <p className="text-muted">No employee records match your search or selected filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid-3 mb-4">
      {filteredEmployees.map(emp => (
        <div key={emp.id} className="glass-card emp-card">
          <div className="emp-card-header">
            <div className="avatar-wrapper">
              <img 
                src={emp.avatar} 
                alt={emp.name} 
                className="emp-card-avatar"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(emp.name)}`;
                }}
              />
              <span className={`status-indicator status-${emp.status.toLowerCase().replace(' ', '-')}`} />
            </div>
            <div className="card-top-badges">
              <span className="badge badge-dept">{emp.department}</span>
              {getStatusBadge(emp.status)}
            </div>
          </div>

          <div className="emp-card-body">
            <h3 className="card-emp-name">{emp.name}</h3>
            <p className="card-emp-role">{emp.role}</p>

            <div className="card-details-list">
              <div className="detail-line">
                <Mail size={14} className="text-muted" />
                <span>{emp.email}</span>
              </div>
              <div className="detail-line">
                <Phone size={14} className="text-muted" />
                <span>{emp.phone}</span>
              </div>
              <div className="detail-line">
                <MapPin size={14} className="text-muted" />
                <span>{emp.location}</span>
              </div>
            </div>
          </div>

          <div className="emp-card-footer">
            <div className="salary-box">
              <span className="salary-label">Base Salary</span>
              <span className="salary-val">{formatCurrency(emp.baseSalary, currency)}</span>
            </div>

            <div className="card-actions">
              <button 
                className="action-btn action-view" 
                onClick={() => setSelectedDetailEmployee(emp)}
                title="View Full Profile"
              >
                <Eye size={15} />
              </button>
              <button 
                className="action-btn action-edit" 
                onClick={() => handleEdit(emp)}
                title="Edit Details"
              >
                <Edit2 size={15} />
              </button>
              <button 
                className="action-btn action-delete" 
                onClick={() => setDeletingEmployeeId(emp.id)}
                title="Delete Employee"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .emp-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .emp-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .avatar-wrapper {
          position: relative;
        }

        .emp-card-avatar {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          object-fit: cover;
          border: 2px solid var(--border-glow);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--bg-secondary);
        }

        .status-active { background: var(--success); }
        .status-remote { background: var(--info); }
        .status-on-leave { background: var(--warning); }
        .status-terminated { background: var(--danger); }

        .card-top-badges {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.35rem;
        }

        .emp-card-body {
          margin-bottom: 1.25rem;
        }

        .card-emp-name {
          font-size: 1.1rem;
          margin-bottom: 0.2rem;
        }

        .card-emp-role {
          font-size: 0.825rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 0.85rem;
        }

        .card-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .detail-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          color: var(--text-secondary);
        }

        .emp-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 0.85rem;
          margin-top: auto;
        }

        .salary-box {
          display: flex;
          flex-direction: column;
        }

        .salary-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .salary-val {
          font-size: 1rem;
          font-weight: 800;
          color: #34d399;
          font-family: var(--font-heading);
        }

        .card-actions {
          display: flex;
          gap: 0.35rem;
        }
      `}</style>
    </div>
  );
};
