import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_EMPLOYEES } from '../data/mockEmployees';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  // Persistence in LocalStorage
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = localStorage.getItem('ems_employees');
      return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
    } catch (e) {
      console.error("Failed to load employees from local storage", e);
      return INITIAL_EMPLOYEES;
    }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ems_theme') || 'dark';
  });

  const [currency, setCurrency] = useState('USD');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'employees' | 'departments' | 'payroll'

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'salary' | 'joinDate' | 'department'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Modals & Drawers State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // null for create, employee obj for edit
  const [selectedDetailEmployee, setSelectedDetailEmployee] = useState(null);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('ems_employees', JSON.stringify(employees));
    } catch (e) {
      console.error("Failed to save employees to local storage", e);
    }
  }, [employees]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ems_theme', theme);
  }, [theme]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // CRUD Operations
  const addEmployee = (employeeData) => {
    const nextNumber = 1000 + employees.length + 1;
    const newEmployee = {
      ...employeeData,
      id: `EMP-${nextNumber}`,
      baseSalary: Number(employeeData.baseSalary) || 0,
      bonus: Number(employeeData.bonus) || 0,
      joinDate: employeeData.joinDate || new Date().toISOString().split('T')[0],
      avatar: employeeData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employeeData.name)}`
    };

    setEmployees(prev => [newEmployee, ...prev]);
    showToast(`Added ${newEmployee.name} to employee directory`, 'success');
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === id ? { ...emp, ...updatedData, baseSalary: Number(updatedData.baseSalary), bonus: Number(updatedData.bonus) } : emp))
    );
    showToast(`Updated employee details for ${updatedData.name}`, 'info');
  };

  const deleteEmployee = (id) => {
    const emp = employees.find(e => e.id === id);
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast(`Deleted employee ${emp ? emp.name : id}`, 'danger');
  };

  const resetToDefaultData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    showToast('Reset employee records to demo dataset', 'warning');
  };

  // Filtering & Sorting Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch =
        searchQuery === '' ||
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept =
        selectedDepartment === 'All Departments' || emp.department === selectedDepartment;

      const matchesType =
        selectedEmploymentType === 'All Types' || emp.employmentType === selectedEmploymentType;

      const matchesStatus =
        selectedStatus === 'All' || emp.status === selectedStatus;

      return matchesSearch && matchesDept && matchesType && matchesStatus;
    }).sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [employees, searchQuery, selectedDepartment, selectedEmploymentType, selectedStatus, sortBy, sortOrder]);

  // Analytics Metrics
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const totalPayroll = employees.reduce((acc, emp) => acc + (Number(emp.baseSalary) || 0), 0);
    const avgSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0;
    const activeCount = employees.filter(e => e.status === 'Active' || e.status === 'Remote').length;

    // Department Breakdown
    const deptMap = {};
    employees.forEach(emp => {
      const dept = emp.department || 'Other';
      if (!deptMap[dept]) {
        deptMap[dept] = { count: 0, totalSalary: 0 };
      }
      deptMap[dept].count += 1;
      deptMap[dept].totalSalary += Number(emp.baseSalary) || 0;
    });

    return {
      totalEmployees,
      totalPayroll,
      avgSalary,
      activeCount,
      departmentBreakdown: deptMap
    };
  }, [employees]);

  // Export CSV Helper
  const exportToCSV = () => {
    if (filteredEmployees.length === 0) {
      showToast('No records available to export', 'warning');
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Department", "Role", "Type", "Status", "Join Date", "Base Salary ($)", "Bonus (%)", "Location"];
    const rows = filteredEmployees.map(emp => [
      emp.id,
      `"${emp.name}"`,
      emp.email,
      `"${emp.phone}"`,
      `"${emp.department}"`,
      `"${emp.role}"`,
      emp.employmentType,
      emp.status,
      emp.joinDate,
      emp.baseSalary,
      emp.bonus,
      `"${emp.location}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Employee_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredEmployees.length} employee records to CSV`, 'success');
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      filteredEmployees,
      stats,
      theme,
      toggleTheme,
      currency,
      setCurrency,
      viewMode,
      setViewMode,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
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
      addEmployee,
      updateEmployee,
      deleteEmployee,
      resetToDefaultData,
      isFormModalOpen,
      setIsFormModalOpen,
      editingEmployee,
      setEditingEmployee,
      selectedDetailEmployee,
      setSelectedDetailEmployee,
      deletingEmployeeId,
      setDeletingEmployeeId,
      toast,
      showToast,
      exportToCSV
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
