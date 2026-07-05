import Hero from '@/components/sections/hero';
import HiringPartners from '@/components/sections/hiring-partners';
import TechnologyStack from '@/components/sections/technology-stack';
import WhyChooseUs from '@/components/sections/why-choose-us';
import FeaturedPrograms from '@/components/sections/featured-programs';
import LiveProjects from '@/components/sections/live-projects';
import CareerRoadmap from '@/components/sections/career-roadmap';
import SuccessStories from '@/components/sections/success-stories';
import FreeResources from '@/components/sections/free-resources';
import Founder from '@/components/sections/founder';
import LiveCounter from '@/components/sections/live-counter';

import FAQ from '@/components/sections/faq';
import Newsletter from '@/components/sections/newsletter';

import SchemaMarkup from '@/components/seo/schema-markup';

export default function Home() {
  const orgSchema = {
    name: 'Kode To Career',
    url: 'https://kodetocareer.com',
    logo: 'https://kodetocareer.com/main-logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9999999999',
      contactType: 'Admissions'
    },
    sameAs: [
      'https://github.com/KAYHANH/kodetocareer-website',
      'https://linkedin.com/company/kodetocareer'
    ]
  };

  const websiteSchema = {
    name: 'Kode To Career',
    url: 'https://kodetocareer.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kodetocareer.com/courses?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What courses does KodeToCareer offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer courses in AI & Machine Learning, MERN Stack, Java Full Stack, Python, Data Analytics, and Digital Marketing. Each course is designed with industry-relevant curriculum and hands-on projects.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do I need prior coding experience?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Not at all! Our beginner programs start from scratch. We guide you from zero to job-ready with structured learning paths.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the placement guarantee?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer dedicated placement support with a 95% placement rate. Our placement cell works with 500+ hiring partners to connect you with opportunities.'
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
      <HiringPartners />
      <TechnologyStack />
      <WhyChooseUs />
      <FeaturedPrograms />
      <LiveProjects />
      <CareerRoadmap />
      <SuccessStories />
      <FreeResources />
      <Founder />
      <LiveCounter />

      <FAQ />
      <Newsletter />
    </>
  );
}
