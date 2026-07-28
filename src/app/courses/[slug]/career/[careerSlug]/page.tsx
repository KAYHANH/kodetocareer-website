import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Award, Sparkles, UserCheck } from 'lucide-react';
import { COURSES_MAP, CAREER_PERSONAS } from '@/data/seo-intents';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string; careerSlug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; careerSlug: string }[] = [];
  Object.keys(COURSES_MAP).forEach((slug) => {
    Object.keys(CAREER_PERSONAS).forEach((careerSlug) => {
      params.push({ slug, careerSlug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, careerSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const persona = CAREER_PERSONAS[careerSlug as keyof typeof CAREER_PERSONAS];
  if (!course || !persona) return {};

  return {
    title: `${course.name} Course for ${persona.title} | KodeToCareer`,
    description: `Unlock career growth with our ${course.name} training designed specifically for ${persona.title}. Build capstone projects, gain placements, and secure internships.`,
    alternates: {
      canonical: `https://kodetocareer.com/courses/${slug}/career/${careerSlug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug, careerSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const persona = CAREER_PERSONAS[careerSlug as keyof typeof CAREER_PERSONAS];
  if (!course || !persona) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${course.name} Course for ${persona.title}`,
    description: `Acquire job-ready framework skills in ${course.name} tailored for ${persona.title}.`,
    author: {
      '@type': 'Organization',
      name: 'KodeToCareer'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Is this ${course.name} course suitable for ${persona.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, our ${course.name} course is fully optimized for ${persona.title}. We restructure the learning roadmap from foundational concepts up to advanced production hosting, incorporating direct practical projects, mock interview drills, and local corporate placements.`
        }
      }
    ]
  };

  return (
    <>
      <SchemaMarkup type="Article" data={articleSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          
          {/* Back button */}
          <Link
            href={`/courses/${slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Course Details
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Headline Block */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider mb-4">
                  <UserCheck className="w-3.5 h-3.5" /> Career Persona Guide
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {course.name} Course for {persona.title}
                </h1>
                
                {/* AEO Direct Q&A Answer block */}
                <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
                  <p className="text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                    Question: Is this {course.name} course suitable for {persona.title}?
                  </p>
                  <p className="text-slate-750 text-xs font-semibold leading-relaxed pl-4 border-l-2 border-primary">
                    Answer: Yes, our {course.name} course is fully optimized for {persona.title}. We restructure the learning roadmap from foundational concepts up to advanced production hosting, incorporating direct practical projects, mock interview drills, and local corporate placements.
                  </p>
                </div>
              </div>

              {/* GEO Spec Sheet Card */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-lg font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Course Specifications & Details
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Target Audience</span>
                    <span className="text-xs font-extrabold text-slate-800">{persona.title} pathway</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
                    <span className="text-xs font-extrabold text-slate-800">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Fees Range</span>
                    <span className="text-xs font-extrabold text-primary">{course.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hiring Partners</span>
                    <span className="text-xs font-extrabold text-slate-800">300+ Companies</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Internship</span>
                    <span className="text-xs font-extrabold text-emerald-600">Guaranteed Internship</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Certification</span>
                    <span className="text-xs font-extrabold text-slate-800">ISO 9001:2015 Cert.</span>
                  </div>
                </div>
              </div>

              {/* Core Content sections */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Introduction</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    {persona.intro} The program breaks down complex algorithms and framework architectures into structured weekly milestones with direct support.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Learning Roadmap</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    Starting from foundational syntax rules, candidates progress to complex data structures, backend database integrations, and automated testing patterns.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Portfolio Capstones</h3>
                  <div className="space-y-3 mt-3">
                    {course.projects.map((p, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-650">
                        <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Cross Sell Callouts */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Quick lead capture */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl text-white">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-extrabold leading-tight">
                  Guaranteed Internship & Placements
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                  We guarantee a professional internship certificate and active company referrals to help you transition cleanly into your target tech role.
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="h-11 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all cursor-pointer animate-pulse-glow"
                  >
                    Apply for Cohort seat
                  </Link>
                  <a
                    href={`https://wa.me/919667975616?text=Hi, I am interested in ${course.name} course designed for ${persona.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 w-full bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer"
                  >
                    WhatsApp Advisor
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
