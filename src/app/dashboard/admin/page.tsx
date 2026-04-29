"use client";

import { useState } from "react";
import { Download, Users, Building2, UserCircle, Settings, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);

  const mockUsers = [
    { id: 1, name: "Syed Basim Ahmed", email: "syed@example.com", role: "Student", joined: "Oct 24, 2026" },
    { id: 2, name: "Zainab Imran", email: "zainab@example.com", role: "Student", joined: "Oct 23, 2026" },
    { id: 3, name: "Delhi Public School", email: "admin@dps.edu", role: "Institution", joined: "Oct 22, 2026" },
    { id: 4, name: "Counselor One", email: "counselor1@mentormeright.in", role: "Counselor", joined: "Oct 20, 2026" },
  ];

  const handleExportData = () => {
    setIsExporting(true);
    // Simulate database compilation
    setTimeout(() => {
      // Create a dummy CSV string
      const headers = "ID,Name,Email,Role,JoinedDate\n";
      const rows = mockUsers.map(u => `${u.id},${u.name},${u.email},${u.role},${u.joined}`).join("\n");
      const csvData = headers + rows;

      // Create a Blob and trigger download
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `MentorMe_System_Export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-black text-purple-700 uppercase tracking-tight flex items-center gap-2">
               <ShieldAlert size={28} /> System Admin
             </h1>
             <p className="text-slate-500 font-medium">Global overview and database management.</p>
           </div>
           <Button 
             onClick={handleExportData}
             disabled={isExporting}
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
                <p className="text-2xl font-black text-slate-800">14,245</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Institutions</p>
                <p className="text-2xl font-black text-slate-800">42</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <UserCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Counselors</p>
                <p className="text-2xl font-black text-slate-800">18</p>
              </div>
           </div>
           <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex items-center gap-4">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white relative z-10">
                <Settings size={24} />
              </div>
              <div className="relative z-10">
                <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">System Status</p>
                <p className="text-2xl font-black text-white">Healthy</p>
              </div>
           </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="border-b border-slate-100 bg-slate-50 p-6 flex justify-between items-center">
             <div>
               <h2 className="text-xl font-black text-slate-800">User Management</h2>
               <p className="text-slate-500 text-sm mt-1">View and manage all accounts across the platform.</p>
             </div>
             <input 
               type="text" 
               placeholder="Search by email..." 
               className="px-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-purple-500"
             />
           </div>

           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                   <th className="px-6 py-4 font-bold border-b border-slate-200">Name</th>
                   <th className="px-6 py-4 font-bold border-b border-slate-200">Email</th>
                   <th className="px-6 py-4 font-bold border-b border-slate-200">Role</th>
                   <th className="px-6 py-4 font-bold border-b border-slate-200">Joined</th>
                   <th className="px-6 py-4 font-bold border-b border-slate-200 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {mockUsers.map((user) => (
                   <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4 font-bold text-slate-800">{user.name}</td>
                     <td className="px-6 py-4 text-slate-500">{user.email}</td>
                     <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                         user.role === 'Student' ? 'bg-blue-100 text-blue-700' :
                         user.role === 'Institution' ? 'bg-orange-100 text-orange-700' :
                         'bg-emerald-100 text-emerald-700'
                       }`}>
                         {user.role}
                       </span>
                     </td>
                     <td className="px-6 py-4 text-slate-500 text-sm">{user.joined}</td>
                     <td className="px-6 py-4 text-right">
                       <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">Edit</Button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           <div className="p-4 border-t border-slate-100 bg-slate-50 text-center text-sm text-slate-500">
             Showing 4 of 14,305 users
           </div>
        </div>

      </div>
    </div>
  );
}
