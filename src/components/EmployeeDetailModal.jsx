import React from 'react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { formatCurrency, formatLPA } from '../data/mockEmployees';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Edit2, 
  Building2
} from 'lucide-react';

export const EmployeeDetailModal = () => {
  const { 
    selectedDetailEmployee, 
    setSelectedDetailEmployee, 
    currency, 
    setEditingEmployee, 
    setIsFormModalOpen 
  } = useEmployeeContext();

  if (!selectedDetailEmployee) return null;

  const emp = selectedDetailEmployee;
  const annualSalary = Number(emp.baseSalary) || 0;
  const monthlySalary = annualSalary / 12;
  const bonusAmount = (annualSalary * (Number(emp.bonus) || 0)) / 100;
  const totalComp = annualSalary + bonusAmount;

  // Calculate tenure from joinDate
  const getTenure = (joinDateStr) => {
    if (!joinDateStr) return 'N/A';
    const joinDate = new Date(joinDateStr);
    const now = new Date();
    const diffMonths = (now.getFullYear() - joinDate.getFullYear()) * 12 + (now.getMonth() - joinDate.getMonth());
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    if (years === 0) return `${months} month${months === 1 ? '' : 's'}`;
    return `${years} yr${years === 1 ? '' : 's'} ${months} mo${months === 1 ? '' : 's'}`;
  };

  const handleEditClick = () => {
    const currentEmp = selectedDetailEmployee;
    setSelectedDetailEmployee(null);
    setEditingEmployee(currentEmp);
    setIsFormModalOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedDetailEmployee(null)}>
      <div className="modal-content glass-card detail-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Profile Banner */}
        <div className="profile-banner">
          <button className="btn btn-outline btn-icon detail-close-btn" onClick={() => setSelectedDetailEmployee(null)}>
            <X size={18} />
          </button>
          
          <div className="profile-banner-body">
            <img 
              src={emp.avatar} 
              alt={emp.name} 
              className="profile-lg-avatar"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(emp.name)}`;
              }}
            />
            <div className="profile-banner-info">
              <div className="title-row">
                <h2>{emp.name}</h2>
                <span className="emp-id-badge">{emp.id}</span>
              </div>
              <p className="profile-role">{emp.role}</p>
              <div className="profile-tags-row">
                <span className="badge badge-dept"><Building2 size={13} /> {emp.department}</span>
                <span className="badge badge-info"><Briefcase size={13} /> {emp.employmentType}</span>
                <span className="badge badge-success">{emp.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="profile-content-grid">
          {/* Left Column: Contact & Employment Info */}
          <div className="profile-card-block">
            <h4 className="block-title">Contact & Personnel</h4>
            <div className="info-list">
              <div className="info-item">
                <Mail size={16} className="text-muted" />
                <div>
                  <span className="info-label">Email Address</span>
                  <a href={`mailto:${emp.email}`} className="info-val-link">{emp.email}</a>
                </div>
              </div>

              <div className="info-item">
                <Phone size={16} className="text-muted" />
                <div>
                  <span className="info-label">Phone Contact</span>
                  <span className="info-val">{emp.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="info-item">
                <MapPin size={16} className="text-muted" />
                <div>
                  <span className="info-label">Office / Work Location</span>
                  <span className="info-val">{emp.location || 'Remote'}</span>
                </div>
              </div>

              <div className="info-item">
                <Calendar size={16} className="text-muted" />
                <div>
                  <span className="info-label">Joined Date</span>
                  <span className="info-val">{emp.joinDate} ({getTenure(emp.joinDate)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Salary & Compensation Breakdown */}
          <div className="profile-card-block">
            <h4 className="block-title">Compensation & CTC Metrics</h4>
            <div className="salary-breakdown-card">
              <div className="salary-row">
                <span className="salary-label-text">Annual CTC</span>
                <span className="salary-val-large">
                  {formatCurrency(annualSalary, currency)}
                  {currency === 'INR' && <span className="lpa-tag"> ({formatLPA(annualSalary)})</span>}
                </span>
              </div>
              <div className="salary-row sub-row">
                <span className="salary-label-text">Est. Monthly Base</span>
                <span className="salary-val-sub">{formatCurrency(monthlySalary, currency)}</span>
              </div>
              <div className="salary-row sub-row">
                <span className="salary-label-text">Performance Bonus ({emp.bonus}%)</span>
                <span className="salary-val-sub">{formatCurrency(bonusAmount, currency)}</span>
              </div>
              
              <div className="salary-divider" />

              <div className="salary-row total-row">
                <span className="salary-label-text">Total Est. Compensation</span>
                <span className="salary-val-total">{formatCurrency(totalComp, currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="profile-modal-footer">
          <button className="btn btn-primary" onClick={handleEditClick}>
            <Edit2 size={16} /> Edit Profile
          </button>
          <button className="btn btn-secondary" onClick={() => setSelectedDetailEmployee(null)}>
            Close Profile
          </button>
        </div>
      </div>

      <style>{`
        .detail-modal-content {
          max-width: 720px;
          padding: 0;
          overflow: hidden;
        }

        .profile-banner {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.15) 100%);
          padding: 2rem 2rem 1.5rem 2rem;
          position: relative;
          border-bottom: 1px solid var(--border-color);
        }

        .detail-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .profile-banner-body {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .profile-lg-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--accent-primary);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .profile-banner-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .title-row h2 {
          font-size: 1.4rem;
        }

        .profile-role {
          font-size: 0.9rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .profile-tags-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
          flex-wrap: wrap;
        }

        .profile-content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          padding: 1.5rem 2rem;
        }

        .block-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.4rem;
        }

        .info-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .info-label {
          display: block;
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .info-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .info-val-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: #818cf8;
          text-decoration: none;
        }

        .salary-breakdown-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .salary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .salary-label-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .salary-val-large {
          font-size: 1.1rem;
          font-weight: 800;
          color: #34d399;
          font-family: var(--font-heading);
        }

        .lpa-tag {
          font-size: 0.8rem;
          font-weight: 700;
          color: #818cf8;
        }

        .salary-val-sub {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .salary-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.35rem 0;
        }

        .salary-val-total {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--accent-primary);
        }

        .profile-modal-footer {
          padding: 1rem 2rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        @media (max-width: 640px) {
          .profile-content-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
          }
          .profile-banner-body {
            flex-direction: column;
            text-align: center;
          }
          .title-row {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
