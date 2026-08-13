'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileText, Plus, Sparkles, Search, Filter, Eye, Edit, Trash2, 
  CheckCircle, Clock, Archive, AlertCircle, RefreshCw, ExternalLink, ArrowLeft 
} from 'lucide-react';
import { BlogPost, BlogStatus } from '@/lib/blog/types';

export default function AdminBlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchAdminPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blog/posts?status=all&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error('Failed to fetch admin blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminPosts();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BlogStatus) => {
    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage({ type: 'success', text: `Post status updated to "${newStatus}"!` });
        fetchAdminPosts();
      } else {
        setActionMessage({ type: 'error', text: data.error || 'Failed to update post status.' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error updating status' });
    }
    setTimeout(() => setActionMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blog/posts/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage({ type: 'success', text: 'Article deleted successfully.' });
        fetchAdminPosts();
      } else {
        setActionMessage({ type: 'error', text: data.error || 'Failed to delete article.' });
      }
    } catch (err: any) {
      setActionMessage({ type: 'error', text: err.message || 'Error deleting article' });
    } finally {
      setDeleteId(null);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    const matchesSearch = !search || 
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase()) ||
      post.authorName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const totalCount = posts.length;
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;

  const categories = Array.from(new Set(['All', ...posts.map(p => p.category)]));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-8 pb-20 px-6 font-sans">
      <div className="max-w-[1440px] mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
              <Link href="/admin" className="hover:text-primary flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Admin
              </Link>
              <span>/</span>
              <span className="text-slate-200">Blog Management</span>
            </div>
            <h1 className="text-3xl font-heading font-black text-white flex items-center gap-2">
              <FileText className="w-8 h-8 text-primary" /> Blog System CMS
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Create, edit, schedule, publish, and manage all publication articles & AI drafts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchAdminPosts}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <Link
              href="/admin/blog/ai"
              className="px-4 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" /> AI Draft Generator
            </Link>
            <Link
              href="/admin/blog/new"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-600 text-white text-xs font-extrabold shadow-lg shadow-primary/25 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create New Post
            </Link>
          </div>
        </div>

        {/* Action Message Alert */}
        {actionMessage && (
          <div className={`p-4 rounded-xl text-xs font-bold flex items-center justify-between ${
            actionMessage.type === 'success' ? 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/80 border border-rose-500/30 text-rose-300'
          }`}>
            <span>{actionMessage.text}</span>
            <button onClick={() => setActionMessage(null)} className="text-xs opacity-60 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-medium block mb-1">Total Articles</span>
            <span className="text-3xl font-extrabold font-mono text-white">{totalCount}</span>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl">
            <span className="text-xs text-emerald-400 font-medium block mb-1">Published (Live)</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400">{publishedCount}</span>
          </div>
          <div className="bg-amber-950/20 border border-amber-500/20 p-5 rounded-2xl">
            <span className="text-xs text-amber-400 font-medium block mb-1">Drafts</span>
            <span className="text-3xl font-extrabold font-mono text-amber-400">{draftCount}</span>
          </div>
          <div className="bg-purple-950/20 border border-purple-500/20 p-5 rounded-2xl">
            <span className="text-xs text-purple-400 font-medium block mb-1">Scheduled</span>
            <span className="text-3xl font-extrabold font-mono text-purple-400">{scheduledCount}</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 border border-slate-800/80 rounded-2xl">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search title, slug, author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Pills */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl">
              {['all', 'published', 'draft', 'scheduled', 'archived'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                    statusFilter === st ? 'bg-primary text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Dropdown */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-500 font-medium">
              Loading articles database...
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 font-medium space-y-3">
              <p>No articles found matching your query or filter selection.</p>
              <button
                onClick={() => { setSearch(''); setStatusFilter('all'); setCategoryFilter('All'); }}
                className="text-primary hover:underline font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Title & Slug</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Author</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 max-w-xs">
                        <div className="font-bold text-slate-100 line-clamp-1 leading-snug">{post.title}</div>
                        <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">/blog/{post.slug}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-300 font-semibold">{post.authorName}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                          post.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                          post.status === 'draft' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                          post.status === 'scheduled' ? 'bg-purple-950 text-purple-400 border border-purple-500/30' :
                          'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[11px] font-mono text-slate-400">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Not Published'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {post.status === 'published' ? (
                            <button
                              onClick={() => handleStatusChange(post.id, 'draft')}
                              title="Unpublish (Save as Draft)"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                            >
                              <Archive className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(post.id, 'published')}
                              title="Publish Now"
                              className="p-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 transition-colors cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            title="View Public Article"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            title="Edit Article"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(post.id)}
                            title="Delete Article"
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/30 text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4">
              <div className="flex items-center gap-3 text-rose-400">
                <AlertCircle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-bold text-white">Delete Article?</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Are you sure you want to delete this article? This action will remove it from the system and website permanently.
              </p>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
