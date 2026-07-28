import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { COMPARISONS_DATA } from '@/data/comparisons-data';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPARISONS_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = COMPARISONS_DATA[slug];
  if (!data) return {};

  return {
    title: `${data.title} — Comparison Guide | KodeToCareer`,
    description: data.tagline,
    alternates: {
      canonical: `https://kodetocareer.com/compare/${slug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = COMPARISONS_DATA[slug];
  if (!data) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.tagline,
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
        name: `What is the difference between ${data.title.split(' vs ')[0]} and ${data.title.split(' vs ')[1]}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.introduction,
        },
      },
      {
        '@type': 'Question',
        name: `Salary comparison: ${data.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: data.salaryCompare,
        },
      },
    ],
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
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider mb-8 cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Resources
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column - Main Comparison Info */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Header Box */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {data.title}
                </h1>
                <p className="text-slate-655 mt-4 text-sm font-semibold leading-relaxed">
                  {data.tagline}
                </p>
                <p className="text-slate-550 mt-6 pt-6 border-t border-slate-50 text-xs font-semibold leading-relaxed">
                  {data.introduction}
                </p>
              </div>

              {/* Side-by-Side Comparison Table */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Detailed Feature Comparison
                </h2>
                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="px-6 py-4">Feature</th>
                        <th className="px-6 py-4">{data.title.split(' vs ')[0]}</th>
                        <th className="px-6 py-4">{data.title.split(' vs ')[1]}</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-semibold text-slate-700 divide-y divide-slate-100">
                      {data.table.map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 text-slate-500 font-bold">{row.feature}</td>
                          <td className="px-6 py-4">{row.itemA}</td>
                          <td className="px-6 py-4">{row.itemB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Who Should Choose What */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Choose A */}
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                    Choose {data.title.split(' vs ')[0]} if...
                  </h3>
                  <div className="space-y-3">
                    {data.chooseA.map((bullet, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs font-semibold text-slate-550 leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Choose B */}
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-50 pb-2">
                    Choose {data.title.split(' vs ')[1]} if...
                  </h3>
                  <div className="space-y-3">
                    {data.chooseB.map((bullet, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-xs font-semibold text-slate-550 leading-relaxed">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Detailed Market Comparison */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Salary Differences
                  </h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    {data.salaryCompare}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Job Market Demand
                  </h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    {data.demandCompare}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column - Dual Cross Sell CTAs */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Course A CTA */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl text-white">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-heading font-extrabold leading-tight">
                  Master {data.title.split(' vs ')[0]}
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                  Join our comprehensive cohort. Gain hands-on project experience, mentorship, and direct placements.
                </p>
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Recommended Program</span>
                  <span className="text-xs font-extrabold block text-slate-200">{data.courseAName}</span>
                  <Link
                    href={`/courses/${data.courseASlug}`}
                    className="h-11 w-full bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:bg-blue-700 transition-all mt-3 cursor-pointer"
                  >
                    View Program Details
                  </Link>
                </div>
              </div>

              {/* Course B CTA */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl text-white">
                <Award className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="text-lg font-heading font-extrabold leading-tight">
                  Master {data.title.split(' vs ')[1]}
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                  Join our comprehensive cohort. Gain hands-on project experience, mentorship, and direct placements.
                </p>
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-2">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Recommended Program</span>
                  <span className="text-xs font-extrabold block text-slate-200">{data.courseBName}</span>
                  <Link
                    href={`/courses/${data.courseBSlug}`}
                    className="h-11 w-full bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-all mt-3 cursor-pointer"
                  >
                    View Program Details
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
