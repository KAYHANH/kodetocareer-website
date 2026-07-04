'use client';

import { useState } from 'react';
import { 
  Search, BookOpen, Clock, Award, Shield, CheckCircle, 
  ArrowRight, Sparkles, Star, ChevronDown, CheckCircle2, 
  Building2, ArrowUpRight, GraduationCap, LayoutGrid 
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  'All', 
  'Software Engineering', 
  'Data & AI', 
  'Cloud', 
  'Digital Marketing', 
  'Design'
];

const COURSES = [
  {
    id: 1,
    title: 'MERN Stack Development + AI Integration',
    category: 'Software Engineering',
    duration: '6 Months',
    projects: '15+ Projects',
    salary: '₹4.5 - 12 LPA',
    level: 'Beginner to Advanced',
    rating: 4.9,
    reviews: 142,
    internship: 'Guaranteed Paid Internship',
    placement: '100% Placement Support',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'AI Agents'],
    difficulty: 'Beginner',
    tagline: 'Become a professional Full Stack Developer & AI Engineer with our production-grade MERN Stack course.',
    desc: 'Master full-stack web development and learn to build AI-powered features, chatbots, and automation workflows.',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-100'
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning Core',
    category: 'Data & AI',
    duration: '6 Months',
    projects: '20+ Projects',
    salary: '₹6.0 - 18 LPA',
    level: 'Intermediate',
    rating: 4.8,
    reviews: 98,
    internship: 'Guaranteed Research Internship',
    placement: '100% Placement Support',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn', 'SQL', 'NLP'],
    difficulty: 'Intermediate',
    tagline: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.',
    desc: 'Data Science and AI now sit at the center of every major industry. Companies are racing to hire people who can turn raw data into decisions — and that demand is only accelerating. This program is meticulously designed to take you from programming fundamentals to Generative AI and deployment.',
    color: 'from-rose-500/10 to-indigo-500/10 border-rose-100'
  },
  {
    id: 3,
    title: 'Graphic Design + UI/UX Product Design Systems',
    category: 'Design',
    duration: '4 Months',
    projects: '8+ Projects',
    salary: '₹4.0 - 10 LPA',
    level: 'Beginner to Advanced',
    rating: 4.9,
    reviews: 84,
    internship: 'Available (Client Sprints)',
    placement: 'Placement Auditing',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Wireframing', 'Prototyping', 'Design Systems'],
    difficulty: 'Beginner',
    tagline: 'Become a professional Brand Designer & UI/UX Specialist with our Figma & creative asset design course.',
    desc: 'Learn professional graphic design, typography, brand identity, wireframing, high-fidelity prototyping, and design systems.',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-100'
  },
  {
    id: 4,
    title: 'Data Analytics & Business Intelligence',
    category: 'Data & AI',
    duration: '4 Months',
    projects: '10+ Projects',
    salary: '₹4.0 - 9 LPA',
    level: 'Beginner',
    rating: 4.7,
    reviews: 110,
    internship: 'Available',
    placement: '100% Placement Support',
    skills: ['Excel', 'PowerBI', 'Tableau', 'SQL', 'Data Visualization'],
    difficulty: 'Beginner',
    tagline: 'Turn data into business decisions. Master industry-standard tools through a 4-month intensive program designed to prepare you for high-demand analytics careers.',
    desc: 'At KodeToCareer, we prepare you for high-demand analytics careers. No coding experience required. Master Microsoft Excel, SQL databases, Python analytics libraries, and Power BI dashboards through live, instructor-led sessions and hands-on case studies.',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-100'
  },
  {
    id: 5,
    title: 'Enterprise Java Full Stack Developer',
    category: 'Software Engineering',
    duration: '5 Months',
    projects: '15+ Projects',
    salary: '₹5.0 - 15 LPA',
    level: 'Advanced',
    rating: 4.8,
    reviews: 75,
    internship: 'Guaranteed Paid Internship',
    placement: '100% Placement Support',
    skills: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'PostgreSQL', 'Docker'],
    difficulty: 'Advanced',
    tagline: 'Master Java, Spring Boot, React, MySQL, REST APIs, Git, Docker, and Cloud Deployment through live classes and hands-on projects.',
    desc: 'Java powers millions of enterprise applications worldwide, from banking systems and e-commerce platforms to healthcare solutions and government services. Learning Java Full Stack Development opens doors to a versatile career where you can work on both server-side logic and user-facing interfaces.',
    color: 'from-cyan-500/10 to-blue-500/10 border-cyan-100'
  },
  {
    id: 6,
    title: 'DevOps Engineering & CI/CD Sprints',
    category: 'Cloud',
    duration: '5 Months',
    projects: '8+ Projects',
    salary: '₹5.5 - 14 LPA',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 62,
    internship: 'Guaranteed Cloud Internship',
    placement: '100% Placement Support',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Git', 'Linux'],
    difficulty: 'Intermediate',
    tagline: 'Become a professional DevOps & Cloud Engineer with our Terraform, Kubernetes, and AWS automation course.',
    desc: 'Learn infrastructure as code, container automation, configuration orchestration, and continuous deployment workflows.',
    color: 'from-purple-500/10 to-indigo-500/10 border-purple-100'
  },
  {
    id: 7,
    title: 'Digital Marketing with AI & Growth Hacking',
    category: 'Digital Marketing',
    duration: '3 Months',
    projects: '8+ Campaigns',
    salary: '₹3.5 - 8 LPA',
    level: 'Beginner',
    rating: 4.7,
    reviews: 58,
    internship: 'Available',
    placement: '100% Placement Support',
    skills: ['SEO', 'Google Ads', 'Meta Ads', 'Copywriting', 'Google Analytics'],
    difficulty: 'Beginner',
    tagline: 'Become a professional Growth Marketer & Digital AI Specialist with our campaign optimization course.',
    desc: 'Master user acquisition funnel optimization, search ranking metrics, copywriting, and paid advertising campaigns.',
    color: 'from-pink-500/10 to-rose-500/10 border-pink-100'
  },
  {
    id: 8,
    title: 'Python Programming & Automation',
    category: 'Software Engineering',
    duration: '4 Months',
    projects: '8+ Projects',
    salary: '₹4.0 - 10 LPA',
    level: 'Beginner to Intermediate',
    rating: 4.8,
    reviews: 73,
    internship: 'Available',
    placement: '100% Placement Support',
    skills: ['Python', 'Automation', 'Web Scraping', 'APIs', 'SQL', 'Django'],
    difficulty: 'Beginner',
    tagline: 'Become a professional Python & Automation Engineer with our scripting, web scraping, and Django course.',
    desc: 'Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.',
    color: 'from-teal-500/10 to-emerald-500/10 border-teal-100'
  },
  {
    id: 9,
    title: 'Graphic Designing + Videography / Video Editing',
    category: 'Design',
    duration: '4 Months',
    projects: '10+ Projects',
    salary: '₹4.0 - 8 LPA',
    level: 'Beginner to Intermediate',
    rating: 4.8,
    reviews: 65,
    internship: 'Available (Studio Projects)',
    placement: 'Placement Auditing',
    skills: ['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Video Editing', 'Color Grading'],
    difficulty: 'Beginner',
    tagline: 'Become a professional Video Editor & Content Designer with our Premiere Pro, After Effects, and design course.',
    desc: 'Learn professional graphic design, photography, cinematographic video capture, Premiere Pro editing, and After Effects motion graphics.',
    color: 'from-orange-500/10 to-amber-500/10 border-orange-100'
  }
];

const CAREER_OUTCOMES = [
  { role: "Full Stack Developer", avgSalary: "₹6.8 LPA", topRecruiters: "Google, Microsoft, Amazon" },
  { role: "Data Scientist", avgSalary: "₹9.2 LPA", topRecruiters: "Fractal, EY, Walmart" },
  { role: "DevOps Engineer", avgSalary: "₹8.4 LPA", topRecruiters: "Oracle, IBM, Capgemini" },
  { role: "UI/UX Designer", avgSalary: "₹5.5 LPA", topRecruiters: "Adobe, Framer, Paytm" }
];

const FAQ_ITEMS = [
  { q: "Is placement assistance guaranteed?", a: "We provide 100% placement support, meaning we audit your resume, arrange mock interviewer sessions with tech professionals, and coordinate directly with our 80+ partner hiring corporations. You will receive unlimited interview invites." },
  { q: "Are the internships paid?", a: "Yes, our guaranteed internships include monthly stipends ranging from ₹8,000 to ₹15,000, depending on the assigned partner client project." },
  { q: "What is the study format?", a: "We offer interactive live classes along with continuous online portal recordings. Mentors hold daily doubt-resolution calls." }
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-20">

        {/* ── 1. Hero & Search Section ── */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            ENGINEERING ACADEMY
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-slate-900 leading-tight">
            Find the Right <span className="gradient-text">Career Path</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed">
            Select a specialized course, complete live developer workshops, and transition directly into verified hiring placements.
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-lg mx-auto shadow-md rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, skills (e.g. React, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>

          {/* Popular tags */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-500 pt-2">
            <span>Popular:</span>
            {['React', 'Next.js', 'Python', 'Machine Learning', 'AWS', 'Figma'].map((t) => (
              <span
                key={t}
                onClick={() => setSearchQuery(t)}
                className="text-primary hover:underline cursor-pointer"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── 2. Category Filters ── */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-850 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── 3. Featured Courses Grid (Full 3 Columns) ── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2 leading-none">
              <LayoutGrid className="w-5 h-5 text-primary" /> Core Specializations
            </h2>
            <span className="text-xs text-slate-400 font-bold font-mono uppercase">{filteredCourses.length} Programs found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((c) => (
              <Link
                href={`/courses/${c.id}`}
                key={c.id}
                className="bg-white border border-slate-150 p-6 rounded-[24px] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all relative overflow-hidden group hover:border-primary/40 hover:-translate-y-1 duration-300"
              >
                {/* Decorative corner tag */}
                {c.id === 1 && (
                  <span className="absolute top-0 right-0 bg-[#FFB800] text-black text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider leading-none shadow-sm">
                    Best Choice
                  </span>
                )}
                
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider">{c.category}</span>
                    <span className="text-[10px] text-slate-400 font-bold font-mono">{c.duration}</span>
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-[11px] font-extrabold text-primary/95 mt-2.5 leading-snug">
                    {c.tagline}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-semibold">
                    {c.desc}
                  </p>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {c.skills.slice(0, 4).map((s) => (
                      <span key={s} className="bg-slate-100 border border-slate-200/50 text-[9px] text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                    {c.skills.length > 4 && (
                      <span className="text-[9px] text-slate-400 font-semibold align-middle px-1">+ {c.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-slate-400 uppercase font-bold tracking-wider leading-none">Salary Target</span>
                    <span className="text-sm font-extrabold text-slate-800 block mt-1 font-mono leading-none">{c.salary}</span>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="bg-white border border-slate-150 p-8 rounded-[24px] text-center text-slate-400">
              No specializations found matching your search.
            </div>
          )}
        </section>

        {/* ── 4. Career Outcomes & Recruits ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Placement Outcomes</h2>
            <p className="text-slate-500 font-medium">Average starting packages and hiring destinations for our program tracks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAREER_OUTCOMES.map((o, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded uppercase">{o.role}</span>
                  <span className="text-xl font-heading font-black text-primary block mt-3 font-mono leading-none">{o.avgSalary}</span>
                  <span className="text-[9px] text-slate-400 font-bold block mt-1">Average Annual Salary</span>
                </div>
                <div className="border-t border-slate-100 pt-3 mt-4 text-[9px] text-slate-500 font-semibold leading-relaxed">
                  <span className="text-slate-400 block font-bold uppercase tracking-wider mb-1">Top Hirers:</span>
                  {o.topRecruiters}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. FAQs ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Got questions about our specialization programs? We have answers.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-150 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50/50 cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <p className="px-6 py-4 text-xs text-slate-500 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
