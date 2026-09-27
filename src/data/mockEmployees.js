// Initial sample dataset of employees for initial load & demo reset
export const INITIAL_EMPLOYEES = [
  {
    id: "EMP-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@techcorp.in",
    phone: "+91 98765 43210",
    department: "Engineering",
    role: "Staff Software Engineer",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2021-03-15",
    baseSalary: 2850000, // ₹28.5 LPA
    bonus: 15,
    location: "Bengaluru, KA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    skills: ["React", "Node.js", "System Design", "AWS India"]
  },
  {
    id: "EMP-1002",
    name: "Priya Patel",
    email: "priya.patel@techcorp.in",
    phone: "+91 98123 45678",
    department: "Product",
    role: "Lead Product Designer",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2020-08-01",
    baseSalary: 2200000, // ₹22 LPA
    bonus: 12,
    location: "Mumbai, MH",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    skills: ["Figma", "Design Systems", "UX Research", "Prototyping"]
  },
  {
    id: "EMP-1003",
    name: "Vikramaditya Singh",
    email: "vikram.singh@techcorp.in",
    phone: "+91 99887 76655",
    department: "Sales",
    role: "VP of Enterprise Sales",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2019-11-10",
    baseSalary: 3500000, // ₹35 LPA
    bonus: 25,
    location: "Gurugram, HR (Delhi NCR)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    skills: ["Enterprise B2B", "CRM", "Deal Closing", "Pan-India Sales"]
  },
  {
    id: "EMP-1004",
    name: "Ananya Iyer",
    email: "ananya.iyer@techcorp.in",
    phone: "+91 97654 32109",
    department: "Engineering",
    role: "Senior Full-Stack Engineer",
    employmentType: "Full-Time",
    status: "Remote",
    joinDate: "2022-01-20",
    baseSalary: 1850000, // ₹18.5 LPA
    bonus: 10,
    location: "Chennai, TN",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    skills: ["TypeScript", "GraphQL", "Docker", "PostgreSQL"]
  },
  {
    id: "EMP-1005",
    name: "Rohan Mehta",
    email: "rohan.mehta@techcorp.in",
    phone: "+91 96543 21098",
    department: "Marketing",
    role: "Growth Marketing Lead",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2021-09-01",
    baseSalary: 1600000, // ₹16 LPA
    bonus: 14,
    location: "Pune, MH",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200",
    skills: ["Performance Marketing", "SEO", "Google Ads", "Brand Growth"]
  },
  {
    id: "EMP-1006",
    name: "Sneha Kulkarni",
    email: "sneha.k@techcorp.in",
    phone: "+91 95432 10987",
    department: "Human Resources",
    role: "Head of People & HR",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2020-04-12",
    baseSalary: 2100000, // ₹21 LPA
    bonus: 10,
    location: "Hyderabad, TS",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
    skills: ["Talent Acquisition", "HR Tech", "Employee Engagement", "POSH"]
  },
  {
    id: "EMP-1007",
    name: "Rajesh Nair",
    email: "rajesh.nair@techcorp.in",
    phone: "+91 94321 09876",
    department: "Finance",
    role: "Senior Financial Controller",
    employmentType: "Full-Time",
    status: "Active",
    joinDate: "2022-06-15",
    baseSalary: 1750000, // ₹17.5 LPA
    bonus: 12,
    location: "Bengaluru, KA",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    skills: ["Financial Audit", "GST & Taxation", "Budgeting", "SAP"]
  },
  {
    id: "EMP-1008",
    name: "Kavya Reddy",
    email: "kavya.reddy@techcorp.in",
    phone: "+91 93210 98765",
    department: "Product",
    role: "Technical Product Manager",
    employmentType: "Full-Time",
    status: "On Leave",
    joinDate: "2021-11-01",
    baseSalary: 2400000, // ₹24 LPA
    bonus: 15,
    location: "Hyderabad, TS",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    skills: ["Agile/Scrum", "API Strategy", "Roadmapping", "Jira"]
  },
  {
    id: "EMP-1009",
    name: "Siddharth Kapoor",
    email: "siddharth.k@techcorp.in",
    phone: "+91 92109 87654",
    department: "Engineering",
    role: "DevOps Engineer",
    employmentType: "Contract",
    status: "Remote",
    joinDate: "2023-02-01",
    baseSalary: 1500000, // ₹15 LPA
    bonus: 5,
    location: "Noida, UP",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    skills: ["Kubernetes", "Terraform", "CI/CD Pipelines", "AWS"]
  },
  {
    id: "EMP-1010",
    name: "Neha Joshi",
    email: "neha.joshi@techcorp.in",
    phone: "+91 91098 76543",
    department: "Marketing",
    role: "Content Strategy Lead",
    employmentType: "Part-Time",
    status: "Active",
    joinDate: "2023-05-10",
    baseSalary: 1200000, // ₹12 LPA
    bonus: 8,
    location: "Mumbai, MH",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    skills: ["Copywriting", "Social Media", "Brand Voice", "SEO"]
  }
];

// Department filter options
export const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product",
  "Sales",
  "Marketing",
  "Human Resources",
  "Finance"
];

// Employment type filter options
export const EMPLOYMENT_TYPES = ["All Types", "Full-Time", "Part-Time", "Contract", "Intern"];

// Work status options
export const STATUS_OPTIONS = ["Active", "Remote", "On Leave", "Terminated"];

// Supported currencies with relative rates
export const CURRENCIES = {
  INR: { symbol: "₹", code: "INR", rate: 1, label: "INR (₹)" },
  USD: { symbol: "$", code: "USD", rate: 0.012, label: "USD ($)" },
  EUR: { symbol: "€", code: "EUR", rate: 0.011, label: "EUR (€)" },
  GBP: { symbol: "£", code: "GBP", rate: 0.0094, label: "GBP (£)" }
};

// Helper function to format currency amounts based on selected currency
export const formatCurrency = (amount, currencyKey = "INR") => {
  const curr = CURRENCIES[currencyKey] || CURRENCIES.INR;
  const converted = amount * curr.rate;

  if (curr.code === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(converted);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: curr.code,
    maximumFractionDigits: 0
  }).format(converted);
};

// Helper function to format annual INR amounts into Lakhs Per Annum (LPA)
export const formatLPA = (amountINR) => {
  if (!amountINR) return "₹0 LPA";
  const lpa = (amountINR / 100000).toFixed(2);
  return `₹${lpa} LPA`;
};
