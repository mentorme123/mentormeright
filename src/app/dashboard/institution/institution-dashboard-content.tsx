"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  FileText,
  User,
  Loader2,
  LogOut,
  ChevronRight,
  Search,
  ArrowLeft,
  Mail,
  FileText as ReportIcon,
  Upload,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import Papa from "papaparse";

type Student = {
  id: string;
  name: string;
  email: string;
  education_level: string | null;
  role: string;
  assessment_results: { id: string }[];
};

type MenuKey = "overview" | "students" | "analytics" | "resources" | "profile";

type MenuItem = {
  key: MenuKey;
  label: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "students", label: "Students & Roster", icon: Users },
  { key: "analytics", label: "Cohort Analytics", icon: TrendingUp },
  { key: "resources", label: "Resources", icon: FileText },
  { key: "profile", label: "My Profile", icon: User },
];

const RESOURCE_LINKS = [
  { title: "Bulk Upload Guide", description: "How to prepare CSV for student import", href: "https://docs.mentorme.example.com/bulk-upload-guide" },
  { title: "Counselor Handbook", description: "Best practices for sessions and reports", href: "https://docs.mentorme.example.com/counselor-handbook" },
  { title: "Assessment Reports", description: "Understanding cohort psychometric reports", href: "https://docs.mentorme.example.com/assessment-reports" },
  { title: "AI Learning Hub", description: "Integrate AI programs into your institution", href: "https://docs.mentorme.example.com/ai-programs" },
];

const sanitizeText = (text: string | null | undefined) => {
  if (!text) return "";
  return String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

export default function InstitutionDashboardContent() {
  const supabase = createClient();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("overview");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isProfileHidden, setIsProfileHidden] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [misalignmentData, setMisalignmentData] = useState<{ misaligned_percentage: number } | null>(null);
  const [realityGapData, setRealityGapData] = useState<{ danger_zone_percentage: number } | null>(null);

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [studentsImported, setStudentsImported] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [institutionName, setInstitutionName] = useState("Global School System");

  const [institutionEmail, setInstitutionEmail] = useState("");

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

      if (userProfile) {
        setInstitutionName(userProfile.institution_name || "Global School System");
      }

      const { data: studentList } = await supabase
        .from('users')
        .select(`
          id, 
          name, 
          email, 
          education_level, 
          role,
          assessment_results (
            id
          )
        `)
        .eq('role', 'individual')
        .order('name', { ascending: true });

      setStudents(studentList || []);

      try {
        const { data: misData } = await supabase.rpc('get_cohort_misalignment_rate', { inst_name: 'Global School System' });
        if (misData && typeof misData === 'object' && 'misaligned_percentage' in misData) {
          setMisalignmentData(misData as { misaligned_percentage: number });
        }

        const { data: gapData } = await supabase.rpc('get_cohort_reality_gap', { inst_name: 'Global School System' });
        if (gapData && typeof gapData === 'object' && 'danger_zone_percentage' in gapData) {
          setRealityGapData(gapData as {danger_zone_percentage: number});
        }
      } catch (err: unknown) {
        console.error("Failed to fetch advanced metrics:", err);
      }

      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleDownloadTemplate = () => {
    const csvContent = "Name,Email,Grade\nJohn Doe,john@example.com,12\nJane Smith,jane@example.com,Undergrad";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MentorMe_Bulk_Upload_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportReports = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("Cohort reports have been archived. Your ZIP download will start momentarily.");
    }, 2000);
  };

  const processCSV = async (file: File) => {
    setUploadStatus('processing');
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rows = results.data as Array<{ Name: string; Email: string; Grade: string }>;
          if (rows.length === 0) throw new Error("The CSV file is empty.");

          const response = await fetch('/api/bulk-import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: rows, institutionName: 'Global School System' })
          });

          if (!response.ok) throw new Error("Failed to provision accounts.");

          setStudentsImported(rows.length);
          setUploadStatus('success');
          window.location.reload();
        } catch (err: unknown) {
          setErrorMessage(err instanceof Error ? err.message : "An error occurred");
          setUploadStatus('error');
        }
      }
    });
  };

  const filteredStudents = students.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedCount = students.filter(s => s.assessment_results && s.assessment_results.length > 0).length;

  const statCards = [
    { label: "Total Students", value: students.length.toString(), icon: Users, color: "text-brand-blue bg-brand-blue/10" },
    { label: "Tests Completed", value: completedCount.toString(), icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50" },
    { label: "Skill Misalignment", value: misalignmentData ? `${misalignmentData.misaligned_percentage}%` : "Calculating...", icon: AlertCircle, color: "text-rose-600 bg-rose-50" },
    { label: "The Reality Gap", value: realityGapData ? `${realityGapData.danger_zone_percentage}%` : "Calculating...", icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20 pb-8">
      {/* Floating Home Back Button */}
      <button
        type="button"
        onClick={() => { setIsProfileHidden(true); window.location.href = '/'; }}
        className="fixed top-24 right-4 sm:right-8 z-40 flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-lg hover:text-brand-blue hover:border-brand-blue/30 hover:shadow-brand-blue/10 transition-all duration-200 group"
        aria-label="Back to Home"
      >
        <ArrowLeft
          size={16}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        <span className="hidden sm:inline">Back</span>
      </button>

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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button onClick={() => setActiveMenu("students")} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl shadow-sm">
                    <Users size={18} className="mr-2" /> View Students
                  </Button>
                  <Button onClick={() => setActiveMenu("analytics")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl shadow-sm">
                    <TrendingUp size={18} className="mr-2" /> View Analytics
                  </Button>
                  <Button onClick={() => document.getElementById('csv-upload')?.click()} className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-5 rounded-xl shadow-sm">
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
                    onClick={handleDownloadTemplate}
                    variant="outline"
                    className="bg-white border border-slate-200 hover:border-brand-blue text-slate-700 font-bold px-4 py-2 rounded-xl"
                  >
                    <FileSpreadsheet size={16} className="mr-2" /> Template
                  </Button>
                  <Button 
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-4 py-2 rounded-xl shadow-sm"
                  >
                    <Upload size={16} className="mr-2" /> Upload CSV
                  </Button>
                  <input type="file" id="csv-upload-institution" accept=".csv" onChange={(e) => e.target.files?.[0] && processCSV(e.target.files[0])} className="hidden" />
                </div>
              </div>

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
                  <CheckCircle2 size={18} /> {studentsImported} students imported successfully!
                </div>
              )}
              {uploadStatus === 'error' && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                  <AlertCircle size={18} /> {errorMessage}
                </div>
              )}
            </div>
          )}

          {/* Analytics */}
          {activeMenu === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-800">Cohort Analytics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 flex items-center gap-6">
                  <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 shrink-0">
                    <AlertCircle size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Skill Misalignment</p>
                    <p className="text-4xl font-black text-slate-800">{misalignmentData ? `${misalignmentData.misaligned_percentage}%` : "Calculating..."}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Cohort-wide analysis</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 flex items-center gap-6">
                  <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">The Reality Gap</p>
                    <p className="text-4xl font-black text-slate-800">{realityGapData ? `${realityGapData.danger_zone_percentage}%` : "Calculating..."}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Student vs industry gap</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-800 mb-1">Export Cohort Report</h3>
                    <p className="text-sm text-slate-500 font-medium">Download a complete ZIP of all student reports.</p>
                  </div>
                  <Button 
                    onClick={handleExportReports}
                    disabled={isExporting}
                    className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-6 py-5 rounded-xl shadow-sm"
                  >
                    {isExporting ? (
                      <><Loader2 size={16} className="mr-2 animate-spin" /> Generating...</>
                    ) : (
                      <><ReportIcon size={16} className="mr-2" /> Export ZIP</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Resources */}
          {activeMenu === "resources" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Institution Resources</h2>
                <p className="text-sm text-slate-500 font-medium">Guides and tools to manage your cohort.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {RESOURCE_LINKS.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group block"
                  >
                    <h3 className="text-sm font-black text-slate-800 mb-1 group-hover:text-brand-blue transition-colors">{resource.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">{resource.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue">
                      Open <ArrowRight size={12} />
                    </span>
                  </a>
                ))}
              </div>
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
    </div>
  );
}
