"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, IndianRupee, GraduationCap, TrendingUp, ChevronLeft, ChevronRight, X, Star, BrainCircuit, Building2, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careersData, Career } from "@/lib/data/careers";
import { createClient } from "@/lib/supabase/client";

const STREAMS = ['All', 'Science', 'Commerce', 'Arts', 'Vocational', 'Any'];
const ITEMS_PER_PAGE = 24;

export default function CareerLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [userResults, setUserResults] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [activeTab, setActiveTab] = useState("overview");
  const [isSimulationLoading, setIsSimulationLoading] = useState(false);
  const [simulationMessage, setSimulationMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function fetchResults() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("assessment_results")
          .select("scores")
          .eq("user_id", user.id)
          .order("completed_at", { ascending: false })
          .limit(1)
          .single();
        if (data) setUserResults(data.scores);
      }
    }
    fetchResults();
  }, []);

  const handleSimulation = async () => {
    if (!selectedCareer) return;
    setIsSimulationLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `I want to know more about being a ${selectedCareer.title}. Act as a senior professional in this field and give me a brief 'Day in the life' summary and one tip to succeed. Keep it under 100 words.`
            }
          ]
        }),
      });
      const data = await response.json();
      setSimulationMessage(data.reply || data.text || "");
    } catch (_error) {
      alert("Failed to start simulation. Please try again.");
    } finally {
      setIsSimulationLoading(false);
    }
  };

  // Helper to calculate match score
  const getMatchScore = (careerRiasec: string[]) => {
    if (!userResults || !careerRiasec.length) return 0;
    let total = 0;
    careerRiasec.forEach(code => {
      total += userResults[code] || 0;
    });
    // Scale to percentage (Max possible score for 2 codes is 200, but we'll normalize)
    const score = Math.min(100, Math.round((total / (careerRiasec.length * 10)) * 100));
    return score;
  };

  // Extract unique categories based on selected stream
  const categories = useMemo(() => {
    let filtered = careersData;
    if (selectedStream !== "All") {
      filtered = careersData.filter(c => c.stream === selectedStream);
    }
    const uniqueCats = Array.from(new Set(filtered.map(c => c.category)));
    return ['All', ...uniqueCats.sort()];
  }, [selectedStream]);

  // Filter and paginate data
  const filteredCareers = useMemo(() => {
    return careersData.filter(career => {
      const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            career.skills_required.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStream = selectedStream === "All" || career.stream === selectedStream;
      const matchesCategory = selectedCategory === "All" || career.category === selectedCategory;
      return matchesSearch && matchesStream && matchesCategory;
    });
  }, [searchTerm, selectedStream, selectedCategory]);

  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);
  const currentCareers = filteredCareers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when filters change
  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight"
          >
            Explore <span className="text-brand-blue">1,000+</span> Careers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Discover your true potential. Browse detailed career roadmaps, salaries, and required skills to make an informed decision about your future.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Search */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Search Careers</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Data Scientist, Python..."
                value={searchTerm}
                onChange={(e) => handleFilterChange(setSearchTerm, e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
              />
            </div>
          </div>

          {/* Stream Filter */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Filter by Stream</h3>
            <div className="flex flex-col gap-2">
              {STREAMS.map(stream => (
                <button
                  key={stream}
                  onClick={() => {
                    handleFilterChange(setSelectedStream, stream);
                    handleFilterChange(setSelectedCategory, "All"); // Reset category when stream changes
                  }}
                  className={`text-left px-4 py-3 rounded-xl transition-all font-semibold ${
                    selectedStream === stream 
                      ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {stream}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-black text-slate-800 uppercase tracking-wider text-sm">Industry / Category</h3>
            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(setSelectedCategory, cat)}
                  className={`text-left px-4 py-2.5 rounded-xl transition-all text-sm font-semibold ${
                    selectedCategory === cat 
                      ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20" 
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="font-bold text-slate-600">Showing <span className="text-brand-blue">{filteredCareers.length}</span> careers</p>
            {filteredCareers.length > ITEMS_PER_PAGE && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg"
                >
                  <ChevronLeft size={18} />
                </Button>
                <span className="text-sm font-bold text-slate-500 px-2">Page {currentPage} of {totalPages}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </div>

          {filteredCareers.length === 0 ? (
            <div className="bg-white p-16 rounded-2xl border border-slate-100 text-center space-y-4 shadow-sm">
              <Briefcase className="mx-auto text-slate-300" size={64} />
              <h3 className="text-2xl font-black text-slate-800">No careers found</h3>
              <p className="text-slate-500">Try adjusting your search or filters to explore other paths.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedStream("All");
                  setSelectedCategory("All");
                }}
                className="bg-brand-blue text-white font-bold px-8 mt-4 hover:bg-brand-blue/90"
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {currentCareers.map(career => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={career.id} 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-brand-blue/5 transition-all group flex flex-col h-full"
                >
                  <div className="p-6 flex-1 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-wider text-brand-orange">{career.category}</span>
                        <h3 className="font-black text-xl text-slate-800 leading-tight group-hover:text-brand-blue transition-colors">
                          {career.title}
                        </h3>
                      </div>
                      {career.is_trending && (
                        <span className="bg-emerald-50 text-emerald-700 p-2 rounded-full" title="Trending Career">
                          <TrendingUp size={16} />
                        </span>
                      )}
                    </div>
                    
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                      {career.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      {userResults && career.riasec_codes.length > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="px-2 py-0.5 bg-brand-blue/10 text-brand-blue text-[10px] font-black rounded-full flex items-center gap-1">
                            <Star size={10} fill="currentColor" />
                            {getMatchScore(career.riasec_codes)}% Match
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-blue">
                          <IndianRupee size={14} />
                        </div>
                        {career.salary_range}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-orange">
                          <GraduationCap size={14} />
                        </div>
                        <span className="truncate">{career.stream} Stream</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <Button 
                      onClick={() => setSelectedCareer(career)}
                      className="w-full bg-white text-brand-blue border-2 border-brand-blue/20 hover:bg-brand-blue hover:text-white font-bold transition-all shadow-sm group-hover:border-brand-blue"
                    >
                      View Full Roadmap
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bottom Pagination */}
          {filteredCareers.length > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-center gap-2 mt-8 py-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="font-bold"
              >
                Previous
              </Button>
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={currentPage === pageNum ? "bg-brand-blue text-white font-bold" : "font-semibold text-slate-600"}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="font-bold"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Career Details Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedCareer(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-red-100 hover:text-red-600 text-slate-500 rounded-full transition-colors z-10"
              >
                <X size={24} />
              </button>
              
              <div className="p-8 md:p-12 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue font-black text-xs uppercase tracking-widest rounded-full">
                      {selectedCareer.stream}
                    </span>
                    <span className="px-3 py-1 bg-brand-orange/10 text-brand-orange font-black text-xs uppercase tracking-widest rounded-full">
                      {selectedCareer.category}
                    </span>
                    {selectedCareer.is_trending && (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black text-xs uppercase tracking-widest rounded-full flex items-center gap-1">
                        <TrendingUp size={12} /> High Demand
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                    {selectedCareer.title}
                  </h2>
                </div>

                {/* Phase Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-100 overflow-x-auto pb-1 no-scrollbar">
                  {[
                    { id: "overview", label: "Overview", icon: <Briefcase size={16} /> },
                    { id: "alignment", label: "Personal Fit", icon: <BrainCircuit size={16} />, phase: "P3" },
                    { id: "institutions", label: "Institutions", icon: <Building2 size={16} />, phase: "P5" },
                    { id: "simulation", label: "AI Simulator", icon: <MessageSquare size={16} />, phase: "P6" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (tab.id === "simulation" && !simulationMessage) handleSimulation();
                      }}
                      className={`flex items-center gap-2 px-4 py-3 font-bold text-sm transition-all border-b-2 whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-brand-blue text-brand-blue bg-brand-blue/5"
                          : "border-transparent text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {tab.icon}
                      {tab.label}
                      {tab.phase && (
                        <span className="text-[10px] bg-slate-100 px-1.5 rounded-md text-slate-500">{tab.phase}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[300px]">
                  {activeTab === "overview" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Average Salary</span>
                          <div className="flex items-center gap-3 text-xl font-black text-slate-800">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-blue">
                              <IndianRupee size={20} />
                            </div>
                            {selectedCareer.salary_range}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Growth Outlook</span>
                          <div className="flex items-center gap-3 text-xl font-black text-slate-800">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-orange">
                              <TrendingUp size={20} />
                            </div>
                            {selectedCareer.growth_outlook} Growth
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-800">Role & Responsibilities</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                          {selectedCareer.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-800">Core Skills Required</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCareer.skills_required.map((skill, i) => (
                            <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg text-xs shadow-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "alignment" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-blue to-indigo-600 text-white shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-black">Personal Fit Analysis</h3>
                            <p className="text-indigo-100">Based on your RIASEC profile</p>
                          </div>
                          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-black border border-white/30">
                            {userResults ? `${getMatchScore(selectedCareer.riasec_codes)}%` : "N/A"}
                          </div>
                        </div>
                        
                        {!userResults ? (
                          <div className="text-center p-4 bg-white/10 rounded-2xl border border-white/20">
                            <p className="font-bold text-indigo-100 mb-4">Take the assessment to unlock your compatibility score!</p>
                            <a href="/career-assessment.html">
                              <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black">Take Assessment</Button>
                            </a>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                              <p className="font-medium text-sm leading-relaxed">
                                Your top traits match the core requirements of this role. Professionals in {selectedCareer.category} typically thrive with {selectedCareer.riasec_codes.join(' and ')} personalities.
                              </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {selectedCareer.riasec_codes.map(code => (
                                <div key={code} className="bg-white/20 p-3 rounded-xl text-center border border-white/10">
                                  <span className="block text-xs font-bold text-indigo-200">Required</span>
                                  <span className="text-lg font-black">{code}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl">
                        <h4 className="font-bold text-slate-700 mb-2">Why this is a {getMatchScore(selectedCareer.riasec_codes) > 80 ? "Great" : "Potential"} Fit:</h4>
                        <p className="text-slate-500 text-sm">
                          This career heavily utilizes {selectedCareer.skills_required[0]} and {selectedCareer.skills_required[1]}, which align with your natural inclination towards {selectedStream === 'Science' ? 'Logical' : 'Creative'} problem solving.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "institutions" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-800">Academic Roadmap</h3>
                        <div className="flex gap-4 items-start p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="mt-1 w-12 h-12 rounded-full bg-brand-orange/10 flex-shrink-0 flex items-center justify-center text-brand-orange border border-brand-orange/20">
                            <GraduationCap size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 mb-1">Recommended Degrees</p>
                            <p className="text-slate-600 text-sm leading-relaxed">
                              {selectedCareer.education_path}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                          Top Institutions <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold uppercase">Phase 5 Preview</span>
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { name: "IIT Hyderabad", loc: "India", type: "Premium" },
                            { name: "Stanford University", loc: "USA", type: "Global" },
                            { name: "National University of Singapore", loc: "Singapore", type: "Global" },
                            { name: "BITS Pilani", loc: "India", type: "Premium" }
                          ].map((inst, i) => (
                            <div key={i} className="p-4 border border-slate-100 rounded-xl hover:border-brand-blue/30 transition-colors group">
                              <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-brand-blue">{inst.type}</span>
                              <h4 className="font-bold text-slate-800">{inst.name}</h4>
                              <p className="text-xs text-slate-500">{inst.loc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "simulation" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Sparkles size={120} />
                        </div>
                        <div className="relative z-10 space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center text-white shadow-lg shadow-brand-orange/20">
                              <Sparkles size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-black">AI Career Simulator</h3>
                              <p className="text-slate-400 text-sm">Experience the role in real-time</p>
                            </div>
                          </div>

                          {isSimulationLoading ? (
                            <div className="py-12 flex flex-col items-center justify-center gap-4">
                              <div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                              <p className="text-slate-400 font-medium animate-pulse">Connecting to a {selectedCareer.title} professional...</p>
                            </div>
                          ) : simulationMessage ? (
                            <div className="space-y-6">
                              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl italic text-slate-300 text-lg leading-relaxed">
                                &quot;{simulationMessage}&quot;
                              </div>
                              <Button 
                                onClick={handleSimulation}
                                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black w-full py-6 rounded-xl"
                              >
                                Ask Another Question
                              </Button>
                            </div>
                          ) : (
                            <div className="py-12 text-center space-y-4">
                              <p className="text-slate-400">Click below to start a &quot;Day in the Life&quot; simulation with our AI expert.</p>
                              <Button 
                                onClick={handleSimulation}
                                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-black px-8 py-6 rounded-xl"
                              >
                                Start Simulation
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setActiveTab("institutions")}
                    className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white font-black py-8 rounded-2xl text-xl shadow-xl shadow-brand-orange/20 transition-transform hover:scale-105"
                  >
                    Find Institutions
                  </Button>
                  <a href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full py-8 rounded-2xl text-xl font-bold border-2 text-slate-700 hover:bg-slate-50">
                      Talk to a Counsellor
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
