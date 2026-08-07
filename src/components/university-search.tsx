"use client";

import { useState } from "react";
import { Search, Landmark, Globe, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface University {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
}

export function UniversitySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      // Use HTTPS for security
      const res = await fetch(`https://universities.hipolabs.com/search?name=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.slice(0, 10)); // Limit to top 10 for UX
      if (data.length === 0) setError("No universities found for this search.");
    } catch {
      setError("Failed to fetch university data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Validate URL to prevent javascript: and other dangerous protocols
  const isValidUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-brand-blue/10 rounded-2xl text-brand-blue">
          <Landmark size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">University Discovery</h3>
          <p className="text-sm text-slate-500 font-medium">Search 10,000+ global institutions</p>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Stanford, IIT, Oxford..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none font-medium"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <Button 
          type="submit" 
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl h-10 w-10 p-0"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
        </Button>
      </form>

      {error && <p className="text-sm text-red-500 font-medium text-center py-4">{error}</p>}

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {results.map((uni, i) => (
          <div key={i} className="group p-4 rounded-2xl border border-slate-100 hover:border-brand-blue/30 hover:bg-slate-50 transition-all">
            <h4 className="font-bold text-slate-800 group-hover:text-brand-blue transition-colors line-clamp-1">{uni.name}</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Globe size={12} /> {uni.country}
              </span>
              {uni.web_pages[0] && isValidUrl(uni.web_pages[0]) ? (
                <a
                  href={uni.web_pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-brand-orange hover:underline"
                >
                  Visit Website
                </a>
              ) : (
                <span className="text-xs font-bold text-slate-400">No valid website</span>
              )}
            </div>
          </div>
        ))}

        {!loading && results.length === 0 && !error && (
          <div className="text-center py-12 text-slate-400">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search size={24} />
             </div>
             <p className="text-sm font-medium">Results will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
