import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Award } from 'lucide-react';
import { INTERVIEW_RESOURCES } from '@/data/resources-data';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(INTERVIEW_RESOURCES).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = INTERVIEW_RESOURCES[slug];
  if (!res) return {};

  return {
    title: `${res.title} | KodeToCareer`,
    description: res.tagline,
    alternates: {
      canonical: `https://kodetocareer.com/resources/interviews/${slug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = INTERVIEW_RESOURCES[slug];
  if (!res) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: res.questions.map((q) => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.a
      }
    }))
  };

  return (
    <>
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
            {/* Left Main Q&As */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-[10px] font-extrabold text-amber-650 uppercase tracking-wider mb-4">
                  <MessageSquare className="w-3.5 h-3.5" /> Technical Interview Hub
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  {res.title}
                </h1>
                
                <p className="text-slate-550 mt-4 text-xs font-semibold leading-relaxed">
                  {res.introduction}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {res.questions.map((q, idx) => (
                  <div key={idx} className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.005)]">
                    <h3 className="text-xs font-bold text-slate-900 leading-relaxed uppercase tracking-wider mb-3">
                      Q{idx + 1}: {q.q}
                    </h3>
                    <p className="text-slate-550 text-xs leading-relaxed font-semibold pl-4 border-l-2 border-primary/20">
                      {q.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar Cross-Sell */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[24px] border border-white/[0.04] p-6 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10">
                  <Award className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-heading font-extrabold leading-tight">
                    Want to excel in technical rounds?
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Our live, mentor-led programs prepare you for real-world interview assessments, coding challenges, and system design rounds.
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
