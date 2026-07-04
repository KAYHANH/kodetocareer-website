'use client';

import {
  Rocket,
  Users,
  MessageSquare,
  Building,
  HeartHandshake,
  Brain,
  FileText,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  WhyChooseUs Section                                                 */
/* ------------------------------------------------------------------ */

export default function WhyChooseUs() {
  return (
    <section
      className="bg-gradient-to-b from-[#F8FAFC] to-white py-24 border-y border-slate-100 relative overflow-hidden"
      aria-labelledby="why-choose-us-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-300/5 blur-[100px] pointer-events-none" />

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
            WHY KODETOCAREER
          </p>
          <h2
            id="why-choose-us-heading"
            className="mb-4 font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Everything You Need to Succeed
          </h2>
          <p className="mx-auto max-w-2xl text-slate-500 text-sm md:text-base font-medium">
            A complete industry-aligned education ecosystem designed to transform beginners into high-performing software engineers.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Card 1: Live Industry Projects (Double Column Span) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] md:col-span-2 flex flex-col justify-between overflow-hidden relative min-h-[320px]"
          >
            <div className="absolute top-6 right-6 w-1/3 h-full hidden sm:block pointer-events-none opacity-90 group-hover:scale-105 transition-transform duration-300">
              {/* Visual Component: Terminal Mockup */}
              <div className="w-full bg-slate-900 rounded-xl border border-slate-800 p-3.5 shadow-2xl font-mono text-[9px] text-emerald-400">
                <div className="flex gap-1.5 mb-2 border-b border-slate-800 pb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <p className="text-slate-500"># npm run build:prod</p>
                <p className="text-white">✓ Compiled successfully</p>
                <p className="text-indigo-400">⚡ Server: running on port 3000</p>
                <p className="text-slate-500"># api/v1/deploy-status</p>
                <p>Status: <span className="bg-emerald-500/25 px-1.5 py-0.5 rounded text-[8px] font-bold text-emerald-400">ACTIVE</span></p>
              </div>
            </div>
            
            <div className="max-w-[60%]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Live Industry Projects
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Work on actual commercial products deployed in production with real users, databases, and APIs. We don't just teach syntax—we teach product engineering.
              </p>
            </div>
            
            <Link
              href="/courses"
              className="mt-8 flex items-center gap-1.5 text-xs font-bold text-primary hover:text-secondary transition-colors cursor-pointer"
            >
              Learn Product Architecture <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Card 2: Top Tier Mentors */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Top Tier Mentors
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Learn directly from senior engineers and architects at Google, Amazon, Meta, and Netflix through live interactive code reviews.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-[10px] bg-slate-50 border border-slate-150 font-bold text-slate-700 px-2.5 py-1 rounded-full uppercase">Google Devs</span>
              <span className="text-[10px] bg-slate-50 border border-slate-150 font-bold text-slate-700 px-2.5 py-1 rounded-full uppercase">AWS Architects</span>
            </div>
          </motion.div>

          {/* Card 3: Dedicated Placement Cell */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100">
                <Building className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Dedicated Placement Cell
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Get matched with 500+ global hiring partners through direct recruitment drives, career counselling, and referral lists.
              </p>
            </div>

            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-slate-900">80+</span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Hiring Partners</span>
            </div>
          </motion.div>

          {/* Card 4: AI Career Guidance */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 border border-violet-100">
                <Brain className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                AI Career Guidance
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Leverage personalized AI learning roadmaps, skill gap analyses, and predictive salary insights customized to your current skills.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs text-violet-600 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Engine Active
            </div>
          </motion.div>

          {/* Card 5: ATS Resume Builder */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100">
                <FileText className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                ATS Resume Builder
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Build high-scoring, ATS-optimized resumes that stand out to hiring managers and bypass automated screening tools.
              </p>
            </div>

            {/* ATS Score Indicator */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
                <span>ATS Resume Score</span>
                <span className="text-emerald-600 font-bold">92% Match</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[92%]" />
              </div>
            </div>
          </motion.div>

          {/* Card 6: Unlimited Mock Interviews */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 border border-amber-100">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Unlimited Mock Interviews
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Practice with real-world scenarios and receive detailed feedback from industry experts. Ready for technical and HR rounds.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs text-amber-600 font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5" /> 3.8x Hire Probability
            </div>
          </motion.div>

          {/* Card 7: Lifetime Support */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 border border-cyan-100">
                <HeartHandshake className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Lifetime Support
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Access career counseling, mentorship, and community networking long after you graduate. We are your long-term career partner.
              </p>
            </div>

            <div className="mt-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
              Career Partner for Life
            </div>
          </motion.div>

          {/* Card 8: Verified Credentials */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-300 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 border border-sky-100">
                <Award className="h-6 w-6 text-sky-600" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                Verified Credentials
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 font-medium">
                Earn industry-recognized certificates verified on the blockchain for credentials that carry weight with global HR recruiters.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-1.5 text-xs text-sky-600 font-bold uppercase tracking-wider">
              100% Cryptographically Verified
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { WhyChooseUs };
