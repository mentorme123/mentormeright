"use client";

import { useMemo, useRef, useState } from "react";
import { CAREERAI_CAREERS, CareerAICareer } from "@/lib/data/careerai-lens";
import { Check, Copy, Printer, RotateCcw } from "lucide-react";

export default function CareerAILensClient() {
  const clusters = useMemo(() => Array.from(new Set(CAREERAI_CAREERS.map((c) => c.cluster))).sort(), []);
  const [cluster, setCluster] = useState("");
  const [career, setCareer] = useState("");
  const [result, setResult] = useState<CareerAICareer | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLElement>(null);
  const selectorRef = useRef<HTMLElement>(null);

  const careersInCluster = useMemo(
    () =>
      cluster
        ? CAREERAI_CAREERS.filter((c) => c.cluster === cluster).sort((a, b) => a.career.localeCompare(b.career))
        : [],
    [cluster]
  );

  const handleExplore = () => {
    const x = CAREERAI_CAREERS.find((c) => c.career === career && c.cluster === cluster);
    if (!x) return;
    setResult(x);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleAnother = () => {
    setResult(null);
    setCareer("");
    setTimeout(() => selectorRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `${result.career} × AI | MentorMe CareerAI Lens
Potential AI impact: ${result.level}
How the role may shift: ${result.shift}
AI may increasingly handle: ${result.ai}
Human edge: ${result.human}
Skills worth building: ${result.skills}
Start now: ${result.action}
www.mentormeright.com`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copy is not available in this browser.");
    }
  };

  return (
    <>
      <div className="h-[7px] w-full bg-gradient-to-r from-[#0D2545] via-[#00A6A6] to-[#F28C28]" />

      {/* Hero */}
      <section className="py-16 md:py-[68px] px-4 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[#F28C28] font-extrabold text-[13px] uppercase tracking-[0.12em]">
            MentorMe presents · CareerAI Lens
          </div>
          <h1 className="text-[clamp(42px,6vw,72px)] leading-[0.98] tracking-[-0.055em] mt-4 mb-5 mx-auto max-w-[900px] text-[#0D2545] font-black">
            Your career.<br />
            <span className="text-[#F28C28]">In the age of AI.</span>
          </h1>
          <p className="max-w-[720px] mx-auto text-[#64748B] text-lg leading-[1.65]">
            Select any career from MentorMe&apos;s 250-career universe and discover how AI could change the work, what may remain distinctly human, and what you can start building today.
          </p>
          <p className="mt-4 text-[13px] text-[#8793A3]">No login · Free access · Built for career exploration</p>
        </div>
      </section>

      {/* Selector */}
      <section ref={selectorRef} className="py-8 md:py-[34px] px-4 pb-16 md:pb-[72px] bg-white scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-[900px] mx-auto bg-white border border-[#E5EAF0] rounded-3xl shadow-[0_20px_55px_rgba(13,37,69,0.12)] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.11em] font-extrabold text-[#00A6A6] mb-3">Explore a career</p>
            <div className="grid md:grid-cols-2 gap-4 md:gap-[18px]">
              <div>
                <label htmlFor="careerai-cluster" className="block font-bold text-[#0D2545] text-sm mb-2">1. Choose a career cluster</label>
                <select
                  id="careerai-cluster"
                  value={cluster}
                  onChange={(e) => { setCluster(e.target.value); setCareer(""); }}
                  className="w-full h-14 border border-[#D9E1E9] rounded-[13px] bg-white px-4 text-[15px] text-[#17202A] outline-none focus:border-[#00A6A6] focus:shadow-[0_0_0_3px_rgba(0,166,166,0.10)]"
                >
                  <option value="">Select cluster</option>
                  {clusters.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="careerai-career" className="block font-bold text-[#0D2545] text-sm mb-2">2. Choose a career</label>
                <select
                  id="careerai-career"
                  value={career}
                  disabled={!cluster}
                  onChange={(e) => setCareer(e.target.value)}
                  className="w-full h-14 border border-[#D9E1E9] rounded-[13px] bg-white px-4 text-[15px] text-[#17202A] outline-none focus:border-[#00A6A6] focus:shadow-[0_0_0_3px_rgba(0,166,166,0.10)] disabled:opacity-50"
                >
                  <option value="">Select career</option>
                  {careersInCluster.map((c) => (
                    <option key={c.career} value={c.career}>{c.career}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleExplore}
              disabled={!career}
              className="w-full mt-5 h-[58px] rounded-[14px] bg-[#F28C28] text-white font-extrabold text-base shadow-[0_10px_24px_rgba(242,140,40,0.24)] hover:brightness-95 hover:-translate-y-px disabled:opacity-45 disabled:cursor-not-allowed disabled:transform-none transition-all"
            >
              See My AI Career Outlook →
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {result && (
        <section ref={resultRef} className="pb-16 md:pb-[80px] px-4 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <article className="max-w-[900px] mx-auto bg-white border border-[#E5EAF0] rounded-[26px] shadow-[0_20px_55px_rgba(13,37,69,0.12)] overflow-hidden">
              <div className="py-8 md:py-[34px] px-6 md:px-[34px] bg-gradient-to-br from-[#0D2545] to-[#173B68] text-white relative overflow-hidden">
                <div className="absolute -right-10 -top-16 w-[210px] h-[210px] rounded-full bg-[#F28C28]/15 pointer-events-none" />
                <p className="text-[#BDE8E8] uppercase tracking-[0.12em] text-xs font-extrabold">CareerAI Lens · MentorMe</p>
                <h2 className="text-3xl md:text-[36px] mt-2 mb-2 tracking-[-0.03em] font-black">{result.career}</h2>
                <p className="text-[#D8E5F2] text-sm">{result.cluster}</p>
                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <span className="bg-[#F28C28] text-white px-3 py-2 rounded-full text-[13px] font-extrabold">Potential AI impact: {result.level}</span>
                  <span className="border border-white/30 px-3 py-2 rounded-full text-[13px] font-bold">{result.outlook}</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-xl md:text-[22px] leading-[1.5] text-[#0D2545] font-bold border-l-4 border-[#F28C28] pl-4 mb-7">
                  {result.shift}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-[#E5EAF0] rounded-[17px] p-5 min-h-[155px] bg-white">
                    <p className="text-xs font-black text-[#F28C28] tracking-[0.1em]">01</p>
                    <h3 className="text-base text-[#0D2545] font-bold mt-2 mb-2">What AI may increasingly handle</h3>
                    <p className="text-sm leading-[1.6] text-[#64748B]">{result.ai}</p>
                  </div>
                  <div className="border border-[#D5F0F0] rounded-[17px] p-5 min-h-[155px] bg-[#F0FAFA]">
                    <p className="text-xs font-black text-[#F28C28] tracking-[0.1em]">02</p>
                    <h3 className="text-base text-[#0D2545] font-bold mt-2 mb-2">Where your human edge matters</h3>
                    <p className="text-sm leading-[1.6] text-[#64748B]">{result.human}</p>
                  </div>
                  <div className="border border-[#E5EAF0] rounded-[17px] p-5 min-h-[155px] bg-white">
                    <p className="text-xs font-black text-[#F28C28] tracking-[0.1em]">03</p>
                    <h3 className="text-base text-[#0D2545] font-bold mt-2 mb-2">Skills worth building</h3>
                    <p className="text-sm leading-[1.6] text-[#64748B]">{result.skills}</p>
                  </div>
                  <div className="border border-[#D5F0F0] rounded-[17px] p-5 min-h-[155px] bg-[#F0FAFA]">
                    <p className="text-xs font-black text-[#F28C28] tracking-[0.1em]">04</p>
                    <h3 className="text-base text-[#0D2545] font-bold mt-2 mb-2">The opportunity</h3>
                    <p className="text-sm leading-[1.6] text-[#64748B]">The strongest professionals are likely to be those who combine career-specific expertise with the ability to use AI thoughtfully, verify its output and turn it into better decisions.</p>
                  </div>
                </div>

                <div className="mt-4 bg-[#FFF8EF] border border-[#F8DFC0] rounded-[18px] p-5">
                  <p className="text-sm leading-relaxed text-[#17202A]">
                    <strong className="text-[#0D2545]">Start now:</strong> {result.action}
                  </p>
                </div>

                <div className="mt-6 p-6 md:p-7 rounded-[20px] bg-[#F5F8FB] text-center">
                  <h3 className="text-[#0D2545] text-xl md:text-[23px] font-black">
                    AI can show how a career may change.<br />But is it the right career for you?
                  </h3>
                  <p className="text-[#64748B] mt-2 mb-4 max-w-[650px] mx-auto leading-[1.55] text-sm">
                    Discover career pathways that fit your interests, strengths and individuality with MentorMe Career Intelligence.
                  </p>
                  <a
                    href="https://www.mentormeright.com/"
                    target="_blank"
                    rel="noopener"
                    className="inline-block no-underline bg-[#0D2545] text-white font-extrabold px-5 py-3.5 rounded-xl"
                  >
                    Discover My Best-Fit Careers →
                  </a>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <button
                    onClick={() => window.print()}
                    className="bg-white border border-[#E5EAF0] px-3.5 py-2.5 rounded-[10px] text-[#0D2545] font-bold text-sm inline-flex items-center gap-2 hover:bg-slate-50"
                  >
                    <Printer size={15} /> Print / Save
                  </button>
                  <button
                    onClick={handleCopy}
                    className="bg-white border border-[#E5EAF0] px-3.5 py-2.5 rounded-[10px] text-[#0D2545] font-bold text-sm inline-flex items-center gap-2 hover:bg-slate-50"
                  >
                    {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                    {copied ? "Copied ✓" : "Copy Career Insight"}
                  </button>
                  <button
                    onClick={handleAnother}
                    className="bg-white border border-[#E5EAF0] px-3.5 py-2.5 rounded-[10px] text-[#0D2545] font-bold text-sm inline-flex items-center gap-2 hover:bg-slate-50"
                  >
                    <RotateCcw size={15} /> Explore Another Career
                  </button>
                </div>

                <p className="text-xs text-[#8491A1] leading-[1.55] mt-5 text-center">
                  <strong>Important:</strong> CareerAI Lens is an educational career-exploration tool. AI adoption varies by employer, geography, regulation and time. The content describes potential directions, not a guarantee that particular tasks, jobs or career outcomes will change in a specific way.
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="py-16 md:py-[70px] bg-[#F7F9FB]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-[#0D2545] text-2xl md:text-[34px] font-black mb-8 md:mb-[35px]">
            Three clicks. A clearer view of the future.
          </h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-[18px]">
            <div className="bg-white border border-[#E5EAF0] rounded-[18px] p-6 text-center">
              <div className="w-[38px] h-[38px] mx-auto mb-3 rounded-full grid place-items-center bg-[#0D2545] text-white font-black">1</div>
              <h3 className="text-[#0D2545] font-bold mb-2">Choose</h3>
              <p className="text-[#64748B] text-sm leading-[1.55]">Select a career cluster and the career you want to explore.</p>
            </div>
            <div className="bg-white border border-[#E5EAF0] rounded-[18px] p-6 text-center">
              <div className="w-[38px] h-[38px] mx-auto mb-3 rounded-full grid place-items-center bg-[#0D2545] text-white font-black">2</div>
              <h3 className="text-[#0D2545] font-bold mb-2">See the shift</h3>
              <p className="text-[#64748B] text-sm leading-[1.55]">Understand what AI may automate, augment or make more valuable.</p>
            </div>
            <div className="bg-white border border-[#E5EAF0] rounded-[18px] p-6 text-center">
              <div className="w-[38px] h-[38px] mx-auto mb-3 rounded-full grid place-items-center bg-[#0D2545] text-white font-black">3</div>
              <h3 className="text-[#0D2545] font-bold mb-2">Prepare</h3>
              <p className="text-[#64748B] text-sm leading-[1.55]">See the human strengths and capabilities worth building for that career.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
