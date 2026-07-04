'use client';

import { Check } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
}

const PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '₹15,999',
    description: 'Perfect for beginners exploring tech careers',
    features: [
      '1 Course Access',
      'Self-paced learning',
      'Certificate of Completion',
      'Community Access',
      'Email Support',
    ],
    featured: false,
  },
  {
    name: 'Professional',
    price: '₹29,999',
    description: 'Most popular for serious career changers',
    features: [
      '3 Course Access',
      'Live mentor sessions',
      'Real-world projects',
      'Internship opportunity',
      'Resume building',
      'Mock interviews',
      'Priority Support',
    ],
    featured: true,
  },
  {
    name: 'Career Pro',
    price: '₹49,999',
    description: 'Complete career transformation package',
    features: [
      'Unlimited Course Access',
      '1-on-1 mentorship',
      'Guaranteed internship',
      'Placement assistance',
      'AI career guidance',
      'LinkedIn optimization',
      'Lifetime access',
      '24/7 Support',
    ],
    featured: false,
  },
];

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
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
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
/*  PricingCard                                                         */
/* ------------------------------------------------------------------ */

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
      className={cn(
        'relative flex flex-col rounded-[24px] border border-slate-100 bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.01)] transition-all duration-300 hover:shadow-[0_12px_36px_rgba(37,99,235,0.06)]',
        plan.featured && 'md:scale-105 ring-2 ring-primary hover:border-primary/20',
      )}
    >
      {/* Gradient top bar (featured only) */}
      {plan.featured && (
        <div
          className="absolute inset-x-0 top-0 h-[3px] rounded-t-[24px] bg-gradient-to-r from-primary to-secondary"
          aria-hidden="true"
        />
      )}

      {/* "Most Popular" badge */}
      {plan.featured && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-1 text-xs font-semibold text-white shadow-lg shadow-primary/20">
          Most Popular
        </span>
      )}

      {/* Plan name */}
      <h3 className="font-heading text-xl font-bold text-slate-900">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-numbers text-5xl font-extrabold text-slate-900">
          {plan.price}
        </span>
        <span className="text-sm font-semibold text-slate-400">/program</span>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-slate-500 leading-relaxed">{plan.description}</p>

      {/* Divider */}
      <div className="my-6 h-px bg-slate-100" aria-hidden="true" />

      {/* Features */}
      <ul className="flex-1 space-y-3.5" role="list" aria-label={`${plan.name} plan features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Check
              className="h-4 w-4 shrink-0 text-green-600"
              aria-hidden="true"
            />
            <span className="text-sm text-slate-600 font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className={cn(
          'mt-8 w-full cursor-pointer rounded-xl py-4 font-bold transition-all duration-300 text-sm tracking-wide uppercase',
          plan.featured
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30'
            : 'border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100',
        )}
        aria-label={`Get started with ${plan.name} plan`}
      >
        Get Started
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pricing Section                                                     */
/* ------------------------------------------------------------------ */

export default function Pricing() {
  return (
    <section className="py-24 bg-white" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            PRICING
          </p>
          <h2
            id="pricing-heading"
            className="mb-4 font-heading text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight"
          >
            Invest in Your Future
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Choose the plan that fits your career goals
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Pricing };
