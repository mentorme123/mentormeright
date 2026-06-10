"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Download, Search, Users, GraduationCap, Building2, UserCircle, LogIn, Shield, X, FileSpreadsheet, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAllUsers } from "../actions";

type UserType = "all" | "individual" | "institutional" | "admin";

interface DBUser {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  gender: string | null;
  education_level: string | null;
  created_at: string;
}

const sanitizeText = (text: string | null | undefined) => {
  if (!text) return "—";
  return String(text).replace(/[<>&"']/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === "&" ? "&amp;" : c === '"' ? "&quot;" : "&#39;"
  );
};

function sanitizeCsv(value: string) {
  if (value.includes(",") || value.includes("\n") || /^[=+\-@]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function formatDateInput(date: string) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function getDateRange(from: string, to: string) {
  const f = from ? new Date(from) : new Date("1970-01-01");
  const t = to ? new Date(to + "T23:59:59") : new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `1970-01-01T00:00:00Z,${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}T23:59:59Z`;
}

function parseDateRange(range: string) {
  const [start, end] = range.split(",").map((v) => v.trim());
  return {
    from: start === "1970-01-01T00:00:00Z" ? "" : start.split("T")[0],
    to: end ? end.split("T")[0] : "",
  };
}

function fmt(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

function pickMeta(user: DBUser, audit: { email: string; loginAt: string; duration: string; ip: string } | null) {
  return {
    name: sanitizeText(user.name),
    email: sanitizeText(user.email),
    role: sanitizeText(user.role),
    phone: sanitizeText(user.phone),
    gender: sanitizeText(user.gender),
    educationLevel: sanitizeText(user.education_level),
    registeredDate: fmt(user.created_at),
    firstLogin: audit ? fmt(audit.loginAt) : "—",
    lastLogin: audit ? fmt(audit.loginAt) : "—",
    sessionCount: audit ? "1" : "0",
    sessionDuration: audit ? audit.duration : "—",
    ip: audit ? audit.ip : "—",
  };
}

const ROLES: { label: string; value: UserType; color: string; icon: any }[] = [
  { label: "Students", value: "individual", color: "blue", icon: GraduationCap },
  { label: "Institutions", value: "institutional", color: "orange", icon: Building2 },
  { label: "Admins", value: "admin", color: "purple", icon: Shield },
];

function roleBadge(role: string) {
  const base = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border";
  if (role === "individual")
    return (
      <span className={`${base} bg-blue-50 text-blue-700 border-blue-200`}>
        <GraduationCap size={11} /> Student
      </span>
    );
  if (role === "institutional")
    return (
      <span className={`${base} bg-orange-50 text-orange-700 border-orange-200`}>
        <Building2 size={11} /> Institution
      </span>
    );
  return (
    <span className={`${base} bg-purple-50 text-purple-700 border-purple-200`}>
      <Shield size={11} /> Admin
    </span>
  );
}

function ReportPageInner() {
  const searchParams = useSearchParams();
  const initialJson = searchParams.get("data");

  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserType>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const hydratedRef = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllUsers();
        setUsers(data || []);
      } catch (e) {
        console.error("Failed to load users:", e);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setRoleFilter("all");
    setDateFrom("");
    setDateTo("");
  }, []);

  const hasActiveFilters = searchTerm || roleFilter !== "all" || dateFrom || dateTo;

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (dateFrom && u.created_at < dateFrom) return false;
    if (dateTo) {
      const end = dateTo + "T23:59:59";
      if (u.created_at > end) return false;
    }
    const t = searchTerm.toLowerCase();
    if (!t) return true;
    return (
      (u.name && u.name.toLowerCase().includes(t)) ||
      (u.email && u.email.toLowerCase().includes(t)) ||
      (u.role && u.role.toLowerCase().includes(t))
    );
  });

  const stats = {
    all: users.length,
    individual: users.filter((u) => u.role === "individual").length,
    institutional: users.filter((u) => u.role === "institutional").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const cols = Object.keys(pickMeta(users[0], null));
      const header = cols.map((c) => c.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim()).join(",");
      const headerRow = header.replace(/,/g, ",") ? header.split(",").map((h) => sanitizeCsv(h.trim())).join(",") : sanitizeCsv(header);
      const rows = filtered.map((u) => {
        const meta = pickMeta(u, null);
        return header.split(",").map((k) =>
          sanitizeCsv(meta[k as keyof typeof meta]?.toString() || "")
        ).join(",");
      });
      const csv = [headerRow, ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `MentorMe_Student_Report_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsExporting(false);
    }, 1200);
  };

  const hasData = filtered.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* ─── Header ─── */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Student Report</h1>
              <p className="text-slate-500 text-xs font-medium">
                Showing{" "}
                <span className="font-bold text-slate-700">{filtered.length}</span> of{" "}
                <span className="font-bold text-slate-700">{users.length}</span> registered users
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                showFilters ? "bg-slate-800 border-slate-800 text-white" : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Search size={13} />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-brand-blue ml-0.5" />
              )}
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || loading || !hasData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold bg-[#2563eb] text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Exporting
                </>
              ) : (
                <><FileSpreadsheet size={13} /> Export CSV</>
              )}
            </button>
          </div>
        </div>

        {/* ─── Collapsible Filters ─── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Search</label>
                    <div className="relative">
                      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Name, email, or role…"
                        className="pl-8 pr-3 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Role</label>
                    <div className="flex">
                      {(["all", "individual", "institutional", "admin"] as UserType[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRoleFilter(r)}
                          className={`px-3 py-2.5 text-xs font-bold border transition-all whitespace-nowrap ${
                            roleFilter === r
                              ? "bg-slate-800 border-slate-800 text-white"
                              : r === "all"
                              ? "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                              : r === "individual"
                              ? "bg-white border-slate-200 text-blue-600 hover:bg-blue-50"
                              : r === "institutional"
                              ? "bg-white border-slate-200 text-orange-600 hover:bg-orange-50"
                              : "bg-white border-slate-200 text-purple-600 hover:bg-purple-50"
                          }`}
                        >
                          {r === "all" ? "All" : r === "individual" ? "Students" : r === "institutional" ? "Institutions" : "Admins"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Date From</label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Date To</label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                    >
                      <X size={13} /> Clear
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* ─── Stats Cards ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Students", value: stats.individual, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-600", icon: GraduationCap },
            { label: "Institutions", value: stats.institutional, color: "bg-orange-50 border-orange-200", iconColor: "text-orange-600", icon: Building2 },
            { label: "Admins", value: stats.admin, color: "bg-purple-50 border-purple-200", iconColor: "text-purple-600", icon: Shield },
            { label: "Total Users", value: stats.all, color: "bg-slate-100 border-slate-200", iconColor: "text-slate-700", icon: Users },
          ].map((s) => (
            <div key={s.label} className={`${s.color} border rounded-xl px-4 py-3.5 flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-lg bg-white flex items-center justify-center ${s.iconColor}`}>
                <s.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-black text-slate-800">{loading ? "…" : s.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Date Range Quick Select ─── */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { l: "Today", f: () => { const d = new Date(); return { from: fmt(d.toISOString()), to: fmt(d.toISOString()) }; }},
            { l: "This Week", f: () => { const now = new Date(); const start = new Date(now); start.setDate(now.getDate() - now.getDay()); return { from: fmt(start.toISOString()), to: fmt(now.toISOString()) }; }},
            { l: "Last 30 Days", f: () => { const now = new Date(); const prev = new Date(now); prev.setDate(now.getDate() - 30); return { from: fmt(prev.toISOString()), to: fmt(now.toISOString()) }; }},
            { l: "Last 90 Days", f: () => { const now = new Date(); const prev = new Date(now); prev.setDate(now.getDate() - 90); return { from: fmt(prev.toISOString()), to: fmt(now.toISOString()) }; }},
            { l: "This Year", f: () => { const now = new Date(); return { from: `${now.getFullYear()}-01-01`, to: fmt(now.toISOString()) }; }},
            { l: "All Time", f: () => ({ from: "", to: "" }) },
          ].map(({ l, f }) => {
            const { from, to } = f();
            const active = !dateFrom && !dateTo && l === "All Time" || dateFrom === from && dateTo === to;
            return (
              <button
                key={l}
                onClick={() => { setDateFrom(from); setDateTo(to); }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  active
                    ? "bg-slate-800 border-slate-800 text-white"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                {l}
              </button>
            );
          })}
        </div>

        {/* ─── Table ─── */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">NAME</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">EMAIL</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">ROLE</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">PHONE</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">EDUCATION</th>
                  <th className="px-4 py-3 text-[10px] font-black text-slate-400 uppercase tracking-wider">REGISTERED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                        className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full mx-auto mb-3"
                      />
                      <p className="text-xs font-bold text-slate-500">Loading user records…</p>
                    </td>
                  </tr>
                ) : !hasData ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <Users size={32} className="mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-bold text-slate-600">No users found</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {hasActiveFilters
                          ? "Try adjusting filters or search terms."
                          : "Register data will appear here once users sign up."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: Math.min(i * 0.02, 0.5) }}
                      className="hover:bg-slate-50 transition-colors border-b border-slate-100"
                    >
                      <td className="px-4 py-3.5">
                        <span className="text-[11px] font-mono text-slate-500 font-medium">
                          {u.id.slice(0, 8)}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                            <UserCircle size={14} />
                          </div>
                          <span className="text-xs font-bold text-slate-800">{sanitizeText(u.name)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">{sanitizeText(u.email)}</td>
                      <td className="px-4 py-3.5">{roleBadge(u.role)}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">{sanitizeText(u.phone)}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 font-medium">{sanitizeText(u.education_level)}</td>
                      <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">{fmt(u.created_at)}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ─── Footer Stats ─── */}
          {!loading && hasData && (
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-bold text-slate-500">
                Showing{" "}
                <span className="text-slate-700">{filtered.length}</span> of{" "}
                <span className="text-slate-700">{users.length.toLocaleString()}</span> records
                {roleFilter !== "all" && (
                  <>
                    {" "}
                    ·{" "}
                    <span className="text-slate-700">
                      {filtered.filter((u) => u.role === roleFilter).length.toLocaleString()}
                    </span>{" "}
                    {roleFilter === "individual" ? "Students" : roleFilter === "institutional" ? "Institutions" : "Admins"}
                  </>
                )}
                {dateFrom && (
                  <>
                    {" "}
                    · from <span className="text-slate-700">{dateFrom}</span>
                  </>
                )}
                {dateTo && (
                  <>
                    {" "}
                    · to <span className="text-slate-700">{dateTo}</span>
                  </>
                )}
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 border border-blue-100">
                  <GraduationCap size={11} /> {stats.individual} Students
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 rounded-full px-2.5 py-1 border border-orange-100">
                  <Building2 size={11} /> {stats.institutional} Institutions
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 bg-purple-50 rounded-full px-2.5 py-1 border border-purple-100">
                  <Shield size={11} /> {stats.admin} Admins
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
        </div>
      }
    >
      <ReportPageInner />
    </Suspense>
  );
}
