import { Button } from "@/components/ui/button";
import { Briefcase, Heart, Rocket, GraduationCap, Megaphone, PhoneCall, TrendingUp } from "lucide-react";

export default function CareersPage() {
  const openPositions = [
    {
      title: "Training and Placement Officer (TPO)",
      department: "Education & Training",
      location: "Hyderabad, India",
      type: "Full-Time",
      icon: <GraduationCap size={24} className="text-brand-blue" />
    },
    {
      title: "Business Developer (BD)",
      department: "Business Development",
      location: "Hyderabad, India / Remote",
      type: "Full-Time",
      icon: <Briefcase size={24} className="text-brand-orange" />
    },
    {
      title: "Sales Executive",
      department: "Sales",
      location: "Hyderabad, India",
      type: "Full-Time",
      icon: <TrendingUp size={24} className="text-emerald-600" />
    },
    {
      title: "Telecaller",
      department: "Customer Outreach",
      location: "Remote",
      type: "Full-Time / Part-Time",
      icon: <PhoneCall size={24} className="text-purple-600" />
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Hyderabad, India",
      type: "Full-Time",
      icon: <Megaphone size={24} className="text-brand-blue" />
    }
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-brand-blue/5 py-24 px-4 text-center">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold uppercase mb-4 tracking-wider">
            Join Our Team
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-blue tracking-tight leading-tight">
            Build the future of education with us.
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            At MentorMe, we&apos;re on a mission to empower the next generation of leaders. If you are passionate about technology, counseling, and shaping futures, you belong here.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 px-4">
        <div className="max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">Why MentorMe?</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We believe in fostering a culture of innovation, continuous learning, and absolute empathy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-brand-blue" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Rapid Growth</h3>
              <p className="text-slate-600">Join a fast-growing ed-tech startup where your ideas have immediate impact and your career accelerates.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="text-brand-orange" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
              <p className="text-slate-600">Every line of code you write and every student you counsel directly shapes someone&apos;s career trajectory.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Flexibility & Trust</h3>
              <p className="text-slate-600">We offer hybrid working models, flexible hours, and a culture built on mutual trust and high autonomy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Open Positions</h2>
          
          <div className="space-y-4">
            {openPositions.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                    {job.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm font-medium text-slate-500">
                      <span className="px-2 py-1 bg-slate-100 rounded-md">{job.department}</span>
                      <span className="px-2 py-1 bg-slate-100 rounded-md">{job.location}</span>
                      <span className="px-2 py-1 bg-slate-100 rounded-md">{job.type}</span>
                    </div>
                  </div>
                </div>
                <a href={`mailto:admin@mentormeright.in?subject=Application for ${job.title}&body=Hello MentorMe Team,%0D%0A%0D%0AI am writing to apply for the ${job.title} position.%0D%0A%0D%0APlease find my resume attached to this email.%0D%0A%0D%0AThank you,`}>
                  <Button className="w-full md:w-auto bg-brand-blue hover:bg-brand-blue/90 text-white font-bold px-8">
                    Apply Now
                  </Button>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-brand-orange/10 border border-brand-orange/20 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-brand-orange mb-3">Don&apos;t see a perfect fit?</h3>
            <p className="text-slate-700 mb-6">We&apos;re always on the lookout for exceptional talent. Send your resume and a brief introduction to our team.</p>
            <a href="mailto:admin@mentormeright.in?subject=General Career Inquiry&body=Hello MentorMe Team,%0D%0A%0D%0AI am interested in joining your team. Please find my resume attached.%0D%0A%0D%0AThank you,">
              <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold">
                Email Us Your Resume
              </Button>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
