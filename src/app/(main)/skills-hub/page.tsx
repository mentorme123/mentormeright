import Link from "next/link";
import { Button } from "@/components/ui/button";

const skillPrograms = {
  k12: [
    {
      slug: "critical-thinking-k12",
      title: "Critical Thinking & Problem Solving",
      tagline: "Think Better. Solve Faster. Lead Smarter.",
      shortDesc: "This program helps students develop structured thinking, logical reasoning, analytical skills, and problem-solving abilities through case studies, puzzles, and real-world challenges.",
      benefits: ["Improves analytical thinking", "Enhances academic performance", "Builds decision-making ability", "Encourages independent thinking"],
      modules: ["Understanding Problems", "Root Cause Analysis", "Logical Reasoning", "Creative Problem Solving", "Decision-Making Frameworks", "Real-Life Simulations"],
      learningOutcomes: "Students can evaluate situations logically, solve problems systematically, and make better decisions.",
      mentorMeAdvantage: ["Gamified learning", "Industry-inspired case studies", "Age-appropriate simulations"],
      keywords: ["Critical Thinking Course for Students", "Problem Solving Skills Training", "Future Skills for School Students"]
    },
    {
      slug: "public-speaking-k12",
      title: "Public Speaking",
      tagline: "Speak with Confidence. Influence with Impact.",
      shortDesc: "A practical program that helps students overcome stage fear, improve communication skills, and become confident speakers through presentations, storytelling, debates, and public speaking exercises.",
      benefits: ["Builds confidence", "Improves communication", "Develops leadership qualities", "Enhances presentation skills"],
      modules: ["Fundamentals of Public Speaking", "Voice and Body Language", "Storytelling Techniques", "Presentation Skills", "Debate and Persuasion", "Stage Performance"],
      learningOutcomes: "Students confidently communicate ideas in classrooms, competitions, and public forums.",
      mentorMeAdvantage: ["Extensive practice sessions", "Individual feedback", "Video-based assessments"],
      keywords: ["Public Speaking for Students", "Communication Skills Training", "Leadership Skills for School Students"]
    },
    {
      slug: "robotics-fundamentals-k12",
      title: "Robotics Fundamentals",
      tagline: "Learn by Building. Innovate through Robotics.",
      shortDesc: "An engaging robotics program where students learn robotics concepts, sensors, motors, automation, and problem-solving through hands-on projects and experiments.",
      benefits: ["Develops STEM skills", "Encourages innovation", "Improves technical aptitude", "Enhances teamwork"],
      modules: ["Introduction to Robotics", "Components of Robots", "Sensors and Motors", "Programming Basics", "Robot Design", "Robotics Project"],
      learningOutcomes: "Students build and program robots to solve real-world challenges.",
      mentorMeAdvantage: ["Hands-on learning", "Robotics kits included", "Project showcase opportunities"],
      keywords: ["Robotics Training for Schools", "STEM Education India", "Robotics Course for Students"]
    }
  ],
  college: [
    {
      slug: "data-analytics-college",
      title: "Data Analytics",
      tagline: "Transform Data into Decisions.",
      shortDesc: "Learn data analysis, visualization, reporting, and business insights using industry tools and real-world datasets. The program prepares students for careers in analytics, consulting, and business intelligence.",
      benefits: ["High-demand career skill", "Better employability", "Data-driven thinking", "Industry relevance"],
      modules: ["Data Analytics Fundamentals", "Data Cleaning", "Data Visualization", "Business Reporting", "Dashboard Development", "Analytics Projects"],
      learningOutcomes: "Students analyze business data and generate actionable insights.",
      mentorMeAdvantage: ["Industry datasets", "Capstone projects", "Placement-oriented curriculum"],
      keywords: ["Data Analytics Course Hyderabad", "Business Analytics Training", "Data Analytics Certification"]
    },
    {
      slug: "digital-marketing-college",
      title: "Digital Marketing",
      tagline: "Master the Skills Behind Modern Business Growth.",
      shortDesc: "A practical digital marketing course covering SEO, social media marketing, content marketing, paid advertising, and analytics to help students build career-ready marketing skills.",
      benefits: ["High-demand skill", "Freelancing opportunities", "Entrepreneurial applications", "Career readiness"],
      modules: ["Digital Marketing Overview", "Search Engine Optimization", "Social Media Marketing", "Content Marketing", "Google Ads", "Analytics and Reporting"],
      learningOutcomes: "Students execute and manage digital marketing campaigns effectively.",
      mentorMeAdvantage: ["Live projects", "Campaign simulations", "Industry mentors"],
      keywords: ["Digital Marketing Course India", "SEO Training", "Social Media Marketing Course"]
    },
    {
      slug: "financial-modelling-college",
      title: "Financial Modelling",
      tagline: "Build Business Decisions on Strong Financial Insights.",
      shortDesc: "Students learn to create financial models for valuation, budgeting, forecasting, and investment analysis using Excel and industry best practices.",
      benefits: ["Investment analysis skills", "Better finance careers", "Advanced Excel expertise", "Corporate readiness"],
      modules: ["Excel Fundamentals", "Financial Statements", "Forecasting Models", "Valuation Techniques", "Sensitivity Analysis", "Investment Cases"],
      learningOutcomes: "Students build professional financial models used by investment and finance professionals.",
      mentorMeAdvantage: ["Real company cases", "Finance expert faculty", "Industry-standard templates"],
      keywords: ["Financial Modelling Course India", "Investment Analysis Training", "Finance Skills Program"]
    }
  ],
  corporate: [
    {
      slug: "leadership-development-corporate",
      title: "Leadership Development",
      tagline: "Develop Leaders Who Deliver Results.",
      shortDesc: "A practical leadership program focused on developing strategic thinking, team leadership, communication, and decision-making capabilities required in today's dynamic workplace.",
      benefits: ["Stronger leadership capabilities", "Improved team performance", "Better decision-making", "Increased employee engagement"],
      modules: ["Leadership Fundamentals", "Emotional Intelligence", "Strategic Thinking", "Team Leadership", "Conflict Management", "Leading Change"],
      learningOutcomes: "Participants become more effective leaders capable of driving organizational performance.",
      mentorMeAdvantage: ["Leadership simulations", "Industry case studies", "Practical action plans"],
      keywords: ["Leadership Training India", "Management Development Program", "Leadership Skills Workshop"]
    },
    {
      slug: "project-management-corporate",
      title: "Project Management",
      tagline: "Plan Better. Execute Faster. Deliver Results.",
      shortDesc: "Learn project planning, scheduling, risk management, stakeholder management, and execution frameworks required to successfully manage projects.",
      benefits: ["Improved project success rates", "Better resource management", "Enhanced planning skills", "Reduced project risks"],
      modules: ["Project Fundamentals", "Planning and Scheduling", "Risk Management", "Stakeholder Management", "Project Monitoring", "Project Closure"],
      learningOutcomes: "Participants effectively manage projects from initiation to completion.",
      mentorMeAdvantage: ["Real project simulations", "Templates and toolkits", "Industry examples"],
      keywords: ["Project Management Training India", "PMP Foundation Program", "Project Leadership Skills"]
    },
    {
      slug: "financial-analysis-corporate",
      title: "Financial Analysis",
      tagline: "Convert Financial Data into Business Intelligence.",
      shortDesc: "Designed for managers and finance professionals, this program helps participants interpret financial statements, assess business performance, and make informed financial decisions.",
      benefits: ["Better business decisions", "Improved financial understanding", "Strong analytical skills", "Enhanced profitability focus"],
      modules: ["Financial Statements Analysis", "Ratio Analysis", "Cash Flow Analysis", "Budgeting", "Cost Control", "Business Performance Review"],
      learningOutcomes: "Participants confidently evaluate financial performance and support business decision-making.",
      mentorMeAdvantage: ["Real company financials", "Practical business cases", "Finance expert facilitators"],
      keywords: ["Financial Analysis Training", "Finance for Non-Finance Managers", "Business Finance Course"]
    }
  ]
};

export default function SkillsHubPage() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">21st Century Skills Hub</h1>
        <p className="text-lg text-muted-foreground mb-12">Future-ready programs for students, graduates, and professionals.</p>

        {/* K-12 Students */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 border-b pb-2">K-12 Students</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skillPrograms.k12.map((program, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {program.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-1">
                        <span className="text-brand-blue">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                  <ul className="text-xs text-slate-500 space-y-0.5">
                    {program.modules.map((m, j) => (
                      <li key={j}>• {m}</li>
                    ))}
                  </ul>
                </div>
                {program.learningOutcomes && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Learning Outcomes:</p>
                    <p className="text-xs text-slate-500">{program.learningOutcomes}</p>
                  </div>
                )}
                {program.mentorMeAdvantage && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-brand-blue uppercase">MentorMe Advantage:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.mentorMeAdvantage.map((a, j) => (
                        <li key={j}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* College Students */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-green-700 border-b pb-2">College Students</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skillPrograms.college.map((program, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {program.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-1">
                        <span className="text-brand-blue">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                  <ul className="text-xs text-slate-500 space-y-0.5">
                    {program.modules.map((m, j) => (
                      <li key={j}>• {m}</li>
                    ))}
                  </ul>
                </div>
                {program.learningOutcomes && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Learning Outcomes:</p>
                    <p className="text-xs text-slate-500">{program.learningOutcomes}</p>
                  </div>
                )}
                {program.mentorMeAdvantage && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-brand-blue uppercase">MentorMe Advantage:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.mentorMeAdvantage.map((a, j) => (
                        <li key={j}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Professionals */}
        <div className="space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-orange-700 border-b pb-2">Corporate Professionals</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skillPrograms.corporate.map((program, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 border hover:shadow-lg transition-all flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                <p className="text-brand-orange font-semibold text-sm mb-3">{program.tagline}</p>
                <p className="text-slate-600 text-sm mb-4 flex-1">{program.shortDesc}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Key Benefits:</p>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {program.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-1">
                        <span className="text-brand-blue">•</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-bold text-slate-700 uppercase">Course Modules:</p>
                  <ul className="text-xs text-slate-500 space-y-0.5">
                    {program.modules.map((m, j) => (
                      <li key={j}>• {m}</li>
                    ))}
                  </ul>
                </div>
                {program.learningOutcomes && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-slate-700 uppercase">Learning Outcomes:</p>
                    <p className="text-xs text-slate-500">{program.learningOutcomes}</p>
                  </div>
                )}
                {program.mentorMeAdvantage && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-brand-blue uppercase">MentorMe Advantage:</p>
                    <ul className="text-xs text-slate-500 space-y-0.5">
                      {program.mentorMeAdvantage.map((a, j) => (
                        <li key={j}>• {a}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={`/programs/${program.slug}`} className="mt-auto pt-4">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-sm">Learn More</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}