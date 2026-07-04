'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Calendar, User, Clock, ArrowRight, Sparkles, 
  TrendingUp, Award, Bookmark, ArrowUpRight, HelpCircle, CheckCircle 
} from 'lucide-react';
import Link from 'next/link';

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

const POSTS = [
  {
    id: 1,
    title: 'The Future of Web Development: Integrating AI Agents in 2026',
    category: 'Web Development',
    date: 'June 28, 2026',
    author: 'Sarah Jenkins',
    readTime: '6 min read',
    desc: 'Explore how AI coding agents and tools are reshaping web development workflows and what skills developers need to stay ahead.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'How to Build an ATS-Friendly Resume That Gets You Interviews',
    category: 'Career',
    date: 'June 22, 2026',
    author: 'Rajesh Nair',
    readTime: '5 min read',
    desc: 'Step-by-step guide to structuring your tech resume, identifying missing keywords, and beating automated recruiter filters.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop',
    featured: false
  },
  {
    id: 3,
    title: 'Cracking the System Design Interview: A Developer Protocol',
    category: 'Interview',
    date: 'June 18, 2026',
    author: 'Dr. Vikram Aditya',
    readTime: '8 min read',
    desc: 'An in-depth look at load balancers, caching layers, database indexing, and scaling microservices during high traffic spikes.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    featured: false
  },
  {
    id: 4,
    title: 'Understanding Neural Networks: A Laymans Guide to Deep Learning',
    category: 'AI',
    date: 'June 12, 2026',
    author: 'Sarah Jenkins',
    readTime: '10 min read',
    desc: 'Demystifying neural network layers, loss functions, optimization, and how weights adjust during backward propagation.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'MERN vs Java Full Stack: Which Career Path to Choose?',
    category: 'Programming',
    date: 'June 05, 2026',
    author: 'Dr. Vikram Aditya',
    readTime: '7 min read',
    desc: 'A comprehensive career roadmap comparison covering market demand, salary packages, learning curve, and tech stacks.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Navigating the Transition from College to First Tech Job',
    category: 'Placement',
    date: 'May 28, 2026',
    author: 'Rajesh Nair',
    readTime: '6 min read',
    desc: 'Tips for freshers on networking, preparing for coding rounds, handling behavioral interviews, and negotiating offers.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
    featured: false
  }
];

const POPULAR_TAGS = ['React', 'Next.js', 'Python', 'Docker', 'AWS', 'Prompt Engineering', 'Figma', 'System Design'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setSubscribeEmail('');
    }, 3000);
  };

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = POSTS.find(p => p.featured) || POSTS[0];
  const recentPosts = filteredPosts.filter(p => !p.featured || selectedCategory !== 'All');

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
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
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
                      <h4 className="text-xs font-bold text-slate-800leading-none">{featuredPost.author}</h4>
                      <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Author</span>
                    </div>
                  </div>
                  <Link href={`/blog/${featuredPost.id}`} className="text-primary hover:underline font-bold text-xs flex items-center gap-0.5">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

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
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-350" />
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
                    <Link href={`/blog/${post.id}`} className="text-primary hover:underline font-bold text-[10px] flex items-center gap-0.5">
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
