import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { DEPARTMENTS, EMPLOYMENT_TYPES, STATUS_OPTIONS } from '../data/mockEmployees';
import { 
  Filter, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  SlidersHorizontal 
} from 'lucide-react';

export const FilterBar = () => {
  const { 
    selectedDepartment, 
    setSelectedDepartment, 
    selectedEmploymentType, 
    setSelectedEmploymentType,
    selectedStatus,
    setSelectedStatus,
    sortBy, 
    setSortBy, 
    sortOrder, 
    setSortOrder, 
    viewMode, 
    setViewMode,
    filteredEmployees,
    employees
  } = useEmployeeContext();

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="filter-bar-container glass-card">
      {/* Top Department Pills Row */}
      <div className="dept-pills-row">
        <span className="pills-label">
          <Filter size={14} /> Department:
        </span>
        <div className="pills-scroll">
          {DEPARTMENTS.map(dept => (
            <button
              key={dept}
              className={`dept-pill ${selectedDepartment === dept ? 'active' : ''}`}
              onClick={() => setSelectedDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Sub-row */}
      <div className="filter-controls-row">
        <div className="controls-left">
          {/* Employment Type Dropdown */}
          <div className="select-wrapper">
            <span className="select-label">Type:</span>
            <select
              value={selectedEmploymentType}
              onChange={(e) => setSelectedEmploymentType(e.target.value)}
              className="filter-select"
            >
              {EMPLOYMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="select-wrapper">
            <span className="select-label">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="select-wrapper">
            <span className="select-label">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="baseSalary">Salary</option>
              <option value="joinDate">Join Date</option>
              <option value="department">Department</option>
            </select>
            <button 
              className="btn btn-outline btn-icon sort-order-btn" 
              onClick={toggleSortOrder}
              title={`Order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            </button>
          </div>
        </div>

        <div className="controls-right">
          <span className="results-count">
            Showing <strong>{filteredEmployees.length}</strong> of {employees.length} employees
          </span>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={16} />
            </button>
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid Cards View"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .filter-bar-container {
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .dept-pills-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .pills-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          white-space: nowrap;
        }

        .pills-scroll {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          overflow-x: auto;
          padding-bottom: 0.2rem;
          scrollbar-width: none;
        }

        .pills-scroll::-webkit-scrollbar {
          display: none;
        }

        .dept-pill {
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: var(--transition-bounce);
        }

        .dept-pill:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary);
        }

        .dept-pill.active {
          background: var(--accent-gradient);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .filter-controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 0.85rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .controls-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .select-wrapper {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .select-label {
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .filter-select {
          padding: 0.35rem 0.65rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .sort-order-btn {
          padding: 0.35rem;
          border-radius: var(--radius-md);
        }

        .controls-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .results-count {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .view-mode-toggle {
          display: flex;
          align-items: center;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 0.15rem;
        }

        .toggle-btn {
          padding: 0.35rem 0.6rem;
          border: none;
          background: transparent;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-fast);
        }

        .toggle-btn.active {
          background: var(--accent-primary);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};
