'use client';

import { motion } from 'framer-motion';

const COMPANIES = [
  'Google',
  'Microsoft',
  'Amazon',
  'Infosys',
  'TCS',
  'Accenture',
  'Wipro',
  'IBM',
  'Meta',
  'Apple',
  'Adobe',
  'Salesforce',
];

export default function TrustedBy() {
  // Duplicate list to ensure smooth infinite marquee scroll
  const marqueeItems = [...COMPANIES, ...COMPANIES, ...COMPANIES];

  return (
    <section className="py-16 border-y border-white/[0.08] relative bg-background overflow-hidden">
      {/* Gradient Fade Masks for smooth fading edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 mb-8 text-center">
        <h2 className="text-xs md:text-sm uppercase tracking-widest text-text-secondary/60 font-semibold">
          Trusted by Industry Leaders Worldwide
        </h2>
      </div>

      {/* Marquee container */}
      <div className="flex overflow-hidden select-none w-full">
        <div className="flex gap-6 py-2 px-4 animate-marquee whitespace-nowrap min-w-full">
          {marqueeItems.map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/[0.08] text-text-secondary font-medium text-base hover:border-primary/30 hover:text-white transition-colors duration-300"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
