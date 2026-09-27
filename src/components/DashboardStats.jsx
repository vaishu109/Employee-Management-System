import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { formatCurrency } from '../data/mockEmployees';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  ArrowUpRight,
  PieChart,
  BarChart3
} from 'lucide-react';

export const DashboardStats = () => {
  const { stats, currency } = useEmployeeContext();

  const monthlyPayroll = stats.totalPayroll / 12;
  const deptCount = Object.keys(stats.departmentBreakdown).length;

  const deptColors = {
    Engineering: '#6366f1',
    Product: '#ec4899',
    Sales: '#10b981',
    Marketing: '#f59e0b',
    'Human Resources': '#8b5cf6',
    Finance: '#3b82f6',
    Other: '#94a3b8'
  };

  return (
    <div className="dashboard-stats-wrapper">
      {/* KPI Cards */}
      <div className="grid-4 mb-4">
        {/* Card 1 */}
        <div className="glass-card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Staff</span>
            <div className="kpi-icon-box bg-indigo-light">
              <Users size={20} className="text-indigo" />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{stats.totalEmployees}</h3>
            <span className="kpi-badge badge-success">
              <ArrowUpRight size={14} /> +12.5%
            </span>
          </div>
          <p className="kpi-subtext">{stats.activeCount} active & remote team members</p>
        </div>

        {/* Card 2 */}
        <div className="glass-card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Est. Monthly Payroll</span>
            <div className="kpi-icon-box bg-emerald-light">
              <DollarSign size={20} className="text-emerald" />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{formatCurrency(monthlyPayroll, currency)}</h3>
            <span className="kpi-badge badge-info">Monthly</span>
          </div>
          <p className="kpi-subtext">Total Annual: {formatCurrency(stats.totalPayroll, currency)}</p>
        </div>

        {/* Card 3 */}
        <div className="glass-card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Avg. Base Salary</span>
            <div className="kpi-icon-box bg-purple-light">
              <TrendingUp size={20} className="text-purple" />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{formatCurrency(stats.avgSalary, currency)}</h3>
            <span className="kpi-badge badge-success">
              <ArrowUpRight size={14} /> Competitive
            </span>
          </div>
          <p className="kpi-subtext">Based on {stats.totalEmployees} employee profiles</p>
        </div>

        {/* Card 4 */}
        <div className="glass-card kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Active Departments</span>
            <div className="kpi-icon-box bg-amber-light">
              <Building2 size={20} className="text-amber" />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{deptCount}</h3>
            <span className="kpi-badge badge-warning">Core Units</span>
          </div>
          <p className="kpi-subtext">Cross-functional team distribution</p>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid-2 gap-4">
        {/* Department Headcount Bar Chart Card */}
        <div className="glass-card chart-card">
          <div className="chart-header">
            <div className="chart-title-box">
              <BarChart3 size={18} className="text-indigo" />
              <h4>Headcount Distribution</h4>
            </div>
            <span className="text-muted text-xs">By Department</span>
          </div>

          <div className="chart-bars-list">
            {Object.entries(stats.departmentBreakdown).map(([dept, data]) => {
              const percentage = stats.totalEmployees > 0 ? Math.round((data.count / stats.totalEmployees) * 100) : 0;
              const barColor = deptColors[dept] || '#6366f1';
              return (
                <div key={dept} className="chart-bar-item">
                  <div className="bar-label-row">
                    <span className="dept-name">{dept}</span>
                    <span className="dept-count">{data.count} staff ({percentage}%)</span>
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${percentage}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Payroll Breakdown Card */}
        <div className="glass-card chart-card">
          <div className="chart-header">
            <div className="chart-title-box">
              <PieChart size={18} className="text-emerald" />
              <h4>Payroll Budget Share</h4>
            </div>
            <span className="text-muted text-xs">Annualized</span>
          </div>

          <div className="chart-bars-list">
            {Object.entries(stats.departmentBreakdown).map(([dept, data]) => {
              const salaryPct = stats.totalPayroll > 0 ? Math.round((data.totalSalary / stats.totalPayroll) * 100) : 0;
              const barColor = deptColors[dept] || '#10b981';
              return (
                <div key={dept} className="chart-bar-item">
                  <div className="bar-label-row">
                    <span className="dept-name">{dept}</span>
                    <span className="dept-salary">{formatCurrency(data.totalSalary, currency)} ({salaryPct}%)</span>
                  </div>
                  <div className="bar-track">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${salaryPct}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-stats-wrapper {
          margin-bottom: 2rem;
        }

        .kpi-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .kpi-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .kpi-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .kpi-icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-indigo-light { background: rgba(99, 102, 241, 0.15); }
        .bg-emerald-light { background: rgba(16, 185, 129, 0.15); }
        .bg-purple-light { background: rgba(168, 85, 247, 0.15); }
        .bg-amber-light { background: rgba(245, 158, 11, 0.15); }

        .text-indigo { color: #818cf8; }
        .text-emerald { color: #34d399; }
        .text-purple { color: #c084fc; }
        .text-amber { color: #fbbf24; }

        .kpi-value-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .kpi-value {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }

        .kpi-subtext {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: auto;
        }

        .chart-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .chart-title-box {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .chart-title-box h4 {
          font-size: 0.95rem;
        }

        .text-xs { font-size: 0.75rem; }

        .chart-bars-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .chart-bar-item {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .bar-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .dept-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .dept-count, .dept-salary {
          color: var(--text-muted);
          font-weight: 500;
        }

        .bar-track {
          height: 8px;
          width: 100%;
          background: var(--bg-tertiary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};
