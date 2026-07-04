"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookOpen, Clock, Award, Shield, CheckCircle,
  ArrowRight, Sparkles, Star, ChevronDown, CheckCircle2,
  Building2, ArrowUpRight, GraduationCap, LayoutGrid,
  Briefcase, Layers, DollarSign, Users, Check,
  Timer, Laptop, FileCheck, RefreshCw, StarHalf
} from "lucide-react";

/* ───── Easing definition ───── */
const EASE = [0.21, 0.47, 0.32, 0.98];

const CATEGORIES = [
  "All",
  "Software Engineering",
  "Data & AI",
  "Cloud",
  "Digital Marketing",
  "Design"
];

interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  projects: string;
  salary: string;
  level: string;
  rating: number;
  reviews: number;
  internship: string;
  placement: string;
  skills: string[];
  difficulty: string;
  tagline: string;
  desc: string;
  color: string;
  priceUpfront: string;
  pricePlaced: string;
  oldPrice: string;
  badge: string;
  liveClasses: string;
  mentor: string;
  tools: string[];
  image: string;
}

const COURSES: Course[] = [
  {
    id: 1,
    title: "MERN Stack Development + AI Integration",
    category: "Software Engineering",
    duration: "6 Months",
    projects: "15+ Projects",
    salary: "₹4.5 - 12 LPA",
    level: "Beginner to Advanced",
    rating: 4.9,
    reviews: 142,
    internship: "Guaranteed Paid Internship",
    placement: "100% Placement Support",
    skills: ["React", "Node.js", "Express", "MongoDB", "Next.js", "AI Agents"],
    difficulty: "Beginner",
    tagline: "Become a professional Full Stack Developer & AI Engineer with our production-grade MERN Stack course.",
    desc: "Master full-stack web development and learn to build AI-powered features, chatbots, and automation workflows.",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-100",
    priceUpfront: "₹5,000",
    pricePlaced: "₹3,000",
    oldPrice: "₹12,500",
    badge: "Best Seller",
    liveClasses: "Daily Live",
    mentor: "Google & Meta Alumni",
    tools: ["React.svg", "Next.js.svg", "Node.js.svg", "Express.svg", "MongoDB.svg", "Git.svg"],
    image: "from-blue-600 to-indigo-700"
  },
  {
    id: 2,
    title: "Data Science & Machine Learning Core",
    category: "Data & AI",
    duration: "6 Months",
    projects: "20+ Projects",
    salary: "₹6.0 - 18 LPA",
    level: "Intermediate",
    rating: 4.8,
    reviews: 98,
    internship: "Guaranteed Research Internship",
    placement: "100% Placement Support",
    skills: ["Python", "TensorFlow", "Pandas", "Scikit-Learn", "SQL", "NLP"],
    difficulty: "Intermediate",
    tagline: "Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.",
    desc: "Data Science and AI now sit at the center of every major industry. Companies are racing to hire people who can turn raw data into decisions — and that demand is only accelerating. This program is meticulously designed to take you from programming fundamentals to Generative AI and deployment.",
    color: "from-rose-500/10 to-indigo-500/10 border-rose-100",
    priceUpfront: "₹6,000",
    pricePlaced: "₹4,000",
    oldPrice: "₹15,000",
    badge: "Most Popular",
    liveClasses: "Live Cohorts",
    mentor: "Data Architects",
    tools: ["Python.svg", "TensorFlow.svg", "PyTorch.svg", "PostgresSQL.svg", "Docker.svg", "Git.svg"],
    image: "from-purple-600 to-pink-700"
  },
  {
    id: 3,
    title: "Graphic Design + UI/UX Product Design Systems",
    category: "Design",
    duration: "4 Months",
    projects: "12+ Projects",
    salary: "₹4.0 - 10 LPA",
    level: "Beginner",
    rating: 4.9,
    reviews: 86,
    internship: "Guaranteed Internship",
    placement: "100% Placement Support",
    skills: ["Figma", "UI Design", "UX Research", "Design Systems", "Prototyping"],
    difficulty: "Beginner",
    tagline: "Become a professional UI/UX & Brand Designer with our Figma design system course.",
    desc: "Master layout theory, user psychology, information hierarchy, wireframing, high-fidelity prototypes, and component design systems.",
    color: "from-purple-500/10 to-pink-500/10 border-purple-100",
    priceUpfront: "₹10,000",
    pricePlaced: "₹0",
    oldPrice: "₹20,000",
    badge: "Creative Core",
    liveClasses: "Live Studio",
    mentor: "Senior Product Designers",
    tools: ["Figma.svg", "Photoshop.svg", "Sketch.svg", "Tailwind-CSS.svg", "Git.svg"],
    image: "from-pink-600 to-rose-600"
  },
  {
    id: 4,
    title: "Data Analytics & Business Intelligence",
    category: "Data & AI",
    duration: "4 Months",
    projects: "10+ Projects",
    salary: "₹4.0 - 9 LPA",
    level: "Beginner",
    rating: 4.7,
    reviews: 110,
    internship: "Available",
    placement: "100% Placement Support",
    skills: ["Excel", "PowerBI", "Tableau", "SQL", "Data Visualization"],
    difficulty: "Beginner",
    tagline: "Turn data into business decisions. Master industry-standard tools through a 4-month intensive program designed to prepare you for high-demand analytics careers.",
    desc: "At KodeToCareer, we prepare you for high-demand analytics careers. No coding experience required. Master Microsoft Excel, SQL databases, Python analytics libraries, and Power BI dashboards through live, instructor-led sessions and hands-on case studies.",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-100",
    priceUpfront: "₹5,000",
    pricePlaced: "₹0",
    oldPrice: "₹10,000",
    badge: "No Coding Needed",
    liveClasses: "Daily Live",
    mentor: "Business Analysts",
    tools: ["Python.svg", "PostgresSQL.svg", "Docker.svg", "Git.svg"],
    image: "from-emerald-600 to-teal-700"
  },
  {
    id: 5,
    title: "Java Full Stack Developer Program",
    category: "Software Engineering",
    duration: "5 Months",
    projects: "15+ Projects",
    salary: "₹4.5 - 11 LPA",
    level: "Beginner",
    rating: 4.8,
    reviews: 104,
    internship: "Available",
    placement: "100% Placement Support",
    skills: ["Java", "Spring Boot", "React", "MySQL", "Docker", "REST APIs"],
    difficulty: "Beginner",
    tagline: "Master Java, Spring Boot, React, MySQL, REST APIs, Git, Docker, and Cloud Deployment through live classes and hands-on projects.",
    desc: "Java powers millions of enterprise systems globally. Scale your backend development skills, write enterprise-grade spring microservices, and deploy multi-tiered web architectures.",
    color: "from-amber-500/10 to-orange-500/10 border-amber-100",
    priceUpfront: "₹10,000",
    pricePlaced: "₹0",
    oldPrice: "₹22,000",
    badge: "Enterprise Standard",
    liveClasses: "Cohorts",
    mentor: "Spring Developers",
    tools: ["Java.svg", "Spring.svg", "React.svg", "Docker.svg", "Git.svg"],
    image: "from-orange-600 to-red-700"
  },
  {
    id: 6,
    title: "Cloud Computing & DevOps Infrastructure",
    category: "Cloud",
    duration: "5 Months",
    projects: "10+ Projects",
    salary: "₹5.0 - 14 LPA",
    level: "Intermediate",
    rating: 4.8,
    reviews: 67,
    internship: "Available",
    placement: "100% Placement Support",
    skills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD", "Terraform"],
    difficulty: "Intermediate",
    tagline: "Become a professional Cloud & DevOps Engineer with our AWS, Kubernetes, and CI/CD automation course.",
    desc: "Learn to design highly-scalable cloud architectures, write Infrastructure-as-Code scripts, compile containers, and launch pipelines.",
    color: "from-sky-500/10 to-blue-500/10 border-sky-100",
    priceUpfront: "₹10,000",
    pricePlaced: "₹0",
    oldPrice: "₹20,000",
    badge: "High Growth",
    liveClasses: "Daily Cohorts",
    mentor: "SRE Engineers",
    tools: ["AWS.svg", "Docker.svg", "Git.svg"],
    image: "from-sky-600 to-blue-700"
  },
  {
    id: 7,
    title: "Digital Marketing with AI & Growth Hacking",
    category: "Digital Marketing",
    duration: "3 Months",
    projects: "8+ Projects",
    salary: "₹3.5 - 8 LPA",
    level: "Beginner",
    rating: 4.8,
    reviews: 91,
    internship: "Client Sprints Available",
    placement: "Placement Support",
    skills: ["SEO", "Google Ads", "Social Media", "AI Marketing", "Google Analytics"],
    difficulty: "Beginner",
    tagline: "Become a professional Growth Marketer with our search ads, SEO, and copywriting AI course.",
    desc: "Master marketing fundamentals, manage paid campaigns on social sites, optimize organic rankings, and write AI-powered copy.",
    color: "from-green-500/10 to-emerald-500/10 border-green-100",
    priceUpfront: "₹4,999",
    pricePlaced: "₹0",
    oldPrice: "₹9,999",
    badge: "Short Cohort",
    liveClasses: "Live Sprints",
    mentor: "Growth Hackers",
    tools: ["Git.svg"],
    image: "from-green-600 to-emerald-700"
  },
  {
    id: 8,
    title: "Python Programming & Automation",
    category: "Software Engineering",
    duration: "4 Months",
    projects: "8+ Projects",
    salary: "₹4.0 - 9 LPA",
    level: "Beginner to Intermediate",
    rating: 4.8,
    reviews: 72,
    internship: "Available",
    placement: "100% Placement Support",
    skills: ["Python", "Automation", "Web Scraping", "APIs", "SQL", "Django"],
    difficulty: "Beginner",
    tagline: "Become a professional Python & Automation Engineer with our scripting, web scraping, and Django course.",
    desc: "Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.",
    color: "from-blue-500/10 to-teal-500/10 border-blue-100",
    priceUpfront: "₹5,000",
    pricePlaced: "₹3,000",
    oldPrice: "₹12,500",
    badge: "Automation Core",
    liveClasses: "Live Cohorts",
    mentor: "Python Devs",
    tools: ["Python.svg", "Django.svg", "Git.svg"],
    image: "from-blue-600 to-teal-700"
  },
  {
    id: 9,
    title: "Graphic Designing + Videography / Video Editing",
    category: "Design",
    duration: "4 Months",
    projects: "10+ Projects",
    salary: "₹4.0 - 8 LPA",
    level: "Beginner to Intermediate",
    rating: 4.8,
    reviews: 65,
    internship: "Available (Studio Projects)",
    placement: "Placement Auditing",
    skills: ["Premiere Pro", "After Effects", "Photoshop", "Illustrator", "Video Editing", "Color Grading"],
    difficulty: "Beginner",
    tagline: "Become a professional Video Editor & Content Designer with our Premiere Pro, After Effects, and design course.",
    desc: "Learn professional graphic design, photography, cinematographic video capture, Premiere Pro editing, and After Effects motion graphics.",
    color: "from-orange-500/10 to-amber-500/10 border-orange-100",
    priceUpfront: "₹10,000",
    pricePlaced: "₹0",
    oldPrice: "₹20,000",
    badge: "Direct Creative",
    liveClasses: "Live Studio",
    mentor: "Cinematographers",
    tools: ["Figma.svg", "Photoshop.svg", "Git.svg"],
    image: "from-orange-600 to-amber-700"
  }
];

const STUDENT_PROJECTS = [
  {
    title: "Customer Churn Prediction Engine",
    course: "Data Science & AI",
    desc: "Built a classification framework using XGBoost and Pandas to identify risk metrics for telecom churn, reducing model loss to under 12%.",
    emoji: "📉"
  },
  {
    title: "Sales Analytics BI Dashboard",
    course: "Data Analytics & BI",
    desc: "Designed an interactive executive performance report in Power BI mapping revenue, regional margins, and order fulfillment KPIs.",
    emoji: "📊"
  },
  {
    title: "Enterprise E-Commerce Stack",
    course: "MERN Stack Web",
    desc: "Developed a Next.js shop system featuring Redux state management, Stripe payment pipelines, and microservice order triggers.",
    emoji: "🛒"
  },
  {
    title: "Resume Screening Agent",
    course: "Data Science & AI",
    desc: "Created an NLP parser in Python using OpenAI endpoints and Hugging Face to score applicants and recommend matching tracks.",
    emoji: "📄"
  }
];

const PLACEMENT_PROCESS = [
  { step: "1", title: "Profile & Git Audit", desc: "Our recruitment counselors audit your GitHub, resume, and existing technical stacks." },
  { step: "2", title: "ATS Optimization", desc: "We reconstruct your resume format to exceed automatic parsing benchmarks at top MNCs." },
  { step: "3", title: "Mock Interview Sprints", desc: "Practice 1-on-1 live technical rounds with real developers from tech companies." },
  { step: "4", title: "Referral Direct Dispatch", desc: "Your audited resume is dispatched directly to hiring managers in our partner grid." },
  { step: "5", title: "Offer Negotiation", desc: "Get support coordinating multiple job offers and negotiating compensation brackets." }
];

const TRAINERS = [
  { name: "Pankaj K.", role: "Lead Systems Mentor", prev: "Ex-Google, Ex-Oracle", image: "/founder.jpg" },
  { name: "Arun S.", role: "Data Science Director", prev: "Ex-Fractal Analytics, IIT-B", image: "" },
  { name: "Vikash M.", role: "DevOps & Cloud Lead", prev: "Senior SRE Partner, Ex-IBM", image: "" }
];

const FAQ_ITEMS = [
  { q: "Is coding experience required to join?", a: "No, our programs start from the absolute fundamentals. We provide initial basics modules for Git, command-line interfaces, and programming logic before proceeding to full stack and analytics workflows." },
  { q: "How does the placement assistance support work?", a: "We coordinate with over 100+ active partner corporations. Once you complete your project audits, our placement cell coordinates mock interviews and directly refers your credentials to recruiters." },
  { q: "What happens if I miss a live cohort class?", a: "All live classes are recorded and uploaded to the student portal within 2 hours. You retain lifetime access to these recordings, project sheets, and our chat channels." },
  { q: "Is there a money-back or upfront fee adjustment?", a: "Yes, our MERN and Data Science programs feature dynamic placement shares where a part of the fee is deferred. Contact a career advisor for full details." }
];

export default function CoursesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  /* ── Filter logic ── */
  const filteredCourses = COURSES.filter((c) => {
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-[#F8FAFC] text-slate-800 relative overflow-hidden select-none min-h-screen">
      {/* ── JSON-LD Schemas for SEO ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.kodetocareer.com/#organization",
                "name": "KodeToCareer",
                "url": "https://www.kodetocareer.com",
                "logo": "https://www.kodetocareer.com/main-logo.png",
                "telephone": "+91-9667975616",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "IN"
                }
              },
              {
                "@type": "WebPage",
                "@id": "https://www.kodetocareer.com/courses/#webpage",
                "url": "https://www.kodetocareer.com/courses",
                "name": "Learn Coding with Placement Assistance | KodeToCareer",
                "description": "Learn MERN Stack, Python, AI, Data Analytics and more with live classes, projects, internship and placement support.",
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.kodetocareer.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Courses",
                      "item": "https://www.kodetocareer.com/courses"
                    }
                  ]
                }
              },
              ...COURSES.map((c) => ({
                "@type": "Course",
                "@id": `https://www.kodetocareer.com/courses/${c.id}`,
                "name": c.title,
                "description": c.desc,
                "provider": {
                  "@type": "Organization",
                  "name": "KodeToCareer",
                  "sameAs": "https://www.kodetocareer.com"
                }
              }))
            ]
          })
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none z-0" />

      {/* ── 1. Hero Section ── */}
      <section className="relative py-20 lg:py-24 border-b border-slate-100 z-10" aria-labelledby="hero-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-100 text-xs font-extrabold text-primary uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Live cohort enrolling now
              </span>
              <h1 id="hero-title" className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight">
                Become Job Ready in <span className="gradient-text">4 Months</span>
              </h1>
              <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed max-w-2xl">
                Master production-grade coding stacks and business intelligence. Learn from senior developers, complete 15+ capstones, and secure hiring placement outcomes.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start items-center text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /><Star className="w-4 h-4 fill-amber-400 stroke-amber-400" /> 4.9 Rated</span>
                <span className="h-4 w-px bg-slate-200" />
                <span>5000+ Alumni</span>
                <span className="h-4 w-px bg-slate-200" />
                <span>100+ Hiring Partners</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
                <a
                  href="#catalog"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.03] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-8 py-3 rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:scale-[1.03] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 outline-none"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>

            {/* Right Interactive Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white border border-slate-150 p-6 rounded-[28px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#FFB800] text-black text-[9px] font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider leading-none shadow-sm">
                  Limited Spots
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold text-xs">
                    <Timer className="w-4 h-4 animate-pulse" />
                    <span>Next Batch: 15 July 2026</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-slate-800 text-base">Seat Availability Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Admissions filled</span>
                      <span className="text-primary">88%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-[88%]" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Only <span className="text-red-500 font-black">6 seats left</span> in the upcoming weekday micro-cohort. Apply today to verify eligibility.
                  </p>
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Guaranteed Internships</span>
                    <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Course Categories (Catalog start) ── */}
      <section id="catalog" className="py-12 bg-white border-y border-slate-100 z-10 relative" aria-labelledby="cat-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 id="cat-title" className="font-heading font-extrabold text-2xl text-slate-900">Explore Specializations</h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">Select a program track to learn more about dynamic structures.</p>
            </div>
            {/* Filter Toggle Buttons */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary outline-none ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-955 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-lg mt-8 shadow-sm rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <label htmlFor="search-courses" className="sr-only">Search specialized courses</label>
            <input
              id="search-courses"
              type="text"
              placeholder="Search by keywords, skills (e.g. React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* ── 3. Featured Courses ── */}
      <section className="py-24 z-10 relative" aria-label="Course list">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-[28px] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Illustration Cover */}
                <div className={`h-40 bg-gradient-to-br ${c.image} relative p-6 flex flex-col justify-between`}>
                  <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-[4px] border border-white/20 text-[9px] font-black uppercase text-slate-800 px-3 py-1 rounded-full tracking-wider shadow-sm z-10">
                    {c.badge}
                  </span>
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  
                  <div className="z-10">
                    <span className="text-[9px] font-black text-white/90 uppercase tracking-widest block">{c.category}</span>
                    <h3 className="text-white font-heading font-extrabold text-lg md:text-xl leading-tight mt-1">
                      {c.title}
                    </h3>
                  </div>

                  <div className="z-10 flex gap-2">
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-[6px] text-[8px] font-bold text-white px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-[6px] text-[8px] font-bold text-white px-2 py-0.5 rounded">
                      <Layers className="w-3 h-3" />
                      {c.projects}
                    </span>
                  </div>
                </div>

                {/* Card Payload */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="text-[11px] font-extrabold text-primary leading-snug">
                      {c.tagline}
                    </p>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                      {c.desc}
                    </p>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {c.skills.map((s) => (
                        <span key={s} className="bg-slate-50 border border-slate-200/50 text-[9px] text-slate-500 font-bold px-2.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Program Features */}
                  <div className="border-y border-slate-100 py-4 space-y-2.5 text-[11px] font-bold text-slate-500">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Course Format</span>
                      <span className="text-slate-700">{c.liveClasses} Classes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Mentorship</span>
                      <span className="text-slate-700">{c.mentor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-semibold">Rating</span>
                      <span className="text-amber-500 flex items-center gap-1 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        {c.rating} ({c.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Pricing row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-black tracking-wider block">Course Fee</span>
                      <div className="flex items-baseline gap-1.5 mt-1 flex-wrap">
                        <span className="text-2xl font-black text-slate-900 font-mono">{c.priceUpfront}</span>
                        {c.pricePlaced !== "₹0" && (
                          <span className="text-[10px] text-slate-500 font-extrabold font-mono bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded">+ {c.pricePlaced} Placed</span>
                        )}
                        <span className="text-xs text-slate-400 font-mono line-through">{c.oldPrice}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link
                        href={`/courses/${c.id}`}
                        className="inline-flex h-10 items-center justify-center px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                      >
                        Curriculum
                      </Link>
                      <Link
                        href={`/courses/${c.id}`}
                        className="inline-flex h-10 items-center justify-center bg-primary text-white px-4 rounded-xl text-xs font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="bg-white border border-slate-200 p-12 rounded-[28px] text-center text-slate-400 font-semibold max-w-xl mx-auto">
              No programs found matching your filters.
            </div>
          )}
        </div>
      </section>

      {/* ── 4. Learning Path ── */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative" aria-labelledby="roadmap-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="roadmap-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Structured Learning Path</h2>
            <p className="text-slate-500 font-medium">A comprehensive, end-to-end curriculum pipeline tracking your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16 relative">
            {/* Visual connector line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 hidden md:block z-0 -translate-y-1/2" />
            
            {[
              { step: "01", title: "Fundamentals", desc: "Acquire basic logic commands, syntax frameworks, database definitions." },
              { step: "02", title: "Advanced Stacks", desc: "Build backend configurations, deep neural architectures, or visual systems." },
              { step: "03", title: "Capstone Sprints", desc: "Develop 15+ production-grade project models evaluated by expert tutors." },
              { step: "04", title: "Paid Internship", desc: "Secure monthly-stipend based client projects at verified partner businesses." },
              { step: "05", title: "Corporate Hire", desc: "Access mock interview cycles and direct referrals to hiring manager networks." }
            ].map((p, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative z-10 space-y-4">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-heading font-black text-sm flex items-center justify-center leading-none">
                  {p.step}
                </span>
                <h3 className="font-heading font-extrabold text-slate-900 text-sm">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Why KodeToCareer ── */}
      <section className="py-24 z-10 relative" aria-labelledby="why-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="why-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Why Students Choose Us</h2>
            <p className="text-slate-500 font-medium">We engineering job-ready tech careers through incremental, audited support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { icon: Laptop, title: "100% Practical Learning", desc: "Ditch theoretical lectures. Build real-world applications evaluated by professional developers." },
              { icon: Users, title: "Industry Mentors", desc: "Learn directly from senior software developers, systems architects, and data scientists." },
              { icon: FileCheck, title: "ATS Portfolio Auditing", desc: "Reshape your resume structures and repository histories to clear screening systems." },
              { icon: RefreshCw, title: "Lifetime Portal Access", desc: "Gain forever privileges to live class archives, code templates, and developer forums." }
            ].map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-base">{b.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Student Projects ── */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative" aria-labelledby="projects-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="projects-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Student Portfolio Showcase</h2>
            <p className="text-slate-500 font-medium">Explore actual production capstones built by our recent graduates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {STUDENT_PROJECTS.map((proj, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl block" role="img" aria-label={proj.title}>{proj.emoji}</span>
                <div>
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest">{proj.course}</span>
                  <h3 className="font-heading font-extrabold text-slate-800 text-sm mt-1">{proj.title}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{proj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Placement Process ── */}
      <section className="py-24 z-10 relative" aria-labelledby="placement-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="placement-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Our Placement Ecosystem</h2>
            <p className="text-slate-500 font-medium">How we transition you from coding fundamentals to landing offer letters.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-16">
            {PLACEMENT_PROCESS.map((p, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm space-y-3">
                <span className="text-primary font-heading font-black text-2xl block">{p.step}</span>
                <h3 className="font-heading font-extrabold text-slate-900 text-sm">{p.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Companies Hiring (Infinite Scrolling Marquee) ── */}
      <section className="py-16 bg-white border-y border-slate-100 z-10 relative overflow-hidden" aria-label="Hiring Partners">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-center text-xs font-black text-slate-400 uppercase tracking-widest mb-8">Our Graduates Work at Top MNCs</p>
          <div className="w-full overflow-hidden relative flex">
            {/* Left and right fade gradient mask */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4 items-center animate-marquee whitespace-nowrap">
              {["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Accenture", "Wipro", "IBM", "Meta", "Adobe", "Salesforce", "Deloitte"].map((comp, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-8 py-3 text-sm font-extrabold text-slate-700 flex items-center gap-2 shadow-sm">
                  <Building2 className="w-4 h-4 text-primary" />
                  {comp}
                </div>
              ))}
              {/* Duplicate list for infinite effect */}
              {["Google", "Microsoft", "Amazon", "Infosys", "TCS", "Accenture", "Wipro", "IBM", "Meta", "Adobe", "Salesforce", "Deloitte"].map((comp, idx) => (
                <div key={idx + 100} className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-8 py-3 text-sm font-extrabold text-slate-700 flex items-center gap-2 shadow-sm">
                  <Building2 className="w-4 h-4 text-primary" />
                  {comp}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Certificates Showcase ── */}
      <section className="py-24 z-10 relative" aria-labelledby="cert-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
              <h2 id="cert-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900 leading-tight">
                Accredited Course Certificates
              </h2>
              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                Earn professional ISO 9001:2015 training credentials, specialized project execution reports, and internship confirmations recognized by hiring directors.
              </p>
              <ul className="space-y-3 text-xs font-bold text-slate-600 inline-block text-left">
                <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /> ISO Certified Training Validation</li>
                <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /> Verified GitHub Capstone Portfolio</li>
                <li className="flex items-center gap-2 text-emerald-600"><CheckCircle2 className="w-4.5 h-4.5 shrink-0" /> Stipend Project Experience Letters</li>
              </ul>
            </div>

            {/* Right Certificate Graphic mockup */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 p-8 rounded-[28px] shadow-xl relative aspect-video flex flex-col justify-between overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-[-100px] right-[-100px] w-52 h-52 bg-primary/5 rounded-full blur-[80px]" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-heading font-black text-sm">K</div>
                    <span className="font-heading font-extrabold text-slate-800 text-xs uppercase tracking-wider">KodeToCareer Academy</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">Verification ID: K2C-90812</span>
                </div>

                <div className="text-center py-6 space-y-3">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none">Accredited Certificate of Excellence</p>
                  <h4 className="font-heading font-extrabold text-slate-800 text-lg md:text-xl">Your Name Here</h4>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-md mx-auto">
                    has successfully completed the live specialization curriculum and project evaluation rounds in MERN Stack Development & AI Stacks.
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-[10px] font-bold text-slate-400">
                  <span>ISO 9001:2015 Certified</span>
                  <span>Registrar Seal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Student Testimonials ── */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative" aria-labelledby="test-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="test-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Graduate Success Stories</h2>
            <p className="text-slate-500 font-medium">See how our graduates transformed their careers and landed dream jobs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { name: "Rahul Sharma", role: "Software Engineer", comp: "Google", salary: "₹12 LPA", old: "₹3.6 LPA", quote: "KodeToCareer completely changed my dev direction. The 1-on-1 resume optimization got me calls in days." },
              { name: "Priya Patel", role: "Data Analyst", comp: "Microsoft", salary: "₹10 LPA", old: "₹4.0 LPA", quote: "The Power BI and SQL case studies mirrored actual client operations. Extremely practical course." },
              { name: "Amit Kumar", role: "Cloud Architect", comp: "Amazon", salary: "₹14 LPA", old: "₹4.8 LPA", quote: "Highly intensive lab setups. I set up live pipelines and cleared cloud dev testing rounds." }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-[24px] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black text-sm flex items-center justify-center">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-slate-800 text-sm leading-none">{t.name}</h4>
                      <span className="text-[10px] text-slate-400 font-bold block mt-1">{t.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-150 pt-4 mt-6 flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400">Salary Package</span>
                  <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                    {t.old} &rarr; {t.salary}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Trainers ── */}
      <section className="py-24 z-10 relative" aria-labelledby="trainers-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="trainers-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Learn from Industry Mentors</h2>
            <p className="text-slate-500 font-medium">Our cohort leaders are seasoned engineers bringing real production skills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            {TRAINERS.map((t, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto overflow-hidden relative border border-slate-200 flex items-center justify-center text-slate-400">
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Users className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-slate-800 text-sm">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold block mt-1">{t.role}</p>
                </div>
                <span className="inline-block text-[9px] bg-slate-50 border border-slate-150 text-slate-600 font-bold px-3 py-1 rounded-full">
                  {t.prev}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Pricing Comparison ── */}
      <section className="py-24 bg-white border-y border-slate-100 z-10 relative" aria-labelledby="pricing-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="pricing-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Compare Pricing Structures</h2>
            <p className="text-slate-500 font-medium">Transparent billing paths designed to keep education accessible.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-16">
            {/* Standard upfront card */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-[28px] p-8 space-y-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Self Paced & Standard</span>
                <h3 className="font-heading font-extrabold text-slate-800 text-xl">Upfront Course Fee</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">₹4,999</span>
                  <span className="text-xs text-slate-400 font-semibold">starting price</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Best for self-starters looking for certified programs. Access full-stack, analytics, or marketing curricula.
                </p>
              </div>
              <ul className="space-y-3 text-xs font-bold text-slate-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Full Curriculum Access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> ISO Certified Credentials</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /> Student Forum Channels</li>
              </ul>
              <Link
                href="/contact"
                className="w-full inline-flex h-11 items-center justify-center bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Enroll Upfront
              </Link>
            </div>

            {/* Income share card */}
            <div className="bg-white border-2 border-primary rounded-[28px] p-8 space-y-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                Career Boost
              </span>
              <div className="space-y-4">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Job Guarantee Tracks</span>
                <h3 className="font-heading font-extrabold text-slate-800 text-xl">Pay-After-Placement Share</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 font-mono">₹5,000</span>
                  <span className="text-xs text-slate-400 font-semibold">upfront + placement share</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Best for job-seekers aiming to secure verified placements. Includes MERN and Data Science programs.
                </p>
              </div>
              <ul className="space-y-3 text-xs font-bold text-slate-600">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Guaranteed Paid Internships</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> 1-on-1 Resume Audits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Recruiter Referral Campaign</li>
              </ul>
              <Link
                href="/contact"
                className="w-full inline-flex h-11 items-center justify-center bg-primary text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Apply for Cohort
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 13. FAQs ── */}
      <section className="py-24 z-10 relative" aria-labelledby="faq-title">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 id="faq-title" className="font-heading font-extrabold text-3xl md:text-4xl text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-medium">Got queries regarding our courses? Find detailed resolutions below.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 mt-16">
            {FAQ_ITEMS.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50/50 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary outline-none"
                  aria-expanded={openFaqIdx === idx}
                >
                  <span className="text-sm font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaqIdx === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaqIdx === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <p className="px-6 py-4 text-xs text-slate-500 leading-relaxed font-semibold">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. Final CTA ── */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white text-center relative overflow-hidden z-10" aria-labelledby="cta-title">
        {/* Background mesh effects */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="absolute top-[-200px] left-[-200px] w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-200px] right-[-200px] w-96 h-96 bg-white/5 rounded-full blur-[80px]" />

        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-6 relative z-10">
          <h2 id="cta-title" className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-white/80 font-semibold text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Book a free counseling slot with our recruitment leads. We audit your portfolio, verify your path, and recommend ideal specialization tracks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center bg-white text-primary px-8 rounded-xl text-sm font-bold shadow-md hover:bg-slate-50 hover:scale-[1.03] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              Talk to Career Advisor
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center bg-white/10 border border-white/20 text-white px-8 rounded-xl text-sm font-bold hover:bg-white/25 hover:scale-[1.03] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              Request Call Back
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
