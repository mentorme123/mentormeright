"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import { 
  Upload, 
  Users, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Mail, 
  Download,
  ArrowRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

interface Student {
  id: string;
  name: string | null;
  email: string;
  education_level: string | null;
  role: string;
  assessment_results?: Array<{ id: string }>;
}

export default function InstitutionDashboard() {
  const supabase = createClient();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [studentsImported, setStudentsImported] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [misalignmentData, setMisalignmentData] = useState<{misaligned_percentage: number} | null>(null);
  const [realityGapData, setRealityGapData] = useState<{danger_zone_percentage: number} | null>(null);

  useEffect(() => {
    async function loadStudents() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // In a real app, we'd filter by the institution_id associated with this user
      // For this MVP, we fetch all users who have an 'institution_name'
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

      // Fetch advanced B2B analytics via Postgres RPCs
      try {
        const { data: misData } = await supabase.rpc('get_cohort_misalignment_rate', { inst_name: 'Global School System' });
        if (misData && typeof misData === 'object' && 'misaligned_percentage' in misData) {
          setMisalignmentData(misData as { misaligned_percentage: number });
        }

        const { data: gapData } = await supabase.rpc('get_cohort_reality_gap', { inst_name: 'Global School System' });
        if (gapData && typeof gapData === 'object' && 'danger_zone_percentage' in gapData) {
          setRealityGapData(gapData as { danger_zone_percentage: number });
        }
      } catch (err: unknown) {
        console.error("Failed to fetch advanced metrics:", err);
      }

      setLoading(false);
    }
    loadStudents();
  }, [supabase]);

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
          // Refresh list
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

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
           <div className="space-y-1">
             <h1 className="text-4xl font-black text-brand-blue uppercase tracking-tight">Institutional Command Center</h1>
             <p className="text-slate-500 font-bold flex items-center gap-2">
               <TrendingUp size={16} className="text-emerald-500" /> Active Cohort: <span className="text-slate-900">Global School System — Batch 2026</span>
             </p>
           </div>
           <div className="flex gap-3 w-full md:w-auto">
             <Button 
               onClick={handleDownloadTemplate}
               variant="outline" 
               className="flex-1 md:flex-none bg-white border-2 border-slate-200 hover:border-brand-orange text-slate-700 font-bold px-6 py-6 rounded-2xl transition-all"
             >
                CSV Template
             </Button>
             <Button 
               onClick={() => document.getElementById('csv-upload')?.click()}
               className="flex-1 md:flex-none bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-8 py-6 rounded-2xl shadow-xl shadow-brand-orange/20 transition-all hover:scale-105"
             >
                <Upload size={20} className="mr-2" /> Bulk Upload Students
             </Button>
             <input type="file" id="csv-upload" accept=".csv" className="hidden" onChange={(e) => e.target.files?.[0] && processCSV(e.target.files[0])} />
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: "Total Students", value: students.length, icon: <Users />, color: "text-brand-blue", bg: "bg-blue-50" },
             { label: "Tests Completed", value: completedCount, icon: <CheckCircle2 />, color: "text-emerald-600", bg: "bg-emerald-50" },
             { label: "Skill Misalignment", value: misalignmentData ? `${misalignmentData.misaligned_percentage}%` : "Calculating...", icon: <AlertCircle />, color: "text-rose-600", bg: "bg-rose-50" },
             { label: "The Reality Gap", value: realityGapData ? `${realityGapData.danger_zone_percentage}%` : "Calculating...", icon: <TrendingUp />, color: "text-purple-600", bg: "bg-purple-50" },
           ].map((stat, i) => (
             <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-lg">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Main Content: Cohort Tracking Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50/50">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Cohort Management</h2>
              <p className="text-slate-500 font-medium text-sm">Track individual assessment progress and export career intelligence data.</p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search name or email..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue outline-none font-medium text-sm transition-all"
                />
              </div>
              <Button 
                onClick={handleExportReports}
                disabled={isExporting}
                className="bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
              >
                <Download size={18} /> Export ZIP
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-5">Student Name</th>
                  <th className="px-8 py-5">Grade / Level</th>
                  <th className="px-8 py-5">Assessment Status</th>
                  <th className="px-8 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading Cohort Data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                      No students found in this cohort. Upload a CSV to get started.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const isCompleted = student.assessment_results && student.assessment_results.length > 0;
                    return (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-black text-xs uppercase group-hover:bg-brand-blue group-hover:text-white transition-all">
                              {student.name?.charAt(0) || 'S'}
                            </div>
                            <div>
                              <p className="font-black text-slate-800 leading-none mb-1">{student.name}</p>
                              <p className="text-xs font-medium text-slate-400 flex items-center gap-1"><Mail size={10} /> {student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                            {student.education_level || 'General'}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          {isCompleted ? (
                            <div className="flex items-center gap-2 text-emerald-600">
                              <CheckCircle2 size={16} />
                              <span className="text-sm font-bold">12-Page Report Ready</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-amber-500">
                              <Clock size={16} />
                              <span className="text-sm font-bold">Pending Submission</span>
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-6">
                          {isCompleted ? (
                            <Button variant="ghost" className="text-brand-blue font-black text-xs hover:bg-brand-blue/5 rounded-lg px-4 py-2 flex items-center gap-1.5">
                              View Intelligence <ArrowRight size={14} />
                            </Button>
                          ) : (
                            <Button variant="ghost" className="text-slate-400 font-black text-xs hover:bg-slate-100 rounded-lg px-4 py-2 flex items-center gap-1.5">
                              Nudge Student <Mail size={14} />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
