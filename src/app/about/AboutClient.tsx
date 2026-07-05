'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Eye, Users, Shield, Globe, Award, Sparkles, 
  Heart, Rocket, BookOpen, Clock, ArrowRight, 
  ChevronRight, Building2, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Count Up Hook for Stats                                            */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 2000): [React.RefObject<HTMLSpanElement | null>, string] {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [ref, Math.floor(count).toLocaleString()];
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, formatted] = useCountUp(value);
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <span ref={ref} className="text-4xl md:text-5xl font-black font-heading text-primary font-mono leading-none">
        {formatted}{suffix}
      </span>
      <span className="text-sm font-semibold text-slate-500 mt-2.5 uppercase tracking-wider">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const stats = [
    { value: 1200, suffix: "+", label: "Students Trained" },
    { value: 500, suffix: "+", label: "Careers Placed" },
    { value: 95, suffix: "%", label: "Placement Rate" }
  ];

  const timeline = [
    { year: "2021", title: "Academy Founded", desc: "Started with a vision to make technology education practical, job-aligned, and affordable." },
    { year: "2022", title: "First Cohort Graduated", desc: "Achieved a 92% placement rate within 3 months, placing students at major MNCs." },
    { year: "2023", title: "College Collaborations", desc: "Partnered with 15+ affiliated universities to deliver integrated job-readiness tracks." },
    { year: "2024", title: "AI-Powered Curriculum", desc: "Integrated LLM agent programming, prompt engineering, and copilot tools into all courses." },
    { year: "2025", title: "National Recognition", desc: "Certified by NSDC and Startup India, expanding online access to 1,200+ students annually." }
  ];

  const values = [
    { icon: Sparkles, title: "Innovation", desc: "Pioneering AI-driven software development workflows and learning methods.", bg: "from-blue-50 to-indigo-50/20" },
    { icon: Heart, title: "Student-First", desc: "We align our success directly with student placements and course outcomes.", bg: "from-rose-50 to-rose-100/10" },
    { icon: Shield, title: "Integrity", desc: "Delivering honest placement support, transparent reviews, and real metrics.", bg: "from-emerald-50 to-emerald-100/10" },
    { icon: Rocket, title: "Industry Focus", desc: "Training with tech stacks engineered to fit live company requirements.", bg: "from-amber-50 to-amber-100/10" },
    { icon: BookOpen, title: "Continuous Learning", desc: "Evolving core materials daily alongside technological changes.", bg: "from-cyan-50 to-cyan-100/10" },
    { icon: Users, title: "Excellence", desc: "Pursuing elite performance across instruction, project work, and support.", bg: "from-purple-50 to-purple-100/10" }
  ];

  const leaders = [
    {
      name: "Dr. Vikram Aditya",
      role: "Co-Founder & CEO",
      bio: "Ex-Google Staff Engineer, passionate about building the next generation of global tech talent.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
      exp: "12+ Yrs Experience"
    },
    {
      name: "Sarah Jenkins",
      role: "Head of AI & Curriculum",
      bio: "Former AI Research Scientist at Stanford. Expert in machine learning and NLP education.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
      exp: "8+ Yrs Experience"
    },
    {
      name: "Rajesh Nair",
      role: "Director of Placements",
      bio: "15+ years of recruitment leadership at Infosys and Accenture. Dedicated to student placement.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
      exp: "15+ Yrs Experience"
    }
  ];

  const campus = [
    { title: "Smart Lecture Hall", img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop" },
    { title: "Collaborative Labs", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" },
    { title: "Interactive Workshop Hub", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop" }
  ];

  const accreditations = [
    { name: "ISO 9001:2015 Certified", desc: "Quality Management Standard" },
    { name: "Skill India Partner", desc: "National Skills Development Initiative" },
    { name: "NSDC Aligned", desc: "Curriculum matches industry standards" },
    { name: "MSME Registered", desc: "Recognized Enterprise Entity" },
    { name: "Startup India", desc: "Department of Industrial Promotion" }
  ];

  const testimonials = [
    { name: "Aman Gupta", role: "Software Engineer at Amazon", quote: "KodeToCareer gave me the exact hands-on experience I needed. Building production projects with mentor reviews helped me clear Amazon's design rounds easily.", avatar: "AG" },
    { name: "Meera Sen", role: "Data Analyst at EY", quote: "The curriculum is updated constantly. Learning PowerBI alongside real SQL databases helped me build a portfolio that got me hired before my graduation.", avatar: "MS" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-28">
        
        {/* ── 1. Hero Section ── */}
        <section className="flex flex-col lg:flex-row items-center gap-12 pt-4">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              OUR MISSION & IDENTITY
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-slate-900 leading-tight">
              Building Careers. <br />
              <span className="gradient-text">Transforming Futures.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-xl">
              KodeToCareer is a premium engineering academy designed to turn career aspirations into global realities. We equip students with direct hands-on coding, live enterprise product assignments, and unmatched corporate hiring connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/courses" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10 hover:opacity-95 transition-all">
                Explore Programs <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-[14px] font-bold text-base hover:bg-slate-50 transition-colors">
                Book Counseling
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* Mesh orb background for illustration */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-[100px] opacity-70" />
            <div className="relative w-full max-w-md aspect-video bg-white/70 border border-slate-100 rounded-[24px] p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">KTC Academy Core</span>
              </div>
              <div className="py-6 space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Job-Oriented Training</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">No generic templates. Build enterprise apps and deploy to live servers.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Industry Mentor Sprints</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Learn from senior engineers at top-tier global companies.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Statistics Section ── */}
        <section className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        {/* ── 3. Mission & Vision Section ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-[24px] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                To stand as the world's most trusted career transformation hub, enabling students to conquer complex programming barriers, launch scalable applications, and achieve elite placements at top global corporations.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                To deliver elite, technology-integrated education. We align structured modules directly with professional developer pipelines, practical client requirements, and extensive placement preparation.
              </p>
            </div>
          </div>
        </section>

        {/* ── 4. Story Timeline ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">OUR JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">How We Built KodeToCareer</h2>
            <p className="text-slate-500 font-medium">The milestones that define our commitment to engineering education excellence.</p>
          </div>

          <div className="bg-white border border-slate-100 rounded-[24px] p-6 md:p-10 shadow-sm">
            {/* Timeline Tab Indicators */}
            <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-slate-100 scrollbar-hide">
              {timeline.map((t, idx) => (
                <button
                  key={t.year}
                  onClick={() => setActiveStoryIdx(idx)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    activeStoryIdx === idx
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {t.year}
                </button>
              ))}
            </div>

            {/* Timeline Active Content */}
            <motion.div
              key={activeStoryIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 max-w-2xl"
            >
              <h3 className="text-xl font-heading font-extrabold text-slate-900">
                {timeline[activeStoryIdx].title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {timeline[activeStoryIdx].desc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 5. Core Values Bento Grid ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Our Core Values</h2>
            <p className="text-slate-500 font-medium">The values driving our curriculum, team spirit, and alumni achievements.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className={`rounded-[24px] bg-gradient-to-br ${v.bg} border border-slate-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow`}>
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm mb-6">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 6. Meet Leadership ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Our Leadership</h2>
            <p className="text-slate-500 font-medium">Led by tech veterans dedicated to engineering talent growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((l, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-64 relative bg-slate-100 overflow-hidden shrink-0">
                  <Image src={l.image} alt={l.name} fill className="object-cover group-hover:scale-103 transition-transform duration-350" unoptimized />
                  <span className="absolute bottom-4 left-4 bg-slate-900/80 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-sm">
                    {l.exp}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-heading font-extrabold text-slate-900">{l.name}</h3>
                    <span className="text-xs text-primary font-bold uppercase block mt-1 tracking-wide">{l.role}</span>
                    <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">{l.bio}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5 uppercase tracking-wider">
                      Connect <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Office Gallery ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Campus & Collaboration Labs</h2>
            <p className="text-slate-500 font-medium">Take a look inside our collaborative workspaces and design studios.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campus.map((c, idx) => (
              <div key={idx} className="group relative rounded-[24px] overflow-hidden shadow-sm aspect-video bg-slate-100 border border-slate-100">
                <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-103 transition-transform duration-350" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 z-10">
                  <span className="text-white text-sm font-bold">{c.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. Awards & Certifications ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900">Accreditations & Partner Trust</h2>
            <p className="text-slate-500 font-medium">Authorized by leading national departments and quality standards organizations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {accreditations.map((a, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-5 rounded-2xl flex flex-col justify-between shadow-sm">
                <Building2 className="w-6 h-6 text-primary mb-3 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{a.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 font-semibold leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. Testimonials ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Alumni Voice</h2>
            <p className="text-slate-500 font-medium">How our educational rigor translate to successful employment careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-150 rounded-[24px] p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <p className="text-slate-600 text-sm leading-relaxed font-semibold italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{t.name}</h4>
                    <span className="text-[10px] text-slate-450 font-bold block mt-0.5">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. Final CTA Section ── */}
        <section className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 mb-4">
            Join the Next Generation of Tech Professionals
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8 font-semibold text-sm leading-relaxed">
            Gain immediate access to premium courses, industry-grade projects, and live coaching to build your software career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10">
              Browse All Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-[14px] font-bold text-base hover:bg-slate-50">
              Book Counselling Call
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
