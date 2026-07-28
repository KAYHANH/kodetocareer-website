import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Award, Sparkles, MessageSquare, ShieldCheck, DollarSign } from 'lucide-react';
import { COURSES_MAP, PRICE_INTENTS } from '@/data/seo-intents';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string; priceSlug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; priceSlug: string }[] = [];
  Object.keys(COURSES_MAP).forEach((slug) => {
    Object.keys(PRICE_INTENTS).forEach((priceSlug) => {
      params.push({ slug, priceSlug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, priceSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const price = PRICE_INTENTS[priceSlug as keyof typeof PRICE_INTENTS];
  if (!course || !price) return {};

  return {
    title: `${course.name} Course ${price.label} | KodeToCareer`,
    description: `Get details on our affordable, industry-ready ${course.name} ${price.desc}. Master ${course.tech.slice(0, 4).join(', ')} with placements.`,
    alternates: {
      canonical: `https://kodetocareer.com/courses/${slug}/price/${priceSlug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug, priceSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const price = PRICE_INTENTS[priceSlug as keyof typeof PRICE_INTENTS];
  if (!course || !price) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${course.name} Course ${price.label}`,
    description: `Access affordable, industry-ready ${course.name} training options.`,
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
        name: `What is the best ${course.name} course ${price.label}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best ${course.name} course ${price.label} is our cohort program at KodeToCareer. It combines structured training in ${course.tech.join(', ')}, direct developer mentorship, and verified placement support with student-friendly pricing options.`
        }
      },
      {
        '@type': 'Question',
        name: `Are there internships included in this affordable ${course.name} course?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, every student gets a guaranteed practical internship certificate upon completing the core modules and capstone projects.`
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
            {/* Left Column - AEO / GEO main details */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Headline & AEO Intro Block */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[10px] font-extrabold text-primary uppercase tracking-wider mb-4">
                  <Sparkles className="w-3.5 h-3.5" /> High-Value Education
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {course.name} Course {price.label}
                </h1>
                
                {/* AEO Direct Q&A Answer block */}
                <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
                  <p className="text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                    Question: What is the best {course.name} course {price.label}?
                  </p>
                  <p className="text-slate-750 text-xs font-semibold leading-relaxed pl-4 border-l-2 border-primary">
                    Answer: The best {course.name} course {price.label} is our structured cohort program, which combines deep practical modules covering {course.tech.slice(0, 5).join(', ')}, direct developer mentorship, and verified placement support with student-friendly pricing options.
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
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Duration</span>
                    <span className="text-xs font-extrabold text-slate-800">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Upfront Fees</span>
                    <span className="text-xs font-extrabold text-primary">{course.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Eligibility</span>
                    <span className="text-xs font-extrabold text-slate-800">BCA, B.Tech, MCA, Graduates</span>
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
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Accreditation</span>
                    <span className="text-xs font-extrabold text-slate-800">ISO 9001:2015 Cert.</span>
                  </div>
                </div>
              </div>

              {/* Core Content sections */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Introduction</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    {price.introText} Master in-demand tools and secure developer placements without heavy initial debt blocks.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Prerequisites</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    No advanced programming background is required. Basic analytical skills and logical mindset are sufficient to start.
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

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Target Career Roles</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {course.roles.map((r) => (
                      <span key={r} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-700">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Cross Sell Callouts & Contact Leads form */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Quick lead capture */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl text-white">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-extrabold leading-tight">
                  Book Free Career Counselling
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                  Have questions about EMI options, course structure, or placements? Get a call from our Noida career coaches.
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="h-11 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all cursor-pointer animate-pulse-glow"
                  >
                    Request Callback
                  </Link>
                  <a
                    href={`https://wa.me/919667975616?text=Hi, I want to ask about ${course.name} fees and installments`}
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
