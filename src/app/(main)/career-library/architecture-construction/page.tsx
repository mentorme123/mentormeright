import Link from "next/link";
import { CheckCircle2, Brain, HelpCircle, Award, GraduationCap, UserCheck, TrendingUp, Briefcase, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Architecture & Construction | MentorMe Career Library",
  description: "Explore Architecture & Construction careers in India including Interior Design, Civil Engineering, Urban Planning, and Architecture. Learn about degrees, colleges, skills, salary and future scope.",
};

export default function ArchitectureConstructionCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Architecture, Construction &amp; Infrastructure
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Architecture &amp; Construction
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Interior Architecture is a creative and technical career focused on designing functional, safe and visually appealing interior spaces. Interior Architects combine elements of architecture, design, materials, technology and human behaviour to transform residential, commercial and public spaces.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            It can be an excellent career for students who enjoy creativity, drawing, design, architecture, technology and problem-solving.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Briefcase className="text-brand-blue shrink-0" />
              What Does an Interior Architect Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">An Interior Architect plans and designs the interior spaces of buildings, considering both aesthetics and functionality.</p>
            <p className="font-bold text-slate-800 text-base">Their work may include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Space planning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Interior layouts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Furniture planning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Lighting design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Material selection</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Colour schemes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> 3D modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Building interiors</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Design documentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Construction detailing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Sustainable design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Client presentations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Coordination with architects and contractors</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Interior Architects may work on homes and apartments, offices, hotels, restaurants, retail stores, hospitals, educational institutions, commercial buildings and public spaces. The profession combines creative design with technical understanding, requiring professionals to consider how people use and experience a space.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Interior Architect vs Interior Designer vs Architect
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">These careers are related but different.</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Interior Designer</span> primarily focuses on the interior appearance, functionality, furniture, materials, colours and décor of a space.</p>
              <p><span className="text-brand-blue font-bold">Interior Architect</span> has a stronger focus on space planning, interior architecture, functionality, materials, technical detailing and the relationship between the interior and the building.</p>
              <p><span className="text-brand-blue font-bold">Architect</span> designs buildings and is responsible for the broader architectural aspects of a structure, including its form, structure, spaces and relationship with the surrounding environment.</p>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Important: The title and scope of professional architectural practice in India are regulated under the Architects Act, 1972. Students should understand the distinction before choosing an architecture or interior-design qualification.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single compulsory school stream for every Interior Design or Interior Architecture programme.</p>
            <p className="font-bold text-slate-800 text-base">However, students interested in this career can consider:</p>
            <p className="font-bold text-slate-800 text-base">Science with Mathematics</p>
            <p className="text-slate-700 leading-relaxed text-base">This can be particularly useful if you want to pursue a more architecture- and technically-oriented pathway. Useful subjects include: Mathematics, Physics, Chemistry, Computer Science.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Commerce or Arts / Humanities</p>
            <p className="text-slate-700 leading-relaxed text-base">These streams can also be suitable for many interior-design programmes. Useful subjects may include: Fine Arts, Design, Psychology, Economics, Business Studies, English. The best stream depends on the specific degree and college you plan to apply to.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Interior Architecture?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Mathematics requirements depend on the course you choose. For a conventional B.Arch pathway, Mathematics in Class 12 is an important eligibility requirement under the applicable regulations. For many Interior Design / Interior Architecture / Design programmes, however, Mathematics may not be compulsory. Therefore, if you are considering Interior Architecture as a career, check the eligibility criteria of your target colleges before selecting your Class 11 subjects. If you enjoy Mathematics, keeping it can provide greater flexibility—particularly if you may later consider Architecture.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There are several possible educational pathways.</p>
            <p className="font-bold text-slate-800 text-base">Relevant programmes include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Bachelor of Interior Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Des. in Interior Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Des. in Interior Architecture</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Bachelor of Interior Architecture</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Arch. for students who want to pursue Architecture</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Diploma programmes in Interior Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other specialised design programmes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">The right choice depends on whether you want to focus primarily on interior design, interior architecture or professional architecture. A strong programme should include exposure to design fundamentals, space planning, architectural drawing, materials, furniture design, lighting, building services, 2D and 3D design, CAD, 3D modelling, building documentation, sustainable design, construction techniques and portfolio development.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Entrance requirements depend on the course and institution. For undergraduate design programmes, students may encounter: NID DAT, UCEED, University-specific entrance examinations, Institution-specific design aptitude tests, Merit-based admissions. For students choosing B.Arch., the admission pathway can involve: NATA – National Aptitude Test in Architecture, JEE Main Paper 2, depending on the institution. Students should always verify the latest eligibility and admission requirements before applying.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Interior Architecture and Interior Design in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single universally accepted ranking of the best Interior Design colleges in India. Students should look for institutions with strong design faculty, studio-based learning, industry exposure, practical projects, construction and material exposure, CAD and 3D software training, internships, portfolio development, professional practitioners as faculty and strong alumni network.</p>
            <p className="font-bold text-slate-800 text-base">Some well-known institutions relevant to design and architecture include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Institute of Design (NID)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT Bombay – IDC School of Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SPA Delhi</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> CEPT University</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Sir J.J. School of Art</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Srishti Manipal Institute of Art, Design and Technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Pearl Academy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> MIT Institute of Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other universities and specialised design institutions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Don&apos;t choose a college only because it has “Interior Design” in the course title. The quality of studio work, practical exposure, faculty and portfolio development can make a major difference.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Interior Architect Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The Interior Architect salary in India varies depending on qualification, experience, location, employer, specialisation and whether the professional works independently or with a design firm. Career progression may include: Junior Designer → Interior Designer / Interior Architect → Senior Designer → Design Lead → Design Director. Experienced professionals may also establish their own interior design studio or consultancy.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Because compensation varies significantly across employers and independent practices, students should evaluate the profession based on career growth, portfolio, skills and entrepreneurship opportunities, rather than relying on a single salary figure.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Interior Architecture?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Interior Architecture and Interior Design in India is linked to growth in residential, commercial, hospitality, retail, healthcare and workplace projects. Career opportunities exist in interior design studios, architecture firms, real-estate companies, construction companies, hospitality, retail, corporate workplaces, furniture companies, modular kitchen companies, real-estate development, exhibition and experiential design, freelancing and entrepreneurship.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Emerging areas include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Sustainable interiors</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Smart homes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Workplace design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Universal design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Accessible design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> 3D visualisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Virtual reality</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Parametric design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Computational design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AI-assisted design</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Technology is increasingly becoming part of the design workflow, making knowledge of CAD, 3D modelling, rendering and digital visualisation increasingly valuable.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become an Interior Architect
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Interior Architecture requires a combination of creative, technical and interpersonal skills.</p>
            <p className="font-bold text-slate-800 text-base">Design Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Space planning</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Colour theory</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Design principles</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Visualisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Furniture design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Material selection</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Lighting concepts</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Technical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AutoCAD</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> SketchUp</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> 3D modelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rendering</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Revit</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Adobe Creative Suite</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Technical drawing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Construction detailing</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Professional Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Client management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Presentation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Budget awareness</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Project management</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Teamwork</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Personal Qualities</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Observation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Spatial thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Practical thinking</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Ability to accept feedback</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Interior Architecture a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Interior Architecture could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Love designing spaces</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy drawing and visualisation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have a strong sense of aesthetics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like architecture and design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy working with materials and colours</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have good spatial awareness</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like solving practical problems</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy working with clients</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are comfortable combining creativity with technical work</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">It may not be suitable if you dislike revisions, deadlines, technical drawings, client feedback or managing practical constraints. And remember: being good at decorating a room is not the same as being an Interior Designer or Interior Architect. Professionals need to understand space, functionality, materials, construction, safety, technology and the needs of the people using the space.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Interior Architecture?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing a creative career should go beyond asking, “Am I artistic?”</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">Your interests, personality, strengths and skills can help you understand whether Interior Architecture, Interior Design, Architecture or another creative career is the right fit for you.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career pathways before choosing their subjects, degree or specialisation.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/assessment">
                <Button className="bg-white text-brand-blue hover:bg-slate-100 font-black px-8 py-6 text-lg rounded-2xl shadow-lg transition-all">Take MentorMe Career Intelligence Assessment</Button>
              </Link>
            </div>
            <p className="text-sm font-bold tracking-wider uppercase pt-4 text-white/80">MentorMe – Turning Passions into Professions.</p>
          </div>
        </div>
      </section>
    </>
  );
}