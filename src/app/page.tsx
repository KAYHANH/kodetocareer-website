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

  return (
    <>
      <SchemaMarkup type="Organization" data={orgSchema} />
      <SchemaMarkup type="WebSite" data={websiteSchema} />
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
