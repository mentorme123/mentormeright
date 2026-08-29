import Link from "next/link";
import { CheckCircle2, Brain, HelpCircle, Award, GraduationCap, UserCheck, TrendingUp, Briefcase, Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Design & Creative | MentorMe Career Library",
  description: "Explore Design & Creative careers in India including Game Design, UI/UX, Graphic Design, and Animation. Learn about degrees, colleges, skills, salary and future scope.",
};

export default function DesignCreativeCareerPage() {
  return (
    <>
      <section className="bg-brand-blue text-white py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Design &amp; Creative
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Design &amp; Creative
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed pt-2">
            Game Design is an exciting career for students who love games, storytelling, creativity, technology and problem-solving. A Game Designer is responsible for designing how a game works — its rules, challenges, gameplay, characters, levels, objectives and overall player experience.
          </p>
          <p className="text-white/80 font-medium italic pt-1">
            As India&apos;s gaming and interactive entertainment industry continues to develop, opportunities are emerging across mobile games, PC and console games, casual gaming, esports, AR/VR and immersive experiences.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Briefcase className="text-brand-blue shrink-0" />
              What Does a Game Designer Do?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A Game Designer creates the concepts, rules and experiences that make a game enjoyable and engaging.</p>
            <p className="font-bold text-slate-800 text-base">Depending on the role, a Game Designer may work on:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game concepts and ideas</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game mechanics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Rules and objectives</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Character development</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Level design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Storytelling and narratives</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game progression</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Player experience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Difficulty and rewards</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> User engagement</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game balancing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Prototyping and testing</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Game Designers work closely with Game Artists, Game Developers, Programmers, Animators, Writers, Sound Designers and Producers to turn an idea into a playable game.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Game Designer vs Game Developer
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">These roles are related but different.</p>
            <div className="space-y-2 text-slate-700 text-base pl-2">
              <p><span className="text-brand-blue font-bold">Game Designer:</span> Decides how the game should work and what the player experiences.</p>
              <p><span className="text-brand-blue font-bold">Game Developer / Programmer:</span> Builds the technical systems and writes the code that makes the game function.</p>
              <p><span className="text-brand-blue font-bold">Game Artist:</span> Creates the visual elements such as characters, environments, objects and animations.</p>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">A person can develop skills across multiple areas, but understanding the difference is important when choosing a career path.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              What Subjects Should I Take After 10th?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single compulsory stream for becoming a Game Designer.</p>
            <p className="font-bold text-slate-800 text-base">Students can choose:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Science</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Commerce</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Arts / Humanities</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">The best choice depends on the area of Game Design you want to pursue. If you enjoy technology and programming, Science with Mathematics and Computer Science can provide a strong foundation. If you enjoy art and visual creativity, Arts / Humanities or a creative-design pathway can be suitable. If you enjoy storytelling and psychology, subjects such as English, Psychology, Sociology and related humanities subjects can be useful. The most important thing is to continue developing creativity, logical thinking, storytelling and digital skills.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <HelpCircle className="text-brand-blue shrink-0" />
              Is Maths Compulsory for Game Design?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">No. Mathematics is not compulsory for becoming a Game Designer.</p>
            <p className="text-slate-700 leading-relaxed text-base">However, Mathematics can be useful if you want to move towards game programming, game development, physics-based games, 3D game development, game engines or artificial intelligence for games. For a Game Designer focused primarily on gameplay, storytelling, level design and player experience, advanced mathematics is usually not essential.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Award className="text-brand-blue shrink-0" />
              Which Degree Should I Choose?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single mandatory degree for a Game Designer.</p>
            <p className="font-bold text-slate-800 text-base">Relevant undergraduate options include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Bachelor of Design (B.Des.)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. in Game Design / Game Development</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Sc. in Animation &amp; Game Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> B.Des. in Interaction / User Experience Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> BCA / B.Sc. Computer Science for technically oriented students</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Bachelor&apos;s degrees in Animation, Multimedia or Visual Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other design or creative-technology programmes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">When choosing a course, look beyond the title “Game Design.” A good programme should provide exposure to game design principles, game mechanics, level design, game engines, 2D/3D design, storytelling, prototyping, user experience, game testing, interactive media and portfolio development.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Can I Become a Game Designer Without a Degree?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Yes. Game Design is one of the careers where your portfolio can be extremely important. A student can begin developing games independently using tools such as Unity, Unreal Engine, Godot, GameMaker, Blender and other game-development and design tools. You can start by creating small games, prototypes or game concepts and gradually build a Game Design Portfolio.</p>
            <p className="font-bold text-slate-800 text-base pt-2">A portfolio could include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game concepts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game design documents</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Level designs</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Playable prototypes</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Character concepts</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Gameplay mechanics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> User-testing results</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Completed games</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">For an aspiring Game Designer, showing what you can create can be more powerful than simply listing a qualification.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <GraduationCap className="text-brand-blue shrink-0" />
              Which Entrance Exams Should I Take?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">There is no single national entrance examination specifically for Game Design. The entrance examination depends on the course and institution you choose.</p>
            <p className="font-bold text-slate-800 text-base">For design programmes, students may encounter:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> UCEED – Undergraduate Common Entrance Examination for Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> NID DAT</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> University-specific entrance examinations</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Institution-specific aptitude tests</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Merit-based admissions</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Students should check the latest eligibility and admission requirements of the institution they are applying to.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Building2 className="text-brand-blue shrink-0" />
              Best Colleges for Game Design in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Students should evaluate colleges based on curriculum, faculty, industry exposure, technology, internships and portfolio development, rather than simply choosing a college because it advertises a Game Design course.</p>
            <p className="font-bold text-slate-800 text-base">Institutions and universities offering relevant programmes in design, animation, gaming, visual communication or interactive media include:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> National Institute of Design (NID)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> IIT Bombay – IDC School of Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> MIT Institute of Design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Srishti Manipal Institute of Art, Design and Technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Whistling Woods International</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Pearl Academy</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Other universities and specialised institutes offering Game Design, Animation and Interactive Media programmes</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Always check the current programme structure and admission requirements before applying, because course names and offerings can change.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <DollarSign className="text-brand-blue shrink-0" />
              Game Designer Salary in India
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The Game Designer salary in India varies depending on experience, skills, employer, location, type of studio and specialisation. Career progression can include: Junior Game Designer → Game Designer → Senior Game Designer → Lead Game Designer → Game Director. Professionals can also move into related careers such as Game Producer, Level Designer, Narrative Designer, UX Designer, Game Developer, Game Programmer, Product Designer and Creative Director.</p>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Rather than focusing only on starting salary, students should consider portfolio quality, technical skills, industry experience and the type of games they have worked on.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingUp className="text-brand-blue shrink-0" />
              What Is the Future Scope of Game Design?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">The future scope of Game Design in India extends beyond traditional PC and console games.</p>
            <p className="font-bold text-slate-800 text-base">Career opportunities can emerge across:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Mobile gaming</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> PC gaming</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Console gaming</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Casual games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Hyper-casual games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Esports</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> AR/VR</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Extended Reality (XR)</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Metaverse and immersive experiences</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Educational games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Simulation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Serious games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Interactive storytelling</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">Game Design skills are also increasingly relevant to industries beyond entertainment, including education, training, healthcare, simulation and immersive learning.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Brain className="text-brand-blue shrink-0" />
              Skills Required to Become a Game Designer
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">A successful Game Designer needs a combination of creative, technical and analytical skills.</p>
            <p className="font-bold text-slate-800 text-base">Creative Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Storytelling</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Creativity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Character development</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> World-building</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game concept development</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Visual thinking</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Game Design Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game mechanics</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Level design</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game balancing</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Player psychology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> User experience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Prototyping</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game testing</div>
            </div>
            <p className="font-bold text-slate-800 text-base pt-2">Technical Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Game engines</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Basic programming</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> 2D/3D tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Version control</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Digital design tools</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Understanding of game development pipelines</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">You don&apos;t necessarily need to become an expert programmer to be a Game Designer, but understanding how games are built can make you a much stronger designer.</p>
            <p className="font-bold text-slate-800 text-base pt-2">Personal Skills</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Problem-solving</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Communication</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Collaboration</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Observation</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Patience</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Curiosity</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Attention to detail</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Willingness to experiment</div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <UserCheck className="text-brand-blue shrink-0" />
              Is Game Design a Good Career for You?
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">Game Design could be a good career choice if you:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-700 text-base pl-2">
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Love playing and analysing games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy creating stories and worlds</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like solving problems creatively</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Are interested in technology</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy understanding how people interact with games</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Like experimenting with new ideas</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Have strong imagination</div>
              <div className="flex items-center gap-2.5"><CheckCircle2 size={18} className="text-brand-blue shrink-0" /> Enjoy working in multidisciplinary teams</div>
            </div>
            <p className="text-slate-700 leading-relaxed text-base pt-2">But remember: loving video games does not automatically mean you will enjoy designing games. A Game Designer spends considerable time analysing gameplay, testing ideas, solving design problems, receiving feedback and making changes. If you enjoy creating and improving experiences—not just playing them—Game Design could be a strong career option.</p>
          </div>
          <div className="bg-brand-blue text-white p-8 md:p-12 rounded-3xl shadow-xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">Thinking About a Career in Game Design?</h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">Choosing a career should be based on more than your favourite hobby.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">Your interests, personality, strengths and skills can help you understand whether Game Design is the right career pathway for you.</p>
            <p className="text-white/90 text-base max-w-2xl mx-auto leading-relaxed">MentorMe&apos;s Career Assessment and Career Guidance can help students explore their strengths and discover suitable career options before choosing their subjects, degree or specialisation.</p>
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