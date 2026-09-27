import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { formatCurrency } from '../data/mockEmployees';
import { Eye, Edit2, Trash2, Mail, Phone, Calendar, UserX } from 'lucide-react';

export const EmployeeTable = () => {
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
    <div className="glass-card table-responsive-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>EMPLOYEE</th>
            <th>ID</th>
            <th>DEPARTMENT</th>
            <th>ROLE</th>
            <th>STATUS</th>
            <th>SALARY (ANNUAL)</th>
            <th>JOIN DATE</th>
            <th style={{ textAlign: 'right' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <tr key={emp.id} className="table-row-hover">
              <td>
                <div className="employee-info-cell">
                  <img 
                    src={emp.avatar} 
                    alt={emp.name} 
                    className="emp-table-avatar"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(emp.name)}`;
                    }}
                  />
                  <div className="emp-names">
                    <span className="emp-name-text">{emp.name}</span>
                    <span className="emp-email-text">{emp.email}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className="emp-id-badge">{emp.id}</span>
              </td>
              <td>
                <span className="badge badge-dept">{emp.department}</span>
              </td>
              <td>
                <span className="emp-role-text">{emp.role}</span>
              </td>
              <td>
                {getStatusBadge(emp.status)}
              </td>
              <td>
                <span className="salary-text">{formatCurrency(emp.baseSalary, currency)}</span>
              </td>
              <td>
                <span className="date-text">{emp.joinDate}</span>
              </td>
              <td>
                <div className="actions-cell">
                  <button 
                    className="action-btn action-view" 
                    onClick={() => setSelectedDetailEmployee(emp)}
                    title="View Employee Profile"
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn action-edit" 
                    onClick={() => handleEdit(emp)}
                    title="Edit Employee Details"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    className="action-btn action-delete" 
                    onClick={() => setDeletingEmployeeId(emp.id)}
                    title="Delete Employee"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .table-responsive-container {
          overflow-x: auto;
          margin-bottom: 2rem;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.85rem;
        }

        .custom-table th {
          padding: 0.9rem 1.1rem;
          font-family: var(--font-heading);
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.06em;
          border-bottom: 1px solid var(--border-color);
          background: rgba(17, 24, 39, 0.4);
          white-space: nowrap;
        }

        .custom-table td {
          padding: 0.85rem 1.1rem;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        .table-row-hover:hover {
          background: var(--bg-glass-hover);
        }

        .employee-info-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .emp-table-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          object-fit: cover;
          border: 2px solid var(--border-glow);
        }

        .emp-names {
          display: flex;
          flex-direction: column;
        }

        .emp-name-text {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .emp-email-text {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .emp-id-badge {
          font-family: monospace;
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-secondary);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .emp-role-text {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .salary-text {
          font-weight: 700;
          color: #34d399;
          font-family: var(--font-heading);
        }

        .date-text {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.4rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .action-view:hover {
          border-color: var(--info);
          color: var(--info);
          background: var(--info-bg);
        }

        .action-edit:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--accent-light);
        }

        .action-delete:hover {
          border-color: var(--danger);
          color: var(--danger);
          background: var(--danger-bg);
        }

        .empty-state-box {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
