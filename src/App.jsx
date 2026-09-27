import React from 'react';
import { EmployeeProvider, useEmployeeContext } from './context/EmployeeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardStats } from './components/DashboardStats';
import { FilterBar } from './components/FilterBar';
import { EmployeeTable } from './components/EmployeeTable';
import { EmployeeGrid } from './components/EmployeeGrid';
import { EmployeeFormModal } from './components/EmployeeFormModal';
import { EmployeeDetailModal } from './components/EmployeeDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';

const MainDashboardContent = () => {
  const { activeTab, viewMode } = useEmployeeContext();

  return (
    <main className="main-content">
      <div className="content-body">
        {/* Tab 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <>
            <div className="content-header mb-3">
              <div>
                <h1 className="content-title">Executive Dashboard</h1>
                <p className="text-muted">Real-time admin metrics, workforce analytics, and personnel operations.</p>
              </div>
            </div>
            <DashboardStats />
            <FilterBar />
            {viewMode === 'table' ? <EmployeeTable /> : <EmployeeGrid />}
          </>
        )}

        {/* Tab 2: Employee Directory */}
        {activeTab === 'employees' && (
          <>
            <div className="content-header mb-3">
              <div>
                <h1 className="content-title">Employee Directory</h1>
                <p className="text-muted">Manage, filter, edit, and search all active organization staff members.</p>
              </div>
            </div>
            <FilterBar />
            {viewMode === 'table' ? <EmployeeTable /> : <EmployeeGrid />}
          </>
        )}

        {/* Tab 3: Department Breakdown */}
        {activeTab === 'departments' && (
          <>
            <div className="content-header mb-3">
              <div>
                <h1 className="content-title">Department Analytics</h1>
                <p className="text-muted">Headcount distribution, department budgets, and team structure.</p>
              </div>
            </div>
            <DashboardStats />
            <FilterBar />
            {viewMode === 'table' ? <EmployeeTable /> : <EmployeeGrid />}
          </>
        )}

        {/* Tab 4: Payroll & Compensation */}
        {activeTab === 'payroll' && (
          <>
            <div className="content-header mb-3">
              <div>
                <h1 className="content-title">Payroll & Compensation</h1>
                <p className="text-muted">Track salary allocations, bonuses, monthly payroll projections, and currency conversions.</p>
              </div>
            </div>
            <DashboardStats />
            <FilterBar />
            {viewMode === 'table' ? <EmployeeTable /> : <EmployeeGrid />}
          </>
        )}
      </div>

      <style>{`
        .mb-3 { margin-bottom: 1.25rem; }
        .mb-2 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1.75rem; }
        
        .content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .content-title {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
      `}</style>
    </main>
  );
};

export default function App() {
  return (
    <EmployeeProvider>
      <div className="app-container">
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Navbar />
          <div style={{ display: 'flex', flex: 1 }}>
            <Sidebar />
            <MainDashboardContent />
          </div>
        </div>

        {/* Floating Modals & Alerts */}
        <EmployeeFormModal />
        <EmployeeDetailModal />
        <DeleteConfirmModal />
        <Toast />
      </div>
    </EmployeeProvider>
  );
}
