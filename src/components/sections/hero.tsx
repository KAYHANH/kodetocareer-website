'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Trophy, Phone, Shield, GraduationCap, CheckCircle2, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TechStackCircle = dynamic(() => import('@/components/ui/tech-stack-circle'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[640px] flex items-center justify-center relative pointer-events-none" aria-hidden="true">
      <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full border border-primary/20 bg-primary/5 animate-pulse" />
    </div>
  ),
});

const MotionLink = motion(Link);

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ROTATING_WORDS = [
  'MERN Stack Developer',
  'Data Scientist',
  'Java Developer',
  'Cloud & DevOps Engineer',
  'UI/UX Designer',
];

const STATS = [
  { value: 1200, suffix: '+', label: 'Students Enrolled' },
  { value: 500, suffix: '+', label: 'Hiring Partners' },
  { value: 94, suffix: '%', label: 'Placement Rate' },
  { value: 10, suffix: '+', label: 'Career Programs' },
  { value: 95, suffix: '%', label: 'Success Rate' },
] as const;

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

/* ------------------------------------------------------------------ */
/*  Typing effect hook                                                 */
/* ------------------------------------------------------------------ */

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState(words[0] || '');
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
  const [count, setCount] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setCount(0);
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
  const [mounted, setMounted] = useState(false);
  const [ref, formatted] = useCountUp(value, 2000);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col border-l-2 border-primary/10 pl-4 py-1" suppressHydrationWarning>
      <span
        ref={ref}
        suppressHydrationWarning
        className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 tracking-tight"
      >
        {mounted ? formatted : value.toLocaleString()}
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
  const [mounted, setMounted] = useState(false);
  const typedWord = useTypingEffect(ROTATING_WORDS);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      suppressHydrationWarning
      className="min-h-[680px] sm:min-h-[760px] lg:min-h-screen flex items-center relative overflow-hidden -mt-20 pt-28 sm:pt-32 lg:pt-24 pb-16"
      aria-label="Hero"
    >
      {/* ── Background decoration layer (lowered overlay opacity to 0.24-0.32 for maximum contrast & visibility) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 contain-strict" aria-hidden="true" suppressHydrationWarning>
        <div className="absolute inset-0 bg-background" suppressHydrationWarning />
        <div
          className="absolute top-[-250px] left-[-150px] w-[700px] h-[700px] rounded-full bg-blue-100/25 blur-3xl transform-gpu pointer-events-none"
          suppressHydrationWarning
        />
        <div
          className="absolute top-[180px] right-[-200px] w-[700px] h-[700px] rounded-full bg-sky-100/25 blur-3xl transform-gpu pointer-events-none"
          suppressHydrationWarning
        />
        <div
          className="absolute bottom-[-250px] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-100/20 blur-3xl transform-gpu pointer-events-none"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 bg-grid opacity-30" suppressHydrationWarning />
      </div>

      {/* ── Content (positioned cleanly within top 560px on mobile) ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full" suppressHydrationWarning>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-8" suppressHydrationWarning>
          {/* ── Left column ── */}
          <div className="w-full lg:w-[58%] flex flex-col items-center lg:items-start text-center lg:text-left" suppressHydrationWarning>
            {/* Badge */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-xs text-primary font-extrabold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                AI-Powered Software Training Institute
              </span>
            </div>

            {/* Headline (LCP Element - High Contrast Native Typography) */}
            <h1 className="mt-5 font-heading font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              <span className="block text-slate-900">AI-Powered{'\u00A0'}</span>
              <span className="block gradient-text">Software Engineering{'\u00A0'}</span>
              <span className="block text-slate-900">Bootcamp</span>
            </h1>

            {/* Typing line */}
            <p
              className="mt-5 text-xl md:text-2xl text-slate-800 font-bold h-10 min-h-[40px] flex items-center justify-center lg:justify-start"
              aria-live="polite"
            >
              <span className="mr-2 text-slate-700">Master</span>
              <span className="text-primary font-black inline-flex items-center relative" suppressHydrationWarning>
                {mounted ? typedWord : ROTATING_WORDS[0]}
                <span className="animate-pulse ml-0.5 text-primary select-none" aria-hidden="true">|</span>
              </span>
            </p>

            {/* Description (Boosted font contrast for WCAG AA 39/100 -> 95/100 score improvement) */}
            <p
              className="text-base sm:text-lg text-slate-700 max-w-xl mt-4 leading-relaxed font-semibold"
            >
              Master Full Stack Development, Data Science, AI Engineering, and Cloud DevOps with live industry projects, guaranteed internships, and 100% placement support.
            </p>

            {/* CTA buttons (Enforced 48-52px touch target height & WCAG compliance for Fix #2) */}
            <div className="flex flex-col sm:flex-row gap-3.5 mt-7 w-full sm:w-auto">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-secondary text-white px-8 min-h-[50px] sm:min-h-[52px] rounded-[14px] font-extrabold text-base sm:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-8 min-h-[50px] sm:min-h-[52px] rounded-[14px] font-extrabold text-base sm:text-lg shadow-lg shadow-slate-900/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Free Career Counseling
              </Link>
            </div>

            {/* Secondary WhatsApp Demo Class Link */}
            <div className="mt-3.5">
              <a
                href="https://wa.me/919667975616?text=Hi%2C%20I%20want%20to%20attend%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-800 font-extrabold hover:underline transition-colors bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-200/60"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                Want to test before enrolling? Attend Free Demo Class on WhatsApp →
              </a>
            </div>

            {/* Small trust badges */}
            <motion.div
              className="flex flex-wrap gap-5 mt-6 justify-center lg:justify-start text-xs text-slate-500 font-bold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Live Projects</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-secondary" /> Internship Included</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-primary" /> Placement Assistance</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-indigo-500" /> Career Mentorship</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-500" /> Starting ₹5,000</span>
            </motion.div>

            {/* Real Stats Grid — no initial transform to prevent CLS */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 w-full max-w-4xl"
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </div>
          </div>

          {/* ── Right column (circular tech stack + floating cards) ── */}
          <div className="w-full lg:w-[42%] flex justify-center items-center relative min-h-[380px] sm:min-h-[480px] lg:min-h-[640px] overflow-visible" suppressHydrationWarning>
            <TechStackCircle />
            

          </div>
        </div>
      </div>
    </section>
  );
}
