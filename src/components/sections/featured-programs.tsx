'use client';

import { 
  Brain, Code, Coffee, Terminal, BarChart3, Clock, 
  Layers, ArrowRight, Star, Trophy, BookOpen, CheckCircle2 
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const MotionLink = motion(Link);

export interface Program {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  projects: number;
  salary: string;
  price: string;
  rating: number;
  placement: string;
  gradient: string;
  hiringCompanies: string[];
  link: string;
  bannerImage: string;
  syllabusPreview: string[];
}

export const PROGRAMS: Program[] = [
  {
    id: "1",
    icon: Code,
    title: 'MERN Stack Development',
    tagline: 'Build Scalable Web Apps & Deploy Production AI Systems',
    description: 'Master MongoDB, Express, React, Next.js, and Node.js to construct responsive commercial web applications.',
    duration: '6 Months',
    projects: 15,
    salary: '₹4.5 - 12 LPA',
    price: '₹6,000',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-blue-400 to-indigo-600',
    hiringCompanies: ['Google', 'Stripe', 'Paytm', 'Deloitte'],
    link: '/courses/mern-stack-development',
    bannerImage: '/banners/mern.webp',
    syllabusPreview: ['React 19 & Next.js', 'Node & Express APIs', 'MongoDB & Mongoose', 'AI Agents & RAG Integration'],
  },
  {
    id: "2",
    icon: Brain,
    title: 'Data Science & Machine Learning',
    tagline: 'From Data Engineering to Generative AI & LLM Systems',
    description: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.',
    duration: '6 Months',
    projects: 20,
    salary: '₹6 - 18 LPA',
    price: '₹6,000',
    rating: 5,
    placement: 'Guaranteed Research Internship',
    gradient: 'from-rose-400 to-red-500',
    hiringCompanies: ['Amazon', 'Microsoft', 'EY', 'Fractal Analytics'],
    link: '/courses/data-science-machine-learning',
    bannerImage: '/banners/datascience.webp',
    syllabusPreview: ['Python & Pandas Analytics', 'ML (XGBoost/Sklearn)', 'Deep Learning TensorFlow', 'LLMs, Vector DBs & RAG'],
  },
  {
    id: "3",
    icon: Layers,
    title: 'Graphic Design + UI/UX Product Design',
    tagline: 'Architect High-Fidelity Interfaces & Enterprise Design Systems',
    description: 'Learn professional graphic design, typography, brand identity, wireframing, high-fidelity prototyping, and design systems.',
    duration: '4 Months',
    projects: 12,
    salary: '₹4 - 10 LPA',
    price: '₹5,000',
    rating: 5,
    placement: 'Placement Auditing',
    gradient: 'from-amber-400 to-orange-500',
    hiringCompanies: ['Adobe', 'Framer', 'Razorpay', 'Infosys'],
    link: '/courses/graphic-design-ui-ux',
    bannerImage: '/banners/design.webp',
    syllabusPreview: ['Visual Design & Grids', 'Figma Auto-Layout & Tokens', 'User Research & Wireframes', 'Interactive Prototyping'],
  },
  {
    id: "4",
    icon: BarChart3,
    title: 'Data Analytics & BI',
    tagline: 'Transform Complex Datasets into Executive Business Intelligence',
    description: 'Mine insights from datasets with SQL, Pandas, Tableau, Power BI, and predictive modeling.',
    duration: '4 Months',
    projects: 10,
    salary: '₹4 - 9 LPA',
    price: '₹5,000',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-indigo-400 to-purple-600',
    hiringCompanies: ['TCS', 'Wipro', 'Cognizant', 'Deloitte'],
    link: '/courses/data-analytics',
    bannerImage: '/banners/analytics.webp',
    syllabusPreview: ['Advanced Excel & Pivot Tables', 'SQL Database Normalization', 'Power BI & DAX Metrics', 'Python Pandas Data Cleaning'],
  },
  {
    id: "5",
    icon: Coffee,
    title: 'Java Full Stack',
    tagline: 'Build Enterprise Microservices & Cloud-Native Backends',
    description: 'Enterprise-grade services using Spring Boot, Hibernate, Angular, and Microservice architectures.',
    duration: '6 Months',
    projects: 10,
    salary: '₹5 - 15 LPA',
    price: '₹6,000',
    rating: 4,
    placement: '100% Placement Support',
    gradient: 'from-red-400 to-orange-600',
    hiringCompanies: ['Capgemini', 'IBM', 'Accenture', 'Oracle'],
    link: '/courses/java-full-stack',
    bannerImage: '/banners/java.webp',
    syllabusPreview: ['Core Java & OOP Patterns', 'Spring Boot & Hibernate ORM', 'RESTful Microservices', 'React/Angular Integration'],
  },
  {
    id: "6",
    icon: Terminal,
    title: 'DevOps Engineering & CI/CD',
    tagline: 'Automate Cloud Infrastructure, Containers & Kubernetes Clusters',
    description: 'Master Docker, Kubernetes, Terraform, Jenkins pipelines, and automated cloud deployments.',
    duration: '6 Months',
    projects: 12,
    salary: '₹5.5 - 14 LPA',
    price: '₹6,000',
    rating: 5,
    placement: '100% Placement Support',
    gradient: 'from-purple-400 to-indigo-600',
    hiringCompanies: ['Docker', 'Kubernetes', 'AWS', 'RedHat'],
    link: '/courses/cloud-devops',
    bannerImage: '/banners/cloud.webp',
    syllabusPreview: ['Linux & Shell Automation', 'Docker Containerization', 'Kubernetes Orchestration', 'Terraform & AWS CI/CD'],
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
      className="group relative rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.015)] transition-all duration-350 hover:shadow-[0_24px_60px_rgba(37,99,235,0.08)] hover:border-primary/20 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      <div>
        {/* Course Abstract Cover Image */}
        <div className="w-full h-44 rounded-2xl mb-5 overflow-hidden relative shadow-inner flex items-center justify-center group/banner">
          <Image
            src={program.bannerImage}
            alt={program.title}
            width={400}
            height={176}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:translate-y-[-2px] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />
          
          {/* Duration Badge Overlaid on Image */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-sm">
              <Clock className="w-3 h-3 text-sky-400" /> {program.duration}
            </span>
          </div>

          {/* Tagline Overlay on bottom of Banner */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <span className="inline-block text-[11px] font-bold text-slate-100 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10 truncate max-w-full">
              {program.tagline}
            </span>
          </div>
        </div>

        {/* Rating Stars & Placement Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
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
            <span className="text-xs font-bold text-slate-700">{program.rating}.0</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100/80 px-2.5 py-0.5 rounded-full">
            <Trophy className="w-3 h-3 text-emerald-500" /> {program.placement}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
          {program.title}
        </h3>
        
        {/* Description */}
        <p className="mt-2 text-[13px] leading-relaxed text-slate-500 font-medium line-clamp-2">
          {program.description}
        </p>

        {/* Syllabus Preview Section */}
        <div className="mt-4 pt-3.5 border-t border-slate-100/80">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-primary" /> Syllabus Preview
          </p>
          <div className="flex flex-wrap gap-1.5">
            {program.syllabusPreview.map((item, idx) => (
              <span key={idx} className="text-[10px] font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-primary/70 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Specs Grid: Fee, Salary, Projects */}
        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 mt-4 pt-3.5 text-center">
          <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
            <p className="text-[9px] text-slate-400 font-bold uppercase">Course Fee</p>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">{program.price}</p>
          </div>

          <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
            <p className="text-[9px] text-slate-400 font-bold uppercase">Projects</p>
            <p className="text-xs font-extrabold text-slate-900 mt-0.5">{program.projects} Live</p>
          </div>

          <div className="bg-emerald-50/50 rounded-xl p-2 border border-emerald-100/60">
            <p className="text-[9px] text-emerald-600/80 font-bold uppercase">Target Salary</p>
            <p className="text-xs font-extrabold text-emerald-700 mt-0.5">{program.salary}</p>
          </div>
        </div>

        {/* Hiring Partners Inline */}
        <div className="mt-4 pt-3 border-t border-slate-100/80">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Top Hiring Partners</p>
          <div className="flex flex-wrap gap-1.5">
            {program.hiringCompanies.map((c) => (
              <span key={c} className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="mt-5 border-t border-slate-100 pt-3.5 flex items-center justify-between">
        <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
          Explore Syllabus & Cohort <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <div className="flex items-center justify-center h-8 w-8 rounded-xl border border-slate-200 text-slate-400 group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-sm">
          <ArrowRight className="h-4 w-4" />
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
        </motion.div>
      </div>
    </section>
  );
}

export { FeaturedPrograms };
