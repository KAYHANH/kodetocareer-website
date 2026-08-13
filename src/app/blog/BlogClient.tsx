'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, User, Clock, ArrowRight, Sparkles, 
  TrendingUp, Bookmark, ArrowUpRight, CheckCircle, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, BlogQueryResult } from '@/lib/blog/types';

interface BlogClientProps {
  initialData: BlogQueryResult;
}

export default function BlogClient({ initialData }: BlogClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialData.posts);
  const [categories, setCategories] = useState<string[]>(initialData.categories);
  const [popularTags, setPopularTags] = useState<string[]>(initialData.popularTags);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(initialData.totalPages);
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [submittingEmail, setSubmittingEmail] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string | null>(null);

  // Read URL search params on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category');
      const qParam = params.get('q');
      if (catParam) setSelectedCategory(catParam);
      if (qParam) setSearchQuery(qParam);
    }
  }, []);

  // Fetch updated posts when category, search query, or page changes
  const fetchFilteredPosts = async (cat: string, q: string, pageNum: number) => {
    try {
      const url = `/api/blog/posts?category=${encodeURIComponent(cat)}&q=${encodeURIComponent(q)}&page=${pageNum}&limit=12&t=${Date.now()}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        if (pageNum === 1) {
          setPosts(data.posts);
        } else {
          setPosts((prev) => [...prev, ...data.posts]);
        }
        setTotalPages(data.totalPages);
        if (data.categories) setCategories(data.categories);
        if (data.popularTags) setPopularTags(data.popularTags);
      }
    } catch (err) {
      console.error('Failed to filter blog posts:', err);
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setPage(1);
    fetchFilteredPosts(cat, '', 1);

    if (typeof window !== 'undefined') {
      const url = cat === 'All' ? '/blog' : `/blog?category=${encodeURIComponent(cat)}`;
      window.history.pushState({}, '', url);
    }
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setPage(1);
    fetchFilteredPosts(selectedCategory, q, 1);

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.set('category', selectedCategory);
      if (q) params.set('q', q);
      const url = params.toString() ? `/blog?${params.toString()}` : '/blog';
      window.history.pushState({}, '', url);
    }
  };

  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await fetchFilteredPosts(selectedCategory, searchQuery, 1);
    setLastRefreshed(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFilteredPosts(selectedCategory, searchQuery, nextPage);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail || submittingEmail) return;

    setSubmittingEmail(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscribeEmail })
      });
      const data = await res.json();
      if (data.success) {
        setSubscribed(true);
        setTimeout(() => {
          setSubscribed(false);
          setSubscribeEmail('');
        }, 4000);
      }
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setSubmittingEmail(false);
    }
  };

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const recentPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-16">

        {/* ── 1. Hero Header Section ── */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            OFFICIAL KODETOCAREER PUBLICATIONS
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-slate-900 leading-tight">
            Learn Technology <br />
            <span className="gradient-text">Beyond the Classroom</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed">
            Stay up to date with tech trends, system design architectures, interview strategies, and study abroad guides.
          </p>

          {/* Search bar */}
          <div className="relative w-full max-w-lg mx-auto shadow-sm rounded-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles, topics, authors..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 shadow-sm"
            />
          </div>
        </section>

        {/* ── 2. Category Filters ── */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── 3. Featured Article Banner ── */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <section className="space-y-6">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2 leading-none">
              <TrendingUp className="w-5 h-5 text-primary animate-pulse" /> Featured Publication
            </h2>

            <div className="bg-white border border-slate-150 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 h-64 lg:h-96 relative bg-slate-100">
                <Image src={featuredPost.featuredImage} alt={featuredPost.imageAlt || featuredPost.title} fill className="object-cover" unoptimized />
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md">
                  {featuredPost.category}
                </span>
              </div>
              
              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> 
                      {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent'}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readingTime}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-slate-900 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                      {featuredPost.authorName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-none">{featuredPost.authorName}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">{featuredPost.authorRole || 'Author'}</span>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`} className="text-primary hover:underline font-bold text-xs flex items-center gap-0.5">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Server Refresh Button ── */}
        <div className="flex items-center justify-between border-t border-slate-200/60 pt-6">
          <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2 leading-none">
            <Clock className="w-5 h-5 text-primary" /> All Articles
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            {lastRefreshed && (
              <span className="text-[10px] text-slate-400 font-semibold">Refreshed: {lastRefreshed}</span>
            )}
          </div>
        </div>

        {/* ── 4. Main Articles Grid & Sidebar ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Articles (Spans 8) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white border border-slate-150 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="h-44 relative bg-slate-100 overflow-hidden shrink-0">
                      <Image src={post.featuredImage} alt={post.imageAlt || post.title} fill className="object-cover group-hover:scale-102 transition-transform duration-355" unoptimized />
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 font-mono">
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent'}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                      <h3 className="text-base font-heading font-extrabold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-secondary/15 flex items-center justify-center font-bold text-secondary text-[9px]">
                        {post.authorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{post.authorName}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-bold text-[10px] flex items-center gap-0.5">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {recentPosts.length === 0 && (
              <div className="bg-white border border-slate-150 p-8 rounded-[24px] text-center text-slate-400 font-semibold space-y-3">
                <p>No publications found matching your selection.</p>
                <button onClick={() => handleCategorySelect('All')} className="text-primary hover:underline text-xs font-bold">
                  View All Publications
                </button>
              </div>
            )}

            {/* Pagination Load More Button */}
            {page < totalPages && (
              <div className="text-center pt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 shadow-sm cursor-pointer transition-colors"
                >
                  Load More Publications
                </button>
              </div>
            )}
          </div>

          {/* Tags & Newsletter Sidebar (Spans 4) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tags Box */}
            <div className="bg-white border border-slate-150 rounded-[24px] p-5 shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                Popular Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedCategory('All');
                      handleSearchChange(t);
                    }}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[9px] text-slate-600 font-bold px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter card */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-[24px] p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <h4 className="text-sm font-heading font-extrabold text-slate-900">Subscribe to Publication</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                Get monthly design digests, coding tips, system architectures, and exclusive placement guides.
              </p>

              {subscribed ? (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 shrink-0" /> Subscription Confirmed!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 space-y-2.5">
                  <input
                    type="email"
                    required
                    value={subscribeEmail}
                    onChange={(e) => setSubscribeEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submittingEmail}
                    className="w-full py-2.5 bg-primary hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    {submittingEmail ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
