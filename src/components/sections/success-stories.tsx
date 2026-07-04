'use client';

import { Star, Building2, Quote, Play, ExternalLink } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  salary: string;
  quote: string;
  stars: number;
  videoDuration: string;
  colorGrad: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Full Stack Developer',
    company: 'Google',
    salary: '₹12 LPA',
    quote: 'The real production work during my MERN bootcamp made the Google technical interviews feel like another day at the academy.',
    stars: 5,
    videoDuration: '1:42',
    colorGrad: 'from-blue-600 via-blue-900 to-slate-900',
  },
  {
    name: 'Priya Patel',
    role: 'Data Analyst',
    company: 'Microsoft',
    salary: '₹10 LPA',
    quote: 'The automated resume checks and 1-on-1 mock interviews prepared me to present complex datasets with complete confidence.',
    stars: 5,
    videoDuration: '2:15',
    colorGrad: 'from-purple-600 via-indigo-900 to-slate-900',
  },
  {
    name: 'Amit Kumar',
    role: 'Java Developer',
    company: 'Amazon',
    salary: '₹14 LPA',
    quote: 'From zero backend coding knowledge to designing microservice frameworks at Amazon. The mentors here are phenomenal.',
    stars: 5,
    videoDuration: '1:58',
    colorGrad: 'from-orange-600 via-red-900 to-slate-900',
  },
  {
    name: 'Sneha Reddy',
    role: 'UI/UX Designer',
    company: 'Adobe',
    salary: '₹8 LPA',
    quote: 'I built a production design portfolio that got direct interview calls from hiring managers. The credentials really matter.',
    stars: 5,
    videoDuration: '2:40',
    colorGrad: 'from-pink-600 via-purple-900 to-slate-900',
  },
  {
    name: 'Vikram Singh',
    role: 'Python Developer',
    company: 'Infosys',
    salary: '₹11 LPA',
    quote: 'I was code-ready from Day 1 at Infosys. Building automation scripts for real clients made a huge difference.',
    stars: 5,
    videoDuration: '1:30',
    colorGrad: 'from-teal-600 via-emerald-900 to-slate-900',
  },
  {
    name: 'Ananya Das',
    role: 'AI Engineer',
    company: 'Meta',
    salary: '₹18 LPA',
    quote: 'The advanced ML projects and API integration modules kept me weeks ahead of typical college curriculums.',
    stars: 5,
    videoDuration: '3:05',
    colorGrad: 'from-amber-600 via-orange-900 to-slate-900',
  },
];

function getInitials(name: string): string {
  return name.split(' ').map((part) => part[0]).join('').toUpperCase();
}

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const scrollContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.015 }}
      className="min-w-[360px] max-w-[380px] shrink-0 snap-center rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.015)] hover:border-primary/20 hover:shadow-[0_24px_60px_rgba(37,99,235,0.06)] transition-all duration-350 flex flex-col justify-between group"
    >
      <div>
        {/* Mock Video Review Container */}
        <div className={`relative w-full h-36 rounded-2xl bg-gradient-to-tr ${testimonial.colorGrad} overflow-hidden mb-5 flex items-center justify-center border border-slate-900/50 shadow-inner`}>
          <div className="absolute inset-0 bg-black/10 opacity-30 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-grid opacity-15" />
          
          {/* Play Button Overlay */}
          <div className="relative z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 cursor-pointer">
            <Play className="w-4.5 h-4.5 text-white fill-white translate-x-0.5" />
          </div>
          
          <span className="absolute bottom-2.5 left-3 text-[9px] font-bold text-white/70 uppercase tracking-widest bg-black/35 px-2 py-0.5 rounded-md">
            VIDEO REVIEW • {testimonial.videoDuration}
          </span>
        </div>

        {/* Header: headshot avatar + information */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <span className="text-sm font-extrabold text-primary">
              {getInitials(testimonial.name)}
            </span>
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-900 leading-tight">
              {testimonial.name}
            </h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">{testimonial.role}</p>
          </div>

          {/* LinkedIn Profile link */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center justify-center w-7 h-7 rounded-xl border border-slate-200 text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            aria-label={`${testimonial.name} LinkedIn Profile`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Company & Salary Row */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/5 px-3 py-1 border border-emerald-100/50">
            <Building2 className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
              {testimonial.company}
            </span>
          </div>
          
          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Salary Package</span>
            <span className="font-heading text-sm font-extrabold text-slate-800 block mt-1">{testimonial.salary}</span>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="relative mt-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
          <Quote className="absolute right-3 top-3 h-8 w-8 text-slate-200/50 pointer-events-none" aria-hidden="true" />
          <p className="text-[12px] leading-relaxed text-slate-500 font-medium italic relative z-10 pr-6">
            "{testimonial.quote}"
          </p>
        </div>
      </div>

      {/* Star Ratings */}
      <div className="mt-5 flex gap-0.5" aria-label={`${testimonial.stars} out of 5 stars`}>
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
    </motion.div>
  );
}

export default function SuccessStories() {
  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden" aria-labelledby="success-stories-heading">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      
      <div className="mx-auto max-w-[1440px] px-6 relative z-10">
        {/* Section header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-widest text-primary font-bold">
            STUDENT OUTCOMES
          </p>
          <h2
            id="success-stories-heading"
            className="mb-4 font-heading text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
          >
            Real Stories, Proven Placements
          </h2>
          <p className="max-w-2xl text-slate-500 text-sm md:text-base font-medium mx-auto">
            Discover how KodeToCareer students from non-tech backgrounds transitioned into high-growth software engineering roles at global organizations.
          </p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <motion.div
          className="scrollbar-hide mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6"
          variants={scrollContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { SuccessStories };
