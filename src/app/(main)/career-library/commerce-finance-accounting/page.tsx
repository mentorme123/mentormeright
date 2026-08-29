export const metadata = {
  title: "Commerce, Finance & Accounting Careers | MentorMe Career Library",
  description: "Explore detailed career roadmaps for Commerce, Finance and Accounting careers in India.",
};

export default function CommerceFinanceAccountingLanding() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Commerce, Finance &amp; Accounting
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Commerce, Finance &amp; Accounting Careers
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Select a career from the sidebar to view detailed information about roles, subjects, degrees, colleges, skills, salary and future scope.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Choose a Career Path</h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Use the left sidebar to browse career roadmaps in Commerce, Finance &amp; Accounting.
          </p>
        </div>
      </section>
    </>
  );
}