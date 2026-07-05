'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, User, ArrowLeft, Share2, 
  Check, Sparkles
} from 'lucide-react';
import { POSTS } from '../posts';
import SchemaMarkup from '@/components/seo/schema-markup';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailsClient({ params }: PageProps) {
  const resolvedParams = use(params);
  const post = POSTS.find((p) => p.slug === resolvedParams.slug);

  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Publication Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline flex items-center gap-1 font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate simple FAQs dynamically based on the blog article for AEO/GEO Schema indexing
  const blogFAQs = [
    {
      q: `What is the key takeaway of "${post.title}"?`,
      a: post.desc
    },
    {
      q: `Who wrote this article?`,
      a: `This article was written by our senior learning mentor ${post.author} on ${post.date}.`
    }
  ];

  return (
    <>
      {/* Dynamic SEO JSON-LD FAQ/Article schema injection */}
      <SchemaMarkup 
        type="Article"
        data={{
          headline: post.title,
          description: post.desc,
          image: post.image,
          datePublished: new Date(post.date).toISOString().split('T')[0],
          author: {
            '@type': 'Person',
            name: post.author
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kode To Career',
            logo: 'https://kodetocareer.com/main-logo.png'
          }
        }}
      />
      <SchemaMarkup 
        type="FAQPage"
        data={{
          mainEntity: blogFAQs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a
            }
          }))
        }}
      />

      <article className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

        <div className="max-w-[800px] mx-auto px-6 relative z-10 space-y-8">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-1 text-slate-450 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4" /> Back to publications
          </Link>

          {/* Metadata Block */}
          <div className="space-y-4">
            <span className="bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-md inline-block">
              {post.category}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-slate-900 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold pt-2 border-y border-slate-200/50 py-3">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> By {post.author}</span>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="aspect-video w-full rounded-[24px] overflow-hidden bg-slate-100 shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Social Share Box */}
          <div className="flex justify-between items-center bg-white border border-slate-150 rounded-[20px] p-4 shadow-sm">
            <span className="text-xs font-bold text-slate-500">Share this article:</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-550/10 hover:bg-slate-550/20 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? 'Copied Link!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Article Main Text Body */}
          <div className="prose prose-slate max-w-none text-slate-650 leading-relaxed font-semibold space-y-6 pt-4 text-sm md:text-base">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-heading font-black text-slate-900 mt-8 mb-4">
                    {block.replace('## ', '')}
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
                  <ul key={idx} className="list-disc pl-5 space-y-2">
                    {block.split('\n').map((item, i) => (
                      <li key={i}>{item.replace(/^[-*]\s+/, '')}</li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(block)) {
                return (
                  <ol key={idx} className="list-decimal pl-5 space-y-2">
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

          {/* Dynamic Related Courses CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-[28px] p-8 shadow-sm space-y-4 mt-12">
            <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Ready to upskill?
            </div>
            <h3 className="text-xl font-heading font-extrabold text-slate-900">
              Transform Your Career with Guided Programs
            </h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Master Full Stack Development, Cloud Engineering, MLOps, or Data Analytics. Get 1-on-1 mentorship, live projects, and dedicated placement support.
            </p>
            <div className="pt-2 flex gap-3">
              <Link href="/courses" className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-primary text-white text-xs font-black shadow-md hover:bg-blue-600 transition-colors">
                Explore Programs
              </Link>
              <Link href="/contact" className="inline-flex h-11 items-center justify-center px-6 rounded-xl border border-slate-200 text-xs font-black hover:bg-slate-50 transition-colors">
                Free Counselling
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
