'use client';

import { type LucideIcon, ClipboardList, BookOpen, Code, Briefcase, Trophy } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const verticalLineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  StepItem                                                            */
/* ------------------------------------------------------------------ */

function StepItem({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={stepVariants}
      className="flex flex-col items-center text-center md:w-1/5"
    >
      {/* Circle */}
      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
      </div>

      {/* Step number */}
      <span className="mt-3 text-xs font-medium text-text-secondary">
        Step {index + 1}
      </span>

      {/* Title */}
      <h3 className="mt-2 font-heading text-lg font-semibold text-white">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-1 text-sm text-text-secondary">
        {step.description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MobileStepItem                                                      */
/* ------------------------------------------------------------------ */

function MobileStepItem({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;

  return (
    <motion.div
      variants={stepVariants}
      className="relative flex items-start gap-5 pl-10"
    >
      {/* Circle */}
      <div className="absolute left-0 top-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="pb-10 pl-4">
        <span className="text-xs font-medium text-text-secondary">
          Step {index + 1}
        </span>
        <h3 className="mt-1 font-heading text-lg font-semibold text-white">
          {step.title}
        </h3>
        <p className="mt-1 text-sm text-text-secondary">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  LearningProcess Section                                             */
/* ------------------------------------------------------------------ */

export default function LearningProcess() {
  return (
    <section
      className="bg-surface/30 py-24"
      aria-labelledby="learning-process-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section header */}
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            HOW IT WORKS
          </p>
          <h2
            id="learning-process-heading"
            className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl"
          >
            Your Learning Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-text-secondary">
            A structured path from enrollment to your dream career, with
            mentorship and support at every step.
          </p>
        </motion.div>

        {/* ── Desktop timeline ── */}
        <motion.div
          className="relative mt-16 hidden items-start justify-between md:flex"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Horizontal connecting line */}
          <motion.div
            className="pointer-events-none absolute left-[10%] right-[10%] top-8 h-0.5 origin-left bg-gradient-to-r from-primary via-secondary to-accent"
            variants={lineVariants}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <StepItem key={step.title} step={step} index={i} />
          ))}
        </motion.div>

        {/* ── Mobile timeline ── */}
        <motion.div
          className="relative mt-16 md:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Vertical connecting line */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-5 top-0 w-0.5 origin-top bg-gradient-to-b from-primary via-secondary to-accent"
            variants={verticalLineVariants}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <MobileStepItem key={step.title} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { LearningProcess };
