'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Clock, Play, Award, CheckCircle, 
  ArrowRight, Sparkles, Send, Sparkle, Star, ExternalLink 
} from 'lucide-react';
import { LEARN_HUBS } from '../learn-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LearnHubClient({ params }: PageProps) {
  const resolvedParams = use(params);
  const hub = LEARN_HUBS[resolvedParams.slug];

  // Lead capture states
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!hub) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-slate-800 p-6 text-center">
        <h1 className="text-3xl font-heading font-black text-slate-900 mb-4">Hub Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">The requested technology learning hub could not be found.</p>
        <Link href="/courses" className="inline-flex h-11 items-center justify-center bg-primary text-white px-6 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">
          Browse Courses
        </Link>
      </div>
    );
  }

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      // Mock submit to sheet Webapp URL if configured, or just standard delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
      // Trigger file download
      const link = document.createElement('a');
      link.href = '#'; // Mock download link
      link.setAttribute('download', `${hub.slug}-guide-pdf`);
      document.body.appendChild(link);
      // Clean up
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Google Reviews mockup (embedded directly inside)
  const MOCK_REVIEWS = [
    {
      name: "Rohit Sharma",
      role: "System Engineer at TCS",
      text: `Completing the KodeToCareer technology hub and course got me ready for actual production environments. The mentorship sessions were outstanding!`,
      rating: 5,
      date: "2 weeks ago"
    },
    {
      name: "Ananya Iyer",
      role: "Associate Developer at Deloitte",
      text: `Highly practical approach. Building 15+ live projects helped me clear all my interview rounds. It's not just a coaching center, it's an actual elite academy.`,
      rating: 5,
      date: "1 month ago"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-800 pb-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-[0.015] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="pt-8">
          <Link 
            href="/courses" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Courses
          </Link>
        </div>

        {/* ── 1. Hero Header ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-black uppercase tracking-wider">
              <Sparkle className="w-3.5 h-3.5" /> AI-Powered Tech Learning
            </span>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-slate-900 leading-tight">
              Learn <span className="gradient-text">{hub.title}</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed">
              {hub.tagline} {hub.overview}
            </p>
            <div className="flex flex-wrap gap-3">
              {hub.whyLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 max-w-md bg-white/70 border border-slate-200/50 p-3 rounded-xl shadow-sm text-xs text-slate-650 font-semibold leading-relaxed backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Capture Widget (Bento Style) */}
          <div className="lg:col-span-5 glass-premium rounded-[32px] border-glow-animate-light p-8 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[350px]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
            
            <div className="space-y-4">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Free Resource Download</span>
              <h3 className="font-heading font-extrabold text-slate-800 text-xl">
                Get free {hub.title} Career Guide & Roadmap PDF
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Step-by-step master plan, cheat sheets, interview preparation templates, and recommended projects compiled by engineering leads.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-4 text-center font-bold text-xs space-y-2">
                <CheckCircle className="w-6 h-6 text-emerald-500 mx-auto" />
                <p>Check your email! Download has started.</p>
              </div>
            ) : (
              <form onSubmit={handleDownload} className="space-y-3 mt-8">
                <input
                  type="email"
                  required
                  placeholder="Enter your professional email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary/50 transition-all font-semibold"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex h-12 items-center justify-center gap-2 bg-primary text-white rounded-xl text-xs font-black hover:bg-blue-700 transition-colors shadow-md shadow-primary/10 cursor-pointer"
                >
                  {loading ? 'Processing...' : 'Send Free Guide PDF'}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── 2. Bento Grid: Tutorials & Projects ── */}
        <section className="space-y-8">
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900">
            Interactive Learning Resources
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Tutorials Box (Spans 7) */}
            <div className="lg:col-span-7 glass-premium rounded-[32px] border-glow-animate-light p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Curated Tutorials
              </h3>

              <div className="space-y-6">
                {hub.tutorials.map((tut, idx) => (
                  <div key={idx} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-slate-800">{tut.title}</h4>
                      <div className="flex gap-2">
                        <span className="bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-500 px-2.5 py-0.5 rounded">
                          {tut.duration}
                        </span>
                        <span className="bg-primary/5 border border-primary/10 text-[9px] font-bold text-primary px-2.5 py-0.5 rounded">
                          {tut.level}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {tut.description}
                    </p>
                    <ul className="space-y-2 pl-4 text-xs text-slate-600 font-semibold">
                      {tut.steps.map((step, sIdx) => (
                        <li key={sIdx} className="list-disc leading-relaxed">{step}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase Project Box (Spans 5) */}
            <div className="lg:col-span-5 glass-premium rounded-[32px] border-glow-animate-light p-8 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[9px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded border border-primary/10 uppercase tracking-widest inline-block">
                  Practice Project
                </span>
                <h3 className="font-heading font-bold text-slate-800 text-lg">
                  {hub.projects[0].title}
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  {hub.projects[0].description}
                </p>
                <div className="pt-2">
                  <h4 className="text-xs font-extrabold text-slate-700 mb-2">Key Implementation Deliverables:</h4>
                  <ul className="space-y-2 text-xs text-slate-650 font-semibold pl-4">
                    {hub.projects[0].objectives.map((obj, oIdx) => (
                      <li key={oIdx} className="list-disc leading-relaxed">{obj}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Project Difficulty</span>
                <span className="text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded uppercase">
                  {hub.projects[0].difficulty}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ── 3. Google Reviews Embed Section ── */}
        <section className="glass-premium rounded-[32px] border-glow-animate-light p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/50">
            <div>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900">Verified Google Reviews</h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">Real reviews and ratings left by alumni from our tech academy.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-800 font-mono">4.9</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-semibold">(180+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_REVIEWS.map((rev, rIdx) => (
              <div key={rIdx} className="bg-white/50 border border-slate-200/50 p-6 rounded-2xl space-y-4 backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-heading font-black text-sm flex items-center justify-center">
                      {rev.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 leading-none">{rev.name}</h4>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-1">{rev.role}</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed italic">
                  "{rev.text}"
                </p>
                <span className="text-[9px] text-slate-400 font-bold block text-right">{rev.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. Core Link to related placement Course ── */}
        <section className="bg-gradient-to-br from-primary to-secondary text-white rounded-[32px] p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white inline-block">
              PLACEMENT ACADEMY COURSE
            </span>
            <h2 className="font-heading font-extrabold text-2xl md:text-3.5xl tracking-tight text-white leading-tight">
              Ready to turn {hub.title} into a Career?
            </h2>
            <p className="text-white/80 font-semibold text-xs md:text-sm leading-relaxed">
              Join our full {hub.relatedCourse.name} program. Get complete curriculum access, 1-on-1 industry mentorship, 15+ live code sprints, paid internship, and corporate referral pipelines.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <Link
              href={`/courses/${hub.relatedCourse.slug}`}
              className="w-full md:w-auto inline-flex items-center justify-between gap-4 bg-white hover:bg-slate-50 text-[#2563EB] font-bold px-8 py-4.5 rounded-2xl transition-all shadow-md text-sm cursor-pointer"
            >
              Explore Full Course
              <ExternalLink className="w-4 h-4 text-[#2563EB]" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
