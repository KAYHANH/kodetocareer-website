'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle2, Star, ShieldCheck, Heart } from 'lucide-react';

const JOBS = [
  { title: 'Technical Instructor (React/Full Stack)', department: 'Academics', location: 'Remote / Bangalore', type: 'Full-time' },
  { title: 'AI Content Specialist', department: 'Academics', location: 'Remote', type: 'Part-time / Contract' },
  { title: 'Corporate Relations Executive', department: 'Placement Cell', location: 'Bangalore', type: 'Full-time' },
];

const BENEFITS = [
  { icon: Heart, title: 'Health & Wellness', desc: 'Comprehensive health coverage and mental well-being support.' },
  { icon: ShieldCheck, title: 'Flexible Remote Work', desc: 'Choose your work environment: fully remote, hybrid, or in-office.' },
  { icon: Star, title: 'Growth Budget', desc: 'Annual learning allowance for courses, books, and conferences.' },
  { icon: CheckCircle2, title: 'Real Student Impact', desc: 'Directly empower students from tier-2/3 cities to land high-paying roles.' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[11px] text-primary uppercase font-extrabold tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
            WE ARE HIRING
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mt-4 mb-4">
            Join Our Mission
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Help us build the future of tech education and democratize access to high-paying software careers.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Job Openings (60% width span on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-slate-800 mb-2">
              Open Positions ({JOBS.length})
            </h2>
            <div className="space-y-4">
              {JOBS.map((job, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-glow-animate-light"
                >
                  <div>
                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{job.department}</span>
                    <h3 className="text-lg font-heading font-bold text-slate-800 mt-1">{job.title}</h3>
                    <div className="flex gap-4 mt-3 text-xs text-slate-500 font-bold">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {job.type}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Application form coming soon! Email your resume to careers@kodetocareer.com')} 
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-all self-start sm:self-auto cursor-pointer"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Benefits & Culture (40% width span on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-heading font-bold text-slate-800 mb-2">
              Why You'll Love It Here
            </h2>
            <div className="p-8 rounded-[28px] border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-sm space-y-6">
              {BENEFITS.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-slate-800 text-base">{benefit.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
              
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/10 mt-4">
                <h4 className="font-heading font-bold text-slate-800 text-sm">Don't see a matching role?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed font-medium">
                  We are always looking for smart, passionate builders. Drop your resume at{' '}
                  <a href="mailto:info@kodetocareer.com" className="text-primary font-bold hover:underline">
                    info@kodetocareer.com
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
