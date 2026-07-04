'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const JOBS = [
  { title: 'Technical Instructor (React/Full Stack)', department: 'Academics', location: 'Remote / Bangalore', type: 'Full-time' },
  { title: 'AI Content Specialist', department: 'Academics', location: 'Remote', type: 'Part-time / Contract' },
  { title: 'Corporate Relations Executive', department: 'Placement Cell', location: 'Bangalore', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[-150px] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto px-6 relative z-10">
        <h1 className="text-4xl font-heading font-bold text-white mb-4">Join Our Team</h1>
        <p className="text-text-secondary text-lg mb-12">Help us build the future of tech education and career transformation.</p>

        <div className="space-y-6">
          {JOBS.map((job, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-white/5 border border-white/[0.08] hover:border-primary/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] text-accent uppercase font-bold tracking-wider">{job.department}</span>
                <h3 className="text-lg font-heading font-bold text-white mt-1">{job.title}</h3>
                <div className="flex gap-4 mt-3 text-xs text-text-secondary/70">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-primary" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-secondary" /> {job.type}</span>
                </div>
              </div>
              <button 
                onClick={() => alert('Application form coming soon! Email your resume to careers@kodetocareer.com')} 
                className="bg-white/5 hover:bg-primary border border-white/[0.08] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all self-start md:self-auto cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
