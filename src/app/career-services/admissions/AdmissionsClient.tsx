"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Calendar, Clock, BookOpen, Check, HelpCircle,
  PhoneCall, ArrowRight, Building, Award, CheckCircle2, ChevronRight,
  X, Sparkles, User, Play
} from "lucide-react";
import Link from "next/link";

const ADMISSION_COURSES = [
  {
    title: "Bachelor of Technology (B.Tech)",
    duration: "4 Years",
    mode: "Regular",
    eligibility: "12th PCM Pass",
    admission: "Direct / Entrance Support",
    tags: ["Engineering", "Regular Degree"]
  },
  {
    title: "Master of Business Administration (MBA)",
    duration: "2 Years",
    mode: "Online / Distance",
    eligibility: "Graduate (Any Stream)",
    admission: "UGC-DEB Approved",
    tags: ["Management", "Online Approved"]
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    duration: "3 Years",
    mode: "Online / Regular",
    eligibility: "12th Pass (Any Stream)",
    admission: "Direct Admission",
    tags: ["Management", "BBA Career"]
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    duration: "3 Years",
    mode: "Regular / Online",
    eligibility: "12th Pass (Maths Preferred)",
    admission: "Direct Admission",
    tags: ["IT & Software", "UGC Approved"]
  },
  {
    title: "Master of Computer Applications (MCA)",
    duration: "2 Years",
    mode: "Online / Distance",
    eligibility: "BCA / Graduate with Maths",
    admission: "UGC-DEB Approved",
    tags: ["IT & Software", "High Growth"]
  },
  {
    title: "Professional Certifications",
    duration: "3-6 Months",
    mode: "Online Live Labs",
    eligibility: "Open (Beginner Friendly)",
    admission: "AWS, Google, Microsoft Cloud",
    tags: ["Global Credentials", "Skills Certification"]
  },
  {
    title: "Other UGC Approved Degrees",
    duration: "Flexible",
    mode: "Regular / Online / Distance",
    eligibility: "UG / PG Requirements",
    admission: "Custom Support Provided",
    tags: ["Custom Option", "Any Degree"],
    isCustom: true
  }
];

const UNIVERSITIES = [
  "Amity University", "LPU (Lovely Professional)", "Chandigarh University",
  "Sharda University", "GLA University", "Manipal University", "Jain University",
  "IGNOU", "DY Patil", "NMIMS", "UPES Dehradun", "Graphic Era"
];

const TIMELINE_STEPS = [
  { step: "1", title: "Career Counselling", desc: "1-on-1 profile mapping with an expert admissions counselor." },
  { step: "2", title: "Choose Program", desc: "Select between Regular, Online, or Distance Degrees depending on availability." },
  { step: "3", title: "University Selection", desc: "Compare fees, rankings, and placement stats across top universities." },
  { step: "4", title: "Application Dispatch", desc: "Direct, error-free application processing through our registry partnership." },
  { step: "5", title: "Document Verification", desc: "Secure review of your transcripts, eligibility, and government IDs." },
  { step: "6", title: "Admission Letter", desc: "Receive the official admission confirmation letter from the university." },
  { step: "7", title: "Fee Payment", desc: "Pay course fees directly through secure university payment pathways." },
  { step: "8", title: "Start Classes", desc: "Gain access to class lectures, portals, and student resources." }
];

export default function AdmissionsPage() {
  const [selectedTimelineStep, setSelectedTimelineStep] = useState(1);

  // Modal & Form States for College Admissions
  const [showModal, setShowModal] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [isCustomDegree, setIsCustomDegree] = useState(false);
  const [customDegreeName, setCustomDegreeName] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [status, setStatus] = useState("Pursuing");
  const [year, setYear] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApplyClick = (courseTitle: string) => {
    setSelectedDegree(courseTitle);
    if (courseTitle.includes("Other")) {
      setIsCustomDegree(true);
    } else {
      setIsCustomDegree(false);
    }
    setCustomDegreeName("");
    setSubmitted(false);
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !qualification || !year) return;

    setSubmitting(true);
    const finalCourseTitle = isCustomDegree 
      ? `College Admission: ${customDegreeName || "Custom Degree Requested"}`
      : `College Admission: ${selectedDegree}`;

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          qualification,
          status,
          year,
          courseTitle: finalCourseTitle,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowModal(false);
          // Clear inputs
          setName("");
          setPhone("");
          setQualification("");
          setYear("");
        }, 2000);
      }
    } catch (err) {
      console.error("Error submitting admissions form:", err);
    } finally {
      setSubmitting(false);
    }
  };

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
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
              <GraduationCap className="w-4.5 h-4.5" />
              Accredited College Admissions
            </span>
            <h1 className="font-heading font-extrabold text-5xl md:text-6xl text-slate-900 leading-tight">
              Your Dream College. <br />
              <span className="gradient-text">Your Future Starts Here.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed max-w-xl">
              Get direct admission into top UGC-DEB approved universities in India. Explore Regular, Online, and Distance programs designed to fit your goals.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {["Regular Degrees", "Online Degrees", "Distance Learning", "UG & PG Sprints"].map((badge) => (
                <span key={badge} className="bg-white border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  ✓ {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10">
                <PhoneCall className="w-4.5 h-4.5" /> Free Admission Counselling
              </Link>
            </div>
          </div>

          {/* Right side categories */}
          <div className="w-full lg:w-1/2 space-y-6">
            {[
              { type: "Regular Degree", desc: "Attend regular classes on-campus at top-tier universities.", link: "#courses" },
              { type: "Online Degree (UGC Approved)", desc: "100% flexible schedule. Study from anywhere and balance with your work.", link: "#courses" },
              { type: "Distance Learning", desc: "Highly affordable options with flexible exam scheduling.", link: "#courses" }
            ].map((cat, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-slate-800 text-sm">{cat.type}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">{cat.desc}</p>
                </div>
                <a href={cat.link} className="text-primary hover:text-blue-700 shrink-0 p-2">
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── 2. Course Cards Grid ── */}
        <section id="courses" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">PROGRAMS GRID</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">UGC Approved Degrees</h2>
            <p className="text-slate-500 font-medium">Explore curriculum details, eligibility criteria, and study modes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMISSION_COURSES.map((c, idx) => (
              <div key={idx} className="bg-white border border-slate-150 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {c.tags.map((t) => (
                      <span key={t} className="bg-primary/10 text-primary text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-heading font-extrabold text-slate-900 leading-tight mb-4">{c.title}</h3>
                  
                  <div className="space-y-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Duration</span>
                      <span className="text-slate-800">{c.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Mode</span>
                      <span className="text-slate-800">{c.mode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Eligibility</span>
                      <span className="text-slate-800">{c.eligibility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Admission</span>
                      <span className="text-slate-800">{c.admission}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => handleApplyClick(c.title)}
                    className="flex-1 inline-flex h-10 items-center justify-center bg-primary text-white text-xs font-bold rounded-xl hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. Partner Universities Marquee ── */}
        <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative flex z-10" aria-label="Partner Universities">
          <div className="w-full">
            <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-8">UGC & DEB Certified Partner Universities</p>
            <div className="w-full overflow-hidden relative flex">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-4 items-center animate-marquee whitespace-nowrap">
                {UNIVERSITIES.map((uni, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-8 py-3 text-sm font-extrabold text-slate-700 flex items-center gap-2 shadow-sm">
                    <Building className="w-4 h-4 text-primary" />
                    {uni}
                  </div>
                ))}
                {/* Duplicate list for infinite effect */}
                {UNIVERSITIES.map((uni, idx) => (
                  <div key={idx + 100} className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-8 py-3 text-sm font-extrabold text-slate-700 flex items-center gap-2 shadow-sm">
                    <Building className="w-4 h-4 text-primary" />
                    {uni}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. Admission Process Timeline ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">YOUR JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Admission Process Timeline</h2>
            <p className="text-slate-500 font-medium">8 structured steps coordinating application dispatch and document reviews.</p>
          </div>

          <div className="bg-white border border-slate-150 rounded-[28px] p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
            {/* Timeline Stepper Header */}
            <div className="flex overflow-x-auto gap-4 pb-4 mb-8 border-b border-slate-100 scrollbar-hide">
              {TIMELINE_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => setSelectedTimelineStep(parseInt(s.step))}
                  className={`px-4.5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                    selectedTimelineStep === parseInt(s.step)
                      ? "bg-primary text-white shadow-md shadow-primary/10"
                      : "bg-slate-50 text-slate-500 hover:text-slate-750 hover:bg-slate-100"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{s.step}</span>
                  {s.title}
                </button>
              ))}
            </div>

            {/* Timeline Stepper Body */}
            <motion.div
              key={selectedTimelineStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 max-w-2xl"
            >
              <h3 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                Step {TIMELINE_STEPS[selectedTimelineStep - 1].step}: {TIMELINE_STEPS[selectedTimelineStep - 1].title}
              </h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {TIMELINE_STEPS[selectedTimelineStep - 1].desc}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── 5. Comparison Table ── */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">DEGREE MODES</span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">Compare Study Modes</h2>
            <p className="text-slate-500 font-medium">A metrics table comparing campus regular, online, and distance learning paths.</p>
          </div>

          <div className="max-w-3xl mx-auto overflow-hidden border border-slate-200 rounded-2xl shadow-sm bg-white">
            <table className="w-full text-left text-xs font-bold border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-450 uppercase tracking-wider text-[10px]">
                  <th className="p-4">Criteria</th>
                  <th className="p-4">Regular</th>
                  <th className="p-4">Online</th>
                  <th className="p-4">Distance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="p-4 text-slate-900 font-extrabold">Attend Campus</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                  <td className="p-4 text-slate-400">✗ No</td>
                  <td className="p-4 text-slate-400">✗ No</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-900 font-extrabold">Schedule Flexibility</td>
                  <td className="p-4 text-slate-400">✗ Low</td>
                  <td className="p-4 text-emerald-600">✓ 100% High</td>
                  <td className="p-4 text-emerald-600">✓ 100% High</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-900 font-extrabold">UGC Approved Degree</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-900 font-extrabold">Placement Cell Support</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                  <td className="p-4 text-emerald-600">✓ Yes</td>
                  <td className="p-4 text-slate-500">Depends</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-900 font-extrabold">Affordable Pricing</td>
                  <td className="p-4 text-slate-400">✗ Standard</td>
                  <td className="p-4 text-emerald-600">✓ Cost-Effective</td>
                  <td className="p-4 text-emerald-600">✓ Best Value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 5b. Gap Year Degree Completion Spotlight Section ── */}
        <section className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20 inline-block">
              ACADEMIC RECOVERY
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
              Gap Year Degree Support
            </h2>
            <p className="text-slate-500 font-semibold text-sm leading-relaxed max-w-xl mx-auto">
              Recover lost academic years legally. We help students with history of breaks or discontinued education secure valid degrees aligning with their original timelines.
            </p>
          </div>

          <div className="bg-white border border-slate-150 rounded-[32px] p-6 md:p-10 shadow-sm relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded bg-blue-50 border border-blue-100 text-primary">
                LATERAL ENTRY
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded bg-indigo-50 border border-indigo-100 text-indigo-650">
                CREDIT TRANSFER
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded bg-emerald-50 border border-emerald-100 text-emerald-650">
                DEGREE RECOVERY
              </span>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-2xl font-heading font-black text-slate-900">
                Gap Year Degree Completion
              </h3>
              <div className="w-full h-px bg-slate-100 mt-4" />
            </div>

            {/* Parameters list */}
            <div className="space-y-4 text-xs font-bold text-slate-700">
              <div className="flex justify-between items-baseline gap-4">
                <span className="text-slate-400 font-semibold shrink-0">Duration</span>
                <span className="text-slate-900 text-right">Fast-Track / Lateral</span>
              </div>
              <div className="flex justify-between items-baseline gap-4 border-t border-slate-50 pt-3">
                <span className="text-slate-400 font-semibold shrink-0">Mode</span>
                <span className="text-slate-900 text-right">Regular / Distance / Online</span>
              </div>
              <div className="flex justify-between items-baseline gap-4 border-t border-slate-50 pt-3">
                <span className="text-slate-400 font-semibold shrink-0">Eligibility</span>
                <span className="text-slate-900 text-right">Discontinued / Academic Gaps (12th, BCA, etc.)</span>
              </div>
              <div className="flex justify-between items-baseline gap-4 border-t border-slate-50 pt-3">
                <span className="text-slate-400 font-semibold shrink-0">Admission</span>
                <span className="text-slate-900 text-right">UGC / DEB Approved Universities Only</span>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 my-4" />

            {/* Visual Example Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">Case Study 1: 12th Gap</span>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  If someone completed their 12th in **2022** and has not done anything since, we will assist in obtaining a regular/online B.Tech or BBA degree for the **2022 to 2026** cycle.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                <span className="text-[9px] font-black uppercase text-secondary bg-secondary/10 px-2 py-0.5 rounded">Case Study 2: Postgraduate Gap</span>
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  If someone completed their BCA in **2018** but did not enroll in an MCA, we help map credits to legally fast-track their MCA degree completion.
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={() => handleApplyClick("Gap Year Degree Recovery")}
                className="w-full bg-primary hover:bg-blue-600 text-white font-bold text-center py-4 rounded-2xl transition-colors shadow-md shadow-primary/10 cursor-pointer block text-sm border-0 outline-none"
              >
                Apply Now
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. Final Counselling CTA ── */}
        <section className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-slate-900 mb-4">
            Still Confused? Talk to Our Admission Experts.
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8 font-semibold text-sm leading-relaxed">
            Connect with a university registry advisor today to clarify UGC approvals, documentation criteria, and application windows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-base shadow-lg shadow-primary/10">
              <PhoneCall className="w-4.5 h-4.5" /> Book Free Counselling
            </Link>
          </div>
        </section>

      </div>

      {/* ── College Admission Application Modal ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[28px] border border-slate-150 shadow-2xl p-6 md:p-8 w-full max-w-lg relative z-10 overflow-hidden"
            >
              {/* Top Sparkle Banner decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-secondary" />

              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 mb-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold uppercase tracking-wider">
                  <GraduationCap className="w-3.5 h-3.5" /> Registry Application
                </div>
                <h3 className="text-xl font-heading font-extrabold text-slate-900 leading-tight">
                  {isCustomDegree ? "Request Other College Degree" : `Apply for ${selectedDegree}`}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Enter your contact and academic profile details. A university coordinator will call you back within 24 hours.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-500">
                    <CheckCircle2 className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-heading font-extrabold text-slate-900">Application Dispatch Success!</h4>
                    <p className="text-xs text-slate-500 font-semibold">Your request has been filed in our master registry sheet.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 placeholder-slate-400 bg-slate-50"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-primary" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 placeholder-slate-400 bg-slate-50"
                    />
                  </div>

                  {/* Separate input if custom degree is requested */}
                  {isCustomDegree && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> Specify Required Degree / Course
                      </label>
                      <input
                        type="text"
                        required
                        value={customDegreeName}
                        onChange={(e) => setCustomDegreeName(e.target.value)}
                        placeholder="e.g. B.Sc Physics, B.Com, M.Sc IT"
                        className="w-full px-4 py-3 rounded-xl border border-primary/40 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 placeholder-slate-400 bg-white"
                      />
                    </div>
                  )}

                  {/* Current Qualification */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-primary" /> Current Qualification
                    </label>
                    <input
                      type="text"
                      required
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      placeholder="e.g. 12th Pass, BCA Graduate, B.Com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 placeholder-slate-400 bg-slate-50"
                    />
                  </div>

                  {/* Pursuing / Completed Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 bg-slate-50 cursor-pointer"
                      >
                        <option value="Pursuing">Pursuing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Graduation Year */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Passing / Expected Year</label>
                      <input
                        type="number"
                        required
                        min="2010"
                        max="2035"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="e.g. 2026"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-xs font-bold text-slate-800 placeholder-slate-400 bg-slate-50"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex h-12 items-center justify-center bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-black shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer mt-2"
                  >
                    {submitting ? "Submitting Request..." : "Submit Application Registry"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
