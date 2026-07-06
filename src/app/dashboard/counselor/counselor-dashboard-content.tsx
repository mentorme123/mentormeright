"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  School,
  CalendarDays,
  FileText,
  User,
  Loader2,
  LogOut,
  ChevronRight,
  Search,
  ArrowLeft,
  Users,
  Building2,
  Video,
  Mail,
  ArrowRight
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

type School = {
  id: string;
  name: string;
  contact_email: string | null;
  created_at: string;
};

type Student = {
  id: string;
  name: string;
  email: string;
  education_level: string | null;
  created_at: string;
};

type Session = {
  id: string;
  users: { id: string; name: string; email: string; education_level: string };
  slots: { date: string; start_time: string };
  jitsi_link: string | null;
};

type MenuKey = "overview" | "schools" | "sessions" | "resources" | "profile";

type MenuItem = {
  key: MenuKey;
  label: string;
  icon: LucideIcon;
};

const menuItems: MenuItem[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "schools", label: "Schools & Students", icon: School },
  { key: "sessions", label: "Upcoming Sessions", icon: CalendarDays },
  { key: "resources", label: "Resources", icon: FileText },
  { key: "profile", label: "My Profile", icon: User },
];

const sanitizeText = (text: string | null) => {
  if (!text) return "";
  return String(text).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
};

const RESOURCE_LINKS = [
  { title: "Career Assessment Guide", description: "How to interpret psychometric reports", href: "https://docs.mentorme.example.com/assessment-guide" },
  { title: "Counselor Handbook", description: "Best practices for one-on-one sessions", href: "https://docs.mentorme.example.com/counselor-handbook" },
  { title: "Student Engagement", description: "Templates for parent communication", href: "https://docs.mentorme.example.com/parent-templates" },
  { title: "AI Learning Hub", description: "Integrate AI programs into your sessions", href: "https://docs.mentorme.example.com/ai-programs" },
  { title: "Placement Readiness", description: "Resume and interview preparation kits", href: "https://docs.mentorme.example.com/placement-kit" },
];

export default function CounselorDashboardContent({
  user,
}: {
  user: { id: string; email: string; user_metadata?: { full_name?: string } };
}) {
  const supabase = createClient();
  const [activeMenu, setActiveMenu] = useState<MenuKey>("schools");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [counselorName, setCounselorName] = useState(
    user.user_metadata?.full_name || user.email?.split("@")[0] || "Counselor"
  );
  const [counselorEmail, setCounselorEmail] = useState(user.email || "");

  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);
  const [selectedSchoolName, setSelectedSchoolName] = useState<string>("");

  const [loadingSchools, setLoadingSchools] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isJoining, setIsJoining] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  useEffect(() => {
    async function loadCounselorProfile() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setCounselorName(
          authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "Counselor"
        );
        setCounselorEmail(authUser.email || "");
      }
    }
    loadCounselorProfile();
  }, [supabase]);

  useEffect(() => {
    async function fetchSchools() {
      setLoadingSchools(true);
      try {
        const res = await fetch("/api/counsellor/schools");
        const data = await res.json();
        if (data.success) {
          setSchools(data.schools);
        }
      } catch (err) {
        console.error("Failed to load schools", err);
      } finally {
        setLoadingSchools(false);
      }
    }
    fetchSchools();
  }, []);

  useEffect(() => {
    async function fetchSessions() {
      setLoadingSessions(true);
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setLoadingSessions(false);
        return;
      }

      const { data: counsellor } = await supabase
        .from("counsellors")
        .select("id")
        .eq("user_id", authUser.id)
        .single();

      if (!counsellor) {
        setLoadingSessions(false);
        return;
      }

      const { data: bookings } = await supabase
        .from("bookings")
        .select(`
          *,
          users (
            id,
            name,
            email,
            education_level
          ),
          slots (
            date,
            start_time
          )
        `)
        .eq("counsellor_id", counsellor.id)
        .order("created_at", { ascending: false });

      setSessions(bookings || []);
      setLoadingSessions(false);
    }
    fetchSessions();
  }, [supabase]);

  const handleSchoolClick = async (schoolId: string, schoolName: string) => {
    setSelectedSchoolId(schoolId);
    setSelectedSchoolName(schoolName);
    setLoadingStudents(true);
    setStudents([]);

    try {
      const res = await fetch(`/api/counsellor/schools/${schoolId}/students`);
      const data = await res.json();
      if (data.success) {
        setStudents(data.students);
      }
    } catch (err) {
      console.error("Failed to load students", err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleBackToSchools = () => {
    setSelectedSchoolId(null);
    setSelectedSchoolName("");
    setStudents([]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleJoinVideo = async (jitsiUrl: string, sessionId: string) => {
    setIsJoining(sessionId);
    setTimeout(() => {
      window.open(jitsiUrl, "_blank");
      setIsJoining(null);
    }, 500);
  };

  const handleDownloadReport = async (userId: string, userName: string, sessionId: string) => {
    setIsDownloading(sessionId);
    const { data: assessment } = await supabase
      .from("assessment_results")
      .select("report")
      .eq("user_id", userId)
      .maybeSingle();

    if (!assessment || !assessment.report) {
      alert("No assessment report found for this student yet.");
      setIsDownloading(null);
      return;
    }

    const reportContent = JSON.stringify(assessment.report, null, 2);
    const blob = new Blob([reportContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${userName.replace(/\s+/g, "_")}_Career_Report.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloading(null);
  };

  const overviewStatCards = [
    { label: "Total Schools", value: schools.length.toString(), icon: Building2, color: "text-brand-blue bg-brand-blue/10" },
    { label: "Total Students", value: students.length > 0 ? students.length.toString() : "—", icon: Users, color: "text-emerald-600 bg-emerald-50" },
    { label: "Upcoming Sessions", value: sessions.length.toString(), icon: CalendarDays, color: "text-brand-orange bg-orange-50" },
    { label: "Today's Sessions", value: sessions.filter(s => s.slots?.date === new Date().toISOString().split("T")[0]).length.toString(), icon: Video, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex pt-20 pb-8">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-40 hidden md:flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Counselor</h2>
          <p className="text-xs text-slate-500 font-bold mt-1">Portal Workspace</p>
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
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} /> Home
              </button>
              <div>
                <div className="md:hidden">
                  <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Counselor</h1>
                  <p className="text-xs text-slate-500 font-bold">Portal Workspace</p>
                </div>
                <div className="hidden md:block">
                  <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{menuItems.find(m => m.key === activeMenu)?.label}</h1>
                  <p className="text-xs text-slate-500 font-medium">Manage schools, students and sessions</p>
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-auto">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl pl-1 pr-3 py-1 hover:border-brand-blue/40 transition-all shadow-sm w-full md:w-auto"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue text-white flex items-center justify-center font-bold text-sm">
                  {counselorName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-slate-700 truncate hidden sm:inline">Hi, {counselorName.split(" ")[0]}</span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 bg-slate-50">
                    <p className="font-bold text-slate-800 text-sm truncate">{counselorName}</p>
                    <p className="text-xs text-slate-500 truncate">{counselorEmail}</p>
                  </div>
                  <div className="p-2">
                    <Link href="/dashboard/counselor/profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-left">
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
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden grid grid-cols-2 gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveMenu(item.key)}
                  className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-sm font-bold border ${
                    isActive
                      ? "bg-brand-blue text-white border-brand-blue shadow-lg"
                      : "bg-white text-slate-600 border-slate-200"
                  }`}
                >
                  <Icon size={16} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview */}
          {activeMenu === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {overviewStatCards.map((card) => {
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
                  <Button onClick={() => setActiveMenu("schools")} className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl shadow-sm">
                    <School size={18} className="mr-2" /> View Schools
                  </Button>
                  <Button onClick={() => setActiveMenu("sessions")} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 rounded-xl shadow-sm">
                    <CalendarDays size={18} className="mr-2" /> Manage Sessions
                  </Button>
                  <Button onClick={() => setActiveMenu("resources")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-xl shadow-sm">
                    <FileText size={18} className="mr-2" /> Open Resources
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Schools & Students */}
          {activeMenu === "schools" && (
            <div className="space-y-6">
              {!selectedSchoolId ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-800">Schools Directory</h2>
                      <p className="text-sm text-slate-500 font-medium">Select a school to view assigned students</p>
                    </div>
                    <div className="relative w-full sm:w-72">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-slate-400" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search schools..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all shadow-sm bg-white"
                      />
                    </div>
                  </div>

                  {loadingSchools ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="animate-spin text-brand-blue" size={32} />
                    </div>
                  ) : schools.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                    <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                      <Building2 className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-500 font-medium text-lg">No schools found.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {schools
                        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((school) => (
                          <motion.div
                            key={school.id}
                            whileHover={{ y: -2 }}
                            onClick={() => handleSchoolClick(school.id, school.name)}
                            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                                <Building2 size={20} />
                              </div>
                              <ChevronRight size={18} className="text-slate-300 group-hover:text-brand-blue transition-colors" />
                            </div>
                            <h3 className="text-base font-black text-slate-800 mb-1 line-clamp-1">{sanitizeText(school.name)}</h3>
                            <p className="text-xs text-slate-500 font-medium truncate">{sanitizeText(school.contact_email) || "No contact email"}</p>
                            <p className="text-xs text-slate-400 mt-2 font-medium">Click to view students</p>
                          </motion.div>
                        ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={handleBackToSchools}
                      className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold px-4 py-2 rounded-xl"
                    >
                      <ArrowLeft size={18} className="mr-2" /> Back to Schools
                    </Button>
                    <div>
                      <h2 className="text-xl font-black text-slate-800">{sanitizeText(selectedSchoolName)}</h2>
                      <p className="text-sm text-slate-500 font-medium">Student roster</p>
                    </div>
                  </div>

                  {loadingStudents ? (
                    <div className="flex items-center justify-center py-20">
                      <Loader2 className="animate-spin text-brand-blue" size={32} />
                    </div>
                  ) : students.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                      <Users className="mx-auto text-slate-200 mb-4" size={48} />
                      <p className="text-slate-500 font-medium text-lg">No students found for this school.</p>
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                          <thead>
                            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-100">
                              <th className="px-6 py-4 font-bold">#</th>
                              <th className="px-6 py-4 font-bold">Name</th>
                              <th className="px-6 py-4 font-bold">Email</th>
                              <th className="px-6 py-4 font-bold">Grade</th>
                              <th className="px-6 py-4 font-bold">Joined</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {students.map((student, idx) => (
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
                                <td className="px-6 py-4 text-slate-500 text-sm font-medium">{sanitizeText(student.education_level) || "N/A"}</td>
                                <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                                  {new Date(student.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm font-bold text-slate-500">
                        Showing {students.length} students
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Upcoming Sessions */}
          {activeMenu === "sessions" && (
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-800">Upcoming Sessions</h2>
              {loadingSessions ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-brand-blue" size={32} />
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                  <User className="mx-auto text-slate-200 mb-4" size={48} />
                  <p className="text-slate-500 font-medium text-lg">You have no sessions booked yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0 font-black">
                          {session.users?.name?.charAt(0) || "S"}
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors">{session.users?.name || "Student"}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md text-xs font-bold">
                              <CalendarDays size={14} /> {session.slots?.date || "Upcoming"} at {session.slots?.start_time || "--:--"}
                            </span>
                            <span className="bg-slate-100 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider">Grade: {session.users?.education_level || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          onClick={() => handleDownloadReport(session.users.id, session.users.name, session.id)}
                          disabled={isDownloading === session.id}
                          className="flex-1 sm:flex-none border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-bold transition-all px-6 py-5 rounded-xl"
                        >
                          {isDownloading === session.id ? (
                            <><Loader2 size={16} className="mr-2 animate-spin" /> Fetching...</>
                          ) : (
                            <><FileText size={16} className="mr-2" /> Assessment</>
                          )}
                        </Button>
                        <Button
                          onClick={() => handleJoinVideo(session.jitsi_link || "", session.id)}
                          disabled={isJoining === session.id}
                          className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 px-6 py-5 rounded-xl"
                        >
                          {isJoining === session.id ? (
                            <><Loader2 size={16} className="mr-2 animate-spin" /> Joining...</>
                          ) : (
                            <><Video size={16} className="mr-2" /> Join Video</>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Resources */}
          {activeMenu === "resources" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">Counselor Resources</h2>
                <p className="text-sm text-slate-500 font-medium">Guides, templates and tools to support your sessions.</p>
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
                <p className="text-sm text-slate-500 font-medium">Manage your counselor account settings.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-800">{sanitizeText(counselorName)}</h3>
                    <p className="text-sm text-slate-500">{sanitizeText(counselorEmail)}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded uppercase tracking-wider">Counselor</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Name</p>
                    <p className="text-sm font-bold text-slate-700">{sanitizeText(counselorName) || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-sm font-bold text-slate-700">{sanitizeText(counselorEmail) || "N/A"}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Role</p>
                    <p className="text-sm font-bold text-slate-700">Counselor</p>
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





