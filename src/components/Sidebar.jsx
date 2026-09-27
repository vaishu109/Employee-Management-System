import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  DollarSign, 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    stats, 
    exportToCSV 
  } = useEmployeeContext();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'employees', label: 'Employee Directory', icon: Users, badge: stats.totalEmployees },
    { id: 'departments', label: 'Departments', icon: Building2, badge: Object.keys(stats.departmentBreakdown).length },
    { id: 'payroll', label: 'Payroll & Salary', icon: DollarSign, badge: null }
  ];

  return (
    <aside className="sidebar-container glass-card">
      <div className="sidebar-section">
        <span className="sidebar-title">NAVIGATION</span>
        <nav className="sidebar-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={19} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {item.badge !== null && (
                  <span className={`nav-badge ${isActive ? 'active-badge' : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section quick-stats-box">
        <div className="quick-stats-header">
          <TrendingUp size={16} className="text-indigo" />
          <span>Workforce Status</span>
        </div>
        <div className="quick-stat-item">
          <span className="stat-name">Active Staff</span>
          <span className="stat-val text-success">{stats.activeCount} / {stats.totalEmployees}</span>
        </div>
        <div className="quick-stat-item">
          <span className="stat-name">Admin Status</span>
          <span className="stat-val text-indigo" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <ShieldCheck size={14} /> Full Access
          </span>
        </div>

        <button className="btn btn-outline export-sidebar-btn" onClick={exportToCSV}>
          <Download size={15} />
          <span>Export Records</span>
        </button>
      </div>

      <style>{`
        .sidebar-container {
          width: 260px;
          min-width: 260px;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-radius: 0;
          border-top: none;
          border-bottom: none;
          border-left: none;
          background: var(--bg-glass);
          position: sticky;
          top: 73px;
          height: calc(100vh - 73px);
        }

        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-title {
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          padding-left: 0.75rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.75rem 0.9rem;
          border-radius: var(--radius-md);
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-bounce);
          text-align: left;
        }

        .nav-link:hover {
          background: var(--bg-glass-hover);
          color: var(--text-primary);
        }

        .nav-link.active {
          background: var(--accent-light);
          color: var(--accent-primary);
          border-color: var(--border-glow);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.12);
        }

        .nav-icon {
          transition: var(--transition-fast);
        }

        .nav-link.active .nav-icon {
          color: var(--accent-primary);
        }

        .nav-badge {
          margin-left: auto;
          font-size: 0.725rem;
          font-weight: 700;
          background: var(--bg-tertiary);
          color: var(--text-muted);
          padding: 0.1rem 0.5rem;
          border-radius: var(--radius-full);
        }

        .nav-badge.active-badge {
          background: var(--accent-primary);
          color: #ffffff;
        }

        .quick-stats-box {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.1rem;
          gap: 0.65rem;
        }

        .quick-stats-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .quick-stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.775rem;
        }

        .stat-name {
          color: var(--text-muted);
        }

        .stat-val {
          font-weight: 700;
        }

        .export-sidebar-btn {
          width: 100%;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          padding: 0.5rem;
        }

        @media (max-width: 900px) {
          .sidebar-container {
            width: 100%;
            height: auto;
            position: relative;
            top: 0;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
          .quick-stats-box {
            display: none;
          }
          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .nav-link {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </aside>
  );
};
