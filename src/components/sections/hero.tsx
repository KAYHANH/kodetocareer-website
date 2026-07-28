'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Award, Trophy, Phone, MapPin, Shield, GraduationCap, CheckCircle2, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const TechStackCircle = dynamic(() => import('@/components/ui/tech-stack-circle'), { ssr: false });

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
  { value: 500, suffix: '+', label: 'Career Placements' },
  { value: 95, suffix: '%', label: 'Success Rate' },
  { value: 10, suffix: '+', label: 'Career Programs' },
  { value: 300, suffix: '+', label: 'Hiring Partners' },
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
    setMounted(true);
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
    setMounted(true);
  }, []);

  return (
    <section
      suppressHydrationWarning
      className="min-h-screen flex items-center relative overflow-hidden -mt-20 pt-24 pb-16"
      aria-label="Hero"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" suppressHydrationWarning />

      {/* Premium blurred light mesh gradient circles */}
      <div
        className="absolute top-[-250px] left-[-150px] w-[700px] h-[700px] rounded-full bg-blue-100/40 blur-3xl transform-gpu animate-float"
        aria-hidden="true"
        suppressHydrationWarning
      />
      <div
        className="absolute top-[20%] right-[-200px] w-[700px] h-[700px] rounded-full bg-sky-100/40 blur-3xl transform-gpu animate-float-delayed"
        aria-hidden="true"
        suppressHydrationWarning
      />
      <div
        className="absolute bottom-[-250px] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-3xl transform-gpu animate-float"
        aria-hidden="true"
        suppressHydrationWarning
      />
      <div
        className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full bg-blue-50/40 blur-3xl transform-gpu animate-float-delayed"
        aria-hidden="true"
        suppressHydrationWarning
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" suppressHydrationWarning />

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
                India&apos;s Career-First Tech Academy
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            >
              <span className="block text-slate-900">Become</span>
              <span className="block gradient-text">Job-Ready</span>
              <span className="block text-slate-900">in 4–6 Months</span>
            </motion.h1>

            {/* Typing line */}
            <motion.p
              className="mt-6 text-xl md:text-2xl text-slate-600 font-semibold h-9"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
              aria-live="polite"
            >
              Become a{' '}
              <span className="text-primary font-bold" suppressHydrationWarning>
                {mounted ? typedWord : ROTATING_WORDS[0]}
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
              Live projects. Industry internships. Placement assistance. Career mentorship. Join 1,200+ students who transformed their careers — starting from just ₹5,000/month.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
            >
              <MotionLink
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-[14px] font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/35 transition-all cursor-pointer"
              >
                <Phone className="w-5 h-5" />
                Book Free Career Counselling
              </MotionLink>
              <motion.a
                href="https://wa.me/919667975616?text=Hi%2C%20I%20want%20to%20attend%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[14px] font-bold text-lg shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                Attend Free Demo Class
              </motion.a>
            </motion.div>

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

            {/* Real Stats Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 w-full max-w-4xl"
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
          <div className="w-full lg:w-[42%] flex justify-center items-center relative min-h-[380px] sm:min-h-[480px] lg:min-h-[640px] overflow-visible">
            <TechStackCircle />
            

          </div>
        </div>
      </div>
    </section>
  );
}
