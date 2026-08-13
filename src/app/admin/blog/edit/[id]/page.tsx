'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Save, Eye, CheckCircle2, AlertTriangle, 
  HelpCircle, Plus, Trash2, Archive, CheckCircle 
} from 'lucide-react';
import { BlogPost, BlogStatus } from '@/lib/blog/types';
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

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [originalSlug, setOriginalSlug] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [tags, setTags] = useState('');
  const [authorId, setAuthorId] = useState('md-arbaaz');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [status, setStatus] = useState<BlogStatus>('draft');
  const [publishedAt, setPublishedAt] = useState('');
  const [relatedCourseSlug, setRelatedCourseSlug] = useState('mern-stack-development');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [faqs, setFaqs] = useState<Array<{ question: string; answer: string }>>([]);

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/admin/blog/posts?id=${id}`);
        const data = await res.json();
        if (data.success && data.post) {
          const post: BlogPost = data.post;
          setTitle(post.title);
          setSlug(post.slug);
          setOriginalSlug(post.slug);
          setExcerpt(post.excerpt || '');
          setContent(post.content || '');
          setCategory(post.category || 'Web Development');
          setTags((post.tags || []).join(', '));
          setAuthorId(post.authorId || 'md-arbaaz');
          setFeaturedImage(post.featuredImage || '');
          setImageAlt(post.imageAlt || '');
          setStatus(post.status || 'draft');
          setPublishedAt(post.publishedAt || '');
          setRelatedCourseSlug(post.relatedCourseSlug || 'mern-stack-development');
          setSeoTitle(post.seoTitle || '');
          setSeoDescription(post.seoDescription || '');
          setIsFeatured(post.isFeatured || false);
          setFaqs(post.faqs || []);
        } else {
          setError('Failed to load article details.');
        }
      } catch (err) {
        setError('Error connecting to server.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

    setSaving(true);
    setError(null);

    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    const validFaqs = faqs.filter(f => f.question.trim() && f.answer.trim());

    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'PUT',
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
        setError(data.error || 'Failed to update post.');
      }
    } catch (err: any) {
      setError(err.message || 'Error connecting to server.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center text-xs text-slate-500 font-medium">
        Loading article for editing...
      </div>
    );
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const isSlugChanged = originalSlug && slug !== originalSlug;

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
              <h1 className="text-xl font-heading font-bold text-white">Edit Article</h1>
              <p className="text-xs text-slate-400 font-mono">ID: {id}</p>
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
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Update & Publish'}
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        {isSlugChanged && (
          <div className="p-4 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Slug Changed:</strong> Updating the URL slug from <code>{originalSlug}</code> to <code>{slug}</code> will automatically create a 301 redirect to preserve SEO rankings.
            </span>
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
              {excerpt}
            </p>

            <div className="prose prose-invert max-w-none text-xs text-slate-300 space-y-4 font-normal">
              {content ? (
                content.split('\n\n').map((block, idx) => {
                  if (block.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-2">{block.replace('## ', '')}</h2>;
                  if (block.startsWith('### ')) return <h3 key={idx} className="text-base font-bold text-slate-200 mt-4 mb-2">{block.replace('### ', '')}</h3>;
                  return <p key={idx} className="leading-relaxed">{block}</p>;
                })
              ) : (
                <p className="text-slate-500 italic">No content written...</p>
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">URL Slug *</label>
                  <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl overflow-hidden px-3">
                    <span className="text-xs text-slate-500 font-mono">https://kodetocareer.com/blog/</span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-transparent border-none px-1 py-2.5 text-xs text-primary font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Excerpt / Meta Summary</label>
                  <textarea
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-primary"
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-primary/60"
                />
              </div>

              {/* FAQ Section Editor */}
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-primary" /> Article FAQs (For AEO / Voice Search)
                    </h3>
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
                        <button onClick={() => handleRemoveFaq(idx)} className="text-slate-500 hover:text-rose-400 text-xs">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Question"
                        value={faq.question}
                        onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        placeholder="Answer"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Settings (Spans 4) */}
            <div className="lg:col-span-4 space-y-6">
              
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
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Tags</label>
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
                <h3 className="text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">SEO Metadata</h3>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">SEO Description</label>
                  <textarea
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
