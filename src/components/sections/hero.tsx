'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Phone, Award, Trophy } from 'lucide-react';
import TechStackCircle from '@/components/ui/tech-stack-circle';
import Link from 'next/link';

const MotionLink = motion(Link);

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROTATING_WORDS = [
  'AI Integration',
  'Full Stack Development',
  'Data Science & Analytics',
  'Digital Marketing Strategy',
];

const STATS = [
  { value: 1200, suffix: '+', label: 'Students Enrolled' },
  { value: 500, suffix: '+', label: 'Career Placements' },
  { value: 95, suffix: '%', label: 'Placement Rate' },
  { value: 18, suffix: '+', label: 'Professional Courses' },
  { value: 120, suffix: '+', label: 'Projects Built' },
] as const;

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ------------------------------------------------------------------ */
/*  Typing effect hook                                                 */
/* ------------------------------------------------------------------ */

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentWord.slice(0, displayed.length + 1);
          setDisplayed(next);
          if (next === currentWord) {
            setTimeout(() => setIsDeleting(true), pauseMs);
          }
        } else {
          const next = currentWord.slice(0, displayed.length - 1);
          setDisplayed(next);
          if (next === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ------------------------------------------------------------------ */
/*  Counter animation hook                                             */
/* ------------------------------------------------------------------ */

function useCountUp(
  target: number,
  duration = 2000,
): [React.RefObject<HTMLSpanElement | null>, string] {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted = Math.floor(count).toLocaleString();
  return [ref, formatted];
}

/* ------------------------------------------------------------------ */
/*  Stat item                                                          */
/* ------------------------------------------------------------------ */

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [ref, formatted] = useCountUp(value, 2000);

  return (
    <div className="flex flex-col border-l-2 border-primary/10 pl-4 py-1">
      <span
        ref={ref}
        className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 tracking-tight"
      >
        {formatted}
        {suffix}
      </span>
      <span className="text-xs font-semibold text-slate-500 mt-0.5 uppercase tracking-wider">{label}</span>
    </div>
  );
}



/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const typedWord = useTypingEffect(ROTATING_WORDS);

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden -mt-20 pt-24 pb-16"
      aria-label="Hero"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />

      {/* Premium blurred light mesh gradient circles */}
      <div
        className="absolute top-[-250px] left-[-150px] w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-[130px] animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] right-[-200px] w-[700px] h-[700px] rounded-full bg-sky-100/40 blur-[130px] animate-float-delayed"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-250px] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px] animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full bg-blue-50/40 blur-[130px] animate-float-delayed"
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">
          {/* ── Left column ── */}
          <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                AI-Powered Career & Engineering Academy
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-6 font-heading font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            >
              <span className="block text-slate-900">Learn.</span>
              <span className="block gradient-text">Build.</span>
              <span className="block text-slate-900">Get Hired.</span>
            </motion.h1>

            {/* Typing line */}
            <motion.p
              className="mt-6 text-xl md:text-2xl text-slate-600 font-semibold h-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              aria-live="polite"
            >
              Master{' '}
              <span className="text-primary font-bold">
                {typedWord}
                <span className="animate-pulse ml-0.5 text-primary">|</span>
              </span>
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-slate-500 max-w-xl mt-6 leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
            >
              We are an AI-powered technology academy training the next generation of software engineers, data analysts, and AI experts. Get real production experience and direct hiring outcomes.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            >
              <MotionLink
                href="/courses"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all cursor-pointer"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </MotionLink>
              <MotionLink
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#EFF6FF] border border-blue-200 text-primary px-8 py-4 rounded-[14px] font-bold text-lg hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Book Counselling
              </MotionLink>
            </motion.div>

            {/* Small trust badges */}
            <motion.div
              className="flex flex-wrap gap-5 mt-6 justify-center lg:justify-start text-xs text-slate-500 font-bold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-primary" /> AI-Driven Learning</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-secondary" /> ISO 9001:2015 Training</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-emerald-500" /> 100% Placement Support</span>
            </motion.div>

            {/* Real Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 w-full max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75, ease: EASE }}
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Right column (circular tech stack + floating cards) ── */}
          <div className="w-full lg:w-[42%] flex justify-center items-center relative min-h-[500px] lg:min-h-[640px] overflow-visible">
            <TechStackCircle />
            

          </div>
        </div>
      </div>
    </section>
  );
}
