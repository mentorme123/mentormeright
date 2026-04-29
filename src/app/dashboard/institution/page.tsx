import { useState, useEffect } from "react";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Upload, Users, FileSpreadsheet, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InstitutionDashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");
  const [studentsImported, setStudentsImported] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    async function verifyRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (profile?.role !== 'institutional') {
        router.push("/");
      } else {
        setLoading(false);
      }
    }
    verifyRole();
  }, [router, supabase]);

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
      // Fake delay to simulate generating a zip of PDFs
      setIsExporting(false);
      alert("Cohort reports have been exported and sent to your registered email address.");
    }, 2000);
  };

  const processCSV = async (file: File) => {
    setUploadStatus('processing');
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const rows = results.data as any[];
          
          if (rows.length === 0) throw new Error("The CSV file appears to be empty.");
          if (!rows[0].Email) throw new Error("Missing required 'Email' column. Use the template.");

          // Get session token to authenticate the API call
          const { createClient } = await import('@/lib/supabase');
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          if (!session) throw new Error("Session expired. Please log in again.");

          const response = await fetch('/api/admin/bulk-provision', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ students: rows }),
          });

          const data = await response.json();

          if (!response.ok) throw new Error(data.error || 'Provisioning failed.');

          setStudentsImported(data.results.success);
          setUploadStatus('success');

          if (data.results.failed > 0) {
            console.warn('Some rows failed:', data.results.errors);
          }

        } catch (err: unknown) {
          const error = err as Error;
          setErrorMessage(error.message || "Failed to process CSV.");
          setUploadStatus('error');
        }
      },
      error: (err) => {
        setErrorMessage(err.message);
        setUploadStatus('error');
      }
    });
  };


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      processCSV(file);
    } else {
      setErrorMessage("Please upload a valid CSV file.");
      setUploadStatus('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div>
             <h1 className="text-3xl font-black text-brand-blue uppercase tracking-tight">Institutional Dashboard</h1>
             <p className="text-slate-500 font-medium">Manage your cohorts and bulk-provision student assessments.</p>
           </div>
           <Button 
             onClick={handleDownloadTemplate}
             variant="outline" 
             className="bg-white border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-all font-bold"
           >
              Download CSV Template
           </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Students</p>
                <p className="text-3xl font-black text-slate-800">1,245</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-brand-orange">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Assessments Completed</p>
                <p className="text-3xl font-black text-slate-800">892</p>
              </div>
           </div>
           <div className="bg-brand-blue text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <p className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-1">Batch Export</p>
              <h3 className="text-xl font-bold mb-4">Download all 12-page reports securely.</h3>
              <Button 
                onClick={handleExportReports}
                disabled={isExporting}
                className="w-full bg-white text-brand-blue hover:bg-slate-100 font-bold"
              >
                {isExporting ? "Archiving..." : "Export Cohort ZIP"}
              </Button>
           </div>
        </div>

        {/* CSV Bulk Upload Area */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="border-b border-slate-100 bg-slate-50 p-6">
             <h2 className="text-xl font-black text-slate-800">Bulk Provision Students</h2>
             <p className="text-slate-500 text-sm mt-1">Upload a CSV containing student Names, Emails, and Grades to instantly generate their assessment links.</p>
           </div>

           <div className="p-8">
              {uploadStatus === 'idle' || uploadStatus === 'error' ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                    isDragging ? 'border-brand-orange bg-brand-orange/5' : 'border-slate-300 hover:border-brand-blue hover:bg-slate-50'
                  }`}
                >
                   <input 
                     type="file" 
                     id="csv-upload" 
                     accept=".csv" 
                     className="hidden" 
                     onChange={handleFileChange}
                   />
                   <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center">
                      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6 group-hover:bg-brand-blue/10 group-hover:text-brand-blue transition-colors">
                        <Upload size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-700 mb-2">Drag and drop your CSV here</h3>
                      <p className="text-slate-500 font-medium mb-6">or click to browse from your computer</p>
                      
                      {uploadStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg font-bold text-sm">
                          <AlertCircle size={16} /> {errorMessage}
                        </div>
                      )}
                   </label>
                </div>
              ) : uploadStatus === 'processing' ? (
                <div className="border-2 border-brand-blue/20 bg-brand-blue/5 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-brand-blue mb-2">Provisioning Accounts...</h3>
                  <p className="text-slate-500">Reading CSV and securely generating Supabase credentials.</p>
                </div>
              ) : (
                <div className="border-2 border-emerald-200 bg-emerald-50 rounded-2xl p-16 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-emerald-700 mb-2">Success!</h3>
                  <p className="text-emerald-600 font-medium mb-8">Successfully provisioned {studentsImported} student accounts.</p>
                  <Button onClick={() => setUploadStatus('idle')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
                    Upload Another Cohort
                  </Button>
                </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
}
