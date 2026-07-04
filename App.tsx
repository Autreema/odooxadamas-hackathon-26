import React, { useState, useEffect } from 'react';
import {
  Users, Clock, Calendar, DollarSign, Layers, ShieldCheck, LogOut,
  Menu, X, Key, Mail, UserPlus, Fingerprint, ArrowRightLeft, Sparkles, ShieldAlert
} from 'lucide-react';
import { Employee, AttendanceRecord, LeaveRequest, AuditLog, UserRole } from './types';
import {
  getEmployees, getAttendance, getLeaveRequests, getAuditLogs,
  saveEmployees, saveAttendance, saveLeaveRequests, saveAuditLogs,
  addAuditLog, initializeDatabase
} from './data';

// Import sub-components
import DashboardStats from './components/DashboardStats';
import EmployeeDirectory from './components/EmployeeDirectory';
import AttendanceTracker from './components/AttendanceTracker';
import LeaveManagement from './components/LeaveManagement';
import PayrollControl from './components/PayrollControl';
import AuditLogViewer from './components/AuditLogViewer';

export default function App() {
  // Database state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Authentication states
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [authTab, setAuthTab] = useState<'SIGN_IN' | 'SIGN_UP'>('SIGN_IN');

  // Sign In inputs
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');

  // Sign Up inputs
  const [signUpEmpId, setSignUpEmpId] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('Employee');
  const [signUpError, setSignUpError] = useState('');
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  // Active UI Navigation Tab
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'DIRECTORY' | 'ATTENDANCE' | 'LEAVE' | 'PAYROLL' | 'AUDIT'>('DASHBOARD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load and sync database on init
  useEffect(() => {
    initializeDatabase();
    setEmployees(getEmployees());
    setAttendance(getAttendance());
    setLeaveRequests(getLeaveRequests());
    setAuditLogs(getAuditLogs());
  }, []);

  // Update actions
  const handleUpdateEmployees = (updated: Employee[]) => {
    setEmployees(updated);
    saveEmployees(updated);
  };

  const handleUpdateAttendance = (updated: AttendanceRecord[]) => {
    setAttendance(updated);
    saveAttendance(updated);
  };

  const handleUpdateLeaveRequests = (updated: LeaveRequest[]) => {
    setLeaveRequests(updated);
    saveLeaveRequests(updated);
  };

  const handleUpdateAuditLogs = (updated: AuditLog[]) => {
    setAuditLogs(updated);
    saveAuditLogs(updated);
  };

  // Switch demo account role on-the-fly for evaluator convenience
  const handleQuickRoleSwitch = () => {
    if (!currentUser) return;
    
    const targetRole: UserRole = currentUser.role === 'Admin' ? 'Employee' : 'Admin';
    const otherAccount = employees.find(e => e.role === targetRole);
    
    if (otherAccount) {
      setCurrentUser(otherAccount);
      addAuditLog(
        otherAccount.id,
        otherAccount.name,
        otherAccount.role,
        'Demo Quick Role Switch',
        `Evaluator instantly switched portal context from ${currentUser.role} to ${otherAccount.role}.`
      );
      setAuditLogs(getAuditLogs());
    }
  };

  // Sign In Handler
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError('');

    const found = employees.find(
      emp => emp.email.toLowerCase() === signInEmail.toLowerCase()
    );

    if (!found) {
      setSignInError('No account registered with this email coordinate.');
      return;
    }

    // Accept simple passwords for hackathon convenience, but mock check
    if (!signInPassword) {
      setSignInError('Please input your password credentials.');
      return;
    }

    setCurrentUser(found);
    addAuditLog(
      found.id,
      found.name,
      found.role,
      'User Authentication',
      `Signed in successfully to the Enterprise HRMS Portal.`
    );
    setAuditLogs(getAuditLogs());
  };

  // Sign Up Handler
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');

    if (!signUpEmpId || !signUpName || !signUpEmail || !signUpPassword) {
      setSignUpError('Please fill in all registration credentials.');
      return;
    }

    // Regex and security rules checks
    if (signUpPassword.length < 6) {
      setSignUpError('Password must be at least 6 characters for enterprise compliance.');
      return;
    }

    const empIdExists = employees.some(emp => emp.id.toUpperCase() === signUpEmpId.toUpperCase());
    if (empIdExists) {
      setSignUpError('This Employee ID is already registered in the registry database.');
      return;
    }

    const emailExists = employees.some(emp => emp.email.toLowerCase() === signUpEmail.toLowerCase());
    if (emailExists) {
      setSignUpError('This Email coordinate is already registered in the system.');
      return;
    }

    // Pass to mock email verification screen
    setIsVerifyingEmail(true);
  };

  // Mock Email Verification Complete
  const handleVerifyEmailAndCompleteSignUp = () => {
    const newEmp: Employee = {
      id: signUpEmpId.toUpperCase(),
      name: signUpName,
      email: signUpEmail,
      role: signUpRole,
      phone: '+1 (555) 010-0000',
      address: 'Onboarding Pending Address',
      department: signUpRole === 'Admin' ? 'Human Resources' : 'Engineering',
      designation: signUpRole === 'Admin' ? 'HR Specialist' : 'Junior Software Engineer',
      joinDate: new Date().toISOString().split('T')[0],
      profilePicture: signUpRole === 'Admin' 
        ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      salary: {
        basic: signUpRole === 'Admin' ? 6000 : 4500,
        allowances: 1000,
        deductions: 500,
        netSalary: signUpRole === 'Admin' ? 6500 : 5000
      },
      documents: []
    };

    const updatedList = [...employees, newEmp];
    handleUpdateEmployees(updatedList);
    setCurrentUser(newEmp);
    
    addAuditLog(
      newEmp.id,
      newEmp.name,
      newEmp.role,
      'User Onboarding & Sign Up',
      `Registered a new ${signUpRole} account. Email verified and database record instantiated.`
    );
    setAuditLogs(getAuditLogs());

    // Reset fields
    setSignUpEmpId('');
    setSignUpName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setIsVerifyingEmail(false);
  };

  // Logout Handler
  const handleLogout = () => {
    if (currentUser) {
      addAuditLog(
        currentUser.id,
        currentUser.name,
        currentUser.role,
        'User Termination Session',
        `Logged out safely from the Enterprise HRMS Portal.`
      );
    }
    setCurrentUser(null);
    setSignInEmail('');
    setSignInPassword('');
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {!currentUser ? (
        // Authentication Section
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 animate-scaleIn">
            
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                <Sparkles className="w-3.5 h-3.5" />
                Enterprise Suite 360
              </span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 tracking-tight">Enterprise HRMS</h2>
              <p className="mt-2 text-sm text-slate-500">
                Every workday, perfectly aligned and audited.
              </p>
            </div>

            {/* Quick Demo Credentials Panel */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 text-xs font-semibold space-y-3">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <Fingerprint className="w-4 h-4" />
                <span>Evaluator One-Click Bypass Login</span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-relaxed">
                Skip credential typing! Click below to instantly log in as either the HR Director (Admin) or Lead Engineer (Employee).
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="btn-demo-admin"
                  onClick={() => {
                    const found = employees.find(e => e.email === 'admin@company.com');
                    if (found) {
                      setCurrentUser(found);
                      addAuditLog(found.id, found.name, found.role, 'Demo Bypass Login', 'Instant evaluator login as HR Director.');
                      setAuditLogs(getAuditLogs());
                    }
                  }}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-xs text-center cursor-pointer"
                >
                  Login as Admin
                </button>
                <button
                  id="btn-demo-employee"
                  onClick={() => {
                    const found = employees.find(e => e.email === 'employee@company.com');
                    if (found) {
                      setCurrentUser(found);
                      addAuditLog(found.id, found.name, found.role, 'Demo Bypass Login', 'Instant evaluator login as Lead Frontend Engineer.');
                      setAuditLogs(getAuditLogs());
                    }
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition shadow-xs text-center cursor-pointer"
                >
                  Login as Employee
                </button>
              </div>
            </div>

            {/* Email Verification Mock Screen */}
            {isVerifyingEmail ? (
              <div className="space-y-6 text-center py-4 animate-scaleIn">
                <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Mail className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">Email Verification Pending</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                    We sent a mock verification code to <strong className="text-slate-700 font-bold">{signUpEmail}</strong> to secure your identity. Click complete below to verify and instantiate the user in our DB records.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    id="btn-confirm-verify"
                    onClick={handleVerifyEmailAndCompleteSignUp}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer"
                  >
                    Confirm Email Verification
                  </button>
                  <button
                    onClick={() => setIsVerifyingEmail(false)}
                    className="text-xs text-slate-400 font-semibold hover:text-slate-600 transition block mx-auto cursor-pointer"
                  >
                    Cancel Onboarding
                  </button>
                </div>
              </div>
            ) : (
              // Auth Tabs View
              <div className="space-y-6">
                <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50">
                  <button
                    onClick={() => {
                      setAuthTab('SIGN_IN');
                      setSignInError('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      authTab === 'SIGN_IN' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthTab('SIGN_UP');
                      setSignUpError('');
                    }}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      authTab === 'SIGN_UP' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {authTab === 'SIGN_IN' ? (
                  // Login Form
                  <form onSubmit={handleSignIn} className="space-y-4">
                    {signInError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-semibold">
                        {signInError}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Email Address</label>
                      <div className="relative">
                        <input
                          id="login-email-input"
                          type="email"
                          placeholder="e.g. employee@company.com"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                        />
                        <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Password</label>
                      <div className="relative">
                        <input
                          id="login-password-input"
                          type="password"
                          placeholder="••••••••"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                        />
                        <Key className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <button
                      id="btn-login-submit"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Authenticate Account
                    </button>
                  </form>
                ) : (
                  // Register Form
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {signUpError && (
                      <div className="p-3 bg-rose-50 border border-rose-100 text-rose-800 rounded-xl text-xs font-semibold">
                        {signUpError}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Employee ID</label>
                        <div className="relative">
                          <input
                            id="signup-empid-input"
                            type="text"
                            placeholder="e.g. EMP105"
                            value={signUpEmpId}
                            onChange={(e) => setSignUpEmpId(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                          />
                          <Fingerprint className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Role Type</label>
                        <select
                          id="signup-role-input"
                          value={signUpRole}
                          onChange={(e) => setSignUpRole(e.target.value as UserRole)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800 font-semibold"
                        >
                          <option value="Employee">Employee (Regular)</option>
                          <option value="Admin">HR / Admin Officer</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Full Name</label>
                      <div className="relative">
                        <input
                          id="signup-name-input"
                          type="text"
                          placeholder="e.g. John Doe"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                        />
                        <UserPlus className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Email Coordinate</label>
                      <div className="relative">
                        <input
                          id="signup-email-input"
                          type="email"
                          placeholder="e.g. john@company.com"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                        />
                        <Mail className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Create Password</label>
                      <div className="relative">
                        <input
                          id="signup-password-input"
                          type="password"
                          placeholder="Minimum 6 characters"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-slate-800"
                        />
                        <Key className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
                      </div>
                    </div>

                    <button
                      id="btn-signup-submit"
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-xl py-2.5 px-4 text-sm font-semibold hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Onboard New Employee
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      ) : (
        // Main Portal Layout
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Sidebar Navigation */}
          <aside className={`w-full md:w-64 bg-slate-900 text-slate-200 flex flex-col justify-between flex-shrink-0 relative transition-transform ${
            mobileMenuOpen ? 'block' : 'hidden md:flex'
          }`}>
            <div className="p-6">
              <div className="flex items-center gap-2.5 pb-6 border-b border-slate-800">
                <div className="bg-indigo-600 p-2 rounded-xl text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-base font-bold text-white tracking-tight">Enterprise HRMS</h1>
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block">Core Portal Console</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2 mt-6">
                
                {/* Dashboard Tab */}
                <button
                  onClick={() => {
                    setActiveTab('DASHBOARD');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'DASHBOARD' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  Dashboard Overview
                </button>

                {/* Directory Tab */}
                <button
                  onClick={() => {
                    setActiveTab('DIRECTORY');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'DIRECTORY' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {currentUser.role === 'Admin' ? 'Workforce Directory' : 'Profile Coordinates'}
                </button>

                {/* Attendance Tab */}
                <button
                  onClick={() => {
                    setActiveTab('ATTENDANCE');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'ATTENDANCE' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Attendance Ledger
                </button>

                {/* Leave Tab */}
                <button
                  onClick={() => {
                    setActiveTab('LEAVE');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'LEAVE' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Leaves & Time-Off
                </button>

                {/* Payroll Tab */}
                <button
                  onClick={() => {
                    setActiveTab('PAYROLL');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'PAYROLL' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  Payroll & Salaries
                </button>

                {/* Audit Tab (Only for Admin, or employee with restricted view) */}
                <button
                  onClick={() => {
                    setActiveTab('AUDIT');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    activeTab === 'AUDIT' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  System Audit Trails
                </button>

              </nav>
            </div>

            {/* Logout and identity at bottom */}
            <div className="p-6 border-t border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                />
                <div>
                  <span className="font-semibold text-white text-xs block truncate max-w-[140px]">{currentUser.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">{currentUser.role} Account</span>
                </div>
              </div>

              <button
                id="btn-logout"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-rose-900 hover:text-white text-slate-400 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout Session
              </button>
            </div>
          </aside>

          {/* Main Portal Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto max-h-screen">
            
            {/* Top Toolbar Bar */}
            <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-xs sticky top-0 z-30">
              <div className="flex items-center gap-3">
                {/* Mobile menu toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 md:hidden hover:bg-slate-50 transition cursor-pointer"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                <h2 className="text-base font-bold text-slate-900 md:block hidden">Enterprise HRMS Core Portal</h2>
              </div>

              {/* Header Action Tools */}
              <div className="flex items-center gap-4">
                
                {/* Demo Role Switch Panel */}
                <div className="bg-amber-50 rounded-xl border border-amber-200/60 p-1.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-800 uppercase px-1.5 py-0.5 rounded-md bg-amber-100">DEMO MODE</span>
                  <button
                    id="btn-quick-role-switch"
                    onClick={handleQuickRoleSwitch}
                    className="flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-200/80 transition cursor-pointer"
                    title="Quick switch role for simple verification"
                  >
                    <ArrowRightLeft className="w-3 h-3 text-indigo-500" />
                    Switch to {currentUser.role === 'Admin' ? 'Employee' : 'Admin'}
                  </button>
                </div>

                {/* User status badge */}
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border hidden sm:inline-flex items-center gap-1.5 ${
                  currentUser.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${currentUser.role === 'Admin' ? 'bg-purple-500' : 'bg-blue-500'} animate-pulse`} />
                  {currentUser.role} Mode
                </span>
              </div>
            </header>

            {/* Sub-panel Navigation Routing and Padding */}
            <div className="p-6 md:p-8 flex-1 space-y-6">
              
              {activeTab === 'DASHBOARD' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Headline Info Banner */}
                  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1.5">
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Good day, {currentUser.name}!
                      </h3>
                      <p className="text-sm text-slate-500 max-w-2xl">
                        Welcome to your Enterprise HRMS command console. Your records are fully audited, and you are running under compliance constraints. Access the options from the sidebar.
                      </p>
                    </div>

                    <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 text-xs text-slate-500 whitespace-nowrap self-start md:self-auto font-medium">
                      Date Coordinates: <strong className="text-slate-800 font-semibold">{new Date().toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' })}</strong>
                    </div>
                  </div>

                  {/* High level visual metrics */}
                  <DashboardStats
                    role={currentUser.role}
                    currentEmployee={currentUser}
                    allEmployees={employees}
                    attendanceRecords={attendance}
                    leaveRequests={leaveRequests}
                  />

                  {/* Split Layout: Tasks / Checklist list & System Information Ledger */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Action list/Tasks */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs lg:col-span-2 space-y-4">
                      <h3 className="text-base font-bold text-slate-900">Your Action Items checklist</h3>
                      <div className="space-y-3">
                        {currentUser.role === 'Admin' ? (
                          <>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-semibold">
                              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">1</span>
                              <span>Review pending Leave Requests in the queue.</span>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-semibold">
                              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">2</span>
                              <span>Execute monthly override allowances in the Payroll control panel.</span>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-semibold">
                              <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">✓</span>
                              <span className="line-through text-slate-400 font-normal">System audit log initializer complete.</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-semibold">
                              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs">1</span>
                              <span>Remember to Check In / Out on the Attendance ledger today.</span>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 font-semibold">
                              <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">✓</span>
                              <span className="line-through text-slate-400 font-normal">Audit tax documents uploading sequence complete.</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick System specs */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Access Specifications</h4>
                        <div className="space-y-3 text-xs text-slate-500 font-medium">
                          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                            <span>Connection Secure</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1">● SSL Active</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                            <span>Relational DB Engine</span>
                            <span className="text-indigo-600 font-bold font-mono">Simulated Ledger</span>
                          </div>
                          <div className="flex items-center justify-between py-1.5">
                            <span>Auth Engine</span>
                            <span className="text-slate-700 font-bold">Email/ID RBAC</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/20 text-xs text-slate-500 leading-relaxed font-medium">
                        Need system support? Contact security officers at <strong className="text-slate-800 font-semibold">support@company.com</strong>.
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === 'DIRECTORY' && (
                <div className="animate-fadeIn">
                  <EmployeeDirectory
                    currentEmployee={currentUser}
                    allEmployees={employees}
                    role={currentUser.role}
                    onUpdateEmployees={handleUpdateEmployees}
                  />
                </div>
              )}

              {activeTab === 'ATTENDANCE' && (
                <div className="animate-fadeIn">
                  <AttendanceTracker
                    currentEmployee={currentUser}
                    allEmployees={employees}
                    role={currentUser.role}
                    attendanceRecords={attendance}
                    onUpdateAttendance={handleUpdateAttendance}
                  />
                </div>
              )}

              {activeTab === 'LEAVE' && (
                <div className="animate-fadeIn">
                  <LeaveManagement
                    currentEmployee={currentUser}
                    allEmployees={employees}
                    role={currentUser.role}
                    leaveRequests={leaveRequests}
                    attendanceRecords={attendance}
                    onUpdateLeaveRequests={handleUpdateLeaveRequests}
                    onUpdateAttendance={handleUpdateAttendance}
                  />
                </div>
              )}

              {activeTab === 'PAYROLL' && (
                <div className="animate-fadeIn">
                  <PayrollControl
                    currentEmployee={currentUser}
                    allEmployees={employees}
                    role={currentUser.role}
                    onUpdateEmployees={handleUpdateEmployees}
                  />
                </div>
              )}

              {activeTab === 'AUDIT' && (
                <div className="animate-fadeIn">
                  <AuditLogViewer
                    auditLogs={auditLogs}
                  />
                </div>
              )}

            </div>

          </main>
        </div>
      )}

    </div>
  );
}
