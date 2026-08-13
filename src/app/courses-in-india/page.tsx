import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { COURSES_MAP, LOCATIONS } from '@/data/seo-intents';
import { companyStats } from '@/data/company-stats';
import { CheckCircle2, MapPin, Sparkles, Award, ArrowRight, Laptop, Briefcase, GraduationCap, Building } from 'lucide-react';
import JsonLdSchema from '@/components/layout/json-ld';
import SchemaMarkup from '@/components/seo/schema-markup';

export const metadata = {
  title: 'Career-Focused Professional Tech Courses in India | KodeToCareer',
  description: 'Explore live practical tech training programs in MERN Stack, Python, Data Science, Data Analytics, Java, Cloud DevOps, and UI/UX across 28+ Indian tech hubs & online.',
  keywords: 'Courses in India, Tech Training India, Software Engineering Bootcamp India, Data Science Course India, Online Coding Institute India',
};

export default function CoursesInIndiaPage() {
  const courseList = Object.values(COURSES_MAP);
  const locationEntries = Object.entries(LOCATIONS).filter(([key]) => key !== 'online' && key !== 'india');

  const itemListSchema = {
    itemListElement: courseList.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `https://kodetocareer.com/courses/${c.slug}`,
      description: c.tagline
    }))
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <JsonLdSchema />
      <SchemaMarkup type="ItemList" data={itemListSchema} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> National Education Platform • India
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Career-Focused Professional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              Tech Courses in India
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Accelerate your software engineering, data science, and cloud career through live project-driven cohorts, 
            guaranteed paid internships, and direct placement support across 300+ hiring partners in India.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-cyan-400">{companyStats.studentsEnrolled}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Students Enrolled</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-emerald-400">{companyStats.placementsRate}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Placement Success Rate</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-purple-400">{companyStats.hiringPartners}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Corporate Hiring Partners</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-blue-400">{companyStats.highestSalaryPackage}</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Highest CTC Offered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Explore Industry-Ready Courses</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Choose your specialization track. All programs include live lectures, 1-on-1 mentorship, GitHub portfolio building, and job guarantee policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <div 
              key={course.slug} 
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800/50">
                    {course.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400">💳 {course.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {course.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.tech.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">⏱️ {course.duration}</span>
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View Syllabus <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* City Landing Pages Hub */}
      <section className="py-16 bg-slate-900/60 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-cyan-400" /> Geographic Presence & Learning Hubs
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Find Courses by City</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Select your city to view local tech ecosystem insights, campus details, regional hiring partners, and online cohort schedules.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {locationEntries.map(([slug, loc]: [string, any]) => (
              <Link
                key={slug}
                href={`/courses/mern-stack-development/location/${slug}`}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-center transition-all group hover:bg-slate-900 flex flex-col justify-between"
              >
                <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {loc.name}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800/40">
                    {loc.tier || 'Tier 2'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium">
                    {loc.region}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/online-courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Laptop className="w-4 h-4" /> Prefer 100% Interactive Online Learning? Explore Online Batches
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
