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
  title: 'KodeToCareer | AI, MERN Stack & Data Science Courses with Placement Assistance',
  description: 'Master AI, MERN Stack, Java, Cloud DevOps, and Data Science with live cohorts, guaranteed internships, and 100% placement support in India. Join online or offline.',
};



export default function Home() {
  const orgSchema = {
    name: 'KodeToCareer',
    url: 'https://kodetocareer.com',
    logo: 'https://kodetocareer.com/main-logo.png',
    sameAs: [
      'https://www.linkedin.com/company/kodetocareer',
      'https://www.instagram.com/kodetocareer',
      'https://www.youtube.com/@KodeToCareer',
      'https://www.facebook.com/kodetocareer'
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer direct placements?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we coordinate directly with hiring managers across our 100+ partner network to dispatch audited portfolios and schedule mock interviews.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long are the programs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Programs range from 3 to 6 months depending on the specialization. Each includes training, projects, internship, and placement preparation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are the certificates recognized by industry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, our certificates are recognized by leading tech companies and can be verified online. They add significant value to your resume.'
        }
      }
    ]
  };

  return (
    <>
      <SchemaMarkup type="Organization" data={orgSchema} />
      <SchemaMarkup type="WebSite" data={websiteSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <Hero />
      <TrustStrip />
      <HiringPartners />
      <TechnologyStack />
      <WhyChooseUs />
      <FeaturedPrograms />
      <LiveProjects />
      <CareerRoadmap />
      <FreeResources />
      <Founder />
      <LiveCounter />

      <FAQ />
      <Newsletter />
    </>
  );
}
