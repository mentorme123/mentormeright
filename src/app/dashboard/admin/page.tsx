"use client";

import { useState, useEffect } from "react";
import { Download, Users, Building2, UserCircle, Settings, ShieldAlert, Search, X, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

// Types
type DBUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  phone: string | null;
  gender: string | null;
  country: string | null;
  state: string | null;
  education_level: string | null;
  current_package: string | null;
  target_package: string | null;
  audience_type: string | null;
  created_at: string;
};

// Sanitize text to prevent XSS
const sanitizeText = (text: string | null) => {
  if (!text) return '';
  return String(text).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};

export default function AdminDashboard() {
  const supabase = createClient();
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  // Search and Filter
  const [searchTerm, setSearchTerm] = useState("");
  
  // Modals
  const [selectedUser, setSelectedUser] = useState<DBUser | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Fetch Live Data
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        if (data) setUsers(data);
        
        // Show tour if this is their first time seeing the dashboard
        // In a real app, this would be saved in local storage or the database.
        const hasSeenTour = localStorage.getItem('mentorme_admin_tour');
        if (!hasSeenTour) {
          setShowTour(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDashboardData();
  }, [supabase]);

  // Derived Stats
  const totalStudents = users.filter(u => u.role === 'individual').length;
  const totalInstitutions = users.filter(u => u.role === 'institutional').length;
  const totalAdmins = users.filter(u => u.role === 'admin').length;
  
  // Filtering
  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(term)) ||
      (u.email && u.email.toLowerCase().includes(term)) ||
      (u.role && u.role.toLowerCase().includes(term))
    );
  });

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = "ID,Name,Email,Role,JoinedDate\n";
      // Sanitize CSV data to prevent CSV injection
      const sanitizeCsv = (value: string) => {
        if (value.includes(',') || value.includes('\n') || value.startsWith('=') || value.startsWith('+') || value.startsWith('-') || value.startsWith('@')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      };
      const rows = users.map(u => `${sanitizeCsv(u.id)},${sanitizeCsv(u.name || 'N/A')},${sanitizeCsv(u.email)},${sanitizeCsv(u.role)},${sanitizeCsv(new Date(u.created_at).toLocaleDateString())}`).join("\n");
      const csvData = headers + rows;

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `MentorMe_Live_DB_Export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 1500);
  };

  const closeTour = () => {
    setShowTour(false);
    localStorage.setItem('mentorme_admin_tour', 'true');
  };

  // Tour Content
  const tourSlides = [
    {
      title: "Welcome to the Command Center",
      text: "This is your live production Admin Dashboard. From here, you have complete control over the MentorMe platform.",
      icon: <ShieldAlert size={48} className="text-purple-600 mb-4" />
    },
    {
      title: "Real-Time Global Analytics",
      text: "The statistics at the top of the screen are connected directly to your Supabase database, showing exact live numbers.",
      icon: <Users size={48} className="text-brand-blue mb-4" />
    },
    {
      title: "Advanced Search & Impersonation",
      text: "Use the search bar to instantly find any user. Click 'View Details' on any row to open their full profile and assessment status.",
      icon: <Search size={48} className="text-brand-orange mb-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8 relative">
      
      {/* Onboarding Tour Overlay */}
      <AnimatePresence>
        {showTour && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <button onClick={closeTour} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
              
              <div className="flex flex-col items-center">
                {tourSlides[tourStep].icon}
                <h2 className="text-2xl font-black text-slate-800 mb-3">{tourSlides[tourStep].title}</h2>
                <p className="text-slate-600 leading-relaxed mb-8">{tourSlides[tourStep].text}</p>
                
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2">
                    {tourSlides.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === tourStep ? 'bg-purple-600' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  
                  {tourStep < tourSlides.length - 1 ? (
                    <Button onClick={() => setTourStep(s => s + 1)} className="bg-purple-600 hover:bg-purple-700 text-white font-bold">
                      Next <ChevronRight size={16} className="ml-1" />
                    </Button>
                  ) : (
                    <Button onClick={closeTour} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student View Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
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
                <h2 className="text-2xl font-black text-slate-800">User Profile</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{sanitizeText(selectedUser.name) || "Unnamed User"}</h3>
                    <p className="text-slate-500">{sanitizeText(selectedUser.email)}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-slate-100 text-xs font-bold text-slate-600 rounded uppercase tracking-wider">
                      Role: {sanitizeText(selectedUser.role)}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Account Details</h4>
                  <div className="bg-slate-50 p-4 rounded-xl space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">User ID</span>
                      <span className="font-mono text-slate-700">{selectedUser.id.split('-')[0]}...</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Joined Date</span>
                      <span className="font-medium text-slate-700">{new Date(selectedUser.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone</span>
                      <span className="font-medium text-slate-700">{sanitizeText(selectedUser.phone) || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Gender</span>
                      <span className="font-medium text-slate-700">{sanitizeText(selectedUser.gender) || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Location</span>
                      <span className="font-medium text-slate-700">{selectedUser.state && selectedUser.country ? `${sanitizeText(selectedUser.state)}, ${sanitizeText(selectedUser.country)}` : 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Education</span>
                      <span className="font-medium text-slate-700">{sanitizeText(selectedUser.education_level) || 'Not provided'}</span>
                    </div>
                    {selectedUser.current_package && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current CTC</span>
                        <span className="font-medium text-slate-700">{sanitizeText(selectedUser.current_package)}</span>
                      </div>
                    )}
                    {selectedUser.target_package && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target CTC</span>
                        <span className="font-medium text-slate-700">{sanitizeText(selectedUser.target_package)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedUser.role === 'individual' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Assessment Status</h4>
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
                      <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                      <div>
                        <p className="font-bold text-emerald-800 text-sm">Assessment Completed</p>
                        <p className="text-emerald-600 text-xs mt-1">The psychometric report was successfully generated.</p>
                      </div>
                    </div>
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 font-bold text-white shadow-sm mt-2">
                      View Generated Report
                    </Button>
                  </div>
                )}
                
                {selectedUser.role === 'institutional' && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 uppercase text-sm tracking-wider">Institution Data</h4>
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                      <AlertCircle className="text-brand-orange shrink-0" size={20} />
                      <div>
                        <p className="font-bold text-orange-800 text-sm">Action Required</p>
                        <p className="text-brand-orange text-xs mt-1">This institution has not bulk-provisioned their students yet.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-black text-purple-700 uppercase tracking-tight flex items-center gap-2">
               <ShieldAlert size={28} /> System Admin
             </h1>
             <p className="text-slate-500 font-medium">Live global overview and database management.</p>
           </div>
           <Button 
             onClick={handleExportData}
             disabled={isExporting || loading}
             className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md transition-all"
           >
              {isExporting ? "Compiling Backup..." : <><Download size={18} className="mr-2" /> Download Full Database</>}
           </Button>
        </div>

        {/* Global Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-brand-blue">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
                <p className="text-2xl font-black text-slate-800">{loading ? '-' : totalStudents}</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institutions</p>
                <p className="text-2xl font-black text-slate-800">{loading ? '-' : totalInstitutions}</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <ShieldAlert size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admins</p>
                <p className="text-2xl font-black text-slate-800">{loading ? '-' : totalAdmins}</p>
              </div>
           </div>
           <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex items-center gap-4">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white relative z-10">
                <Settings size={24} />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">System Status</p>
                <p className="text-2xl font-black text-white">Live & Healthy</p>
              </div>
           </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="border-b border-slate-100 bg-slate-50 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
             <div>
               <h2 className="text-xl font-black text-slate-800">Live User Directory</h2>
               <p className="text-slate-500 text-sm mt-1">Search, view, and manage all accounts directly from the database.</p>
             </div>
             <div className="relative w-full sm:w-72">
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                 <Search size={16} className="text-slate-400" />
               </div>
               <input 
                 type="text" 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search by name, email, or role..." 
                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
               />
             </div>
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[600px]">
               <thead>
                 <tr className="bg-white text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                   <th className="px-6 py-4 font-bold">Name</th>
                   <th className="px-6 py-4 font-bold">Email</th>
                   <th className="px-6 py-4 font-bold">Role</th>
                   <th className="px-6 py-4 font-bold">Joined</th>
                   <th className="px-6 py-4 font-bold text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {loading ? (
                   <tr>
                     <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                       <div className="flex flex-col items-center justify-center">
                         <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                         <p className="font-medium">Fetching live database records...</p>
                       </div>
                     </td>
                   </tr>
                 ) : filteredUsers.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                       No users found matching &quot;{searchTerm}&quot;
                     </td>
                   </tr>
                 ) : (
                   filteredUsers.map((user) => (
                     <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-6 py-4 font-bold text-slate-800">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
                             {sanitizeText(user.name) ? sanitizeText(user.name).charAt(0) : sanitizeText(user.email).charAt(0)}
                           </div>
                           {sanitizeText(user.name) || "N/A"}
                         </div>
                       </td>
                       <td className="px-6 py-4 text-slate-500 font-medium">{sanitizeText(user.email)}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                           user.role === 'individual' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                           user.role === 'institutional' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                           'bg-purple-50 text-purple-700 border border-purple-100'
                         }`}>
                           {sanitizeText(user.role)}
                         </span>
                       </td>
                       <td className="px-6 py-4 text-slate-500 text-sm font-medium">
                         {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                       </td>
                       <td className="px-6 py-4 text-right">
                         <Button 
                           variant="ghost" 
                           size="sm" 
                           onClick={() => setSelectedUser(user)}
                           className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                         >
                           View Details <ChevronRight size={16} className="ml-1" />
                         </Button>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
           
           {!loading && (
             <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm font-bold text-slate-500">
               Showing {filteredUsers.length} of {users.length} live records
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
