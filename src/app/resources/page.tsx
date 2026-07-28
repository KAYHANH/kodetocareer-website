import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, HelpCircle, User, Briefcase, FileText, ArrowRight, Sparkles, FolderKanban, Wrench } from 'lucide-react';
import { INTERVIEW_RESOURCES, CAREER_GUIDES, SALARY_GUIDES } from '@/data/resources-data';

export const metadata: Metadata = {
  title: 'Free Technology Resources Hub | KodeToCareer',
  description: 'Access free software tutorials, interview questions, career roadmaps, PDF cheat sheets, and salary calculators.',
  alternates: {
    canonical: 'https://kodetocareer.com/resources',
  }
};

export default function Page() {
  const cheatSheets = [
    { title: 'SQL & Database Cheat Sheet', url: '/sql-cheatsheet.pdf' },
    { title: 'Git & GitHub Branching Guide', url: '/git-github-guide.pdf' },
    { title: 'ATS-Friendly Developer Resume Template', url: '/ats-software-developer-resume.pdf' },
    { title: 'Top 100 System Design Interview Questions', url: '/top-100-system-design-interview-questions-2026.pdf' }
  ];

  const tutorials = [
    { name: 'React Hub', slug: 'react' },
    { name: 'Python Hub', slug: 'python' },
    { name: 'SQL Hub', slug: 'sql' },
    { name: 'Java Hub', slug: 'java' },
    { name: 'Docker Hub', slug: 'docker' },
    { name: 'Node.js Hub', slug: 'node' },
    { name: 'Power BI Hub', slug: 'power-bi' },
    { name: 'MongoDB Hub', slug: 'mongodb' },
    { name: 'Git Hub', slug: 'git' },
    { name: 'CSS & Tailwind Hub', slug: 'css' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden">
      {/* Blurred decorative meshes */}
      <div className="absolute top-[-200px] left-[-150px] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] bg-indigo-50/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Career & Learning Resource Center
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight">
            Free Tech Learning Platform
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-medium leading-relaxed">
            Boost your tech career with our library of free tutorials, career roadmaps, PDF guides, salary calculators, and interview questions.
          </p>
        </div>

        {/* Resources Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Section 1: Tutorials (Learn Hubs) */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Free Tutorials</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Step-by-step guides, code objectives, and mini projects for core stacks.
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-6">
                {tutorials.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/learn/${t.slug}`}
                    className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 hover:text-primary text-[11px] font-bold transition-all text-center"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              href="/learn/react"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
            >
              Start learning now
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Section 2: Interview Questions */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-650 mb-6 shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Interview Questions</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Technical Q&As, behavioral checklists, and answer evaluation helpers.
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                {Object.values(INTERVIEW_RESOURCES).map((res) => (
                  <Link
                    key={res.slug}
                    href={`/resources/interviews/${res.slug}`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-750 hover:bg-slate-100/50 text-xs font-extrabold flex justify-between items-center transition-all cursor-pointer"
                  >
                    {res.title}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/resources/interviews/react-interview-questions`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
            >
              Explore interview hubs
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Section 3: Career Guides */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Career Guides</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Step-by-step career path structures, required skills, and growth roadmaps.
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                {Object.values(CAREER_GUIDES).slice(0, 4).map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/resources/careers/${guide.slug}`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-750 hover:bg-slate-100/50 text-xs font-extrabold flex justify-between items-center transition-all cursor-pointer"
                  >
                    {guide.title}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/resources/careers/become-mern-developer`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
            >
              Explore all career guides
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Section 4: Salary Guides */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-6 shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Salary Guides</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Understand average market compensation, bands, and experience metrics.
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                {Object.values(SALARY_GUIDES).map((guide) => (
                  <Link
                    key={guide.slug}
                    href={`/resources/salaries/${guide.slug}`}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-750 hover:bg-slate-100/50 text-xs font-extrabold flex justify-between items-center transition-all cursor-pointer"
                  >
                    {guide.title}
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/resources/salaries/mern-developer-salary`}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
            >
              Explore salary guides
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Section 5: Free PDF Downloads & Cheat Sheets */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Free PDF Cheat Sheets</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Downloadable reference cheat sheets, worksheets, and developer tools.
              </p>
              
              <div className="flex flex-col gap-2 mb-6">
                {cheatSheets.map((sheet) => (
                  <a
                    key={sheet.url}
                    href={sheet.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100/50 text-xs font-semibold flex justify-between items-center transition-all cursor-pointer"
                  >
                    {sheet.title}
                    <FileText className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Direct downloads enabled
            </span>
          </div>

          {/* Section 6: Interactive Developer Tools */}
          <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-6 shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-heading font-extrabold text-slate-900 mb-3">Interactive Tools</h2>
              <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6">
                Test your skills, audit your resume, calculate salaries, and plan roadmaps.
              </p>
              
              <div className="flex flex-col gap-3 mb-6">
                <Link
                  href="/tools?tab=resume"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100 hover:text-primary text-xs font-extrabold transition-all cursor-pointer"
                >
                  Resume Score Checker
                </Link>
                <Link
                  href="/tools?tab=salary"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100 hover:text-primary text-xs font-extrabold transition-all cursor-pointer"
                >
                  Salary Calculator
                </Link>
                <Link
                  href="/tools?tab=roadmap"
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100 hover:text-primary text-xs font-extrabold transition-all cursor-pointer"
                >
                  Tech Career Roadmap Planner
                </Link>
              </div>
            </div>

            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
            >
              Explore all tools
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
