'use client';

import { Handshake, Building2, Users, GraduationCap, ChevronRight, Send } from 'lucide-react';
import { useState } from 'react';

const PARTNERSHIP_TYPES = [
  { icon: Building2, title: 'Talent Acquisition', desc: 'Access our highly skilled, pre-vetted developer talent pool. Hire graduates trained in full-stack web, data science, and AI workflows.' },
  { icon: Users, title: 'Corporate Training', desc: 'Upskill your existing engineering and product workforces with modern, customized tracks led by top tech leaders.' },
  { icon: GraduationCap, title: 'Academic Collaboration', desc: 'Integrate our industry curriculum or run co-branded bootcamps and certifications at your university.' },
];

export default function PartnersPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    alert('Thank you for your partnership inquiry! Our relations team will contact you within 24 hours.');
  };

  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* Left Column - Detailed Partnership Offerings */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-[11px] text-primary uppercase font-extrabold tracking-widest bg-blue-50 border border-blue-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5" /> Corporate Relations
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mt-4 mb-4 tracking-tight">
                Partner with KodeToCareer
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Connect your organization with top tech talent, upskill your current engineers, or collaborate on curriculum design.
              </p>
            </div>

            <div className="space-y-6">
              {PARTNERSHIP_TYPES.map((type, idx) => {
                const Icon = type.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm hover:border-primary/20 transition-all duration-300 flex gap-5 border-glow-animate-light"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-slate-800 text-lg mb-2">{type.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-medium">{type.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Intake / Inquiry Form Widget */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-[28px] border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-md">
              <h2 className="text-2xl font-heading font-bold text-slate-800 mb-2">
                Inquire About Partnerships
              </h2>
              <p className="text-slate-500 text-xs mb-6 font-semibold">
                Submit this form, and our corporate relations team will connect with you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Jane Doe" 
                    className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Corporate Email</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="jane@company.com" 
                      className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Company Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Acme Corp" 
                      className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Partnership Interest</label>
                  <select 
                    required
                    className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                  >
                    <option value="">Select interest...</option>
                    <option value="hiring">Hiring Talent / Recruitment</option>
                    <option value="training">Corporate Workforce Upskilling</option>
                    <option value="academic">University Curriculum & Bootcamps</option>
                    <option value="other">Other Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1.5">Message / Inquiry Details</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Tell us about your organization's talent needs or upskilling goals..."
                    className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-850 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-6 py-3.5 rounded-xl font-bold hover:opacity-95 transition-opacity shadow-lg shadow-primary/10 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
