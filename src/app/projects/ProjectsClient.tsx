'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, ExternalLink, Award, Sparkles } from 'lucide-react';
import { STUDENT_PROJECTS, StudentProject } from '@/data/projects-data';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ProjectsClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Filter logic
  const filteredProjects = STUDENT_PROJECTS.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || proj.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === 'All' || proj.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = ['All', 'Development', 'Data & AI', 'Design'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 relative overflow-hidden">
      {/* Premium blurred light mesh background */}
      <div className="absolute top-[-250px] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Student Portfolio Showcase
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-900 tracking-tight">
            Real Production-Grade Projects
          </h1>
          <p className="text-slate-500 mt-4 text-base md:text-lg font-medium leading-relaxed">
            Explore industry-aligned systems, deep learning models, and interface prototypes designed and deployed by our career-transition cohorts.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] mb-10">
          <div className="flex flex-col gap-6">
            
            {/* Search and Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by title, technology, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-[14px] text-sm text-slate-700 outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              {/* Difficulty Dropdown */}
              <div className="md:col-span-3 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider pointer-events-none">
                  Level:
                </span>
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="w-full h-12 pl-18 pr-4 bg-slate-50 border border-slate-200 rounded-[14px] text-sm text-slate-700 outline-none hover:border-slate-350 focus:bg-white focus:border-primary cursor-pointer transition-all font-semibold appearance-none"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Category selector (on mobile dropdown, desktop tabs) */}
              <div className="md:col-span-3 relative md:hidden">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider pointer-events-none">
                  Category:
                </span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full h-12 pl-24 pr-4 bg-slate-50 border border-slate-200 rounded-[14px] text-sm text-slate-700 outline-none focus:bg-white focus:border-primary cursor-pointer transition-all font-semibold appearance-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Desktop Category Tabs */}
            <div className="hidden md:flex flex-wrap gap-2 items-center border-t border-slate-50 pt-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Categories:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-slate-50 text-slate-650 hover:bg-slate-100 hover:text-slate-900 border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.01)]"
            >
              <Award className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">No projects found</h3>
              <p className="text-slate-550 text-xs mt-1">Try broadening your search query or filters.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((proj) => (
                  <motion.div
                    layout
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Thumbnail Card Banner */}
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden shrink-0">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent z-10" />
                      
                      <Image
                        src={proj.screenshot}
                        alt={proj.title}
                        fill
                        className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                      />

                      {/* Header details inside thumbnail */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm ${
                          proj.difficulty === 'Advanced' ? 'bg-indigo-600' : 'bg-blue-600'
                        }`}>
                          {proj.difficulty}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-extrabold uppercase tracking-wider text-white">
                          {proj.category}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <span className="text-[10px] text-white/70 font-semibold block mb-0.5">Built by {proj.studentName}</span>
                        <span className="text-xs text-white font-extrabold block truncate leading-tight">{proj.courseName}</span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors leading-tight">
                          {proj.title}
                        </h3>
                        <p className="text-slate-500 text-xs font-semibold mt-2.5 leading-relaxed">
                          {proj.tagline}
                        </p>
                      </div>

                      <div>
                        {/* Technology tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {proj.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-650"
                            >
                              {tag}
                            </span>
                          ))}
                          {proj.tags.length > 4 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400">
                              +{proj.tags.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Action row */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                          <Link
                            href={`/projects/${proj.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-extrabold text-primary hover:text-blue-700 transition-colors group/link cursor-pointer"
                          >
                            View Case Study
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>

                          <div className="flex gap-2">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="GitHub Repository"
                              >
                                <GithubIcon className="w-4 h-4" />
                              </a>
                            )}
                            {proj.demoUrl && (
                              <a
                                href={proj.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="Live Demo Link"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
