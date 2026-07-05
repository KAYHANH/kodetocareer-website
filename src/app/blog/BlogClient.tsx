'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, User, Clock, ArrowRight, Sparkles, 
  TrendingUp, Award, Bookmark, ArrowUpRight, HelpCircle, CheckCircle, RefreshCw 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { POSTS, BlogPost } from './posts';

const CATEGORIES = [
  'All', 
  'AI', 
  'Programming', 
  'Career', 
  'Interview', 
  'Data Science', 
  'Web Development', 
  'Placement'
];

const POPULAR_TAGS = ['React', 'Next.js', 'Python', 'Docker', 'AWS', 'Prompt Engineering', 'Figma', 'System Design'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  useEffect(() => {
    const loadMergedPosts = async () => {
      try {
        const res = await fetch(`/api/blog/posts?t=${Date.now()}`);
        const data = await res.json();
        if (data.success && data.posts) {
          setPosts(data.posts);
        }
      } catch (err) {
        console.error('Failed to load merged posts:', err);
      }
    };

    loadMergedPosts();

    const syncLatestNews = async () => {
      try {
        const res = await fetch(`/api/blog/sync?t=${Date.now()}`);
        const data = await res.json();
        loadMergedPosts();
      } catch (err) {
        console.error('Failed to sync tech news:', err);
      }
    };

    // Trigger initial sync after 1s
    const timer = setTimeout(syncLatestNews, 1000);

    // Set interval to sync every 5 minutes (300,000 ms)
    const interval = setInterval(syncLatestNews, 300000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleManualSync = async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      await fetch(`/api/blog/sync?t=${Date.now()}`);
      const res = await fetch(`/api/blog/posts?t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.posts) {
        setPosts(data.posts);
      }
      setLastSynced(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('Manual sync failed:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setSubscribeEmail('');
    }, 3000);
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0] || POSTS[0];
  const recentPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-20">

        {/* ── 1. Hero Header Section ── */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
            <Bookmark className="w-4 h-4" />
            LATEST INSIGHTS
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
              placeholder="Search articles, tags, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50"
            />
          </div>

        </section>

        {/* ── 2. Category Filters ── */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-850 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* ── 3. Featured Article Banner ── */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <section className="space-y-6">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2 leading-none">
              <TrendingUp className="w-5 h-5 text-primary animate-pulse" /> Featured Article
            </h2>

            <div className="bg-white border border-slate-150 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 h-64 lg:h-96 relative bg-slate-100">
                <Image src={featuredPost.image} alt={featuredPost.title} fill className="object-cover" unoptimized />
                <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md">
                  {featuredPost.category}
                </span>
              </div>
              
              <div className="lg:col-span-5 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-heading font-black text-slate-900 leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    {featuredPost.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xs">
                      {featuredPost.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-none">{featuredPost.author}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Author</span>
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

        {/* ── New Blog / Sync Button ── */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleManualSync}
            disabled={syncing}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
              syncing
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-primary text-white hover:bg-blue-700 shadow-md shadow-primary/20'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Fetching New Blogs...' : 'New Blogs'}
          </button>
          {lastSynced && (
            <span className="text-[10px] text-slate-400 font-semibold">Last updated: {lastSynced}</span>
          )}
        </div>

        {/* ── 4. Main Articles Grid & Sidebar ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Articles (Spans 8) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2 leading-none">
              <Clock className="w-5 h-5 text-primary" /> Recent Publications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white border border-slate-150 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
                  <div>
                    <div className="h-44 relative bg-slate-100 overflow-hidden shrink-0">
                      <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-102 transition-transform duration-355" unoptimized />
                      <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 font-mono">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-heading font-extrabold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold line-clamp-3">
                        {post.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6.5 h-6.5 rounded-full bg-secondary/15 flex items-center justify-center font-bold text-secondary text-[9px]">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[10px] font-bold text-slate-700">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.slug}`} className="text-primary hover:underline font-bold text-[10px] flex items-center gap-0.5">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {recentPosts.length === 0 && (
              <div className="bg-white border border-slate-150 p-8 rounded-[24px] text-center text-slate-400 font-semibold">
                No recent publications found matching your selection.
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
                {POPULAR_TAGS.map((t) => (
                  <span
                    key={t}
                    onClick={() => setSearchQuery(t)}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[9px] text-slate-600 font-bold px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    #{t}
                  </span>
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
                  <button type="submit" className="w-full py-2.5 bg-primary hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors">
                    Subscribe
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
