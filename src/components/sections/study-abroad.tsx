'use client';

import {
  GraduationCap,
  DollarSign,
  Clock,
  Home,
  ArrowRight,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface Country {
  flag: string;
  name: string;
  universities: string;
  fees: string;
  duration: string;
  hostel: string;
}

const COUNTRIES: Country[] = [
  {
    flag: '🇷🇺',
    name: 'Russia',
    universities: '50+ Universities',
    fees: '$3,000-$6,000/year',
    duration: '6 Years (MBBS)',
    hostel: 'Hostel Available',
  },
  {
    flag: '🇺🇿',
    name: 'Uzbekistan',
    universities: '30+ Universities',
    fees: '$2,500-$5,000/year',
    duration: '5-6 Years',
    hostel: 'Hostel Available',
  },
  {
    flag: '🇰🇿',
    name: 'Kazakhstan',
    universities: '40+ Universities',
    fees: '$2,800-$5,500/year',
    duration: '5-6 Years',
    hostel: 'Hostel Available',
  },
  {
    flag: '🇬🇪',
    name: 'Georgia',
    universities: '20+ Universities',
    fees: '$4,000-$7,000/year',
    duration: '6 Years',
    hostel: 'Hostel Available',
  },
  {
    flag: '🇰🇬',
    name: 'Kyrgyzstan',
    universities: '15+ Universities',
    fees: '$2,000-$4,000/year',
    duration: '5-6 Years',
    hostel: 'Hostel Available',
  },
  {
    flag: '🇵🇭',
    name: 'Philippines',
    universities: '25+ Universities',
    fees: '$3,000-$5,000/year',
    duration: '5-6 Years',
    hostel: 'Hostel Available',
  },
];

/* ------------------------------------------------------------------ */
/*  CountryCard                                                         */
/* ------------------------------------------------------------------ */

function CountryCard({ country }: { country: Country }) {
  const details = [
    { icon: GraduationCap, label: 'Universities', value: country.universities },
    { icon: DollarSign, label: 'Fees', value: country.fees },
    { icon: Clock, label: 'Duration', value: country.duration },
    { icon: Home, label: 'Hostel', value: country.hostel },
  ] as const;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="group overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/5 backdrop-blur-xl"
    >
      {/* Decorative top gradient strip */}
      <div
        className="h-2 bg-gradient-to-r from-primary to-secondary"
        aria-hidden="true"
      />

      <div className="p-6">
        {/* Flag + Country name */}
        <div className="flex items-center gap-3">
          <span className="text-4xl" role="img" aria-label={`${country.name} flag`}>
            {country.flag}
          </span>
          <h3 className="font-heading text-xl font-semibold text-white">
            {country.name}
          </h3>
        </div>

        {/* Details grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary/70">{label}</p>
                <p className="text-sm text-white">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-5 flex items-center gap-1 text-sm font-medium text-primary transition-colors duration-200 hover:text-accent"
        >
          Explore Programs
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  StudyAbroad Section                                                 */
/* ------------------------------------------------------------------ */

export default function StudyAbroad() {
  return (
    <section
      className="bg-surface/30 py-24"
      aria-labelledby="study-abroad-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">
            GLOBAL OPPORTUNITIES
          </p>
          <h2
            id="study-abroad-heading"
            className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl"
          >
            Study Abroad Programs
          </h2>
          <p className="max-w-2xl text-lg text-text-secondary">
            Explore world-class education opportunities across the globe with
            full support from admission to visa.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {COUNTRIES.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { StudyAbroad };
