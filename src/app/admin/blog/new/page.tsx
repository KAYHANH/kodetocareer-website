'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Save, Eye, Sparkles, CheckCircle2, AlertTriangle, 
  HelpCircle, Plus, Trash2, Globe, Image as ImageIcon, Link as LinkIcon 
} from 'lucide-react';
import { BlogStatus } from '@/lib/blog/types';
import { AUTHORS } from '@/lib/blog/authors';

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

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [tags, setTags] = useState('React, Next.js, Web Development');
  const [authorId, setAuthorId] = useState('md-arbaaz');
  const [featuredImage, setFeaturedImage] = useState('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop');
  const [imageAlt, setImageAlt] = useState('');
  const [status, setStatus] = useState<BlogStatus>('draft');
  const [publishedAt, setPublishedAt] = useState('');
  const [relatedCourseSlug, setRelatedCourseSlug] = useState('mern-stack-development');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([
    { question: '', answer: '' }
  ]);

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (autoSlug) {
      const generated = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generated);
    }
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const handleSave = async (targetStatus?: BlogStatus) => {
    const finalStatus = targetStatus || status;
    if (!title.trim()) {
      setError('Article title is required.');
      return;
    }
    if (!content.trim()) {
      setError('Article content is required.');
      return;
    }

    setSaving(true);
    setError(null);

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

    try {
      const res = await fetch('/api/admin/blog/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          tags: tagsArray,
          authorId,
          featuredImage,
          imageAlt: imageAlt || title,
          status: finalStatus,
          publishedAt: finalStatus === 'published' ? (publishedAt || new Date().toISOString()) : publishedAt,
          relatedCourseSlug,
          seoTitle: seoTitle || `${title} | KodeToCareer`,
          seoDescription: seoDescription || excerpt || title,
          isFeatured,
          faqs: validFaqs
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin/blog');
      } else {
        setError(data.error || 'Failed to save post.');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server.');
    } finally {
      setSaving(false);
    }
  };

  // SEO Quality Checks
  const seoTitleLength = (seoTitle || title).length;
  const seoDescLength = (seoDescription || excerpt).length;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const hasH2 = content.includes('## ');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-6 pb-20 px-6 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl font-heading font-bold text-white">Create New Article</h1>
              <p className="text-xs text-slate-400">Write, structure, and publish a new publication.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTab === 'editor' ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                  activeTab === 'preview' ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>

            <button
              onClick={() => handleSave('draft')}
              disabled={saving}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-extrabold shadow-lg shadow-primary/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" /> {saving ? 'Publishing...' : 'Publish Now'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'preview' ? (
          /* Live Article Preview */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs text-slate-500 font-mono uppercase">Preview Mode</span>
              <span className="px-2.5 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold">{category}</span>
            </div>

            <h1 className="text-3xl font-heading font-black text-white leading-tight">{title || 'Untitled Article'}</h1>
            
            <div className="flex items-center gap-4 text-xs text-slate-400 border-y border-slate-800/80 py-3">
              <span>Author: {AUTHORS[authorId]?.name || 'Md Arbaaz'}</span>
              <span>•</span>
              <span>Category: {category}</span>
              <span>•</span>
              <span>Words: {wordCount}</span>
            </div>

            {featuredImage && (
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 relative">
                <img src={featuredImage} alt={imageAlt || title} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed italic font-medium border-l-2 border-primary pl-4">
              {excerpt || 'Article summary excerpt will appear here...'}
            </p>

            <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-4 font-normal">
              {content ? (
                content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-2">{block.replace('## ', '')}</h2>;
                  if (block.startsWith('### ')) return <h3 key={idx} className="text-base font-bold text-slate-200 mt-4 mb-2">{block.replace('### ', '')}</h3>;
                  return <p key={idx} className="leading-relaxed">{block}</p>;
                })
              ) : (
                <p className="text-slate-500 italic">No content written yet...</p>
              )}
            </div>
          </div>
        ) : (
          /* Editor Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Content Fields (Spans 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Title & Slug */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Article Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. Best MERN Stack Career Roadmap for BCA Students in 2026"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-300">URL Slug *</label>
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSlug}
                        onChange={(e) => setAutoSlug(e.target.checked)}
                        className="rounded"
                      />
                      Auto-generate from title
                    </label>
                  </div>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden px-3">
                    <span className="text-xs text-slate-500 font-mono">https://kodetocareer.com/blog/</span>
                    <input
                      type="text"
                      disabled={autoSlug}
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-transparent border-none px-1 py-2.5 text-xs text-primary font-mono focus:outline-none disabled:opacity-80"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Excerpt / Meta Summary</label>
                  <textarea
                    rows={2}
                    placeholder="Brief 1-2 sentence summary of the article..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Main Content Markdown Editor */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-300">Article Content (Markdown Supported) *</label>
                  <span className="text-[10px] font-mono text-slate-500">{wordCount} words</span>
                </div>
                <textarea
                  rows={16}
                  placeholder="Write your article here... Support H2 (##), H3 (###), bullet points (-), code blocks, and links."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed placeholder:text-slate-600 focus:outline-none focus:border-primary/60"
                />
              </div>

              {/* FAQ Section Editor */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-primary" /> Article FAQs (For AEO / Voice Search)
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">Adds structured FAQPage schema for Google Featured Snippets & AI answers.</p>
                  </div>
                  <button
                    onClick={handleAddFaq}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800/80 p-3.5 rounded-xl space-y-2.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">FAQ #{idx + 1}</span>
                        {faqs.length > 1 && (
                          <button onClick={() => handleRemoveFaq(idx)} className="text-slate-500 hover:text-rose-400 text-xs">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Question (e.g. Is MERN stack good for freshers?)"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer..."
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Settings & SEO Quality Check (Spans 4) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Publishing & Metadata Card */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">Publishing Settings</h3>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BlogStatus)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Author</label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    {Object.values(AUTHORS).map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Target Course CTA</label>
                  <select
                    value={relatedCourseSlug}
                    onChange={(e) => setRelatedCourseSlug(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  >
                    {COURSES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Tags (Comma-separated)</label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Featured Cover Image URL</label>
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded"
                  />
                  Mark as Featured Article (Top Banner)
                </label>
              </div>

              {/* SEO Meta Box */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">Search Engine Optimization</h3>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-slate-400">SEO Meta Title</label>
                    <span className={`text-[10px] font-mono ${seoTitleLength > 60 ? 'text-rose-400' : 'text-slate-500'}`}>
                      {seoTitleLength}/60 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Leave blank to use main title"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-slate-400">SEO Meta Description</label>
                    <span className={`text-[10px] font-mono ${seoDescLength > 160 ? 'text-rose-400' : 'text-slate-500'}`}>
                      {seoDescLength}/160 chars
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Leave blank to use excerpt"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              {/* SEO Quality Checker Box */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SEO Quality Audit
                </h3>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2">
                    {title.length > 10 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span className={title.length > 10 ? 'text-slate-300' : 'text-amber-400'}>Title present ({title.length} chars)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {wordCount >= 300 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span className={wordCount >= 300 ? 'text-slate-300' : 'text-amber-400'}>Word count: {wordCount} (300+ recommended)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasH2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span className={hasH2 ? 'text-slate-300' : 'text-amber-400'}>Subheadings (## H2) included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {faqs.some(f => f.question) ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    <span className={faqs.some(f => f.question) ? 'text-slate-300' : 'text-amber-400'}>FAQ schema attached</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
