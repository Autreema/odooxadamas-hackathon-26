export type UserRole = 'Admin' | 'Employee';

export interface SalaryStructure {
  basic: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

export interface EmployeeDocument {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

export interface Employee {
  id: string; // Employee ID (e.g., EMP101)
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  department: string;
  designation: string;
  joinDate: string;
  profilePicture: string; // Base64 or icon name or preset key
  salary: SalaryStructure;
  documents: EmployeeDocument[];
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Half-day' | 'Leave';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  checkIn: string | null; // HH:MM:SS
  checkOut: string | null; // HH:MM:SS
  status: AttendanceStatus;
}

export type LeaveType = 'Paid' | 'Sick' | 'Unpaid';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  remarks: string;
  status: LeaveStatus;
  adminComments: string | null;
  createdAt: string; // YYYY-MM-DD HH:MM:SS
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  details: string;
  timestamp: string; // YYYY-MM-DD HH:MM:SS
}
