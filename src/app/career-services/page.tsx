"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Award, FileText, CheckCircle2, ChevronRight,
  TrendingUp, Users, ArrowRight, ShieldCheck, GraduationCap,
  Calendar, PhoneCall, BookOpen, Clock
} from "lucide-react";
import Link from "next/link";

export default function CareerServicesPage() {
  const [activeTab, setActiveTab] = useState<"placements" | "admissions">("placements");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-primary text-xs font-black uppercase tracking-wider block">Career Solutions Hub</span>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 leading-tight">
            Comprehensive Support Throughout Your Career
          </h1>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            KodeToCareer supports you from training to credentials to placements. Choose a career path below to explore specialized services.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="bg-white border border-slate-200 p-1.5 rounded-2xl flex gap-2 text-xs font-bold shadow-md">
            <button
              onClick={() => setActiveTab("placements")}
              className={`px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "placements" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>🚀</span> Direct Placement Outcomes
            </button>
            <button
              onClick={() => setActiveTab("admissions")}
              className={`px-6 py-3 rounded-xl cursor-pointer transition-all flex items-center gap-2 ${
                activeTab === "admissions" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <span>🎓</span> College Admissions
            </button>
          </div>
        </div>

        {/* Hero Section Container */}
        <div className="bg-white border border-slate-150 rounded-[32px] p-8 md:p-12 shadow-lg relative overflow-hidden min-h-[460px] flex items-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          
          <AnimatePresence mode="wait">
            {activeTab === "placements" ? (
              <motion.div
                key="placements"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
              >
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] text-emerald-600 font-extrabold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" /> Direct Placements
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight">
                    We Don't Just Teach. <br />
                    <span className="gradient-text">We Help You Get Hired.</span>
                  </h2>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                    Access expert resume keyword audits, automated ATS optimization checkers, simulated technical mock interviews, and direct routing to hiring partner boards.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link href="/career-services/placements" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/10 hover:scale-[1.02] transition-transform">
                      Explore Placement Outcomes <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-sm">
                      Book Placement Audit
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Placement Framework</h4>
                  <ul className="space-y-2 text-xs text-slate-650 font-bold">
                    <li className="flex items-center gap-2">✓ ATS Resume Optimization</li>
                    <li className="flex items-center gap-2">✓ LinkedIn Profile Audits</li>
                    <li className="flex items-center gap-2">✓ Tech Mock Interviews</li>
                    <li className="flex items-center gap-2">✓ Salary Negotiation Strategy</li>
                    <li className="flex items-center gap-2">✓ Exclusive Hiring Partner Panels</li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="admissions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
              >
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] text-blue-600 font-extrabold uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5" /> University Admissions
                  </span>
                  <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-slate-900 leading-tight">
                    Your Dream College. <br />
                    <span className="gradient-text">Your Future Starts Here.</span>
                  </h2>
                  <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                    Gain direct admission access into leading accredited universities in India. Fully UGC-DEB certified programs with flexible regular or online modes.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link href="/career-services/admissions" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/10 hover:scale-[1.02] transition-transform">
                      Explore Admissions <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 shadow-sm">
                      Free Admission Counselling
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 bg-slate-50 border border-slate-200/50 p-6 rounded-2xl">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Admission Scope</h4>
                  <ul className="space-y-2 text-xs text-slate-655 font-bold">
                    <li className="flex items-center gap-2">✓ Regular On-Campus Degrees</li>
                    <li className="flex items-center gap-2">✓ UGC Online approved Degrees</li>
                    <li className="flex items-center gap-2">✓ Flexible Distance Learning</li>
                    <li className="flex items-center gap-2">✓ UG & PG Programs (B.Tech, MBA, MCA)</li>
                    <li className="flex items-center gap-2">✓ Global Professional Credentials</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
