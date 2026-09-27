# 👥 Employee Management System (PulseHR)

A modern, high-performance **Employee Management System** built with **React**, **Vite**, and **Vanilla CSS**. Features complete CRUD capabilities, department filtering, instant search, workforce analytics, salary metrics, multi-currency conversion, CSV data exports, local storage persistence, and a dark/light glassmorphic admin interface.

---

## ✨ Features

- ➕ **Add Employee (Create)**: Create new staff profiles with full name, contact, department, role, employment type, salary, status, and dynamic avatar generation.
- 📋 **View & Detail Drawer (Read)**: View all employees in both **Table** and **Card Grid** formats. Detailed profile drawer includes contact info, calculated tenure, and salary breakdown.
- 🔍 **Instant Search & Filter**: Real-time fuzzy search across name, email, role, or ID. Filter by Department, Employment Type, and Work Status.
- ✏️ **Edit Employee (Update)**: Pre-filled modal editor for updating personnel details and compensation.
- 🗑️ **Delete Employee (Delete)**: Safety confirmation modal preventing accidental record removal.
- 💰 **Salary & Compensation Analytics**: Multi-currency conversion (USD `$`, EUR `€`, GBP `£`, INR `₹`), monthly payroll estimates, and annualized compensation totals.
- 📊 **Executive Dashboard**: KPI stat cards and visual department headcount & payroll budget distribution bar charts.
- 📁 **CSV Export**: Export filtered or complete workforce data to CSV files.
- 💾 **Local Storage Persistence**: Automatically saves all changes to your browser's local storage with demo reset functionality.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Design System with Glassmorphism, Theme Variables, and Dynamic Animations)
- **State Management**: React Context API + LocalStorage persistence

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/vaishu109/Employee-Management-System.git
cd Employee-Management-System
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 📸 Preview Highlights

- **Executive KPI Cards**: Total Staff, Est. Monthly Payroll, Avg Base Salary, Active Units.
- **Visual Department Share**: Headcount and Payroll distribution bar charts.
- **Theme Support**: Dark Mode (Default) & Light Mode with seamless switching.
