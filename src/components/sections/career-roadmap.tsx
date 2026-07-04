'use client';

import { useRef } from 'react';
import {
  type LucideIcon,
  BookOpen,
  Code,
  Zap,
  Briefcase,
  Trophy,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';

interface RoadmapStep {
  icon: LucideIcon;
  stage: string;
  title: string;
  description: string;
  duration: string;
}

const STEPS: RoadmapStep[] = [
  {
    icon: BookOpen,
    stage: '1. Join',
    title: 'Admission & Career Alignment',
    description:
      'Enroll in your career academy, get matched with an AI-driven learning roadmap, and set up your development sandbox.',
    duration: 'Week 1',
  },
  {
    icon: Code,
    stage: '2. Training',
    title: 'Rigorous Technical Training',
    description:
      'Learn the core concepts, data structures, backend frameworks, and engineering best practices from industry practitioners.',
    duration: '2-3 Months',
  },
  {
    icon: Zap,
    stage: '3. Projects',
    title: 'Production Product Builds',
    description:
      'Develop real, deployed web systems in teams. Write clean code, run test pipelines, and configure DB migrations.',
    duration: '1-2 Months',
  },
  {
    icon: Briefcase,
    stage: '4. Internship',
    title: 'Paid Corporate Internship',
    description:
      'Work on live commercial codebases at high-growth startups and partner tech companies to earn valuable experience.',
    duration: '2-3 Months',
  },
  {
    icon: Trophy,
    stage: '5. Placement',
    title: 'Direct Placement Drives',
    description:
      'Attend daily placement drives, reference interviews, and lock down high-paying software jobs with placement support.',
    duration: 'Ongoing',
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

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function StepCard({ step }: { step: RoadmapStep }) {
  const Icon = step.icon;

  return (
    <div className="max-w-md w-full rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-350 hover:border-primary/20 hover:shadow-[0_16px_40px_rgba(37,99,235,0.06)] text-left group">
      {/* Icon + Stage */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
          <Icon className="h-5 w-5 text-primary group-hover:scale-115 transition-transform duration-200" />
        </div>
        <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-primary">
          {step.stage}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 font-heading text-lg font-extrabold text-slate-900 group-hover:text-primary transition-colors">
        {step.title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-xs leading-relaxed text-slate-500 font-medium">
        {step.description}
      </p>

      {/* Duration badge */}
      <span className="mt-4 inline-block rounded-full bg-slate-50 border border-slate-100 px-3 py-1 font-heading text-[10px] font-bold text-slate-500 uppercase tracking-wider">
        {step.duration}
      </span>
    </div>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: RoadmapStep;
  index: number;
}) {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      variants={stepVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.12 }}
      className="relative flex items-center"
    >
      {/* ── Desktop layout ── */}
      <div className="hidden w-full md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-12">
        {/* Left content */}
        <div className={isEven ? 'order-1' : 'order-1 flex justify-end'}>
          {!isEven && <StepCard step={step} />}
        </div>

        {/* Center Number Dot */}
        <div className="relative z-10 order-2 flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-white bg-primary text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.35)] hover:scale-110 transition-transform cursor-pointer">
            {index + 1}
          </div>
        </div>

        {/* Right content */}
        <div className={isEven ? 'order-3' : 'order-3'}>
          {isEven && <StepCard step={step} />}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="flex w-full items-start gap-4 md:hidden">
        {/* Number Dot */}
        <div className="relative z-10 mt-6 flex shrink-0 items-center justify-center">
          <div className="h-10 w-10 rounded-full border-4 border-white bg-primary text-white font-heading font-extrabold text-sm flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.35)]">
            {index + 1}
          </div>
        </div>

        {/* Card */}
        <div className="flex-1">
          <StepCard step={step} />
        </div>
      </div>
    </motion.div>
  );
}

export default function CareerRoadmap() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.5'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-labelledby="career-roadmap-heading">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/20 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-primary font-bold">
            YOUR PLACEMENT PATH
          </p>
          <h2
            id="career-roadmap-heading"
            className="mb-4 font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            The Student Placement Journey
          </h2>
          <p className="mx-auto max-w-2xl text-slate-500 text-sm md:text-base font-medium">
            From the classroom to your corporate onboarding. Follow our structured, step-by-step career path.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative mt-16">
          {/* Vertical track line */}
          <div
            className="absolute left-[19px] top-0 h-full w-0.5 bg-slate-100 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-[19px] top-0 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-secondary md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />

          {/* Timeline steps */}
          <div className="relative flex flex-col gap-12 md:gap-16">
            {STEPS.map((step, index) => (
              <TimelineStep key={step.title} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { CareerRoadmap };
