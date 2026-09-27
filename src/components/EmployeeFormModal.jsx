import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { DEPARTMENTS, EMPLOYMENT_TYPES, STATUS_OPTIONS } from '../data/mockEmployees';
import { X, Sparkles, User, Mail, Phone, Building2, Briefcase, DollarSign, MapPin, Calendar } from 'lucide-react';

export const EmployeeFormModal = () => {
  const { 
    isFormModalOpen, 
    setIsFormModalOpen, 
    editingEmployee, 
    addEmployee, 
    updateEmployee 
  } = useEmployeeContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Engineering',
    role: '',
    employmentType: 'Full-Time',
    status: 'Active',
    joinDate: new Date().toISOString().split('T')[0],
    baseSalary: 1800000,
    bonus: 10,
    location: 'Bengaluru, KA',
    avatar: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || '',
        email: editingEmployee.email || '',
        phone: editingEmployee.phone || '',
        department: editingEmployee.department || 'Engineering',
        role: editingEmployee.role || '',
        employmentType: editingEmployee.employmentType || 'Full-Time',
        status: editingEmployee.status || 'Active',
        joinDate: editingEmployee.joinDate || new Date().toISOString().split('T')[0],
        baseSalary: editingEmployee.baseSalary || 1800000,
        bonus: editingEmployee.bonus || 0,
        location: editingEmployee.location || 'Bengaluru, KA',
        avatar: editingEmployee.avatar || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: 'Engineering',
        role: '',
        employmentType: 'Full-Time',
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        baseSalary: 1800000,
        bonus: 10,
        location: 'Bengaluru, KA',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
      });
    }
    setErrors({});
  }, [editingEmployee, isFormModalOpen]);

  if (!isFormModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleGenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData(prev => ({
      ...prev,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.role.trim()) newErrors.role = 'Role title is required';
    if (Number(formData.baseSalary) < 0) newErrors.baseSalary = 'Salary must be 0 or positive';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData);
    } else {
      addEmployee(formData);
    }

    setIsFormModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsFormModalOpen(false)}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <h3>{editingEmployee ? '✏️ Update Employee Details' : '➕ Add New Employee'}</h3>
            <p className="text-muted">{editingEmployee ? `Editing record for ID: ${editingEmployee.id}` : 'Fill in personnel details for the team member.'}</p>
          </div>
          <button className="btn btn-outline btn-icon close-btn" onClick={() => setIsFormModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form-body">
          {/* Avatar Selector Row */}
          <div className="avatar-picker-section">
            <img 
              src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`} 
              alt="Avatar Preview" 
              className="avatar-preview"
            />
            <div className="avatar-controls">
              <span className="form-label">Employee Avatar</span>
              <div className="avatar-input-row">
                <input 
                  type="text" 
                  name="avatar" 
                  className="form-input" 
                  placeholder="Avatar Image URL..."
                  value={formData.avatar}
                  onChange={handleChange}
                />
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm"
                  onClick={handleGenerateAvatar}
                  title="Generate Random Avatar"
                >
                  <Sparkles size={15} /> Randomize
                </button>
              </div>
            </div>
          </div>

          <div className="grid-2">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="e.g. Aarav Sharma"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input 
                type="email" 
                name="email" 
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="aarav@company.in"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                className="form-input"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Role Title */}
            <div className="form-group">
              <label className="form-label">Role Title *</label>
              <input 
                type="text" 
                name="role" 
                className={`form-input ${errors.role ? 'input-error' : ''}`}
                placeholder="e.g. Senior Software Engineer"
                value={formData.role}
                onChange={handleChange}
              />
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label className="form-label">Department</label>
              <select 
                name="department" 
                className="form-select"
                value={formData.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.filter(d => d !== 'All Departments').map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Employment Type */}
            <div className="form-group">
              <label className="form-label">Employment Type</label>
              <select 
                name="employmentType" 
                className="form-select"
                value={formData.employmentType}
                onChange={handleChange}
              >
                {EMPLOYMENT_TYPES.filter(t => t !== 'All Types').map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">Work Status</label>
              <select 
                name="status" 
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Join Date */}
            <div className="form-group">
              <label className="form-label">Join Date</label>
              <input 
                type="date" 
                name="joinDate" 
                className="form-input"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>

            {/* Base Salary */}
            <div className="form-group">
              <label className="form-label">Annual CTC (INR ₹) *</label>
              <input 
                type="number" 
                name="baseSalary" 
                className={`form-input ${errors.baseSalary ? 'input-error' : ''}`}
                placeholder="1800000"
                value={formData.baseSalary}
                onChange={handleChange}
              />
              {errors.baseSalary && <span className="error-text">{errors.baseSalary}</span>}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label">Work Location</label>
              <input 
                type="text" 
                name="location" 
                className="form-input"
                placeholder="Bengaluru, KA or Remote"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer-row">
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {editingEmployee ? 'Save Changes' : 'Create Employee Record'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-title-box h3 {
          font-size: 1.2rem;
          margin-bottom: 0.15rem;
        }

        .modal-form-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .avatar-picker-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-primary);
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .avatar-preview {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-primary);
        }

        .avatar-controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .avatar-input-row {
          display: flex;
          gap: 0.5rem;
        }

        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.775rem;
        }

        .input-error {
          border-color: var(--danger) !important;
        }

        .error-text {
          font-size: 0.75rem;
          color: var(--danger);
          margin-top: 0.15rem;
        }

        .modal-footer-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }
      `}</style>
    </div>
  );
};
