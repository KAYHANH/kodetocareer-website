'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Award, Calendar, User, BookOpen, CheckCircle2, ShieldAlert, Check } from 'lucide-react';
import { StudentProject } from '@/data/projects-data';
import SchemaMarkup from '@/components/seo/schema-markup';

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

interface Props {
  project: StudentProject;
}

export default function ProjectDetailClient({ project }: Props) {
  // JSON-LD structured data for GEO/AEO optimization
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.tagline,
    image: project.screenshot,
    author: {
      '@type': 'Person',
      name: project.studentName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KodeToCareer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kodetocareer.com/main-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kodetocareer.com/projects/${project.slug}`,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is ${project.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.overview,
        },
      },
      {
        '@type': 'Question',
        name: `What challenges were faced during the development of ${project.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.challenges,
        },
      },
      {
        '@type': 'Question',
        name: `What was the solution implemented for ${project.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: project.solution,
        },
      },
    ],
  };

  return (
    <>
      <SchemaMarkup type="Article" data={articleSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />

      <div className="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          {/* Back button */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Project Gallery
          </Link>

          {/* Page Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column - Main case study details */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Main Heading Details */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-white ${
                    project.difficulty === 'Advanced' ? 'bg-indigo-600' : 'bg-blue-600'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                    {project.category}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {project.title}
                </h1>
                
                <p className="text-slate-650 mt-4 text-base font-semibold leading-relaxed">
                  {project.tagline}
                </p>

                {/* Meta Row */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 pt-6 border-t border-slate-50 text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> Developer: {project.studentName}</span>
                  <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-secondary" /> Program: {project.courseName}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" /> Cohort: 2026</span>
                </div>
              </div>

              {/* Case Study Questions (AEO/GEO Optimized Section) */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Case Study Overview & Analysis
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                      What is {project.title}?
                    </h3>
                    <p className="text-slate-550 text-xs leading-relaxed font-medium">
                      {project.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                      What challenges were faced during development?
                    </h3>
                    <div className="flex gap-3 px-4 py-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                      <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                      <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                        {project.challenges}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                      What was the implemented solution?
                    </h3>
                    <div className="flex gap-3 px-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                      <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Core Learning Outcomes
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {project.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-slate-650 text-xs font-semibold leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column - Sidebar Widgets */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Media Card */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden">
                <div className="relative h-48 w-full bg-slate-950 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={project.screenshot}
                    alt={project.title}
                    fill
                    className="object-cover opacity-85"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>

                {/* Tech tags list */}
                <h3 className="text-xs font-extrabold text-slate-450 uppercase tracking-widest mb-3">Technologies Stack</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-650"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2 text-xs font-extrabold transition-all cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" /> GitHub Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 rounded-xl bg-primary text-white hover:bg-blue-700 flex items-center justify-center gap-2 text-xs font-extrabold transition-all shadow-md shadow-primary/10 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Cross-Sell Paid Program Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/15 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10">
                  <Award className="w-10 h-10 text-primary mb-4" />
                  
                  <h3 className="text-lg font-heading font-extrabold leading-tight">
                    Want to build projects like this?
                  </h3>
                  
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Learn the exact tools, architectures, and programming systems used by {project.studentName} to deploy this project. Join our next live career cohort.
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Recommended Program</span>
                    <span className="text-xs font-extrabold block text-slate-200">{project.courseName}</span>
                    
                    <Link
                      href={`/courses/${project.courseSlug}`}
                      className="h-11 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all mt-3 cursor-pointer"
                    >
                      Explore Course Details
                    </Link>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}
