import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_EMPLOYEES } from '../data/mockEmployees';

// 1. Create Context for central state management
const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  // 2. State for Employee List initialized from LocalStorage or default sample data
  const [employees, setEmployees] = useState(() => {
    try {
      const savedData = localStorage.getItem('ems_employees');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Fallback check to migrate legacy sample data if present
        if (parsed.length > 0 && parsed[0].name === "Alex Rivera") {
          localStorage.setItem('ems_employees', JSON.stringify(INITIAL_EMPLOYEES));
          return INITIAL_EMPLOYEES;
        }
        return parsed;
      }
      return INITIAL_EMPLOYEES;
    } catch (error) {
      console.error("Failed to load employees from local storage:", error);
      return INITIAL_EMPLOYEES;
    }
  });

  // Theme & Currency States
  const [theme, setTheme] = useState(() => localStorage.getItem('ems_theme') || 'dark');
  const [currency, setCurrency] = useState('INR'); // Default currency is INR (₹)
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'employees', 'departments', 'payroll'

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('All Types');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'baseSalary', 'joinDate', 'department'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  // Modal Dialog States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null); // null for create, object for edit
  const [selectedDetailEmployee, setSelectedDetailEmployee] = useState(null);
  const [deletingEmployeeId, setDeletingEmployeeId] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  // 3. Sync employee list changes to LocalStorage automatically
  useEffect(() => {
    try {
      localStorage.setItem('ems_employees', JSON.stringify(employees));
    } catch (error) {
      console.error("Failed to save employees to local storage:", error);
    }
  }, [employees]);

  // Sync theme attribute to HTML document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ems_theme', theme);
  }, [theme]);

  // Helper method to display toast feedback messages
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // ----------------------------------------------------
  // CRUD Operations (Create, Read, Update, Delete)
  // ----------------------------------------------------

  // C - Create: Add new employee to array
  const addEmployee = (employeeData) => {
    const nextIdNumber = 1000 + employees.length + 1;
    const newEmployee = {
      ...employeeData,
      id: `EMP-${nextIdNumber}`,
      baseSalary: Number(employeeData.baseSalary) || 0,
      bonus: Number(employeeData.bonus) || 0,
      joinDate: employeeData.joinDate || new Date().toISOString().split('T')[0],
      avatar: employeeData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employeeData.name)}`
    };

    setEmployees(prevEmployees => [newEmployee, ...prevEmployees]);
    showToast(`Added ${newEmployee.name} to employee directory`, 'success');
  };

  // U - Update: Modify existing employee details by ID using .map()
  const updateEmployee = (id, updatedFields) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === id
          ? {
              ...emp,
              ...updatedFields,
              baseSalary: Number(updatedFields.baseSalary),
              bonus: Number(updatedFields.bonus)
            }
          : emp
      )
    );
    showToast(`Updated details for ${updatedFields.name}`, 'info');
  };

  // D - Delete: Remove employee by ID using .filter()
  const deleteEmployee = (id) => {
    const empToDelete = employees.find(emp => emp.id === id);
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
    showToast(`Deleted employee ${empToDelete ? empToDelete.name : id}`, 'danger');
  };

  // Reset to initial sample data
  const resetToDefaultData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    localStorage.setItem('ems_employees', JSON.stringify(INITIAL_EMPLOYEES));
    showToast('Reset employee records to demo dataset', 'warning');
  };

  // ----------------------------------------------------
  // Search, Filter & Sort Logic using JavaScript Array Methods
  // ----------------------------------------------------
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(emp => {
        // Search matching using .includes()
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          searchQuery === '' ||
          emp.name.toLowerCase().includes(query) ||
          emp.email.toLowerCase().includes(query) ||
          emp.role.toLowerCase().includes(query) ||
          emp.id.toLowerCase().includes(query);

        // Department filter matching
        const matchesDept =
          selectedDepartment === 'All Departments' || emp.department === selectedDepartment;

        // Employment type filter matching
        const matchesType =
          selectedEmploymentType === 'All Types' || emp.employmentType === selectedEmploymentType;

        // Status filter matching
        const matchesStatus =
          selectedStatus === 'All' || emp.status === selectedStatus;

        return matchesSearch && matchesDept && matchesType && matchesStatus;
      })
      .sort((a, b) => {
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

  // ----------------------------------------------------
  // Calculate Dashboard Statistics using Array .reduce()
  // ----------------------------------------------------
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const totalPayroll = employees.reduce((sum, emp) => sum + (Number(emp.baseSalary) || 0), 0);
    const avgSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0;
    const activeCount = employees.filter(emp => emp.status === 'Active' || emp.status === 'Remote').length;

    // Calculate department breakdown
    const departmentBreakdown = {};
    employees.forEach(emp => {
      const dept = emp.department || 'Other';
      if (!departmentBreakdown[dept]) {
        departmentBreakdown[dept] = { count: 0, totalSalary: 0 };
      }
      departmentBreakdown[dept].count += 1;
      departmentBreakdown[dept].totalSalary += Number(emp.baseSalary) || 0;
    });

    return {
      totalEmployees,
      totalPayroll,
      avgSalary,
      activeCount,
      departmentBreakdown
    };
  }, [employees]);

  // CSV Export utility
  const exportToCSV = () => {
    if (filteredEmployees.length === 0) {
      showToast('No records available to export', 'warning');
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Department", "Role", "Type", "Status", "Join Date", "CTC Salary (INR ₹)", "Bonus (%)", "Location"];
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

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
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
    <EmployeeContext.Provider
      value={{
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
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

// Custom hook to consume EmployeeContext easily in components
export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
