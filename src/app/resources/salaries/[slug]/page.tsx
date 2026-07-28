import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Award } from 'lucide-react';
import { SALARY_GUIDES } from '@/data/resources-data';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SALARY_GUIDES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = SALARY_GUIDES[slug];
  if (!guide) return {};

  return {
    title: `${guide.title} | KodeToCareer`,
    description: guide.tagline,
    alternates: {
      canonical: `https://kodetocareer.com/resources/salaries/${slug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const guide = SALARY_GUIDES[slug];
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
            {/* Left Main Salary Guidelines */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-extrabold text-rose-500 uppercase tracking-wider mb-4">
                  <Briefcase className="w-3.5 h-3.5" /> Salary Guide Hub
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {guide.title}
                </h1>
                
                <p className="text-slate-650 mt-4 text-xs font-semibold leading-relaxed">
                  {guide.introduction}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                    Average Annual Salary
                  </h3>
                  <span className="text-3xl font-extrabold text-primary block">
                    {guide.averageSalary}
                  </span>
                </div>
                <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                  <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider mb-2">
                    Market Demand Status
                  </h3>
                  <p className="text-slate-650 text-xs font-semibold leading-relaxed">
                    {guide.marketDemand}
                  </p>
                </div>
              </div>

              {/* Experience Bands Table */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-50 pb-4 mb-6">
                  Salary Range by Experience Level
                </h2>

                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="px-6 py-4">Experience Level</th>
                        <th className="px-6 py-4 text-right">Annual Salary Range</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-semibold text-slate-700 divide-y divide-slate-100">
                      {guide.experienceBands.map((band) => (
                        <tr key={band.level}>
                          <td className="px-6 py-4">{band.level}</td>
                          <td className="px-6 py-4 text-right font-mono text-primary">{band.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    Aiming for the highest band?
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Senior roles require deep systems knowledge, clean coding standards, and architectural design experience. Our bootcamps get you ready.
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
