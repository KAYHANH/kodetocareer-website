'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Users, Building2, TrendingUp, Award, Briefcase, Sparkles } from 'lucide-react';
import { companyStats } from '@/data/company-stats';

interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
  highlight?: boolean;
}

const STAT_ITEMS: StatCardProps[] = [
  {
    icon: Users,
    value: companyStats.studentsEnrolled, // 1,200+
    label: 'Students Enrolled',
    description: 'Trained across live AI & full stack cohorts',
    highlight: false,
  },
  {
    icon: Building2,
    value: companyStats.hiringPartners, // 500+
    label: 'Hiring Partners',
    description: 'Direct recruitment drives & corporate referrals',
    highlight: false,
  },
  {
    icon: TrendingUp,
    value: companyStats.placementsRate, // 94%
    label: 'Placement Rate',
    description: 'Verified career transformation rate',
    highlight: true,
  },
  {
    icon: Award,
    value: companyStats.highestSalaryPackage, // ₹25 LPA
    label: 'Highest Package',
    description: 'Secured by top software engineering alumni',
    highlight: false,
  },
  {
    icon: Briefcase,
    value: companyStats.averageSalaryPackage, // ₹6.5 LPA
    label: 'Average Package',
    description: 'Competitive starting compensation package',
    highlight: false,
  },
  {
    icon: Sparkles,
    value: companyStats.activeCourses, // 10+
    label: 'Career Programs',
    description: 'Industry-aligned learning specializations',
    highlight: false,
  },
];

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function Stats() {
  return (
    <section
      className="py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800"
      aria-label="Placement and Academy Statistics"
    >
      {/* Background glow and subtle grid */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            PROVEN TRACK RECORD
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Impact in Numbers
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto text-base">
            Quantifiable outcomes achieved through live production projects and dedicated career support.
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STAT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  item.highlight
                    ? 'bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-900/40 border-primary/50 shadow-[0_0_30px_rgba(37,99,235,0.2)]'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="h-6 w-6 text-blue-400" />
                  </div>
                  {item.highlight && (
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      VERIFIED 2026
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-base font-bold text-slate-200 mt-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export { Stats, Stats as PlacementStats };
