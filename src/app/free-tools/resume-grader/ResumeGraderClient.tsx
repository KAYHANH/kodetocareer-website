'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Award, Zap, RefreshCw, BookOpen, Download } from 'lucide-react';
import Link from 'next/link';

interface GradingResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  improvements: string[];
  recommendedCourseSlug: string;
}

export default function ResumeGraderClient() {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('fullstack-mern');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [error, setError] = useState('');

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);

  const roles = [
    { id: 'fullstack-mern', label: 'Full Stack MERN Developer' },
    { id: 'data-science', label: 'Data Science & AI Engineer' },
    { id: 'java-enterprise', label: 'Java Enterprise Backend' },
    { id: 'cloud-devops', label: 'Cloud DevOps & AWS' },
    { id: 'ui-ux-design', label: 'UI/UX Product Designer' },
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setLeadSubmitting(true);
    try {
      await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          phone: leadPhone,
          courseTitle: `Resume Grader Lead (${targetRole})`,
          message: `ATS Score: ${result?.score}/100 for target track ${targetRole}`,
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error('Lead tracking error:', err);
    } finally {
      setLeadSubmitting(false);
    }
  };

  const handleGrade = async () => {
    if (!resumeText.trim() || resumeText.length < 20) {
      setError('Please paste at least 20 characters of resume text to evaluate.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/resume-grader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to grade resume.');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while grading your resume.');
    } finally {
      setLoading(false);
    }
  };

  const sampleResumes = {
    junior: `John Doe - B.Tech CSE 2026.
Skills: HTML, CSS, JavaScript, Basic React, Git.
Projects: Built personal portfolio website and simple To-Do List app using React.
Education: XYZ Institute of Technology (CGPA: 8.2).
Looking for software engineering internship opportunities.`,
    senior: `Rahul Sharma - Full Stack Software Developer
Experience: Worked as MERN Stack Intern at Tech Corp for 6 months. Built REST APIs using Node.js and Express. Managed MongoDB collections and aggregation pipelines. Front-end in React 19, Tailwind CSS, Next.js.
Key Achievements: Reduced page load latency by 35% with Next.js SSG. Integrated JWT Auth with HTTP-only cookies and Stripe payment gateway.
Education: BCA 2025. Certifications: AWS Certified Developer Associate.`,
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Resume Analyzer & ATS Grader
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Grade Your Resume for <span className="gradient-text">Top Tech Jobs</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Instantly evaluate your resume against 300+ hiring partner standards in India. Get your ATS compatibility score, missing tech keywords, and actionable tips.
          </p>
        </div>

        {/* Input Form Section */}
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 border border-white/10 shadow-2xl">
          {/* Target Role Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Select Your Target Career Track:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setTargetRole(r.id)}
                  className={`p-3 rounded-2xl text-xs font-semibold border transition-all text-left flex flex-col justify-between ${
                    targetRole === r.id
                      ? 'bg-blue-600/20 border-blue-500 text-cyan-300 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resume Text Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Paste Your Resume Text Below:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setResumeText(sampleResumes.junior)}
                  className="text-[11px] text-blue-400 hover:underline"
                >
                  Load Sample Junior Resume
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => setResumeText(sampleResumes.senior)}
                  className="text-[11px] text-cyan-400 hover:underline"
                >
                  Load Sample Advanced Resume
                </button>
              </div>
            </div>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here (experience, skills, projects, education)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors font-mono leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={handleGrade}
              disabled={loading || !resumeText.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Resume with AI...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Analyze Resume Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-6 sm:p-10 space-y-8 border border-blue-500/30 shadow-2xl bg-slate-900/80"
            >
              {/* Score Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/20">
                <div className="flex items-center gap-5">
                  {/* Score Meter Dial */}
                  <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-slate-950 border-4 border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <span className="text-3xl font-extrabold text-white font-heading">{result.score}</span>
                    <span className="text-[10px] text-slate-400 absolute bottom-3">/ 100</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">
                      {result.score >= 80 ? '🎯 Exceptional Resume' : result.score >= 60 ? '⚡ Good Baseline' : '⚠️ Needs Optimization'}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-md mt-1">
                      {result.score >= 80
                        ? 'Your resume is highly optimized for top tech recruiters and ATS screening.'
                        : 'Your resume has good potential, but adding key technical keywords and metric outcomes will boost interview callbacks.'}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/courses/${result.recommendedCourseSlug}`}
                  className="px-6 py-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-cyan-300 font-semibold text-xs hover:bg-blue-600/30 transition-all flex items-center gap-2 shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Boost Skill Gaps in 4 Months</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Matched */}
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ATS Matched Keywords ({result.matchedKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedKeywords.length ? (
                      result.matchedKeywords.map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 uppercase font-mono text-[10px]">
                          {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-500">No primary target keywords detected.</span>
                    )}
                  </div>
                </div>

                {/* Missing */}
                <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Missing High-Demand Keywords ({result.missingKeywords.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.length ? (
                      result.missingKeywords.map((kw) => (
                        <span key={kw} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase font-mono text-[10px]">
                          + {kw}
                        </span>
                      ))
                    ) : (
                      <span className="text-emerald-400">All major keywords present!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Key Resume Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((st, i) => (
                      <li key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-start gap-2.5">
                        <span className="text-emerald-400">✓</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    Actionable Improvements
                  </h4>
                  <ul className="space-y-2">
                    {result.improvements.map((imp, i) => (
                      <li key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-start gap-2.5">
                        <span className="text-amber-400">→</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lead Capture Trigger Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 border border-blue-500/30 space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white font-heading">
                    Request Free 1-on-1 Resume Re-writing Session with Placement Mentor
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Want our senior HR resume expert to optimize your bullet points and boost your ATS score to 90+? Enter your contact info below.
                </p>

                {leadSubmitted ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Lead registered! A Senior Tech Resume Specialist will call you shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Phone Number"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {leadSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                      <span>Book Free Callback</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
