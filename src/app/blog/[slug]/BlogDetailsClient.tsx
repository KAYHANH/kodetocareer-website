'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, 
  Check, Sparkles, List, ArrowRight, BookOpen, Download, HelpCircle
} from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import SchemaMarkup from '@/components/seo/schema-markup';
import Breadcrumb from '@/components/seo/breadcrumb';
import CourseQuizModal from '@/components/ui/course-quiz-modal';
import LeadMagnetModal from '@/components/ui/lead-magnet-modal';

interface BlogDetailsClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const COURSE_CTA_MAP: Record<string, { title: string; desc: string; link: string }> = {
  'mern-stack-development': {
    title: 'Master Full Stack Development with MERN',
    desc: 'Build 10+ real-world web apps with MongoDB, Express, React, and Node.js under expert 1-on-1 mentorship.',
    link: '/courses/mern-stack-development'
  },
  'data-science-machine-learning': {
    title: 'Become a Certified Data Scientist & ML Engineer',
    desc: 'Master Python, SQL, Machine Learning, Deep Learning, and AI model deployments with guaranteed placement support.',
    link: '/courses/data-science-machine-learning'
  },
  'python-full-stack-development': {
    title: 'Become a Python Full Stack Developer',
    desc: 'Learn Django, FastAPI, React, PostgreSQL, and Cloud Engineering with guaranteed internships.',
    link: '/courses/python-full-stack-development'
  },
  'ui-ux-design-course': {
    title: 'Master Product Design & UI/UX Systems',
    desc: 'Learn Figma, User Research, Design Systems, and Prototyping for high-paying design roles.',
    link: '/courses/ui-ux-design-course'
  }
};

export default function BlogDetailsClient({ post, relatedPosts }: BlogDetailsClientProps) {
  const [copied, setCopied] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Extract H2 headings for Table of Contents
  const headings = post.content
    ? post.content
        .split('\n')
        .filter((line) => line.startsWith('## '))
        .map((line) => line.replace('## ', '').trim())
    : [];

  const cta = COURSE_CTA_MAP[post.relatedCourseSlug || 'mern-stack-development'] || COURSE_CTA_MAP['mern-stack-development'];

  const formattedDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
    : 'Recent Publication';

  const blogFAQs = post.faqs && post.faqs.length > 0 ? post.faqs : [
    {
      question: `What is the key takeaway of "${post.title}"?`,
      answer: post.excerpt
    },
    {
      question: `Who authored this KodeToCareer article?`,
      answer: `This publication was authored by ${post.authorName} (${post.authorRole || 'Lead Instructor'}) at KodeToCareer.`
    }
  ];

  return (
    <>
      {/* Dynamic SEO JSON-LD FAQ & Article schema */}
      <SchemaMarkup 
        type="Article"
        data={{
          headline: post.seoTitle || post.title,
          description: post.seoDescription || post.excerpt,
          image: post.featuredImage,
          datePublished: post.publishedAt || post.createdAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.authorName
          },
          publisher: {
            '@type': 'Organization',
            name: 'KodeToCareer',
            logo: 'https://kodetocareer.com/main-logo.png'
          }
        }}
      />
      <SchemaMarkup 
        type="FAQPage"
        data={{
          mainEntity: blogFAQs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }}
      />

      <article className="min-h-screen bg-slate-50 text-slate-800 pt-6 pb-32 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

        <div className="max-w-[850px] mx-auto px-6 relative z-10 space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { name: 'Blog', url: '/blog' },
              { name: post.category, url: `/blog?category=${encodeURIComponent(post.category)}` },
              { name: post.title, url: `/blog/${post.slug}` }
            ]} 
          />

          {/* Metadata Block */}
          <div className="space-y-4">
            <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md inline-block">
              {post.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-slate-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold pt-2 border-y border-slate-200/60 py-3">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> {formattedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {post.readingTime}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-primary" /> By {post.authorName}</span>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="aspect-video w-full rounded-[24px] overflow-hidden bg-slate-100 shadow-sm relative">
            <Image src={post.featuredImage} alt={post.imageAlt || post.title} fill className="object-cover" unoptimized />
          </div>

          {/* Social Share Box */}
          <div className="flex justify-between items-center bg-white border border-slate-150 rounded-[20px] p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-600">Share this publication:</span>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-primary" />}
              {copied ? 'Copied Link!' : 'Copy Link'}
            </button>
          </div>

          {/* Table of Contents (TOC) */}
          {headings.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-[20px] p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                <List className="w-4 h-4 text-primary" /> Table of Contents
              </div>
              <ul className="space-y-1.5 text-xs font-semibold text-slate-600">
                {headings.map((h, idx) => {
                  const headingId = h.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                  return (
                    <li key={idx}>
                      <a href={`#${headingId}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
                        <span className="text-slate-400 font-mono text-[10px]">0{idx + 1}.</span> {h}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Article Main Text Body */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium space-y-6 pt-4 text-sm md:text-base">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('## ')) {
                const titleText = block.replace('## ', '');
                const headingId = titleText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                return (
                  <h2 id={headingId} key={idx} className="text-2xl font-heading font-black text-slate-900 mt-8 mb-4 scroll-mt-20">
                    {titleText}
                  </h2>
                );
              }
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-heading font-black text-slate-800 mt-6 mb-3">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('- ') || block.startsWith('* ')) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-2 text-slate-700">
                    {block.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^[-*]\s+/, '')}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(block)) {
                return (
                  <ol key={idx} className="list-decimal pl-5 space-y-2 text-slate-700">
                    {block.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^\d+\.\s+/, '')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Author Bio Box */}
          <div className="bg-white border border-slate-150 rounded-[24px] p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl shrink-0">
              {post.authorName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900">{post.authorName}</h3>
              <p className="text-xs text-primary font-bold">{post.authorRole || 'Lead Instructor at KodeToCareer'}</p>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Mentor and contributor to the KodeToCareer career preparation and technical training programs.
              </p>
            </div>
          </div>

          {/* Dynamic Related Courses CTA & Interactive Growth Triggers */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 rounded-[28px] p-8 shadow-sm space-y-4 mt-10">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Recommended Career Program
            </div>
            <h3 className="text-xl font-heading font-extrabold text-slate-900">
              {cta.title}
            </h3>
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              {cta.desc}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link href={cta.link} className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-primary text-white text-xs font-black shadow-md hover:bg-blue-600 transition-colors">
                Explore Program Details <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <button 
                onClick={() => setLeadMagnetOpen(true)}
                className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1.5" /> Free Roadmap PDF
              </button>
              <button 
                onClick={() => setQuizOpen(true)}
                className="inline-flex h-11 items-center justify-center px-6 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 text-xs font-black transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 mr-1.5 text-primary" /> Which Course Fits Me?
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6 pt-10 border-t border-slate-200/80">
              <h3 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Related Publications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="bg-white border border-slate-150 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-3 group"
                  >
                    <div>
                      <span className="text-[9px] font-bold text-primary uppercase">{rel.category}</span>
                      <h4 className="text-xs font-heading font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mt-1">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      {/* Sticky Mobile Conversion Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-[11px] font-bold text-white leading-tight truncate">
          {post.title}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setQuizOpen(true)}
            className="px-3 py-2 bg-slate-800 text-slate-200 text-[10px] font-bold rounded-xl"
          >
            Quiz
          </button>
          <Link
            href={cta.link}
            className="px-4 py-2 bg-primary text-white text-[10px] font-extrabold rounded-xl shadow-md"
          >
            View Course
          </Link>
        </div>
      </div>

      {/* Modals */}
      <CourseQuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
      <LeadMagnetModal isOpen={leadMagnetOpen} onClose={() => setLeadMagnetOpen(false)} resourceTitle={`${post.title} - Free Roadmap & Syllabus PDF`} />
    </>
  );
}

