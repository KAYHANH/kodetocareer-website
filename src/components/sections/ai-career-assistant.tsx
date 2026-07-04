'use client';

import { Sparkles, Target, TrendingUp } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  { icon: Sparkles, text: 'Personalized career path recommendations' },
  { icon: Target, text: 'Skill gap analysis & learning timeline' },
  { icon: TrendingUp, text: 'Salary predictions & industry insights' },
] as const;

const MOCK_RESULTS = [
  { label: 'Recommended Path', value: 'Full Stack Developer' },
  { label: 'Estimated Salary', value: '₹8-15 LPA' },
  { label: 'Skills Needed', value: '6 skills identified' },
  { label: 'Timeline', value: '8-10 months' },
] as const;

const INPUT_CLASSES =
  'w-full bg-white/5 border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 mb-4 transition-colors duration-200';

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function AICareerAssistant() {
  return (
    <section
      className="relative overflow-hidden py-24"
      aria-labelledby="ai-career-heading"
    >
      {/* Background gradient orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ── Left column: Text ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p
              variants={featureItem}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent"
            >
              AI-POWERED
            </motion.p>

            <motion.h2
              id="ai-career-heading"
              variants={fadeUp}
              className="mb-6 font-heading text-4xl font-bold text-white md:text-5xl"
            >
              Your AI Career Assistant
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mb-8 text-lg text-text-secondary"
            >
              Get personalized career recommendations, skill gap analysis, and a
              custom learning roadmap powered by AI. Simply tell us about
              yourself.
            </motion.p>

            {/* Feature list */}
            {FEATURES.map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                variants={featureItem}
                className="mb-4 flex items-center gap-3"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-text-secondary">{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right column: Interactive widget ── */}
          <motion.div
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className="rounded-[20px] border border-white/[0.08] bg-white/5 p-8 backdrop-blur-xl">
              <h3 className="mb-6 font-heading text-xl font-semibold text-white">
                Get Your Career Report
              </h3>

              {/* Form (UI only) */}
              <form
                onSubmit={(e) => e.preventDefault()}
                aria-label="Career report form"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  aria-label="Your name"
                  className={INPUT_CLASSES}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Highest Qualification"
                  aria-label="Highest qualification"
                  className={INPUT_CLASSES}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Current Skills (e.g., HTML, Python)"
                  aria-label="Current skills"
                  className={INPUT_CLASSES}
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Dream Role (e.g., Full Stack Developer)"
                  aria-label="Dream role"
                  className={INPUT_CLASSES}
                  readOnly
                />

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-4 text-lg font-semibold text-white transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(6,182,212,0.3)]"
                >
                  <Sparkles className="h-5 w-5" />
                  Generate Career Path
                </button>
              </form>

              {/* Mock result preview */}
              <div className="mt-6 grid grid-cols-2 gap-3 opacity-60">
                {MOCK_RESULTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/5 p-3"
                  >
                    <p className="text-xs text-text-secondary/70">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AICareerAssistant };
