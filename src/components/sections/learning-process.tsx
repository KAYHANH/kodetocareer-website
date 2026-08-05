'use client';

import { type LucideIcon, ClipboardList, BookOpen, Code, Briefcase, Trophy } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: ClipboardList,
    title: 'Enroll',
    description: 'Choose your program and get started',
  },
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Master skills through live sessions & projects',
  },
  {
    icon: Code,
    title: 'Build',
    description: 'Work on real-world projects & build portfolio',
  },
  {
    icon: Briefcase,
    title: 'Intern',
    description: 'Complete industry internship with partners',
  },
  {
    icon: Trophy,
    title: 'Get Placed',
    description: 'Land your dream job with placement support',
  },
];

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

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

export default function LearningProcess() {
  return (
    <section
      className="bg-slate-900 py-24 text-white relative overflow-hidden"
      aria-labelledby="learning-process-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
            HOW IT WORKS
          </p>
          <h2
            id="learning-process-heading"
            className="mb-4 font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Your Learning Journey
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-400 font-medium leading-relaxed">
            A structured path from enrollment to your dream career, with mentorship and placement support at every step.
          </p>
        </motion.div>

        {/* ── Single Responsive Step Grid (No duplicated DOM markup) ── */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3 bg-slate-800/50 md:bg-transparent p-4 md:p-0 rounded-2xl border border-slate-700/50 md:border-0"
              >
                {/* Circle Icon */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                  <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>

                <div>
                  {/* Step number */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary block">
                    Step {i + 1}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 font-heading text-base font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-1 text-xs text-slate-400 font-medium leading-relaxed">
                    {step.description}
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

export { LearningProcess };
