'use client';

import { 
  Brain, Code, Coffee, Terminal, BarChart3, TrendingUp, Clock, 
  Layers, ArrowRight, Sparkles, Star, DollarSign, Trophy 
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';

const MotionLink = motion(Link);

interface Program {
  id: string;
  icon: any;
  title: string;
  description: string;
  duration: string;
  projects: number;
  salary: string;
  rating: number;
  placement: string;
  gradient: string;
  hiringCompanies: string[];
  link: string;
  bannerImage: string;
}

const PROGRAMS: Program[] = [
  {
    id: "1",
    icon: Code,
    title: 'MERN Stack Development',
    description: 'Master MongoDB, Express, React, and Node.js to construct responsive commercial web applications.',
    duration: '6 Months',
    projects: 15,
    salary: '₹4.5 - 12 LPA',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-blue-400 to-indigo-600',
    hiringCompanies: ['Google', 'Stripe', 'Paytm', 'Deloitte'],
    link: '/courses/1',
    bannerImage: '/banners/mern.png',
  },
  {
    id: "2",
    icon: Brain,
    title: 'Data Science & Machine Learning',
    description: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.',
    duration: '6 Months',
    projects: 20,
    salary: '₹6 - 18 LPA',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-rose-400 to-red-500',
    hiringCompanies: ['Amazon', 'Microsoft', 'EY', 'Fractal Analytics'],
    link: '/courses/2',
    bannerImage: '/banners/datascience.png',
  },
  {
    id: "3",
    icon: Layers,
    title: 'Graphic Design + UI/UX Product Design',
    description: 'Learn professional graphic design, typography, brand identity, wireframing, high-fidelity prototyping, and design systems.',
    duration: '4 Months',
    projects: 8,
    salary: '₹4 - 10 LPA',
    rating: 5,
    placement: 'Placement Auditing',
    gradient: 'from-amber-400 to-orange-500',
    hiringCompanies: ['Adobe', 'Framer', 'Razorpay', 'Infosys'],
    link: '/courses/3',
    bannerImage: '/banners/design.png',
  },
  {
    id: "4",
    icon: BarChart3,
    title: 'Data Analytics & BI',
    description: 'Mine insights from datasets with SQL, Pandas, Tableau, Power BI, and predictive modeling.',
    duration: '4 Months',
    projects: 10,
    salary: '₹4 - 9 LPA',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-indigo-400 to-purple-600',
    hiringCompanies: ['TCS', 'Wipro', 'Cognizant', 'Deloitte'],
    link: '/courses/4',
    bannerImage: '/banners/analytics.png',
  },
  {
    id: "5",
    icon: Coffee,
    title: 'Java Full Stack',
    description: 'Enterprise-grade services using Spring Boot, Hibernate, Angular, and Microservice architectures.',
    duration: '6 Months',
    projects: 10,
    salary: '₹5 - 15 LPA',
    rating: 4,
    placement: '100% Placement Support',
    gradient: 'from-red-400 to-orange-600',
    hiringCompanies: ['Capgemini', 'IBM', 'Accenture', 'Oracle'],
    link: '/courses/5',
    bannerImage: '/banners/java.png',
  },
  {
    id: "6",
    icon: Terminal,
    title: 'DevOps Engineering & CI/CD',
    description: 'Master Docker, Kubernetes, Terraform, Jenkins pipelines, and automated cloud deployments.',
    duration: '5 Months',
    projects: 8,
    salary: '₹5.5 - 14 LPA',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-purple-400 to-indigo-600',
    hiringCompanies: ['Docker', 'Kubernetes', 'AWS', 'RedHat'],
    link: '/courses/6',
    bannerImage: '/banners/cloud.png',
  },
];

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

function ProgramCard({ program }: { program: Program }) {
  return (
    <MotionLink
      href={program.link}
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-350 hover:shadow-[0_24px_60px_rgba(37,99,235,0.06)] hover:border-primary/20 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      <div>
        {/* Course Abstract Cover Image */}
        <div className="w-full h-40 rounded-2xl mb-6 overflow-hidden relative shadow-inner flex items-center justify-center group/banner">
          {/* Background Image Banner with Hover Zoom (1.05x), Transition 300ms */}
          <img
            src={program.bannerImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:translate-y-[-2px] pointer-events-none"
          />
          {/* Subtle dark overlay for text contrast */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          {/* Soft lighting glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white/10 to-transparent pointer-events-none mix-blend-screen" />
        </div>

        {/* Rating Stars & Duration Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < program.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 uppercase bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-primary" /> {program.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
          {program.title}
        </h3>
        
        {/* Description */}
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500 font-medium">
          {program.description}
        </p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3.5 border-t border-slate-50 mt-5 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50/50 flex items-center justify-center border border-blue-100/50">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Projects</p>
              <p className="text-xs font-extrabold text-slate-800 mt-1">{program.projects} Industry</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50/50 flex items-center justify-center border border-emerald-100/50">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Salary Target</p>
              <p className="text-xs font-extrabold text-slate-800 mt-1">{program.salary}</p>
            </div>
          </div>
        </div>

        {/* Hiring Partners Inline */}
        <div className="mt-5 border-t border-slate-50 pt-4">
          <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider mb-2">Graduates hired by</p>
          <div className="flex flex-wrap gap-1.5">
            {program.hiringCompanies.map((c) => (
              <span key={c} className="text-[9px] font-bold text-slate-700 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Badges & CTA */}
      <div className="mt-6 border-t border-slate-50 pt-4 flex items-center justify-between">
        <div className="flex gap-1.5 items-center">
          <Trophy className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider">{program.placement}</span>
        </div>

        <div
          className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300 shadow-sm"
        >
          <ArrowRight className="h-4.5 w-4.5" />
        </div>
      </div>
    </MotionLink>
  );
}

export default function FeaturedPrograms() {
  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100" aria-labelledby="featured-programs-heading">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Section header */}
        <motion.div
          className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-primary font-bold">
              OUR CAREER ACADEMIES
            </p>
            <h2
              id="featured-programs-heading"
              className="mb-4 font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
            >
              Featured Career Programs
            </h2>
            <p className="max-w-2xl text-slate-500 text-sm md:text-base font-medium">
              Industry-led curriculums with rigorous hands-on projects, live mentorship, and active placement cycles.
            </p>
          </div>
          <Link
            href="/courses"
            className="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-primary font-bold hover:text-secondary transition-colors group text-sm"
          >
            View All Programs
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PROGRAMS.map((program) => (
            <ProgramCard key={program.title} program={program} />
          ))}

          {/* 7th Bento Card: Spotlight CTA */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.015 }}
            className="rounded-[28px] bg-gradient-to-br from-primary via-blue-600 to-secondary p-6 text-white shadow-[0_8px_30px_rgba(37,99,235,0.15)] flex flex-col justify-between group min-h-[380px]"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md uppercase tracking-wider">
                Custom Assessment
              </span>
              <h3 className="mt-6 font-heading text-2xl font-extrabold leading-tight">
                Not sure which path to choose?
              </h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed font-medium">
                Take our quick 2-minute skill analysis. Get matched with a customized learning path based on your background and target career goals.
              </p>
            </div>

            <Link
              href="/start"
              className="flex items-center justify-between bg-white text-primary font-bold px-5 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg text-sm"
            >
              Start AI Skill Assessment
              <ArrowRight className="w-4.5 h-4.5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export { FeaturedPrograms };
