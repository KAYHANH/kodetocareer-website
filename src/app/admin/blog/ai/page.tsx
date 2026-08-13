'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Sparkles, CheckCircle, FileEdit, AlertCircle, Wand2 
} from 'lucide-react';

const CATEGORIES = [
  'AI', 'Programming', 'Career', 'Interview', 
  'Data Science', 'Web Development', 'Placement', 'DevOps', 'Python', 'MERN'
];

const COURSES = [
  { slug: 'mern-stack-development', name: 'MERN Stack Development' },
  { slug: 'data-science-machine-learning', name: 'Data Science & ML' },
  { slug: 'python-full-stack-development', name: 'Python Full Stack' },
  { slug: 'ui-ux-design-course', name: 'UI/UX Design' },
  { slug: 'cloud-devops-engineering', name: 'Cloud & DevOps' }
];

export default function AiDraftGeneratorPage() {
  const router = useRouter();

  const [topic, setTopic] = useState('Top 7 MERN Stack Career Opportunities in India for 2026');
  const [keyword, setKeyword] = useState('MERN Stack Career India');
  const [audience, setAudience] = useState('B.Tech / BCA Students and Freshers');
  const [category, setCategory] = useState('Web Development');
  const [targetCourse, setTargetCourse] = useState('mern-stack-development');
  const [tone, setTone] = useState('Educational, Practical & Encouraging');
  const [wordCount, setWordCount] = useState(800);

  const [generating, setGenerating] = useState(false);
  const [resultPost, setResultPost] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a target topic.');
      return;
    }

    setGenerating(true);
    setError(null);
    setResultPost(null);

    try {
      const res = await fetch('/api/admin/blog/generate-ai-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          keyword,
          audience,
          category,
          targetCourse,
          tone,
          wordCount
        })
      });

      const data = await res.json();
      if (data.success && data.post) {
        setResultPost(data.post);
      } else {
        setError(data.error || 'Failed to generate AI draft.');
      }
    } catch (err: any) {
      setError(err.message || 'Error communicating with AI endpoint.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-6 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-heading font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" /> AI Article Draft Generator
              </h1>
              <p className="text-xs text-slate-400">Generate structured educational drafts saved strictly as DRAFT for admin review.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Generator Form */}
        <form onSubmit={handleGenerate} className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Article Topic / Title Idea *</label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How to Master Data Science in 2026: Roadmap for Beginners"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Primary Target Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Data Science Roadmap 2026"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Audience</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Target Course CTA</label>
              <select
                value={targetCourse}
                onChange={(e) => setTargetCourse(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
              >
                {COURSES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={generating}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-primary hover:from-indigo-500 hover:to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Wand2 className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              {generating ? 'Generating AI Draft...' : 'Generate AI Article Draft'}
            </button>
          </div>
        </form>

        {/* Generation Result Banner */}
        {resultPost && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle className="w-5 h-5" /> AI Draft Created Successfully!
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">{resultPost.title}</h3>
              <p className="text-xs text-slate-400 font-mono">Status: <span className="text-amber-400 font-bold uppercase">{resultPost.status}</span> (Saved in database)</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-emerald-500 pl-3">
              {resultPost.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => router.push(`/admin/blog/edit/${resultPost.id}`)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <FileEdit className="w-4 h-4" /> Review & Edit Draft
              </button>
              <Link
                href="/admin/blog"
                className="px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:text-white"
              >
                Go to Blog Dashboard
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
