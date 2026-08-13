'use client';

import { HelpCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface AeoAnswerBlockProps {
  question: string;
  answer: string;
  keyPoints?: string[];
  courseName?: string;
  authorName?: string;
}

export default function AeoAnswerBlock({
  question,
  answer,
  keyPoints = [],
  courseName,
  authorName = 'Md Arbaaz (Lead Tech Instructor at KodeToCareer)'
}: AeoAnswerBlockProps) {
  return (
    <section 
      data-aeo="true"
      data-aeo-category="answer-engine-optimization"
      className="my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-slate-100 shadow-xl space-y-4 relative overflow-hidden"
    >
      {/* Decorative Badge */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Verified Quick Answer (AEO / GEO)
        </div>
        <span className="text-[10px] font-mono text-slate-400">KodeToCareer Knowledge Base</span>
      </div>

      {/* Question */}
      <div className="space-y-1">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-primary" /> Question:
        </h3>
        <p className="text-sm font-heading font-extrabold text-white leading-snug">
          {question}
        </p>
      </div>

      {/* Answer */}
      <div className="space-y-1 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
          Direct Answer & Fact Summary:
        </span>
        <p className="text-xs text-slate-200 font-medium leading-relaxed">
          {answer}
        </p>
      </div>

      {/* Key Points */}
      {keyPoints.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Key Verified Takeaways:
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-semibold">
            {keyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attribution */}
      <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span>Source: KodeToCareer Learning Institute</span>
        <span>Authored by {authorName}</span>
      </div>
    </section>
  );
}
