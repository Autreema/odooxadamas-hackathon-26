import { Employee, AttendanceRecord, LeaveRequest, AuditLog } from './types';

// Seed employees list
const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: 'EMP101',
    name: 'Sarah Jenkins',
    email: 'admin@company.com',
    role: 'Admin',
    phone: '+1 (555) 019-2834',
    address: '123 Pinecrest Boulevard, Suite 400, San Francisco, CA 94105',
    department: 'Human Resources',
    designation: 'Director of HR & Administration',
    joinDate: '2024-01-15',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    salary: {
      basic: 8500,
      allowances: 1500,
      deductions: 800,
      netSalary: 9200
    },
    documents: [
      { id: 'DOC101', name: 'Employment_Contract_Jenkins.pdf', type: 'PDF Contract', uploadDate: '2024-01-15' },
      { id: 'DOC102', name: 'ID_Verification_Passport.pdf', type: 'PDF ID', uploadDate: '2024-01-15' }
    ]
  },
  {
    id: 'EMP102',
    name: 'David Chen',
    email: 'employee@company.com',
    role: 'Employee',
    phone: '+1 (555) 014-9921',
    address: '456 Oakwood Terrace, Apt 12B, Seattle, WA 98101',
    department: 'Engineering',
    designation: 'Lead Frontend Engineer',
    joinDate: '2024-06-10',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    salary: {
      basic: 7200,
      allowances: 1200,
      deductions: 650,
      netSalary: 7750
    },
    documents: [
      { id: 'DOC201', name: 'Employment_Agreement_Chen.pdf', type: 'PDF Contract', uploadDate: '2024-06-10' },
      { id: 'DOC202', name: 'W4_Tax_Form_2026.pdf', type: 'PDF Tax Form', uploadDate: '2026-01-05' }
    ]
  },
  {
    id: 'EMP103',
    name: 'Elena Rostova',
    email: 'elena@company.com',
    role: 'Employee',
    phone: '+1 (555) 017-4839',
    address: '789 Birchwood Way, Apt 34C, Chicago, IL 60611',
    department: 'Product',
    designation: 'Senior Product Manager',
    joinDate: '2025-02-01',
    profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    salary: {
      basic: 6800,
      allowances: 1000,
      deductions: 600,
      netSalary: 7200
    },
    documents: [
      { id: 'DOC301', name: 'Employment_Contract_Rostova.pdf', type: 'PDF Contract', uploadDate: '2025-02-01' }
    ]
  },
  {
    id: 'EMP104',
    name: 'Marcus Thompson',
    email: 'marcus@company.com',
    role: 'Employee',
    phone: '+1 (555) 012-7722',
    address: '321 Cedar Meadows Road, Austin, TX 78701',
    department: 'Marketing',
    designation: 'Growth Marketing Manager',
    joinDate: '2025-09-15',
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    salary: {
      basic: 5000,
      allowances: 800,
      deductions: 450,
      netSalary: 5350
    },
    documents: [
      { id: 'DOC401', name: 'Employment_Contract_Thompson.pdf', type: 'PDF Contract', uploadDate: '2025-09-15' }
    ]
  }
];

// Seed leave requests
const DEFAULT_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LRQ101',
    employeeId: 'EMP102',
    employeeName: 'David Chen',
    leaveType: 'Paid',
    startDate: '2026-07-06',
    endDate: '2026-07-10',
    remarks: 'Family vacation trip',
    status: 'Pending',
    adminComments: null,
    createdAt: '2026-07-02 09:30:15'
  },
  {
    id: 'LRQ102',
    employeeId: 'EMP103',
    employeeName: 'Elena Rostova',
    leaveType: 'Sick',
    startDate: '2026-06-18',
    endDate: '2026-06-19',
    remarks: 'Dental appointment and recovery',
    status: 'Approved',
    adminComments: 'Approved. Get well soon!',
    createdAt: '2026-06-17 14:12:00'
  },
  {
    id: 'LRQ103',
    employeeId: 'EMP104',
    employeeName: 'Marcus Thompson',
    leaveType: 'Unpaid',
    startDate: '2026-06-25',
    endDate: '2026-06-26',
    remarks: 'Personal urgent family matters',
    status: 'Approved',
    adminComments: 'Approved by Sarah Jenkins.',
    createdAt: '2026-06-23 11:05:44'
  },
  {
    id: 'LRQ104',
    employeeId: 'EMP102',
    employeeName: 'David Chen',
    leaveType: 'Sick',
    startDate: '2026-07-01',
    endDate: '2026-07-01',
    remarks: 'Woke up with a high fever',
    status: 'Approved',
    adminComments: 'Approved, take rest David.',
    createdAt: '2026-07-01 07:15:22'
  }
];

// Seed audit logs
const DEFAULT_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG001',
    userId: 'EMP101',
    userName: 'Sarah Jenkins',
    role: 'Admin',
    action: 'System Initialization',
    details: 'Pre-loaded default employees, leave structures, and payroll settings configured.',
    timestamp: '2026-06-01 08:00:00'
  },
  {
    id: 'LOG002',
    userId: 'EMP101',
    userName: 'Sarah Jenkins',
    role: 'Admin',
    action: 'Approved Leave Request',
    details: 'Approved sick leave request for Elena Rostova (EMP103) for 2026-06-18 to 2026-06-19.',
    timestamp: '2026-06-17 16:30:10'
  },
  {
    id: 'LOG003',
    userId: 'EMP104',
    userName: 'Marcus Thompson',
    role: 'Employee',
    action: 'Created Leave Request',
    details: 'Applied for Unpaid leave from 2026-06-25 to 2026-06-26.',
    timestamp: '2026-06-23 11:05:44'
  },
  {
    id: 'LOG004',
    userId: 'EMP101',
    userName: 'Sarah Jenkins',
    role: 'Admin',
    action: 'Approved Leave Request',
    details: 'Approved leave request for Marcus Thompson (EMP104) for 2026-06-25 to 2026-06-26.',
    timestamp: '2026-06-23 15:45:00'
  },
  {
    id: 'LOG005',
    userId: 'EMP102',
    userName: 'David Chen',
    role: 'Employee',
    action: 'Created Leave Request',
    details: 'Applied for Sick leave for 2026-07-01.',
    timestamp: '2026-07-01 07:15:22'
  },
  {
    id: 'LOG006',
    userId: 'EMP101',
    userName: 'Sarah Jenkins',
    role: 'Admin',
    action: 'Approved Leave Request',
    details: 'Approved leave request for David Chen (EMP102) for 2026-07-01.',
    timestamp: '2026-07-01 08:30:12'
  },
  {
    id: 'LOG007',
    userId: 'EMP102',
    userName: 'David Chen',
    role: 'Employee',
    action: 'Created Leave Request',
    details: 'Applied for Paid leave from 2026-07-06 to 2026-07-10.',
    timestamp: '2026-07-02 09:30:15'
  }
];

// Generate attendance records helper
function generateHistoricalAttendance(): AttendanceRecord[] {
  const records: AttendanceRecord[] = [];
  const employees = ['EMP101', 'EMP102', 'EMP103', 'EMP104'];
  
  // Create attendance for June (1 to 30) and July (1 to 3), excluding weekends
  const startDate = new Date('2026-06-01');
  const endDate = new Date('2026-07-03');
  let idCounter = 1;

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

    const dateStr = d.toISOString().split('T')[0];

    employees.forEach(empId => {
      // Custom overrides for specific employees on specific dates
      
      // David Chen (EMP102) - Sick leave on 2026-07-01
      if (empId === 'EMP102' && dateStr === '2026-07-01') {
        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: null,
          checkOut: null,
          status: 'Leave'
        });
        return;
      }

      // Marcus Thompson (EMP104) - Unpaid leave on June 25 & 26
      if (empId === 'EMP104' && (dateStr === '2026-06-25' || dateStr === '2026-06-26')) {
        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: null,
          checkOut: null,
          status: 'Leave'
        });
        return;
      }

      // Elena Rostova (EMP103) - Sick leave on June 18 & 19
      if (empId === 'EMP103' && (dateStr === '2026-06-18' || dateStr === '2026-06-19')) {
        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: null,
          checkOut: null,
          status: 'Leave'
        });
        return;
      }

      // Random variations for realism
      const rand = Math.random();
      
      if (rand < 0.04) {
        // Absent (Unexcused)
        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: null,
          checkOut: null,
          status: 'Absent'
        });
      } else if (rand < 0.08) {
        // Half-day
        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: '09:02:44',
          checkOut: '13:00:15',
          status: 'Half-day'
        });
      } else {
        // Present
        // Shift start around 8:45 AM - 9:15 AM, End around 5:00 PM - 5:30 PM
        const checkInHour = 8 + Math.floor(Math.random() * 2); // 8 or 9
        const checkInMin = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const checkInSec = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        
        const checkOutHour = 17 + Math.floor(Math.random() * 2); // 17 (5pm) or 18 (6pm)
        const checkOutMin = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const checkOutSec = String(Math.floor(Math.random() * 60)).padStart(2, '0');

        records.push({
          id: `ATT${idCounter++}`,
          employeeId: empId,
          date: dateStr,
          checkIn: `${String(checkInHour).padStart(2, '0')}:${checkInMin}:${checkInSec}`,
          checkOut: `${String(checkOutHour).padStart(2, '0')}:${checkOutMin}:${checkOutSec}`,
          status: 'Present'
        });
      }
    });
  }

  return records;
}

// Global Storage keys
const EMPLOYEES_KEY = 'hrms_employees';
const ATTENDANCE_KEY = 'hrms_attendance';
const LEAVE_REQUESTS_KEY = 'hrms_leave_requests';
const AUDIT_LOGS_KEY = 'hrms_audit_logs';

export function initializeDatabase() {
  if (!localStorage.getItem(EMPLOYEES_KEY)) {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(DEFAULT_EMPLOYEES));
  }
  if (!localStorage.getItem(ATTENDANCE_KEY)) {
    const defaultAttendance = generateHistoricalAttendance();
    localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(defaultAttendance));
  }
  if (!localStorage.getItem(LEAVE_REQUESTS_KEY)) {
    localStorage.setItem(LEAVE_REQUESTS_KEY, JSON.stringify(DEFAULT_LEAVE_REQUESTS));
  }
  if (!localStorage.getItem(AUDIT_LOGS_KEY)) {
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(DEFAULT_AUDIT_LOGS));
  }
}

// Getters
export function getEmployees(): Employee[] {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(EMPLOYEES_KEY) || '[]');
}

export function getAttendance(): AttendanceRecord[] {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || '[]');
}

export function getLeaveRequests(): LeaveRequest[] {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(LEAVE_REQUESTS_KEY) || '[]');
}

export function getAuditLogs(): AuditLog[] {
  initializeDatabase();
  return JSON.parse(localStorage.getItem(AUDIT_LOGS_KEY) || '[]');
}

// Setters
export function saveEmployees(employees: Employee[]) {
  localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
}

export function saveAttendance(attendance: AttendanceRecord[]) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
}

export function saveLeaveRequests(requests: LeaveRequest[]) {
  localStorage.setItem(LEAVE_REQUESTS_KEY, JSON.stringify(requests));
}

export function saveAuditLogs(logs: AuditLog[]) {
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(logs));
}

// Logging Utility
export function addAuditLog(userId: string, userName: string, role: 'Admin' | 'Employee', action: string, details: string) {
  const logs = getAuditLogs();
  const date = new Date();
  
  // Format to YYYY-MM-DD HH:MM:SS
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  
  const timestamp = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;

  const newLog: AuditLog = {
    id: `LOG${String(logs.length + 1).padStart(3, '0')}`,
    userId,
    userName,
    role,
    action,
    details,
    timestamp
  };

  logs.unshift(newLog); // Put newest logs at top
  saveAuditLogs(logs);
}
