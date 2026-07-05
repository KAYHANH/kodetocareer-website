"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, MessageSquare, PhoneCall,
  ArrowRight, FileText, CheckCircle2, XCircle, Search,
  TrendingUp, Award, Users, ShieldCheck, ChevronRight, Code2
} from "lucide-react";
import Link from "next/link";

const EASE = [0.21, 0.47, 0.32, 0.98];

const SERVICES = [
  {
    icon: FileText,
    title: "ATS Resume Building",
    desc: "Our proprietary optimizer structures your tech achievements to score 90+ on automated hiring filters.",
    illustration: "⚡ ATS-Compatible Templates"
  },
  {
    icon: Sparkles,
    title: "LinkedIn Optimization",
    desc: "Rewrite headlines, profiles, and skills tags to rank higher in recruiter searches and inbound requests.",
    illustration: "🌐 3.4x Profile Views"
  },
  {
    icon: MessageSquare,
    title: "Mock Technical Interviews",
    desc: "Live technical coding, algorithmic debugging, and system design rounds with senior engineers.",
    illustration: "🎤 Live Peer Reviews"
  },
  {
    icon: Code2,
    title: "GitHub & Portfolio Audits",
    desc: "Review project repositories, code quality, and project readme files to build recruiter trust.",
    illustration: "📁 18+ Repository Templates"
  },
  {
    icon: ShieldCheck,
    title: "Salary Negotiation",
    desc: "Receive live strategic consultation to navigate counteroffers and maximize base packages.",
    illustration: "📈 Average +28% Base"
  },
  {
    icon: Users,
    title: "Placement Sprints",
    desc: "Intensive interview bootcamps covering data structures, SQL queries, and logical reasoning.",
    illustration: "🏃 2-Week Sprints"
  }
];

const MENTORS = [
  { name: "Rahul Deshmukh", role: "Software Architect", company: "Google", avatar: "RD" },
  { name: "Jessica Carter", role: "VP of Engineering", company: "Stripe", avatar: "JC" },
  { name: "Aman Varma", role: "Director of Data Science", company: "Microsoft", avatar: "AV" }
];

const ROADMAP_STEPS = [
  { step: 1, title: "Training", desc: "Complete live core software and AI framework training." },
  { step: 2, title: "Projects", desc: "Build full-stack applications with review feedback." },
  { step: 3, title: "Internship", desc: "Work on live partner client features with stipend." },
  { step: 4, title: "Resume", desc: "Optimize resume keywords and ATS scores." },
  { step: 5, title: "Interview", desc: "Attend fast-track recruiter referral panels." },
  { step: 6, title: "Offer Letter", desc: "Acquire placement offers and negotiate packages." }
];

export default function PlacementsPage() {
  const [selectedTimelineStep, setSelectedTimelineStep] = useState(1);
  const [showOptimizedResume, setShowOptimizedResume] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-28">

        {/* ── 1. Hero Section ── */}
        <section className="flex flex-col lg:flex-row items-center gap-12 pt-4">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-xs text-[#10B981] font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              Direct Placements Outcomes
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-slate-900 leading-tight">
              We Don't Just Teach. <br />
              <span className="gradient-text">We Help You Get Hired.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed max-w-xl">
              KodeToCareer bridges the gap between learning and employment. We provide ATS optimizations, mock interview loops, and direct hiring panel referrals.
            </p>
            
            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
              <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <span className="text-xl font-extrabold text-primary font-mono block">4,200+</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase block mt-1">Resumes Audited</span>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <span className="text-xl font-extrabold text-[#10B981] font-mono block">1,800+</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase block mt-1">Mock Interviews</span>
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <span className="text-xl font-extrabold text-indigo-600 font-mono block">500+</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase block mt-1">Offers Received</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10">
                Book Free Placement Audit <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right side interactive graphic */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full blur-[100px] opacity-75" />
            <div className="relative w-full max-w-md bg-white border border-slate-150 rounded-[28px] p-6 shadow-xl backdrop-blur-md">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3.5 mb-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hiring Dashboard Mock</span>
                <span className="bg-[#10B981]/15 text-[#10B981] text-[8px] font-black uppercase px-2 py-0.5 rounded">Active Candidates</span>
              </div>
              
              <div className="space-y-3 text-xs text-slate-700 font-semibold">
                <div className="flex items-center justify-between bg-slate-50 border border-slate-150 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">AS</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Amit Sharma</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">MERN + AI Track</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">Stripe Offer</span>
                </div>

                <div className="flex items-center justify-between bg-slate-50 border border-slate-150 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary text-xs">PK</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Priya K.</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Data Analytics Track</p>
                    </div>
                  </div>
                  <span className="text-[9px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">EY Offer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Career Services Bento Grid ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">OUR FRAMEWORK</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Elite Career Preparation</h2>
            <p className="text-slate-500 font-medium">A modular placement system designed to tackle each stage of recruitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="bg-white border border-slate-150 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-lg font-heading font-extrabold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">{s.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>{s.illustration}</span>
                    <span className="text-primary hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Explore <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 3. Before & After Resume Comparison ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">RESUME OPTIMIZATION</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Before & After Resume Audit</h2>
            <p className="text-slate-500 font-medium">Click the toggles to see how we structure resume descriptions to beat ATS algorithms.</p>
          </div>

          <div className="bg-white border border-slate-150 rounded-[28px] p-6 md:p-10 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
            
            {/* Toggle Button */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-100 border border-slate-200 p-1 rounded-xl flex gap-1.5 text-xs font-bold shadow-inner">
                <button
                  onClick={() => setShowOptimizedResume(false)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                    !showOptimizedResume ? "bg-red-500 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Unoptimized Resume
                </button>
                <button
                  onClick={() => setShowOptimizedResume(true)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
                    showOptimizedResume ? "bg-emerald-500 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Optimized (98% Score)
                </button>
              </div>
            </div>

            {/* Resume Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Profile/Score details (Spans 4) */}
              <div className="md:col-span-4 bg-slate-50 border border-slate-150 p-6 rounded-2xl flex flex-col justify-between shadow-inner">
                <div>
                  <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block">Audit Analysis</span>
                  <h4 className="text-base font-heading font-black text-slate-900 mt-2">Resume Audit Review</h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                    We parse and optimize content structure, metric values, and keyword layout mappings.
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-slate-200">
                  <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider block mb-1">ATS Score</span>
                  {showOptimizedResume ? (
                    <span className="text-3xl font-black text-emerald-600 font-mono leading-none">98% / PASS</span>
                  ) : (
                    <span className="text-3xl font-black text-red-500 font-mono leading-none">42% / FAIL</span>
                  )}
                </div>
              </div>

              {/* Resume mockup (Spans 8) */}
              <div className="md:col-span-8 bg-white border border-slate-150 p-6 rounded-2xl shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="space-y-4 text-xs font-semibold text-slate-700">
                  <div>
                    <h5 className="font-extrabold text-slate-800 text-[13px] border-b border-slate-100 pb-1">EXPERIENCE</h5>
                    {showOptimizedResume ? (
                      <div className="mt-3 space-y-1 bg-emerald-50/20 border border-emerald-100/50 p-3 rounded-xl">
                        <div className="flex justify-between items-baseline font-bold text-slate-800">
                          <span>Associate Software Engineer — Partner Systems</span>
                          <span className="text-[10px] text-slate-400 font-mono">2024 - Present</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 font-medium">
                          • Engineered microservices using **Spring Boot** and **React**, scaling database queries by **45%** and decreasing pipeline response rates by **180ms**.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 space-y-1 bg-red-50/20 border border-red-100/50 p-3 rounded-xl">
                        <div className="flex justify-between items-baseline font-bold text-slate-800">
                          <span>Web Developer</span>
                          <span className="text-[10px] text-slate-400 font-mono">2024 - Present</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1.5 font-medium">
                          • Worked on frontend features, designed some forms, and fixed bugs inside the application.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-[10px] font-bold mt-6 border-t border-slate-100 pt-3 text-slate-400">
                  {showOptimizedResume ? (
                    <><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Includes metrics, tech tags, and action verbs.</>
                  ) : (
                    <><XCircle className="w-4 h-4 text-red-500 shrink-0" /> Lacks numerical results, structured layout, and tech stack keywords.</>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Placement Journey Timeline ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">YOUR TIMELINE</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Placement Journey Roadmap</h2>
            <p className="text-slate-500 font-medium">The 6 structured steps we take to turn skills into official offer letters.</p>
          </div>

          <div className="bg-white border border-slate-150 rounded-[28px] p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
            {/* Step Stepper Header */}
            <div className="flex overflow-x-auto gap-4 pb-4 mb-8 border-b border-slate-100 scrollbar-hide">
              {ROADMAP_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setSelectedTimelineStep(s.step)}
                  className={`px-4.5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedTimelineStep === s.step
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{s.step}</span>
                  {s.title}
                </button>
              ))}
            </div>

            {/* Step Stepper Body */}
            <motion.div
              key={selectedTimelineStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 max-w-2xl"
            >
              <h3 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                Step {ROADMAP_STEPS[selectedTimelineStep - 1].step}: {ROADMAP_STEPS[selectedTimelineStep - 1].title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {ROADMAP_STEPS[selectedTimelineStep - 1].desc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 5. Mentors Section ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Learn from Hiring Mentors</h2>
            <p className="text-slate-500 font-medium">Receive direct counseling, mock reviews, and referrals from industry veterans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MENTORS.map((m, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-5 rounded-2xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                  {m.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 leading-none">{m.name}</h4>
                  <span className="text-[10px] text-slate-455 font-bold block mt-1">{m.role}</span>
                  <span className="inline-block mt-2 bg-slate-50 border border-slate-200 text-slate-600 text-[8px] font-black uppercase px-2 py-0.5 rounded">
                    Ex-{m.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. Student Success Stories Teaser ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Alumni Hired</h2>
            <p className="text-slate-500 font-medium">Recent graduates who successfully transformed their tech careers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Priya Patel", role: "Data Analyst", target: "Microsoft", package: "₹10 LPA", text: "The structured curriculum and placement support helped me land my dream role. Mentors audited my projects step-by-step." },
              { name: "Rahul Sharma", role: "Software Engineer", target: "Google", package: "₹12 LPA", text: "From local scripting to architecting production apps at Google. The resume workshops and mockup interviews were critical." }
            ].map((s, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-6 rounded-[24px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <p className="text-slate-500 text-xs italic font-semibold leading-relaxed mb-6">"{s.text}"</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black text-xs">
                      {s.name[0]}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{s.name}</h4>
                      <span className="text-[9px] text-slate-440 font-bold block mt-0.5">{s.role}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-600 block">{s.package}</span>
                    <span className="text-[8px] bg-slate-50 border border-slate-150 text-slate-600 px-2 py-0.5 rounded font-black mt-1 inline-block uppercase">Hired</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Final Book Audit CTA ── */}
        <section className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 mb-4">
            Book Your Free 1-on-1 Career Audit
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8 font-semibold text-sm leading-relaxed">
            Schedule a 30-minute counseling call to review your current resume, identify portfolio gaps, and explore hiring tracks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10">
              <PhoneCall className="w-4.5 h-4.5" /> Book Free Audit
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-[14px] font-bold text-base hover:bg-slate-50">
              Talk to Advisor
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
