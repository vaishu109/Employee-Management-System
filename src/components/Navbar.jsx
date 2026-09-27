import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { 
  Users, 
  Search, 
  Plus, 
  Sun, 
  Moon, 
  Globe, 
  RotateCcw
} from 'lucide-react';

export const Navbar = () => {
  const { 
    theme, 
    toggleTheme, 
    currency, 
    setCurrency, 
    searchQuery, 
    setSearchQuery, 
    setIsFormModalOpen, 
    setEditingEmployee,
    resetToDefaultData 
  } = useEmployeeContext();

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <div className="brand-logo">
          <div className="logo-icon">
            <Users size={22} className="text-indigo" />
          </div>
          <div className="brand-text">
            <h2>Pulse<span className="text-gradient">HR</span></h2>
            <span className="brand-badge">INDIA ADMIN</span>
          </div>
        </div>
      </div>

      <div className="navbar-center">
        <div className="global-search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search employees by name, role, email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {/* Currency Switcher */}
        <div className="currency-selector" title="Select Currency">
          <Globe size={16} className="text-indigo" />
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-dropdown"
            aria-label="Currency Selector"
          >
            <option value="INR">INR (₹)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button 
          className="btn btn-outline btn-icon" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-indigo" />}
        </button>

        {/* Reset Demo Data */}
        <button 
          className="btn btn-secondary btn-icon" 
          onClick={resetToDefaultData}
          title="Reset to Indian sample dataset"
        >
          <RotateCcw size={17} />
        </button>

        {/* Add Employee CTA */}
        <button className="btn btn-primary" onClick={handleOpenAddModal}>
          <Plus size={18} />
          <span>Add Employee</span>
        </button>
      </div>

      <style>{`
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-md);
          background: var(--accent-light);
          border: 1px solid var(--border-glow);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .brand-text h2 {
          font-size: 1.35rem;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .text-gradient {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-badge {
          font-size: 0.625rem;
          font-weight: 800;
          background: rgba(99, 102, 241, 0.18);
          color: #818cf8;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          letter-spacing: 0.06em;
        }

        .navbar-center {
          flex: 1;
          max-width: 500px;
          margin: 0 2rem;
        }

        .global-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .global-search-box .search-icon {
          position: absolute;
          left: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .global-search-box input {
          width: 100%;
          padding: 0.65rem 2.2rem 0.65rem 2.6rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-full);
          color: var(--text-primary);
          font-size: 0.875rem;
          transition: var(--transition-fast);
        }

        .global-search-box input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
          background: var(--bg-primary);
        }

        .clear-search {
          position: absolute;
          right: 0.8rem;
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.2rem;
          cursor: pointer;
          line-height: 1;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .currency-selector {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--bg-secondary);
          padding: 0.4rem 0.8rem;
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-md);
          box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
          transition: var(--transition-fast);
        }

        .currency-selector:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
        }

        .currency-dropdown {
          background: var(--bg-secondary);
          border: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          outline: none;
        }

        .currency-dropdown option {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-weight: 600;
          padding: 0.5rem;
        }

        @media (max-width: 900px) {
          .navbar-center {
            display: none;
          }
          .navbar-container {
            padding: 0.85rem 1rem;
          }
        }
      `}</style>
    </header>
  );
};
