'use client';

import { use, useState } from 'react';
import { 
  Clock, BookOpen, Award, CheckCircle, ArrowLeft, 
  ChevronRight, Play, ShieldAlert, Laptop, Briefcase, Zap, X,
  FileText, Download, CheckCircle2, Building2, HelpCircle, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const COURSES = [
  {
    id: 1,
    title: 'MERN Stack Development + AI Integration',
    category: 'Software Engineering',
    duration: '6 Months',
    projects: '15+ Projects',
    priceUpfront: '₹5,000',
    pricePlaced: '₹3,000',
    level: 'Beginner to Advanced',
    tagline: 'Become a professional Full Stack Developer & AI Engineer with our production-grade MERN Stack course.',
    desc: 'At KodeToCareer, we don’t just teach coding; we engineer careers. Our cutting-edge MERN Stack with AI program is meticulously designed to take you from an absolute beginner to an advanced, AI-empowered software developer. Whether you are writing your first line of HTML or integrating complex Large Language Models (LLMs) into your web apps, KodeToCareer is your launchpad.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'AI APIs', 'Next.js'],
    modules: [
      'Month 1: The Foundation - Web Development Basics|• HTML5: Semantic web, forms, multimedia elements, accessibility (a11y) standards, and SEO best practices.\n• CSS3 & UI Frameworks: Box model, Flexbox, CSS Grid, responsive design (mobile-first), animations, and modern UI libraries like Tailwind CSS and Bootstrap.\n• JavaScript (The Engine): Variables, data types, DOM manipulation, event listeners, ES6+ features (arrow functions, destructuring, spread/rest), Promises, and Async/Await.',
      'Month 2: Frontend Mastery with React.js|• React Core: JSX, Virtual DOM, Components (Functional vs. Class), Props, and State.\n• React Hooks: Deep dive into useState, useEffect, useContext, useRef, and creating custom hooks.\n• State Management: Managing complex app states using Redux Toolkit and Context API.\n• Advanced Frontend: React Router for navigation, form handling (Formik/React Hook Form), and API integration (Axios/Fetch).',
      'Month 3: Backend Engineering with Node.js & Express.js|• Node.js Fundamentals: Event loop, non-blocking I/O, filesystem operations, and NPM/Yarn package management.\n• Express.js Server: Creating RESTful APIs, routing, middleware functions, and error handling.\n• Security & Authentication: JWT (JSON Web Tokens), OAuth integrations (Google/GitHub login), password hashing (Bcrypt), and securing routes.',
      'Month 4: Database Management with MongoDB|• MongoDB Core: NoSQL concepts, BSON, collections, documents, and CRUD operations.\n• Mongoose ODM: Defining schemas, building models, validations, and virtuals.\n• Advanced Database Operations: Aggregation pipelines, indexing for performance, and populating referenced data.',
      'Month 5: The X-Factor - Integrating Artificial Intelligence|• Introduction to AI APIs: Understanding Large Language Models (LLMs) and how to communicate with them programmatically.\n• OpenAI/Gemini Integration: Injecting AI capabilities into Node.js backends.\n• Prompt Engineering for Developers: Structuring inputs to get predictable, JSON-formatted outputs from AI.\n• Building AI Features: Creating intelligent chatbots, automated text summarizers, dynamic content generators, and semantic search features within your React applications.',
      'Month 6: Capstone Projects & Deployment|• Real-World Projects: E-commerce platforms, AI-powered productivity dashboards, and social networking clones.\n• Version Control: Git, GitHub workflows, pull requests, and collaborative coding.\n• Cloud Deployment: Hosting frontends on Vercel/Netlify, backends on Render/Railway, and databases on MongoDB Atlas. Introduction to Docker.'
    ],
    hiringCompanies: ['Google', 'Stripe', 'Paytm', 'Deloitte']
  },
  {
    id: 2,
    title: 'Data Science & Machine Learning Core',
    category: 'Data & AI',
    duration: '6 Months',
    projects: '20+ Projects',
    priceUpfront: '₹6,000',
    pricePlaced: '₹4,000',
    level: 'Intermediate',
    tagline: 'Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.',
    desc: 'Data Science and AI now sit at the center of every major industry. Companies are racing to hire people who can turn raw data into decisions — and that demand is only accelerating. This program is meticulously designed to take you from programming fundamentals to Generative AI and deployment.',
    skills: ['Python', 'TensorFlow', 'Pandas', 'NLP', 'Computer Vision', 'SQL'],
    modules: [
      'Module 1: Python Programming|• Core Syntax: Variables, basic operators, data types, conditional structures.\n• Functions & Loops: Writing reusable functions, list comprehensions, while/for loops.\n• OOP Principles: Designing classes, inheritance, encapsulation, and exception logic.\n• Data Operations: File reading/writing, JSON payloads, directories, and standard modules.',
      'Module 2: SQL & Databases|• CRUD Operations: Writing SELECT queries, inserting, updating, and deleting records.\n• Table Relationships: Joins (Inner, Left, Right, Full Outer), subqueries, and table unions.\n• Aggregations: GROUP BY, HAVING, and aggregate functions (SUM, AVG, MIN, MAX, COUNT).\n• Advanced SQL: Writing window functions (RANK, DENSE_RANK), views, and stored procedures.',
      'Module 3: Statistics & Mathematics|• Descriptive Stats: Central tendency (mean, median, mode), variance, standard deviation.\n• Inferential Stats: Probability theory, Z-score calculations, normal and binomial distributions.\n• Hypothesis Testing: Null/alternative hypotheses, t-tests, ANOVA, and p-value validation.\n• Linear Algebra: Multi-dimensional matrix math, dot products, vectors, and optimization rules.',
      'Module 4: Data Analysis & Feature Engineering|• NumPy & Pandas: Multi-dimensional array math, DataFrame structures, and dataset loading.\n• Data Cleaning: Handling null/missing values, duplicate records, and data format conversions.\n• Exploratory Data Analysis (EDA): Quantile cuts, correlation matrices, and statistical profiling.\n• Feature Engineering: One-hot encoding, feature scaling (StandardScaler), and dimensionality reduction.',
      'Module 5: Data Visualization & BI Tools|• Plotting Libraries: Creating charts, heatmaps, and scatter plots using Matplotlib and Seaborn.\n• Interactive Graphs: Building zoomable charts and dashboard visual elements with Plotly.\n• Power BI & DAX: Modeling relationships, creating Power Queries, and time-intelligence measures.\n• Executive Dashboards: Building operational dashboards, mapping metrics, and report publishing.',
      'Module 6: Machine Learning Algorithms|• Regressions: Building linear regression, logistic classification, and cost-function tuning.\n• Trees & Ensembles: Implementing Decision Trees, Random Forests, and AdaBoost models.\n• Advanced ML: Configuring Support Vector Machines (SVM), K-Means clustering, and XGBoost models.\n• Model Auditing: Train/test splitting, cross-validation scoring, ROC-AUC metrics, and hyperparameter tuning.',
      'Module 7: Deep Learning & Neural Networks|• Neural Network Core: Multi-layer perceptron architecture, forward/backpropagation, loss functions.\n• Deep Frameworks: Building layers, compilation, and fitting models in TensorFlow and Keras.\n• Computer Vision: Designing Convolutional Neural Networks (CNN) for image classifications.\n• Sequence Processing: Recurrent Neural Networks (RNN) and LSTM networks for time-series.',
      'Module 8: Generative AI & Large Language Models|• LLM Foundations: Understanding token limits, ChatGPT capabilities, and prompt engineering.\n• AI Integrations: Connecting OpenAI/Gemini APIs, configuring API parameters, and parsing outputs.\n• Retrieval-Augmented Generation (RAG): Building vector databases, document chunking, and LangChain loops.\n• AI Agent Architectures: Designing self-correcting agent chains and leveraging Hugging Face libraries.',
      'Module 9: Deployment & Cloud CI/CD|• Version Control: Git workflow commands, merge conflict resolution, and GitHub collaborations.\n• Web Frameworks: Creating analytical web user interfaces using Flask and Streamlit.\n• Containerization: Writing Dockerfiles, building container images, and running containers.\n• Cloud Deployments: Hosting services on cloud nodes, configuring APIs, and setting up CI/CD.'
    ],
    hiringCompanies: ['Amazon', 'Microsoft', 'EY', 'Fractal Analytics']
  },
  {
    id: 3,
    title: 'Graphic Design + UI/UX Product Design Systems',
    category: 'Design',
    duration: '4 Months',
    projects: '8+ Projects',
    priceUpfront: '₹10,000',
    pricePlaced: '₹0',
    level: 'Beginner to Advanced',
    tagline: 'Become a professional Brand Designer & UI/UX Specialist with our Figma & creative asset design course.',
    desc: 'Learn professional graphic design, typography, brand identity, wireframing, high-fidelity prototyping, and design systems.',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'Wireframing', 'Prototyping', 'Design Systems'],
    modules: [
      'Week 1-3: Graphic Design & Branding: Master color layouts, typography, vector assets creation in Photoshop & Illustrator.',
      'Week 4-6: User Research & Wireframing: Conduct user mapping, usability testing, and low-fi application blueprints.',
      'Week 7-10: Figma & Interactive UI: Construct high-fidelity mockups, responsive components, and micro-interactions.',
      'Week 11-16: Portfolio & Capstones: Build 3 comprehensive visual case studies and present to design recruiters.'
    ],
    hiringCompanies: ['Adobe', 'Framer', 'Razorpay', 'Infosys']
  },
  {
    id: 4,
    title: 'Data Analytics & Business Intelligence',
    category: 'Data & AI',
    duration: '4 Months',
    projects: '10+ Projects',
    priceUpfront: '₹5,000',
    pricePlaced: '₹0',
    level: 'Beginner',
    tagline: 'Turn data into business decisions. Master industry-standard tools through a 4-month intensive program designed to prepare you for high-demand analytics careers.',
    desc: 'At KodeToCareer, we prepare you for high-demand analytics careers. No coding experience required. Master Microsoft Excel, SQL databases, Python analytics libraries, and Power BI dashboards through live, instructor-led sessions and hands-on case studies.',
    skills: ['Excel', 'PowerBI', 'Tableau', 'SQL', 'Data Visualization'],
    modules: [
      'Module 1: Excel for Data Analytics|• Excel Foundations: Workbook basics, relative/absolute references, conditional formatting.\n• Pivot Tables & Charts: Summarizing millions of records, generating automatic pivot charts.\n• Advanced Formulas: Master VLOOKUP, XLOOKUP, INDEX/MATCH, and logical operators.\n• Interactive Dashboards: Form controls, data validation dropdowns, and KPI formatting.',
      'Module 2: SQL for Data Analysis|• Database Concepts: Relational database architecture, schemas, and basic queries.\n• Filtering & Aggregations: Joins (Inner, Left, Right), WHERE vs HAVING, and GROUP BY.\n• Analytics Functions: Writing subqueries, window functions (ROW_NUMBER, RANK, LEAD/LAG).\n• Case Studies: Resolving commercial sales questions and cohort retention analysis.',
      'Module 3: Python for Data Analytics|• Python Basics: Variables, loops, conditional constructs, and function design.\n• NumPy & Pandas: Array math operations, importing CSV/Excel files, and DataFrame structures.\n• Data Wrangling: Cleaning null values, changing column formats, and filtering pandas data.\n• Exploratory Data Analysis (EDA): Building statistics matrices and exploratory data graphs.',
      'Module 4: Statistics for Analytics|• Probability & Tendency: Mean, median, mode, and standard deviation distributions.\n• Data Dispersion: Skewness, variance, correlation, and covariance matrices.\n• Distributions: Normal distributions, binomial models, and central limit theorem.\n• Hypothesis Testing: Z-tests, t-tests, null hypothesis testing, and p-values.',
      'Module 5: Data Visualization|• Visual Storytelling: Choosing charts, design psychology, and visual hierarchy.\n• Python Charting: Creating static and interactive plots with Matplotlib, Seaborn, and Plotly.\n• KPI Design: Constructing clear dashboards, mapping data trends, and executive presentation.',
      'Module 6: Power BI Desktop & Service|• Power Query: Data connectors, transformations, merging queries, and cleaning data.\n• Data Modeling: Defining star schemas, relationships, and active/inactive pathways.\n• DAX Language: Writing calculated columns, measures, and time-intelligence expressions.\n• Dashboard Sharing: Publishing reports to Power BI Service, scheduling automated refreshes.',
      'Module 7: Business Intelligence & KPI Design|• KPI Frameworks: Designing metrics for Sales, Finance, HR, and Marketing funnels.\n• Domain Dashboards: Building executive, cohort, customer segmentation, and supply chain reports.\n• End-to-End Capstone: Clean, analyze, and visualize a real-world corporate dataset from scratch.'
    ],
    hiringCompanies: ['TCS', 'Wipro', 'Cognizant', 'Deloitte']
  },
  {
    id: 5,
    title: 'Enterprise Java Full Stack Developer',
    category: 'Software Engineering',
    duration: '5 Months',
    projects: '15+ Projects',
    priceUpfront: '₹10,000',
    pricePlaced: '₹0',
    level: 'Advanced',
    tagline: 'Master Java, Spring Boot, React, MySQL, REST APIs, Git, Docker, and Cloud Deployment through live classes and hands-on projects.',
    desc: 'Java powers millions of enterprise applications worldwide, from banking systems and e-commerce platforms to healthcare solutions and government services. Learning Java Full Stack Development opens doors to a versatile career where you can work on both server-side logic and user-facing interfaces.',
    skills: ['Java', 'Spring Boot', 'Hibernate', 'Microservices', 'PostgreSQL', 'Docker'],
    modules: [
      'Month 1: Programming Fundamentals|• Java Basics & Syntax: Variables, loops, conditional blocks, and operators.\n• Methods & Arrays: Writing reusable code blocks, declaring arrays, and array operations.\n• Object-Oriented Programming (OOP): Inheritance, polymorphism, encapsulation, and abstraction.\n• Collections & Handling: Collections framework (ArrayList, HashMap, HashSet), Exception Handling, and File I/O.',
      'Month 2: Advanced Java & Databases|• Database Fundamentals: MySQL database setup, table designs, relations, and SQL queries.\n• JDBC Connection: Performing database CRUD operations from Java applications.\n• Servlets & JSP: Web servlet structures, life cycle, MVC design pattern, session management.\n• Database Designs: Normalization, constraints, schemas, and building advanced database designs.',
      'Month 3: Spring Boot & APIs|• Spring Framework: Dependency Injection, Inversion of Control, and Spring configurations.\n• RESTful Services: Creating controllers, mapping requests, handling payloads, and testing with Postman/Swagger.\n• Spring Data JPA & Hibernate: ORM mapping, entity relations, transactional queries, and database sync.\n• Web Security: Implementing JWT authentication, Spring Security filters, and encryption hashes.',
      'Month 4: Frontend Development|• Web Foundations: Semantic HTML5, CSS3 styling, responsive layouts, and Bootstrap framework grids.\n• Modern JavaScript: ES6+ syntax (destructuring, arrow functions, promises), async/await requests, and DOM manipulation.\n• React.js Core: Reusable components, state hooks, effect hooks, layout state, and component hierarchies.\n• React Routing & Axios: Implementing client-side routing, navigation hooks, and fetching API payloads.',
      'Month 5: Full Stack Integration & Cloud|• Integration Tasks: Connecting React frontends with Spring Boot backends, implementing Auth and RBAC.\n• Containerization: Writing Dockerfiles, building container images, and running containers.\n• Cloud Deployments: Hosting applications on AWS cloud environments, Render, and setting up automated CI/CD.\n• Final Capstone & Readiness: Deploying a complete project portfolio, crafting ATS-friendly resumes, and optimizing LinkedIn profiles.'
    ],
    hiringCompanies: ['Capgemini', 'IBM', 'Accenture', 'Oracle']
  },
  {
    id: 6,
    title: 'DevOps Engineering & CI/CD Sprints',
    category: 'Cloud',
    duration: '5 Months',
    projects: '8+ Projects',
    priceUpfront: '₹24,999',
    pricePlaced: '₹4,999',
    level: 'Intermediate',
    tagline: 'Become a professional DevOps & Cloud Engineer with our Terraform, Kubernetes, and AWS automation course.',
    desc: 'Learn infrastructure as code, container automation, configuration orchestration, and continuous deployment workflows.',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Git', 'Linux'],
    modules: [
      'Week 1-3: Linux Shell & Scripting: Bash automation, user permissions, networking basics, and configuration.',
      'Week 4-7: Cloud & AWS Deployments: Deploy EC2 nodes, configure VPC security, and manage IAM access controls.',
      'Week 8-11: Container Orchestration: Write Kubernetes deployments, manage Docker containers, and build service pods.',
      'Week 12-20: CI/CD Pipelines & Terraform: Write Terraform infrastructure-as-code files and build automated Jenkins pipelines.'
    ],
    hiringCompanies: ['Docker', 'Kubernetes', 'AWS', 'RedHat']
  },
  {
    id: 7,
    title: 'Digital Marketing with AI & Growth Hacking',
    category: 'Digital Marketing',
    duration: '3 Months',
    projects: '8+ Campaigns',
    priceUpfront: '₹4,999',
    pricePlaced: '₹0',
    level: 'Beginner',
    tagline: 'Become a professional Growth Marketer & Digital AI Specialist with our campaign optimization course.',
    desc: 'Master user acquisition funnel optimization, search ranking metrics, copywriting, and paid advertising campaigns.',
    skills: ['SEO', 'Google Ads', 'Meta Ads', 'Copywriting', 'Google Analytics'],
    modules: [
      'Week 1-3: Search Engine Optimization: Keyword research, on-page optimization, backlink strategies, and search engine algorithms.',
      'Week 4-6: Paid Acquisition Sprints: Create Google Search ads, Meta conversion campaigns, and landing page copywriting.',
      'Week 7-9: Web Analytics & Tracking: Set up Google Analytics 4, Tag Manager tags, and analyze user conversion paths.',
      'Week 10-12: Growth Loops & Client Pitch: Develop viral growth loops, brand campaigns, and present growth blueprints to clients.'
    ],
    hiringCompanies: ['Ogilvy', 'Dentsu', 'GroupM']
  },
  {
    id: 8,
    title: 'Python Programming & Automation',
    category: 'Software Engineering',
    duration: '4 Months',
    projects: '8+ Projects',
    priceUpfront: '₹5,000',
    pricePlaced: '₹3,000',
    level: 'Beginner to Intermediate',
    tagline: 'Become a professional Python & Automation Engineer with our scripting, web scraping, and Django course.',
    desc: 'Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.',
    skills: ['Python', 'Automation', 'Web Scraping', 'APIs', 'SQL', 'Django'],
    modules: [
      'Week 1-3: Python Core Foundations: Language syntax, basic structures, conditional logic, file handling, and scripts.',
      'Week 4-6: Web Scraping & API Connections: Extract tabular data with BeautifulSoup, and connect with REST APIs.',
      'Week 7-10: Database Integrations & Web Apps: Connect SQLite/PostgreSQL, and build lightweight web backends with Django.',
      'Week 11-16: Automation Tasks & ML Integrations: Orchestrate OS script tasks, scheduled tasks, and call OpenAI APIs.'
    ],
    hiringCompanies: ['TechM', 'HCL', 'Wipro']
  },
  {
    id: 9,
    title: 'Graphic Designing + Videography / Video Editing',
    category: 'Design',
    duration: '4 Months',
    projects: '10+ Projects',
    priceUpfront: '₹10,000',
    pricePlaced: '₹0',
    level: 'Beginner to Intermediate',
    tagline: 'Become a professional Video Editor & Content Designer with our Premiere Pro, After Effects, and design course.',
    desc: 'Learn professional graphic design, photography, cinematographic video capture, Premiere Pro editing, and After Effects motion graphics.',
    skills: ['Premiere Pro', 'After Effects', 'Photoshop', 'Illustrator', 'Video Editing', 'Color Grading'],
    modules: [
      'Week 1-3: Design & Vector Assets: Master layouts, typography, visual hierarchies, and creative assets inside Photoshop & Illustrator.',
      'Week 4-6: Cinematography & Storyboarding: Learn camera configurations, focal lengths, lighting setups, and storyboard scripting.',
      'Week 7-10: Timeline Editing & Premiere Pro: Master timeline splicing, sound mixing, transitions, and audio sync templates.',
      'Week 11-16: Visual Effects & Motion Graphics: Build kinetic titles, intro templates, green screen keying, color grading, and rendering.'
    ],
    hiringCompanies: ['YouTube Studios', 'Netflix Vendors', 'Social Media Brands', 'Advertising Agencies']
  }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const courseId = parseInt(resolvedParams.id, 10);
  const course = COURSES.find((c) => c.id === courseId);

  const [enrolled, setEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [status, setStatus] = useState('Pursuing');
  const [year, setYear] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [downloadingBrochure, setDownloadingBrochure] = useState(false);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Course Not Found</h1>
        <Link href="/courses" className="text-primary hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to courses
        </Link>
      </div>
    );
  }

  const handleEnrollClick = () => {
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !qualification || !year) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          qualification,
          status,
          year,
          courseTitle: course.title,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setEnrolled(true);
      } else {
        alert('Failed to submit enrollment request. Please try again.');
      }
    } catch (err) {
      console.error('Submit enrollment error:', err);
      alert('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownloadBrochure = () => {
    setDownloadingBrochure(true);
    
    // Check for actual PDF brochures
    let pdfUrl = '';
    let pdfName = '';
    if (course.id === 1) {
      pdfUrl = '/brochures/mern_stack.pdf';
      pdfName = 'mern_stack_brochure.pdf';
    } else if (course.id === 4) {
      pdfUrl = '/brochures/data_analytics.pdf';
      pdfName = 'data_analytics_brochure.pdf';
    }

    setTimeout(() => {
      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setDownloadingBrochure(false);
      } else {
        const fileContent = `================================================================================
KODE TO CAREER — ${course.title} BROCHURE
================================================================================
Category: ${course.category}
Duration: ${course.duration}
Level: ${course.level}
Projects: ${course.projects}
Upfront Registration Fee: ${course.priceUpfront}
Salary Target Range: ${course.id === 1 ? '₹4.5 - 12 LPA' : course.id === 2 ? '₹6.0 - 18 LPA' : course.id === 3 ? '₹4.0 - 10 LPA' : course.id === 4 ? '₹4.0 - 9 LPA' : course.id === 5 ? '₹5.0 - 15 LPA' : course.id === 6 ? '₹5.5 - 14 LPA' : course.id === 7 ? '₹3.5 - 8 LPA' : '₹4.0 - 10 LPA'}

Syllabus Curriculum Modules:
${course.modules.map((m, i) => `${i+1}. ${m}`).join('\n')}

Target Recruiters: ${course.hiringCompanies.join(', ')}
Accredited by: ISO 9001:2015, Skill India Partners, NSDC
================================================================================`;
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${course.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_brochure.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setDownloadingBrochure(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[10%] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-150px] w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all programs
        </Link>

        {/* 2 Column Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main details */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block mb-4">
                {course.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
                {course.title}
              </h1>
              <p className="text-sm md:text-base font-extrabold text-primary mt-3 leading-snug">
                {course.tagline}
              </p>
              <p className="text-base text-slate-500 mt-4 leading-relaxed font-semibold">
                {course.desc}
              </p>
            </div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-[24px] bg-white border border-slate-150 shadow-sm">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Duration</span>
                <span className="text-base font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> {course.duration}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Projects Count</span>
                <span className="text-base font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary" /> {course.projects}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Skill Level</span>
                <span className="text-base font-extrabold text-slate-800 mt-1 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" /> {course.level}
                </span>
              </div>
            </div>

            {/* Syllabus Curriculum Modules */}
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900">Program Curriculum</h2>
              <div className="space-y-4">
                {course.modules.map((mod, idx) => {
                  const splitIdx = mod.indexOf('|');
                  let title = '';
                  let content = '';
                  if (splitIdx !== -1) {
                    title = mod.slice(0, splitIdx);
                    content = mod.slice(splitIdx + 1);
                  } else {
                    const colonIdx = mod.indexOf(':');
                    if (colonIdx !== -1) {
                      title = mod.slice(0, colonIdx);
                      content = mod.slice(colonIdx + 1).trim();
                    } else {
                      title = mod;
                      content = 'Includes hands-on assignments and evaluation challenges.';
                    }
                  }
                  const isOpen = activeModuleIdx === idx;

                  return (
                    <div 
                      key={idx}
                      className="rounded-[20px] bg-white border border-slate-150 shadow-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
                    >
                      <button
                        onClick={() => setActiveModuleIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-slate-800 hover:text-primary transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {idx + 1}
                          </div>
                          <span className="text-sm md:text-base">{title}</span>
                        </div>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-slate-400 shrink-0"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                          >
                            <div className="px-5 pb-5 pt-1 border-t border-slate-100/50">
                              <div className="pl-12 text-xs md:text-sm text-slate-650 leading-relaxed font-semibold whitespace-pre-line space-y-2">
                                {content}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-[24px] bg-white border border-slate-150 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block mb-2">Program Registration</span>
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-800 font-mono">{course.priceUpfront}</span>
                  <span className="text-xs text-slate-400 font-bold uppercase">{course.pricePlaced !== '₹0' ? 'Upfront Fee' : 'Course Fee'}</span>
                </div>
                {course.pricePlaced !== '₹0' && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#10B981] font-mono">+ {course.pricePlaced}</span>
                    <span className="text-xs text-slate-400 font-bold uppercase">If Placed</span>
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="space-y-4 mb-8 text-xs font-bold text-slate-650">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Interactive Live Lectures</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Guaranteed Practical Internship</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Dedicated Career Placement Board</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                  <span>Industry Recognized Certification</span>
                </div>
              </div>

              {enrolled ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-4 text-center font-bold text-sm">
                  Verifying details... Callback scheduled!
                </div>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-base hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10"
                >
                  Enroll In Program <Play className="w-4.5 h-4.5 fill-white" />
                </button>
              )}

              <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-4 font-bold">
                100% Refund guarantee within 7 days of program commencement.
              </p>
            </div>

            {/* Brochure Download Card */}
            <div className="rounded-[24px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <h4 className="text-sm font-heading font-extrabold text-slate-900">Syllabus Brochure</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-semibold">
                Download the complete modular course outline, weekly schedules, evaluation blueprints, and target recruiter listings.
              </p>
              
              {downloadingBrochure ? (
                <div className="mt-4 bg-white border border-slate-200 text-primary rounded-xl py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm">
                  <div className="w-3.5 h-3.5 rounded-full border border-primary border-t-transparent animate-spin" />
                  Generating PDF brochure...
                </div>
              ) : (
                <button
                  onClick={handleDownloadBrochure}
                  className="w-full mt-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" /> Download Brochure (TXT / PDF)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Enrollment Modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center"
              aria-hidden="true"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 rounded-[24px] bg-white border border-slate-200 shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Top Gradient Stripe */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
              
              {submitted ? (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 border border-emerald-100">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 font-semibold">
                    Thank you, <span className="text-slate-800 font-bold">{name}</span>. Our counsellor will contact you soon on <span className="text-slate-800 font-bold">{phone}</span> to complete your enrollment.
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setQualification('');
                      setStatus('Pursuing');
                      setYear('');
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-colors cursor-pointer text-sm"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-heading font-extrabold text-slate-900">Enrollment Form</h3>
                      <p className="text-xs text-slate-400 font-bold">Please provide your details to enroll</p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                    <div>
                      <label htmlFor="modal-name" className="text-slate-500 block mb-2">Full Name</label>
                      <input
                        type="text"
                        id="modal-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-phone" className="text-slate-500 block mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="modal-phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold"
                      />
                    </div>

                    <div>
                      <label htmlFor="modal-qualification" className="text-slate-500 block mb-2">Highest Qualification</label>
                      <input
                        type="text"
                        id="modal-qualification"
                        required
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="e.g. B.Tech / BCA / MCA / High School"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="modal-status" className="text-slate-500 block mb-2">Status</label>
                        <select
                          id="modal-status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold"
                        >
                          <option value="Pursuing">Pursuing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="modal-year" className="text-slate-500 block mb-2">Which Year?</label>
                        <input
                          type="text"
                          id="modal-year"
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder="e.g. 2026 / 3rd Year"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold"
                        />
                      </div>
                    </div>

                    {submitting ? (
                      <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-primary border-t-transparent animate-spin" />
                        Submitting details...
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 text-sm"
                      >
                        Confirm & Complete Enrollment
                      </button>
                    )}
                  </form>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
