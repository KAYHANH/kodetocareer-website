"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Map, Sparkles, Code2, Database, Download, X, CheckCircle2 } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  category: string;
  icon: any;
  pages: number;
  downloads: string;
  colorClass: string;
}

const RESOURCES: Resource[] = [
  {
    id: "resume-tmp",
    title: "ATS-Optimized Software Resume",
    category: "Career Resource",
    icon: FileText,
    pages: 2,
    downloads: "4.2k",
    colorClass: "from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-100",
  },
  {
    id: "roadmap-guide",
    title: "2026 Developer Career Roadmaps",
    category: "Ebook Guide",
    icon: Map,
    pages: 42,
    downloads: "8.9k",
    colorClass: "from-violet-500/10 to-purple-500/10 text-violet-600 border-violet-100",
  },
  {
    id: "interview-prep",
    title: "Top 100 System Design Questions",
    category: "Interview Prep",
    icon: Sparkles,
    pages: 25,
    downloads: "6.1k",
    colorClass: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-100",
  },
  {
    id: "git-guide",
    title: "Modern Git & GitHub Guide",
    category: "Cheat Sheet",
    icon: Code2,
    pages: 5,
    downloads: "3.5k",
    colorClass: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-100",
  },
  {
    id: "sql-cheat",
    title: "SQL & Relational DB Cheat Sheet",
    category: "Cheat Sheet",
    icon: Database,
    pages: 6,
    downloads: "5.0k",
    colorClass: "from-rose-500/10 to-pink-500/10 text-rose-600 border-rose-100",
  },
];

export default function FreeResources() {
  const [activeDownload, setActiveDownload] = useState<Resource | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const triggerDownload = (resource: Resource) => {
    setActiveDownload(resource);
    setDownloadSuccess(false);
    setEmailInput("");
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setActiveDownload(null);
        setDownloadSuccess(false);
      }, 2000);
    }, 1500);
  };

  return (
    <section 
      className="py-24 bg-slate-50/50 relative overflow-hidden border-y border-slate-100" 
      aria-labelledby="free-resources-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-100/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
            ACADEMY LEAD MAGNETS
          </p>
          <h2 
            id="free-resources-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Free Engineering & Career Resources
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">
            Gain immediate access to premium blueprints, optimized resume templates, and cheat sheets reviewed by industry engineering managers.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {RESOURCES.map((res) => {
            const Icon = res.icon;
            
            return (
              <div
                key={res.id}
                className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.01)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.04)] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${res.colorClass} border flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    {res.category}
                  </span>

                  <h3 className="text-sm font-extrabold text-slate-800 leading-snug group-hover:text-primary transition-colors min-h-[40px] line-clamp-2">
                    {res.title}
                  </h3>
                </div>

                <div className="mt-6 border-t border-slate-50 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>{res.pages} Pages</span>
                    <span>{res.downloads} Downloads</span>
                  </div>

                  <button
                    onClick={() => triggerDownload(res)}
                    className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Guide
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog for Lead Capture */}
      <AnimatePresence>
        {activeDownload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setActiveDownload(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
                aria-label="Close download dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 border-b border-slate-50 pb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeDownload.colorClass} border flex items-center justify-center`}>
                  <Download className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest block leading-none">Instant PDF access</span>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1 leading-none">{activeDownload.title}</h4>
                </div>
              </div>

              {downloadSuccess ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h5 className="text-base font-extrabold text-slate-900">Download Link Sent!</h5>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                    Check your email inbox. We have dispatched your PDF resource download link directly to you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Provide your professional email address to secure your free copies instantly.
                  </p>

                  <div className="space-y-1">
                    <label htmlFor="modal-email" className="sr-only">Email address</label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full h-11 border border-slate-200 bg-slate-50 px-4 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/40"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-primary/10 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4.5 h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending Link...
                      </>
                    ) : (
                      <>
                        Get Download Link <Download className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
