import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Award, Sparkles, MapPin } from 'lucide-react';
import { COURSES_MAP, LOCATIONS } from '@/data/seo-intents';
import SchemaMarkup from '@/components/seo/schema-markup';

interface Props {
  params: Promise<{ slug: string; locationSlug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; locationSlug: string }[] = [];
  Object.keys(COURSES_MAP).forEach((slug) => {
    Object.keys(LOCATIONS).forEach((locationSlug) => {
      params.push({ slug, locationSlug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locationSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const loc = LOCATIONS[locationSlug as keyof typeof LOCATIONS];
  if (!course || !loc) return {};

  return {
    title: `Best ${course.name} Course in ${loc.name} | KodeToCareer`,
    description: `Join the top-rated ${course.name} training in ${loc.name}. Get hands-on projects, industry certifications, and local placement support.`,
    alternates: {
      canonical: `https://kodetocareer.com/courses/${slug}/location/${locationSlug}`,
    }
  };
}

export default async function Page({ params }: Props) {
  const { slug, locationSlug } = await params;
  const course = COURSES_MAP[slug as keyof typeof COURSES_MAP];
  const loc = LOCATIONS[locationSlug as keyof typeof LOCATIONS];
  if (!course || !loc) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Best ${course.name} Course in ${loc.name}`,
    description: `Master ${course.name} with industry professionals in ${loc.name}.`,
    author: {
      '@type': 'Organization',
      name: 'KodeToCareer'
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kodetocareer.com' },
      { '@type': 'ListItem', position: 2, name: 'Courses', item: 'https://kodetocareer.com/courses' },
      { '@type': 'ListItem', position: 3, name: course.name, item: `https://kodetocareer.com/courses/${slug}` },
      { '@type': 'ListItem', position: 4, name: loc.name, item: `https://kodetocareer.com/courses/${slug}/location/${locationSlug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the best ${course.name} course in ${loc.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The best ${course.name} course in ${loc.name} is our class-led cohort program at KodeToCareer. It delivers structured instruction, ${loc.context}, verified internship tags, and direct placement opportunities with top tech firms.`
        }
      }
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: `KodeToCareer — ${loc.name} Hub`,
    description: `Leading ${course.name} training academy in ${loc.name} with live projects, lab access, and direct placements.`,
    url: `https://kodetocareer.com/courses/${slug}/location/${locationSlug}`,
    telephone: '+91-9667975616',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201309',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/kodetocareer',
      'https://www.instagram.com/kodetocareer',
      'https://www.youtube.com/@KodeToCareer'
    ]
  };

  return (
    <>
      <SchemaMarkup type="EducationalOrganization" data={localBusinessSchema} />
      <SchemaMarkup type="Article" data={articleSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <SchemaMarkup type="BreadcrumbList" data={breadcrumbSchema} />
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[10px] font-extrabold text-rose-550 uppercase tracking-wider mb-4">
                  <MapPin className="w-3.5 h-3.5" /> Regional Learning Hub
                </span>
                
                <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight tracking-tight">
                  Best {course.name} Course in {loc.name}
                </h1>
                
                {/* AEO Direct Q&A Answer block */}
                <div className="mt-6 pt-6 border-t border-slate-50 space-y-4">
                  <p className="text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                    Question: What is the best {course.name} course in {loc.name}?
                  </p>
                  <p className="text-slate-750 text-xs font-semibold leading-relaxed pl-4 border-l-2 border-primary">
                    Answer: The best {course.name} course in {loc.name} is our class-led cohort program at KodeToCareer. It delivers structured instruction, local campus/online sessions, verified internship tags, and direct placement opportunities with top tech firms.
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
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Campus Link</span>
                    <span className="text-xs font-extrabold text-slate-800">{loc.name} campus support</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Duration</span>
                    <span className="text-xs font-extrabold text-slate-800">{course.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Fees Range</span>
                    <span className="text-xs font-extrabold text-primary">{course.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Hiring Partners</span>
                    <span className="text-xs font-extrabold text-slate-800">300+ Companies</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Internship</span>
                    <span className="text-xs font-extrabold text-emerald-600">Guaranteed Internship</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Certification</span>
                    <span className="text-xs font-extrabold text-slate-800">ISO 9001:2015 Cert.</span>
                  </div>
                </div>
              </div>

              {/* Core Content sections */}
              <div className="bg-white rounded-[24px] border border-slate-100 p-8 shadow-[0_8px_30px_rgba(0,0,0,0.01)] space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Introduction</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    We host comprehensive coding bootcamp classes in {loc.name}. Students gain access to modern lab infrastructure, peer study cohorts, and active face-to-face mentorship panels.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Who Should Join</h3>
                  <p className="text-slate-550 text-xs leading-relaxed font-semibold">
                    Ideal for local graduates, college students, and working professionals in {loc.name} looking to transition into high-growth technology roles.
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
                  Attend Free Demo Class in {loc.name}
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                  Join a live introductory classroom session with our senior engineers and discuss local job market opportunities.
                </p>
                
                <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="h-11 w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all cursor-pointer animate-pulse-glow"
                  >
                    Request Noida Campus Visit
                  </Link>
                  <a
                    href={`https://wa.me/919667975616?text=Hi, I want to attend a free demo class for ${course.name} near ${loc.name}`}
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
