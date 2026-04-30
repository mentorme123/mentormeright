"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { 
  Users, 
  Upload, 
  Search, 
  Loader2, 
  Building2, 
  ShieldCheck, 
  BarChart3,
  Plus,
  FileSpreadsheet,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function InstitutionDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [students, setStudents] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Verify role
      const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single();
      if (profile?.role !== 'institutional' && profile?.role !== 'admin') {
        router.push("/dashboard/student");
        return;
      }

      setInstitution(user);

      // Fetch students linked to this institution
      const { data: studentsData } = await supabase
        .from('users')
        .select('*')
        .eq('institution_id', user.id)
        .eq('role', 'individual');
      
      if (studentsData) {
        setStudents(studentsData);
      } else {
        // Mock data for demo
        setStudents([
          { id: '1', full_name: 'Anjali Sharma', email: 'anjali@example.com', assessment_status: 'completed' },
          { id: '2', full_name: 'Vikram Singh', email: 'vikram@example.com', assessment_status: 'in_progress' },
          { id: '3', full_name: 'Karan Patel', email: 'karan@example.com', assessment_status: 'not_started' },
        ]);
      }
      setLoading(false);
    }
    loadData();
  }, [router, supabase]);

  const handleBulkImport = () => {
    setTimeout(() => {
      alert("CSV Import module initialized. Please select your file.");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-indigo" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/30 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Premium Institutional Header */}
        <div className="relative p-12 rounded-[40px] overflow-hidden bg-brand-slate text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="relative h-24 w-24 rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl bg-white/5 flex items-center justify-center">
                 <Building2 size={40} className="text-brand-indigo" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-black tracking-tight">Institutional Hub</h1>
                  <span className="px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald text-[10px] font-black uppercase tracking-widest border border-brand-emerald/30">Enterprise License</span>
                </div>
                <p className="text-blue-100/60 font-medium text-lg">Partner: <span className="text-white font-bold">{institution?.user_metadata?.institution_name || institution?.email}</span></p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleBulkImport} className="bg-brand-indigo hover:bg-brand-indigo/90 text-white font-black px-8 py-7 rounded-2xl shadow-xl transition-all hover:scale-105">
                 <Upload className="mr-2" size={20} /> Bulk Provision
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Enrolled Students", value: students.length, icon: <Users size={24} />, color: "text-brand-indigo bg-brand-indigo/5" },
            { label: "Tests Completed", value: students.filter(s => s.assessment_status === 'completed').length, icon: <ShieldCheck size={24} />, color: "text-emerald-600 bg-emerald-50" },
            { label: "Active Sessions", value: "12", icon: <BarChart3 size={24} />, color: "text-brand-gold bg-brand-gold/5" },
            { label: "Upcoming Bookings", value: "5", icon: <Plus size={24} />, color: "text-purple-600 bg-purple-50" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/20"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.color}`}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-brand-slate">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Student Management Table */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-xl shadow-slate-200/40">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              <h2 className="text-2xl font-black text-brand-slate flex items-center gap-3">
                 <FileSpreadsheet size={24} className="text-brand-indigo" /> Student Management
              </h2>
              <div className="relative w-full md:w-96">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search by name or email..." 
                   className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-50 focus:border-brand-indigo focus:outline-none transition-all font-medium"
                 />
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-50">
                       <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Name</th>
                       <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</th>
                       <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Assessment</th>
                       <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {students.map((student) => (
                       <tr key={student.id} className="group hover:bg-slate-50/50 transition-all">
                          <td className="py-6 font-bold text-brand-slate">{student.full_name}</td>
                          <td className="py-6 text-slate-500 font-medium">{student.email}</td>
                          <td className="py-6">
                             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               student.assessment_status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-gold/10 text-brand-gold'
                             }`}>
                                {student.assessment_status}
                             </span>
                          </td>
                          <td className="py-6">
                             <Button variant="ghost" className="text-brand-indigo font-bold hover:bg-brand-indigo/5 rounded-xl">
                                View Details <ArrowRight className="ml-2" size={14} />
                             </Button>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
}
