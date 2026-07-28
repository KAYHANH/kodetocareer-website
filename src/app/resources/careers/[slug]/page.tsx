import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Award } from 'lucide-react';
import { CAREER_GUIDES } from '@/data/resources-data';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(CAREER_GUIDES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = CAREER_GUIDES[slug];
  if (!guide) return {};

  return {
    title: `${guide.title} — Career Roadmap Guide | KodeToCareer`,
    description: guide.tagline,
    alternates: {
      canonical: `https://kodetocareer.com/resources/careers/${slug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = CAREER_GUIDES[slug];
  if (!guide) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.tagline,
    author: {
      '@type': 'Organization',
      name: 'KodeToCareer'
    }
  };

  return (
    <>
      <SchemaMarkup type="Article" data={articleSchema} />
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          {/* Back button */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Resources
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Main Career Pathway */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider mb-4">
                  <User className="w-3.5 h-3.5" /> Career Path Guide
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {guide.title}
                </h1>
                
                <p className="text-slate-650 mt-4 text-xs font-semibold leading-relaxed">
                  {guide.introduction}
                </p>
              </div>

              {/* Roles & Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Target Roles */}
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Target Job Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.roles.map((role) => (
                      <span key={role} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-650">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Required */}
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    Required Core Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {guide.skillsRequired.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Roadmap */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Step-by-Step Learning Roadmap
                </h2>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {guide.roadmapSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 z-10">
                        {idx + 1}
                      </div>
                      <p className="text-slate-650 text-xs font-semibold leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar Cross-Sell */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10">
                  <Award className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-extrabold leading-tight">
                    Want structured learning?
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Skip the self-learning struggle. Join our structured cohorts and learn directly from industry developers with placement support.
                  </p>
                  <div className="mt-6 pt-6 border-t border-white/[0.06]">
                    <Link
                      href="/courses"
                      className="h-11 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all cursor-pointer"
                    >
                      Explore Career Programs
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
