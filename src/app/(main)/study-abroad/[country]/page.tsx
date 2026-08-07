"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, GraduationCap, Building2, MapPin, DollarSign, Clock, Send } from "lucide-react";
import Link from "next/link";
import { destinations } from "@/lib/data/study-abroad";
import { Button } from "@/components/ui/button";

export default function DestinationDetail() {
  const { country } = useParams();
  const router = useRouter();
  const destination = destinations.find(d => d.id === country);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-black text-slate-800">Destination Not Found</h1>
          <Link href="/study-abroad" className="text-brand-blue font-bold flex items-center justify-center gap-2">
            <ArrowLeft size={18} /> Back to Hub
          </Link>
        </div>
      </div>
    );
  }

  const handleApply = (uniName: string) => {
    const message = encodeURIComponent(`I am interested in applying to ${uniName} in ${destination.name}. Please guide me through the admission and visa process.`);
    router.push(`/contact?interest=study-abroad&university=${encodeURIComponent(uniName)}&country=${destination.name}&message=${message}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl px-4">
        {/* Back Link */}
        <Link href="/study-abroad" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-blue font-bold mb-8 transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all">
            <ArrowLeft size={16} />
          </div>
          Back to Hub
        </Link>

        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="text-brand-orange font-black uppercase tracking-widest text-sm">Study in</span>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 mt-2">{destination.name}</h1>
            </div>
            <p className="text-xl text-slate-500 leading-relaxed">{destination.description}</p>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-2">
                  <CheckCircle size={20} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Visa Type</p>
                <p className="text-lg font-black text-slate-800">{destination.visa_type}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange mb-2">
                  <Clock size={20} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Stay Back Options</p>
                <p className="text-lg font-black text-slate-800">{destination.post_study_work}</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-2">
                  <DollarSign size={20} />
                </div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Living Cost</p>
                <p className="text-lg font-black text-slate-800">{destination.avg_cost_living}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[400px] lg:h-full rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img src={destination.image} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent"></div>
          </motion.div>
        </div>

        {/* Universities List */}
        <div className="space-y-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 flex items-center justify-center lg:justify-start gap-3">
              <GraduationCap className="text-brand-blue" size={32} /> Top Recommended Universities
            </h2>
            <p className="text-slate-500 mt-2">High acceptance rates for MentorMe students and world-class recognition.</p>
          </div>

          <div className="grid gap-6">
            {destination.universities.map((uni, i) => (
              <motion.div
                key={uni.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-blue/5 transition-all group flex flex-col lg:flex-row items-center gap-8"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-brand-blue group-hover:text-white transition-all shrink-0">
                  <Building2 size={40} />
                </div>
                
                <div className="flex-1 space-y-4 text-center lg:text-left w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 group-hover:text-brand-blue transition-colors">{uni.name}</h3>
                      <p className="text-brand-orange font-bold flex items-center justify-center lg:justify-start gap-2 mt-1">
                        <MapPin size={14} /> {uni.location} • <span className="text-slate-500 font-medium">Rank {uni.ranking}</span>
                      </p>
                    </div>
                    <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Tuition</p>
                      <p className="text-lg font-black text-slate-700">{uni.avg_tuition}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {uni.popular_courses.map(course => (
                      <span key={course} className="px-4 py-2 bg-brand-blue/5 text-brand-blue text-xs font-black rounded-full border border-brand-blue/10">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => handleApply(uni.name)}
                  className="w-full lg:w-auto px-10 py-7 bg-brand-blue hover:bg-brand-blue/90 text-white font-black text-lg rounded-2xl shadow-lg shadow-brand-blue/20 transition-all hover:scale-105 flex items-center gap-3 shrink-0"
                >
                  Apply Now <Send size={20} />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Expert CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-12 bg-gradient-to-br from-[#001529] to-brand-blue rounded-[3rem] text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 blur-3xl rounded-full -mr-32 -mt-32"></div>
          <h2 className="text-4xl font-black text-white">Confused about the process?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">Our Study Abroad advisors provide a free 15-minute discovery call to evaluate your profile for {destination.name}.</p>
          <div className="flex justify-center gap-6">
            <Link href="/contact" className="px-10 py-5 bg-brand-orange text-white font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-all">
              Book Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
