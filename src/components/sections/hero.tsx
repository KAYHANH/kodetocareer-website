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
        className="text-2xl md:text-3xl font-extrabold font-heading text-slate-900 tracking-tight tabular-nums min-w-[72px] inline-block"
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
      className="min-h-[740px] lg:min-h-screen flex items-center relative overflow-hidden -mt-20 pt-28 sm:pt-36 pb-16"
      aria-label="Hero"
    >
      {/* ── Background decoration layer ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 contain-strict select-none" aria-hidden="true" suppressHydrationWarning>
        <div className="absolute inset-0 bg-background" />
        <div
          className="absolute -top-40 -left-20 w-[500px] h-[500px] max-w-[80vw] rounded-full bg-blue-100/25 blur-3xl transform-gpu pointer-events-none"
        />
        <div
          className="absolute top-40 -right-20 w-[500px] h-[500px] max-w-[80vw] rounded-full bg-sky-100/25 blur-3xl transform-gpu pointer-events-none"
        />
        <div
          className="absolute -bottom-40 left-[20%] w-[450px] h-[450px] max-w-[80vw] rounded-full bg-indigo-100/20 blur-3xl transform-gpu pointer-events-none"
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-6 w-full" suppressHydrationWarning>
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

            {/* Headline (High Contrast & Clear Hierarchy) */}
            <h1 className="mt-5 font-heading font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
              <span className="block text-slate-950">AI-Powered{'\u00A0'}</span>
              <span className="block gradient-text">Software Engineering{'\u00A0'}</span>
              <span className="block text-slate-950">Bootcamp</span>
            </h1>

            {/* Typing line */}
            <p
              className="mt-5 text-lg sm:text-xl md:text-2xl text-slate-700 font-extrabold h-10 min-h-[40px] flex items-center justify-center lg:justify-start"
              aria-live="polite"
            >
              <span className="mr-2 shrink-0">Master</span>
              <span className="text-primary font-black inline-flex items-center relative text-left min-w-[280px] sm:min-w-[340px]" suppressHydrationWarning>
                <span>{mounted ? typedWord : ROTATING_WORDS[0]}</span>
                <span className="animate-pulse ml-0.5 text-primary select-none w-2 inline-block text-left shrink-0" aria-hidden="true">|</span>
              </span>
            </p>

            {/* Description (Enhanced Contrast text-slate-700) */}
            <p
              className="text-base sm:text-lg text-slate-700 max-w-xl mt-5 leading-relaxed font-semibold"
            >
              Master Full Stack Development, Data Science, AI Engineering, and Cloud DevOps with live industry projects, guaranteed internships, and 100% placement support.
            </p>

            {/* CTA buttons (Fix: Mobile Button Height 50px min, 16px field gap) */}
            <div className="flex flex-col sm:flex-row gap-4 mt-7 w-full sm:w-auto">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-secondary text-white px-8 h-[50px] min-h-[50px] sm:h-14 rounded-[14px] font-black text-base sm:text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <GraduationCap className="w-5 h-5 shrink-0" />
                Explore Courses
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white px-8 h-[50px] min-h-[50px] sm:h-14 rounded-[14px] font-black text-base sm:text-lg shadow-lg shadow-slate-950/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-400/30"
              >
                <Phone className="w-5 h-5 shrink-0" />
                Free Career Counseling
              </Link>
            </div>

            {/* Secondary WhatsApp Demo Class Link */}
            <div className="mt-3.5">
              <a
                href="https://wa.me/919667975616?text=Hi%2C%20I%20want%20to%20attend%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-700 font-extrabold hover:underline transition-colors p-1"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                Want to test before enrolling? Attend Free Demo Class on WhatsApp →
              </a>
            </div>

            {/* Small trust badges */}
            <motion.div
              className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start text-xs text-slate-700 font-extrabold uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live Projects</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-secondary" /> Internship Included</span>
              <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-primary" /> Placement Assistance</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-indigo-600" /> Career Mentorship</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-600" /> Starting ₹5,000</span>
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
