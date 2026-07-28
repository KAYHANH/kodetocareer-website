import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Mic, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Tech Career Tools | KodeToCareer',
  description:
    'Free AI-powered tech tools: AI Resume Grader and AI Technical Mock Interview Simulator to accelerate your job search.',
};

export default function FreeToolsHubPage() {
  const tools = [
    {
      title: 'AI Resume Grader & ATS Analyzer',
      description:
        'Instantly evaluate your resume against 300+ hiring partner standards in India. Get ATS score (0-100), missing technical keywords, and actionable section improvements.',
      href: '/free-tools/resume-grader',
      icon: FileText,
      badge: 'FREE ATS CHECK',
      color: 'from-blue-600/20 via-indigo-600/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-cyan-400',
    },
    {
      title: 'AI Technical Mock Interview Simulator',
      description:
        'Simulate 5-question technical interview rounds for Full Stack MERN or Data Science roles. Practice real questions with instant scoring, feedback, and sample answers.',
      href: '/free-tools/mock-interview',
      icon: Mic,
      badge: 'INTERVIEW SIMULATOR',
      color: 'from-indigo-600/20 via-violet-600/20 to-purple-500/20',
      borderColor: 'border-indigo-500/30',
      textColor: 'text-indigo-400',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            100% Free AI Career Utilities
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Level Up Your Job Search with <span className="gradient-text">Free AI Tools</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Tools built specifically for Indian tech students and job-seekers to beat ATS filters and ace technical interviews.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.href}
                className={`glass rounded-3xl p-8 border ${t.borderColor} shadow-2xl flex flex-col justify-between space-y-6 hover:border-blue-500/50 transition-all group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${t.color} border border-white/10 ${t.textColor}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-bold text-slate-300">
                      {t.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {t.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{t.description}</p>
                </div>

                <Link
                  href={t.href}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  <span>Launch Free Tool</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
