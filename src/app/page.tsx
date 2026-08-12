import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/hero';
import TrustStrip from '@/components/sections/trust-strip';
import HiringPartners from '@/components/sections/hiring-partners';
import TechnologyStack from '@/components/sections/technology-stack';
import SchemaMarkup from '@/components/seo/schema-markup';

// Below-the-fold dynamic imports for route-level code splitting & optimal LCP/INP
const WhyChooseUs = dynamic(() => import('@/components/sections/why-choose-us'));
const FeaturedPrograms = dynamic(() => import('@/components/sections/featured-programs'));
const LiveProjects = dynamic(() => import('@/components/sections/live-projects'));
const CareerRoadmap = dynamic(() => import('@/components/sections/career-roadmap'));
const FreeResources = dynamic(() => import('@/components/sections/free-resources'));
const Founder = dynamic(() => import('@/components/sections/founder'));
const LiveCounter = dynamic(() => import('@/components/sections/live-counter'));
const FAQ = dynamic(() => import('@/components/sections/faq'));
const Newsletter = dynamic(() => import('@/components/sections/newsletter'));

export const metadata = {
  title: 'AI-Powered Software Training Institute | Full Stack, Data Science & Placement | KodeToCareer',
  description: 'Master Full Stack Development, Data Science, AI, and Cloud DevOps through live industry projects. Join KodeToCareer for placement-focused software training in India.',
};

export default function Home() {
  const eduOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'KodeToCareer',
    url: 'https://kodetocareer.com',
    logo: 'https://kodetocareer.com/main-logo.png',
    description: 'Premier AI-powered software training institute specializing in Full Stack Web Development, Data Science, AI Engineering, and Cloud DevOps with 100% placement support.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'A-48 Basement, Sector 2, Near Sector 15 Metro Station',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/kodetocareer',
      'https://www.instagram.com/kodetocareer',
      'https://www.youtube.com/@KodeToCareer',
      'https://www.facebook.com/kodetocareer',
      'https://github.com/KAYHANH',
      'https://www.wikidata.org/wiki/Q11023',
      'https://en.wikipedia.org/wiki/Software_engineering_education'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1240',
      bestRating: '5',
      worstRating: '1'
    }
  };

  const founderSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Md Arbaaz',
    jobTitle: 'Founder & Lead Tech Instructor',
    worksFor: {
      '@type': 'Organization',
      name: 'KodeToCareer'
    },
    url: 'https://kodetocareer.com/about',
    sameAs: [
      'https://www.linkedin.com/in/md-arbaaz-kodetocareer',
      'https://github.com/KAYHANH'
    ]
  };

  const websiteSchema = {
    name: 'KodeToCareer',
    url: 'https://kodetocareer.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kodetocareer.com/courses?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer', 'h2'],
      xpath: ['/html/head/title']
    },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer direct placements for software development courses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we coordinate directly with hiring managers across our 100+ partner network to dispatch audited portfolios and schedule mock interviews.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long are the software engineering and AI training programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Programs range from 3 to 6 months depending on the specialization. Each includes live training, projects, internship, and placement preparation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are the KodeToCareer certificates recognized by IT companies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our certificates are recognized by leading tech companies, accredited under ISO 9001:2015 standards, and can be verified online instantly.'
        }
      }
    ]
  };

  return (
    <>
      <SchemaMarkup type="EducationalOrganization" data={eduOrgSchema} />
      <SchemaMarkup type="Person" data={founderSchema} />
      <SchemaMarkup type="WebSite" data={websiteSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <Hero />
      <TrustStrip />
      <HiringPartners />
      <TechnologyStack />
      {/* Individual Suspense per section: allows independent streaming & reserves space to prevent CLS */}
      <Suspense fallback={<div className="h-[600px] bg-slate-50/50" />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<div className="h-[500px] bg-white/50" />}>
        <FeaturedPrograms />
      </Suspense>
      <Suspense fallback={<div className="h-[600px] bg-slate-50/50" />}>
        <LiveProjects />
      </Suspense>
      <Suspense fallback={<div className="h-[500px] bg-white/50" />}>
        <CareerRoadmap />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] bg-slate-50/50" />}>
        <FreeResources />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] bg-white/50" />}>
        <Founder />
      </Suspense>
      <Suspense fallback={<div className="h-[200px] bg-slate-50/50" />}>
        <LiveCounter />
      </Suspense>
      <Suspense fallback={<div className="h-[400px] bg-white/50" />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<div className="h-[300px] bg-slate-50/50" />}>
        <Newsletter />
      </Suspense>
    </>
  );
}
