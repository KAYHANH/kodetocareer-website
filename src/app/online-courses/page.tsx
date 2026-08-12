import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { COURSES_MAP } from '@/data/seo-intents';
import { companyStats } from '@/data/company-stats';
import { Laptop, CheckCircle2, Video, ShieldCheck, ArrowRight, Clock, Users, Award, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Online Coding Courses with Placement Support India | KodeToCareer',
  description: 'Join live online interactive tech cohorts in Full Stack, Data Science, AI, and DevOps. Learn from anywhere in India with 1-on-1 mentorship and guaranteed paid internships.',
  keywords: 'Online Coding Courses India, Live Online Developer Program, Online MERN Stack Course, Online Data Science Training India',
};

export default function OnlineCoursesPage() {
  const courseList = Object.values(COURSES_MAP);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-blue-400" /> 100% Live Interactive Cohorts • Pan-India
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Online Coding & Tech Courses <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
              With Guaranteed Internships in India
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Attend live interactive evening & weekend batches from any city in India. Build production software, get 1-on-1 code reviews, and land high-paying roles through our 300+ corporate hiring partners.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left mb-8">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
              <div>
                <div className="text-sm font-bold text-white">Live Mentor Q&A</div>
                <div className="text-xs text-slate-400">Daily dedicated doubt-clearing sessions</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Award className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <div className="text-sm font-bold text-white">Paid Internships</div>
                <div className="text-xs text-slate-400">{companyStats.internshipGuarantee}</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Users className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
              <div>
                <div className="text-sm font-bold text-white">300+ Placement Leads</div>
                <div className="text-xs text-slate-400">Direct interview schedules with top IT hubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Programs Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Live Online Certification Programs</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Choose your specialization track. All online programs offer recording access, LMS dashboards, active Discord developer communities, and placement assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <div key={course.slug} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 px-2.5 py-1 rounded-md bg-blue-950 border border-blue-800/50">
                    Online Live Cohort
                  </span>
                  <span className="text-xs font-mono text-emerald-400">💳 {course.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {course.tagline}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
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
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Enroll Online <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online FAQ Section */}
      <section className="py-16 bg-slate-900/60 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about our online live cohorts</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">Are the online classes recorded or live?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                All classes are 100% live and interactive with real industry instructors. Every session is recorded in HD and uploaded to your personal student LMS portal within 2 hours for lifetime replay.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">How does the guaranteed internship work for online students?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Upon completing course capstone projects, online students are assigned to live remote internship projects under senior tech leads, receiving verified experience certificates and stipends.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-2">Can working professionals and college students manage the timings?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Yes! We offer flexible Evening Batches (8:00 PM - 10:00 PM) and Weekend Batches (Sat-Sun) specifically designed for working professionals and university students.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
