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

export default function Home() {
  return (
    <>
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
