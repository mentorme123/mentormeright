"use client";

import { useState, useEffect, useCallback } from "react";
import * as XLSX from "xlsx";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  User,
  Loader2,
  LogOut,
  ChevronRight,
  Search,
  ArrowLeft,
  Mail,
  Upload,
  Download,
  CheckCircle2,
  Clock,
  UserPlus,
  X,
  AlertCircle,
  UserCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Student = {
  id: string;
  name: string;
  email: string;
  education_level: string | null;
  role: string;
  assessment_results: { id: string }[];
};

type MenuKey = "overview" | "students" | "profile";

type MenuItem = {
  key: MenuKey;
  label: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "students", label: "Students & Roster", icon: Users },
  { key: "profile", label: "My Profile", icon: User },
];

const sanitizeText = (text: string | null | undefined) => {
  if (!text) return "";
  return String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

export default function InstitutionDashboardContent() {
  const supabase = createClient();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("overview");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isProfileHidden, setIsProfileHidden] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [studentsImported, setStudentsImported] = useState(0);
  const [uploadResults, setUploadResults] = useState<Array<{ name?: string; email?: string; password?: string; status: string; error?: string }>>([]);
  const [institutionName, setInstitutionName] = useState("Global School System");

  const [institutionEmail, setInstitutionEmail] = useState("");

  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createGrade, setCreateGrade] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createSuccess, setCreateSuccess] = useState("");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const refreshStudents = useCallback(async (currentInstitutionName: string) => {
    try {
      const response = await fetch(`/api/institution/students?institution=${encodeURIComponent(currentInstitutionName)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result.students)) {
          setStudents(result.students);
        }
      } else {
        const text = await response.text();
        console.error('Failed to refresh students:', response.status, response.statusText, text);
      }
    } catch (err) {
      console.error("Failed to refresh students", err);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setInstitutionEmail(user.email || "");

      const { data: userProfile } = await supabase
        .from('users')
        .select('name, institution_name')
        .eq('id', user.id)
        .single();

      const currentInstitutionName = String(userProfile?.institution_name || "Global School System").trim();
      setInstitutionName(currentInstitutionName);

      await refreshStudents(currentInstitutionName);
      setLoading(false);
    }

    loadData();
  }, [supabase, router, refreshStudents]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('/api/institution/template');
      if (!response.ok) throw new Error('Failed to download template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const disposition = response.headers.get('Content-Disposition');
      const filenameMatch = disposition?.match(/filename="?([^"]+)"?/);
      link.setAttribute('download', filenameMatch?.[1] || 'student_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to download template');
      setUploadStatus('error');
    }
  };

  const handleDownloadCredentials = async () => {
    try {
      const response = await fetch(`/api/institution/credentials?institution=${encodeURIComponent(institutionName)}`);
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to download credentials');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const disposition = response.headers.get('Content-Disposition');
      const filenameMatch = disposition?.match(/filename="?([^"]+)"?/);
      link.setAttribute('download', filenameMatch?.[1] || 'credentials.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to download credentials');
      setUploadStatus('error');
    }
  };

  const processFile = async (file: File) => {
    setUploadStatus('processing');
    setUploadResults([]);
    try {
      let rows: Array<{ Name: string; Class?: string }> = [];
      if (file.name.toLowerCase().endsWith('.xlsx')) {
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { defval: '' }) as Array<Record<string, string>>;
        rows = json.map((r) => ({
          Name: String(r.Name || r.name || '').trim(),
          Class: String(r.Class || r.class || '').trim(),
        }));
      } else {
        await new Promise<void>((resolve, reject) => {
          Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const parsed = results.data as Array<{ Name?: string; name?: string; Class?: string; class?: string }>;
              rows = parsed.map((r) => ({
                Name: String(r.Name || r.name || '').trim(),
                Class: String(r.Class || r.class || '').trim(),
              }));
              resolve();
            },
            error: (err: Error) => reject(err),
          });
        });
      }
      if (rows.length === 0) throw new Error('The file is empty.');

      const response = await fetch('/api/bulk-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ students: rows, institutionName })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to provision accounts.');
      }

      const successResults = (data.results || []).filter((r: any) => r.status === 'success' || r.status === 'partial_success');
      const errorResults = (data.results || []).filter((r: any) => r.status === 'error');

      setUploadResults(successResults);
      setStudentsImported(successResults.length);
      setUploadStatus(successResults.length > 0 ? 'success' : 'error');

      if (successResults.length === 0 && errorResults.length > 0) {
        setErrorMessage(`All ${errorResults.length} students failed: ${errorResults[0].error}`);
      } else if (successResults.length > 0) {
        await refreshStudents(institutionName);
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "An error occurred");
      setUploadStatus('error');
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (createLoading) return;
    setCreateLoading(true);
    setCreateError("");
    setCreateSuccess("");
    try {
      const response = await fetch('/api/institution/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: createName, email: createEmail, grade: createGrade, institutionName })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create student');
      setCreateSuccess(`Student ${data.student.name} created successfully. Temporary password: MentorMe@123`);
      setCreateName("");
      setCreateEmail("");
      setCreateGrade("");
      await refreshStudents(institutionName);
      setTimeout(() => setCreateSuccess(""), 2000);
    } catch (err: unknown) {
      setCreateError(err instanceof Error ? err.message : "Failed to create student");
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredStudents = students.filter(s =>
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = students.filter(s => s.assessment_results && s.assessment_results.length > 0).length;

  const statCards = [
    { label: "Total Students", value: students.length.toString(), icon: Users, color: "text-brand-blue bg-brand-blue/10" },
    { label: "Tests Completed", value: completedCount.toString(), icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20 pb-8">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-40 hidden md:flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Institution</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">Command Center</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveMenu(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <LogOut size={14} />
            </div>
            <span>SIGN OUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 px-4 sm:px-8 w-full">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header with Profile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} /> Back to Home
              </button>
              <div>
                <div className="md:hidden">
                  <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Institution</h1>
                  <p className="text-xs text-slate-500 font-bold">Command Center</p>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{menuItems.find(m => m.key === activeMenu)?.label}</h1>
                  <p className="text-xs text-slate-500 font-medium">Manage your institution and cohort</p>
                </div>
              </div>
            </div>
            {!isProfileHidden && (
              <div className="relative w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-1 pr-3 py-1 hover:border-brand-blue/40 transition-all shadow-sm w-full md:w-auto"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                    {institutionName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate hidden sm:inline">Hi, {sanitizeText(institutionName)}</span>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                      <p className="font-bold text-slate-800 text-sm truncate">{sanitizeText(institutionName)}</p>
                      <p className="text-xs text-slate-500 truncate">{sanitizeText(institutionEmail)}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/dashboard/institution/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
                        <User size={18} className="text-brand-blue" />
                        <div>
                          <p className="text-sm font-bold text-slate-700">My Profile</p>
                          <p className="text-xs text-slate-500">Account settings and more</p>
                        </div>
                        <ChevronRight size={16} className="ml-auto text-slate-400" />
                      </Link>
                    </div>
                    <div className="p-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-left border border-red-200"
                      >
                        <LogOut size={18} className="text-red-600" />
                        <span className="text-sm font-bold text-red-600">SIGN OUT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Overview */}
          {activeMenu === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
                        <p className="text-2xl font-black text-slate-800">{card.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-lg font-black text-slate-800 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button onClick={() => setActiveMenu("students")} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl shadow-sm">
                    <Users size={18} className="mr-2" /> View Students
                  </Button>
                  <Button onClick={() => setActiveMenu("students")} className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-5 rounded-xl shadow-sm">
                    <Upload size={18} className="mr-2" /> Upload Students
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Students & Roster */}
          {activeMenu === "students" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-800">{sanitizeText(institutionName)}</h2>
                  <p className="text-sm text-slate-500 font-medium">Student roster and management</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => setShowCreateStudent(true)}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-4 py-2 rounded-xl shadow-sm"
                  >
                    <UserPlus size={16} className="mr-2" /> Create Student
                  </Button>
                  <Button
                    onClick={handleDownloadCredentials}
                    variant="outline"
                    className="bg-white border border-slate-200 hover:border-brand-blue text-slate-700 font-bold px-4 py-2 rounded-xl"
                  >
                    <Download size={16} className="mr-2" /> Download Credentials
                  </Button>
                  <Button
                    onClick={handleDownloadTemplate}
                    variant="outline"
                    className="bg-white border border-slate-200 hover:border-brand-blue text-slate-700 font-bold px-4 py-2 rounded-xl"
                  >
                    <FileSpreadsheet size={16} className="mr-2" /> Template
                  </Button>
                  <Button
                    onClick={() => document.getElementById('csv-upload-institution')?.click()}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-4 py-2 rounded-xl shadow-sm"
                  >
                    <Upload size={16} className="mr-2" /> Upload File
                  </Button>
                  <input type="file" id="csv-upload-institution" accept=".csv,.xlsx" onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} className="hidden" />
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium">Template uses: Class 6, Class 7, Class 8, Class 9, Class 10, Class 11, Class 12</p>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none font-medium text-sm transition-all"
                  />
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-brand-blue" size={32} />
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                  <Users className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-500 font-medium text-lg">No students found.</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                          <th className="px-6 py-4 font-bold">#</th>
                          <th className="px-6 py-4 font-bold">Name</th>
                          <th className="px-6 py-4 font-bold">Email</th>
                          <th className="px-6 py-4 font-bold">Grade</th>
                          <th className="px-6 py-4 font-bold">Assessment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredStudents.map((student, idx) => {
                          const isCompleted = student.assessment_results && student.assessment_results.length > 0;
                          return (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 text-slate-500 font-mono text-sm">{idx + 1}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xs uppercase">
                                    {sanitizeText(student.name)?.charAt(0) || "S"}
                                  </div>
                                  <span className="font-bold text-slate-800 text-sm">{sanitizeText(student.name) || "N/A"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-sm font-medium">{sanitizeText(student.email)}</td>
                              <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-black uppercase tracking-wider">
                                  {sanitizeText(student.education_level) || "General"}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium">
                                {isCompleted ? (
                                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                                    <CheckCircle2 size={14} /> Complete
                                  </span>
                                ) : (
                                  <span className="text-amber-500 font-bold flex items-center gap-1">
                                    <Clock size={14} /> Pending
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedStudent(student)}
                                  className="text-brand-blue hover:text-brand-blue hover:bg-brand-blue/10 font-bold"
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm font-bold text-slate-500">
                    Showing {filteredStudents.length} students
                  </div>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={18} /> {studentsImported} students imported successfully. Credentials generated.
                </div>
              )}
              {uploadResults.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-sm font-black text-slate-800">Generated Credentials</h3>
                    <p className="text-xs text-slate-500 font-medium">Share these login details with students.</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                          <th className="px-4 py-3 font-bold">Name</th>
                          <th className="px-4 py-3 font-bold">Email</th>
                          <th className="px-4 py-3 font-bold">Password</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {uploadResults.map((result, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-4 py-3 text-sm font-bold text-slate-700">{result.name || '---'}</td>
                            <td className="px-4 py-3 text-sm text-slate-500">{result.email || '---'}</td>
                            <td className="px-4 py-3 text-sm font-mono text-slate-700">{result.password || '---'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <AlertCircle size={18} /> {errorMessage}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {activeMenu === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">My Profile</h2>
                <p className="text-sm text-slate-500 font-medium">Manage your institution account settings.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{sanitizeText(institutionName)}</h3>
                    <p className="text-sm text-slate-500">{sanitizeText(institutionEmail)}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded uppercase tracking-wider">Institutional</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</p>
                    <p className="text-sm font-bold text-slate-700">{sanitizeText(institutionName) || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-700">{sanitizeText(institutionEmail) || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Role</p>
                    <p className="text-sm font-bold text-slate-700">Institutional</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {showCreateStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">Create Student</h2>
                <p className="text-slate-500 text-sm mt-1">Manually add a student to your roster.</p>
              </div>
              <button onClick={() => setShowCreateStudent(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              {createError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm font-bold">{createError}</div>
              )}
              {createSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm font-bold">{createSuccess}</div>
              )}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Full Name *</label>
                <input type="text" required value={createName} onChange={(e) => setCreateName(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm" placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Email</label>
                <input type="email" required value={createEmail} onChange={(e) => setCreateEmail(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm" placeholder="rahul@example.com" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1 block">Grade / Level</label>
                <select value={createGrade} onChange={(e) => setCreateGrade(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none text-sm">
                  <option value="">Select Level</option>
                  <option value="School Student">School Student</option>
                  <option value="College/Undergraduate">College / Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Working Professional">Working Professional</option>
                </select>
              </div>
              <Button type="submit" disabled={createLoading} className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-6 rounded-xl shadow-lg">
                {createLoading ? <><Loader2 className="animate-spin mr-2" size={16} /> Creating...</> : "Create Student"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-white w-full max-w-lg h-full shadow-2xl p-6 sm:p-8 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">Student Profile</h2>
                <button onClick={() => setSelectedStudent(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{sanitizeText(selectedStudent.name) || "Unnamed Student"}</h3>
                    <p className="text-slate-500">{sanitizeText(selectedStudent.email)}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded uppercase tracking-wider">
                      Role: {sanitizeText(selectedStudent.role)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Student Details</h4>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Student ID</span>
                      <span className="font-mono text-slate-700">{selectedStudent.id.split('-')[0]}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Grade / Class</span>
                      <span className="font-medium text-slate-700">{sanitizeText(selectedStudent.education_level) || "Not provided"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Assessment Status</span>
                      <span className={`font-medium ${selectedStudent.assessment_results && selectedStudent.assessment_results.length > 0 ? 'text-emerald-600' : 'text-amber-500'}`}>
                        {selectedStudent.assessment_results && selectedStudent.assessment_results.length > 0 ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    className="w-full bg-[#1B3A6B] hover:bg-[#1B3A6B]/90 text-white font-bold shadow-sm"
                    onClick={() => {
                      window.open(`/report?userId=${encodeURIComponent(selectedStudent.id)}`, '_blank');
                    }}
                  >
                    View Student Career Dashboard
                  </Button>
                   <Button
                     className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-sm"
                     onClick={() => {
                       window.open(`/career-report?userId=${encodeURIComponent(selectedStudent.id)}`, '_blank');
                     }}
                   >
                     View Career Report
                   </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
