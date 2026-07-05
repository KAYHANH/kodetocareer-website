'use client';

import { use, useState } from 'react';
import { 
  Clock, BookOpen, Award, CheckCircle, ArrowLeft, 
  ChevronRight, Play, ShieldAlert, Laptop, Briefcase, Zap, X,
  FileText, Download, CheckCircle2, Building2, HelpCircle, ChevronDown,
  TrendingUp, Star, Calendar, Users, Send, Coins, ArrowUpRight, Sparkle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SchemaMarkup from '@/components/seo/schema-markup';
import { COURSES_SEO } from '../courses-seo-data';

export const COURSES = [
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
    hiringCompanies: ['Google', 'Stripe', 'Paytm', 'Deloitte'],
    slug: "mern-stack-development"
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
    hiringCompanies: ['Amazon', 'Microsoft', 'EY', 'Fractal Analytics'],
    slug: "data-science-machine-learning"
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
    hiringCompanies: ['Adobe', 'Framer', 'Razorpay', 'Infosys'],
    slug: "graphic-design-ui-ux"
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
    hiringCompanies: ['TCS', 'Wipro', 'Cognizant', 'Deloitte'],
    slug: "data-analytics"
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
    hiringCompanies: ['Capgemini', 'IBM', 'Accenture', 'Oracle'],
    slug: "java-full-stack"
  },
  {
    id: 6,
    title: 'DevOps Engineering & CI/CD Sprints',
    category: 'Cloud',
    duration: '6 Months (24 Weeks)',
    projects: '12+ Projects & Capstone',
    priceUpfront: '₹24,999',
    pricePlaced: '₹4,999',
    level: 'Intermediate to Advanced',
    tagline: 'Become a professional DevOps & Cloud Engineer with our Terraform, Kubernetes, and AWS automation course.',
    desc: 'Learn infrastructure as code, container automation, configuration orchestration, and continuous deployment workflows.',
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Git', 'Linux'],
    modules: [
      'Month 1: DevOps & Linux Foundations (Week 1-4)|• DevOps Fundamentals: What is DevOps, SDLC, 12 Factor Application, Agile & Scrum.\n• Linux & System Administration: Filesystem structures, SSH/SCP, Cron Jobs, Env Variables.\n• Bash & Shell Automation: Variables, loops, scripts, apt/yum package management.\n• Process & Networking Admin: systemctl, journalctl, ss, tcpdump, namespaces, cgroups, OOM Killer.',
      'Month 2: Networking, Git & Python scripting (Week 5-8)|• Networking for DevOps: OSI Model, DNS, load balancers, reverse proxy (NGINX), TLS setups.\n• Git & Collaborative Flows: Branching, merging, rebasing, pull requests, semantic versioning.\n• Python for Infrastructure: File management, JSON/YAML, requests APIs, subprocess calls, automation scripts.',
      'Month 3: Containerization & Kubernetes (Week 9-14)|• Docker Containers: Dockerfiles, volumes, networks, compose setups, multi-stage builds, scans.\n• Kubernetes Architecture: etcd, scheduler, API server, Pods, ReplicaSets, Deployments, Services.\n• Kubernetes Storage & Scheduling: PV, PVC, StorageClass, Affinity rules, Taints and Tolerations.',
      'Month 4: Advanced K8s, CI/CD pipelines & GitOps (Week 15-18)|• K8s Management & Security: Ingress controllers, Helm charts, Kustomize configurations, RBAC.\n• Continuous Integration Sprints: GitHub Actions, Jenkins, GitLab CI pipelines, image scans.\n• GitOps Orchestrations: ArgoCD setups, blue-green deployment pipelines, canary releases.',
      'Month 5: IaC, AWS Cloud Integration & Observability (Week 19-22)|• Infrastructure as Code: Terraform providers, modules, state management, Ansible playbooks.\n• AWS Production Deployment: EC2, VPC security, IAM roles, ALB load balancer, ECR, AWS EKS clusters.\n• Monitoring & Log Analytics: Prometheus metrics, Grafana dashboards, Loki log stack, Jaeger tracing.',
      'Month 6: DevSecOps, SRE, AI Infra & Capstones (Week 23-24)|• DevSecOps Security: Trivy scans, Checkov IaC scans, HashiCorp Vault secrets.\n• SRE & Incident Response: Capacity planning, Cost optimization, Chaos testing, SLA/SLOs.\n• Troubleshooting Broken Labs: Fixing CrashLoopBackOff, ImagePullBackOff, OOMKilled, Pod pending, DNS failures.\n• Modern AI Infrastructure: GPU drivers, Container toolkit, GPU scheduling, vLLM/Ollama servers.\n• 4-Weeks Final Capstone Sprints: E-commerce platform provisioning via Terraform on AWS EKS with ArgoCD GitOps pipelines.'
    ],
    hiringCompanies: ['Docker', 'Kubernetes', 'AWS', 'RedHat'],
    slug: "cloud-devops"
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
    hiringCompanies: ['Ogilvy', 'Dentsu', 'GroupM'],
    slug: "digital-marketing"
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
    hiringCompanies: ['TechM', 'HCL', 'Wipro'],
    slug: "python-programming"
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
    hiringCompanies: ['YouTube Studios', 'Netflix Vendors', 'Social Media Brands', 'Advertising Agencies'],
    slug: "videography-video-editing"
  },
  {
    id: 10,
    title: 'Industry-Ready MLOps & AI Systems Engineering',
    category: 'Cloud',
    duration: '28 Weeks (6-7 Months)',
    projects: '20+ Production Labs & 4 Capstones',
    priceUpfront: '₹12,000',
    pricePlaced: '₹8,000',
    level: 'Advanced (Coding Prerequisite)',
    tagline: 'Master Docker, Kubernetes, AWS, GitOps pipelines, and GPU infrastructure optimization to engineer production-ready AI systems.',
    desc: 'Go beyond training models. Build, deploy, optimize, monitor, and scale enterprise AI systems and LLM inference clusters in production.',
    skills: ['Docker', 'Kubernetes', 'AWS/EKS', 'CI/CD', 'vLLM', 'Triton Serving', 'LLMOps', 'GPU Infrastructure', 'Prometheus', 'Grafana'],
    modules: [
      'Module 0-1: Foundations & Python for AI (Week 1-3): ML/DL lifecycle, CRISP-DM, manual model deployments, API skeletons, OOP, and YAML/JSON packaging.',
      'Module 2-3: Linux, Git & Software Engineering (Week 4-5): Bash scripting, systemd service management, NVIDIA drivers/toolkit, git branching, pre-commit, and uv/poetry packaging.',
      'Module 4-5: ML & DL Fundamentals (Week 6-12): Data cleaning, regression/classification with Scikit-learn/XGBoost, neural networks, PyTorch/TensorFlow, Transformers, and transfer learning.',
      'Module 6-7: Docker & Kubernetes for ML (Week 13-18): GPU containers, multi-stage builds, Kubernetes architecture, deployments, storage, autoscaling, Helm, and NVIDIA GPU operators.',
      'Module 8-10: Cloud, CI/CD & ML Pipelines (Week 19-23): AWS/EKS/ECR/S3, GitHub Actions, Jenkins/ArgoCD, GitOps, model pipelines (MLflow, Kubeflow, Airflow, DVC).',
      'Module 11-13: Data Engineering, Model Serving & LLMOps (Week 24-29): Kafka, Redis, feature stores, FastAPI, Triton Inference Server, Ray Serve, vLLM/Ollama, Qdrant/ChromaDB vector RAG system.',
      'Module 14-17: GPU Infra, Optimization, Observability & Security (Week 30-33): Tensor/Pipeline Parallelism, paged attention, DCGM monitoring, AWQ/GPTQ quantization, TensorRT-LLM, OpenTelemetry, drift, evidently AI, RBAC, Vault.',
      'Module 18-20 & Capstone: Troubleshooting, System Design & Career Prep (Week 34-36): CUDA OOM/pod crashes, ChatGPT/Netflix/Uber system designs, resume/LinkedIn portfolios, and 4 Weeks Capstone Projects (Fraud Detection, Enterprise LLM Cluster, Production RAG).'
    ],
    hiringCompanies: ['Stripe', 'Google', 'Meta', 'Microsoft', 'NVIDIA'],
    slug: "mlops-ai-systems"
  }
];

interface PageProps {
  slug: string;
}


function getCourseFAQs(course: any) {
  return [
    {
      q: `What is ${course.title}?`,
      a: `${course.title} is our comprehensive, industry-aligned training program designed to take you from beginner to job-ready. It focuses on hands-on practical skills, real-world projects, and theoretical depth necessary to excel in technical roles.`
    },
    {
      q: `Who should enroll in this ${course.category} course?`,
      a: `This course is ideal for college students (BCA, B.Tech, MCA, BSc), recent graduates, and working professionals looking to transition into high-growth ${course.category} roles.`
    },
    {
      q: `What is the expected salary range in India after completion?`,
      a: `Based on current market data and placement reports, the typical salary range for professionals in this domain is ${course.salary || '₹4.0 - 10 LPA'}. Our dedicated placement cell actively refers graduates to top companies to secure competitive offers.`
    },
    {
      q: `Are there any coding prerequisites?`,
      a: `For this course, the difficulty level is ${course.difficulty || course.level || 'Beginner'}. If it is a beginner-friendly course, no prior programming experience is required. For advanced courses, basic familiarity with scripting or logic is recommended.`
    },
    {
      q: `Can freshers get hired after completing this program?`,
      a: `Absolutely! The curriculum includes ${course.projects} and a guaranteed practical internship, which gives freshers the exact hands-on experience and portfolio needed to bypass traditional entry-level barriers.`
    },
    {
      q: `What key tools and technologies will I master?`,
      a: `You will gain deep practical expertise in: ${(course.skills || []).join(', ')}. In addition, you will build projects using tools like: ${(course.tools || []).join(', ')}.`
    }
  ];
}

export default function CourseDetailsPage({ slug }: PageProps) {
  const course = COURSES.find((c) => c.slug === slug);

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
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  // Lead capture states for the free guide/roadmap
  const [guideEmail, setGuideEmail] = useState('');
  const [downloadedGuide, setDownloadedGuide] = useState(false);
  const [seoTab, setSeoTab] = useState<'whatIs' | 'roadmap' | 'projects' | 'interviews' | 'salary'>('whatIs');

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

  const handleGuideDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideEmail) return;
    setDownloadingBrochure(true);
    try {
      await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Guide Downloader',
          phone: '0000000000',
          qualification: 'N/A',
          status: 'Completed',
          year: '2026',
          courseTitle: `${course.title} (Roadmap Guide Lead)`,
          email: guideEmail
        })
      });
      setDownloadedGuide(true);
      
      const fileContent = `================================================================================
KODE TO CAREER — FREE ${course.title.toUpperCase()} ROADMAP & GUIDE
================================================================================
Overview:
${course.tagline}

Career Path Roadmap:
${(COURSES_SEO[course.slug]?.roadmap || []).map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

Key Projects to Build:
${(COURSES_SEO[course.slug]?.projects || []).map((p, idx) => `Project ${idx + 1}: ${p.title}\nDescription: ${p.desc}`).join('\n\n')}

Core Interview Questions:
${(COURSES_SEO[course.slug]?.interviews || []).map((item, idx) => `Q${idx + 1}: ${item.q}\nA${idx + 1}: ${item.a}`).join('\n\n')}

Salary Outlook:
${(COURSES_SEO[course.slug]?.salary || []).map(s => `- ${s.role}: ${s.range}`).join('\n')}

================================================================================
Reinforce your learning: Visit https://kodetocareer.com
================================================================================`;
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${course.slug}_career_roadmap.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingBrochure(false);
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

Target Recruiters: ${(course.hiringCompanies || []).join(', ')}
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


  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.tagline || course.desc,
    provider: {
      '@type': 'Organization',
      name: 'Kode To Career',
      sameAs: 'https://kodetocareer.com'
    },
    offers: {
      '@type': 'Offer',
      price: course.priceUpfront.replace(/[^0-9]/g, ''),
      priceCurrency: 'INR',
      valueAddedTaxIncluded: 'true'
    },
    educationalCredentialAwarded: 'ISO 9001:2015 Training Certificate & NSDC Skill Partner Credentials',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended Online Live Classes & On-Site Practice Labs',
      duration: course.duration,
      courseWorkload: '15-20 hours per week'
    }
  };

  const faqSchema = {
    mainEntity: getCourseFAQs(course).map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      <SchemaMarkup type="Course" data={courseSchema} />
      <SchemaMarkup type="FAQPage" data={faqSchema} />
      <div className="min-h-screen bg-slate-50 text-slate-800 pt-10 pb-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-[10%] left-[-150px] w-[600px] h-[600px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-150px] w-[600px] h-[600px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all programs
        </Link>

        {/* ── 2. Upgraded Bento Details Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (Spans 8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Header Overview Info */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 inline-block">
                {course.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                {course.title}
              </h1>
              <p className="text-base md:text-lg font-extrabold text-primary leading-snug">
                {course.tagline}
              </p>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed font-semibold">
                {course.desc}
              </p>
            </div>

            {/* 2. Quick Specs Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-[24px] bg-white border border-slate-150 shadow-sm">
              <div>
                <span className="text-[9px] text-slate-450 block font-bold uppercase tracking-wider">Duration</span>
                <span className="text-sm md:text-base font-extrabold text-slate-800 mt-1.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> {course.duration}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-450 block font-bold uppercase tracking-wider">Projects Count</span>
                <span className="text-sm md:text-base font-extrabold text-slate-800 mt-1.5 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary" /> {course.projects}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-450 block font-bold uppercase tracking-wider">Skill Level</span>
                <span className="text-sm md:text-base font-extrabold text-slate-800 mt-1.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" /> {course.level}
                </span>
              </div>
            </div>

            {/* 3. Core Technologies Bento */}
            <div className="bg-white border border-slate-150 p-8 rounded-[28px] shadow-sm space-y-6">
              <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-primary" /> Technologies You Will Master
              </h3>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill: string) => (
                  <span key={skill} className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-650 px-4 py-2.5 rounded-xl hover:border-primary/20 hover:bg-white hover:text-primary transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. Career Outcomes & Salary Ranges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Target Job Roles */}
              <div className="bg-white border border-slate-150 p-8 rounded-[28px] shadow-sm space-y-4">
                <h4 className="text-base font-heading font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Career Outcomes
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Prepare for highly compensated corporate roles across the technology spectrum:
                </p>
                <div className="space-y-3">
                  {(COURSES_SEO[course.slug]?.jobs || ['Software Engineer', 'Technical Lead']).map((job: string) => (
                    <div key={job} className="flex items-center gap-2.5 text-xs text-slate-650 font-bold">
                      <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                      <span>{job}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary Tiers */}
              <div className="bg-white border border-slate-150 p-8 rounded-[28px] shadow-sm space-y-4">
                <h4 className="text-base font-heading font-bold text-slate-800 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" /> Target Salary Bands
                </h4>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Typical CTC packages verified for candidates across career levels:
                </p>
                <div className="space-y-3 font-semibold">
                  {(COURSES_SEO[course.slug]?.salary || [
                    { role: 'Associate Engineer', range: '₹4.0 - 7.5 LPA' },
                    { role: 'Technical Lead', range: '₹12.0 - 20.0 LPA' }
                  ]).map((sal: any) => (
                    <div key={sal.role} className="flex justify-between items-center text-xs border-b border-slate-100 last:border-0 pb-2 last:pb-0">
                      <span className="text-slate-500">{sal.role}</span>
                      <span className="text-slate-800 font-black">{sal.range}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 5. 15-20 Live Projects Showcase */}
            <div className="bg-white border border-slate-150 p-8 rounded-[28px] shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-primary" /> 15-20 Production-Grade Live Projects
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Build concrete, recruiter-ready portfolios to verify your technical skills.</p>
              </div>

              {/* Main Capstone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(COURSES_SEO[course.slug]?.projects || [
                  { title: 'Full Stack Service Deployment', desc: 'Secure backend microservice linked to database clusters.' },
                  { title: 'Analytical Business Portal', desc: 'Interactive operational dashboards monitoring real transactions.' }
                ]).map((proj: any, pIdx: number) => (
                  <div key={pIdx} className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl space-y-3">
                    <span className="text-[9px] font-black text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                      Capstone {pIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{proj.title}</h4>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                      {proj.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Practice Projects list */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-black text-slate-800 mb-3 uppercase tracking-wider">12+ Additional Practice Sprints Include:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] text-slate-500 font-bold">
                  <div>• Database schema model builds</div>
                  <div>• JWT authorization logic integrations</div>
                  <div>• Git pull request sprints</div>
                  <div>• Cloud container docker packaging</div>
                  <div>• Analytic window functions query scripts</div>
                  <div>• API middleware error handlers</div>
                </div>
              </div>
            </div>

            {/* 6. Internship & Placement Timeline Roadmap */}
            <div className="bg-white border border-slate-150 p-8 rounded-[28px] shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary animate-pulse" /> Internship & Placement Roadmap
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Timeline to get you hired as a professional engineer.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                {[
                  { step: '01', title: 'Month 1-2', label: 'Core Skill Sprint', desc: 'Master syntax, logic loops, database designs, and project sprints.' },
                  { step: '02', title: 'Month 3-4', label: 'Paid Internship', desc: 'Secure stipend-based client projects at partner tech businesses.' },
                  { step: '03', title: 'Month 5', label: 'ATS Profile Tuning', desc: 'Complete resume audits, mock interview rounds, and portfolio updates.' },
                  { step: '04', title: 'Month 6+', label: 'Hiring Referral', desc: 'Get direct references to hiring managers from our 500+ partners.' }
                ].map((roadmapStep) => (
                  <div key={roadmapStep.step} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3 relative">
                    <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-heading font-black text-[10px] flex items-center justify-center leading-none border-4 border-white shadow-sm">
                      {roadmapStep.step}
                    </span>
                    <h4 className="text-xs font-black text-slate-450 uppercase tracking-widest">{roadmapStep.title}</h4>
                    <h5 className="text-xs font-bold text-slate-800 leading-none">{roadmapStep.label}</h5>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">{roadmapStep.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Curriculum Modules Accordion */}
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900">Program Syllabus</h2>
              <div className="space-y-4">
                {course.modules.map((mod: string, idx: number) => {
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
                        className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-slate-800 hover:text-primary transition-colors cursor-pointer outline-none"
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

            {/* 8. Google Reviews Mockup Embed */}
            <div className="bg-white border border-slate-150 rounded-[32px] p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-current" /> Verified Student Reviews
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Real ratings and reviews left by program alumni.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-650">
                  <span className="text-xl font-black text-slate-800">4.9/5</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Karan Malhotra', role: 'Software Engineer', text: `This course completely changed my approach. Setting up 15+ live projects got me placed at my target firm.`, date: '3 weeks ago' },
                  { name: 'Priya Patel', role: 'Data Analyst', text: `The paid internship program is the real deal. I received a monthly stipend and worked on actual client codebases.`, date: '1 month ago' }
                ].map((reviewItem, idx) => (
                  <div key={idx} className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-800">{reviewItem.name}</span>
                      <span className="text-slate-400">{reviewItem.date}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block font-semibold leading-none">{reviewItem.role}</span>
                    <p className="text-xs text-slate-550 leading-relaxed font-semibold italic">
                      "{reviewItem.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. SEO & Career Resource Center (Tabbed) */}
            <div className="bg-white border border-slate-150 rounded-[32px] p-8 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> SEO & Career Resource Center
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">Read supporting documentation, study roadmaps, and target questions.</p>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
                {[
                  { id: 'whatIs', label: 'Overview' },
                  { id: 'roadmap', label: 'Roadmap' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'interviews', label: 'Interview Q&A' },
                  { id: 'salary', label: 'Salary Info' }
                ].map((tabItem) => (
                  <button
                    key={tabItem.id}
                    onClick={() => setSeoTab(tabItem.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      seoTab === tabItem.id 
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Panels */}
              <div className="text-xs text-slate-600 font-semibold leading-relaxed whitespace-pre-line space-y-4">
                {seoTab === 'whatIs' && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-slate-800">What is this subject?</h4>
                    <p>{COURSES_SEO[course.slug]?.whatIs}</p>
                  </div>
                )}
                {seoTab === 'roadmap' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-slate-800">Detailed Skill Roadmap</h4>
                    <ul className="space-y-2 pl-4">
                      {(COURSES_SEO[course.slug]?.roadmap || []).map((step, idx) => (
                        <li key={idx} className="list-decimal">{step}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {seoTab === 'projects' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-800">Target Portfolio Deliverables</h4>
                    <div className="space-y-3">
                      {(COURSES_SEO[course.slug]?.projects || []).map((p, idx) => (
                        <div key={idx} className="space-y-1">
                          <h5 className="font-bold text-slate-700">{idx+1}. {p.title}</h5>
                          <p className="text-slate-500 pl-4">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {seoTab === 'interviews' && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-800">Core Interview Preparation Q&A</h4>
                    <div className="space-y-3">
                      {(COURSES_SEO[course.slug]?.interviews || []).map((item, idx) => (
                        <div key={idx} className="space-y-1 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                          <h5 className="font-bold text-slate-850">Q: {item.q}</h5>
                          <p className="text-slate-500 mt-1 font-medium pl-4">A: {item.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {seoTab === 'salary' && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-extrabold text-slate-800">Jobs & Salary Outcomes</h4>
                    <ul className="space-y-2 pl-4">
                      {(COURSES_SEO[course.slug]?.salary || []).map((s, idx) => (
                        <li key={idx} className="list-disc">
                          <span className="text-slate-500">{s.role}:</span> <span className="font-black text-slate-800">{s.range}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* 10. FAQ Accordions */}
            <div className="space-y-6 mt-12 pt-12 border-t border-slate-150">
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">Frequently Asked Questions</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Common queries about the {course.title} program</p>
              </div>
              <div className="space-y-4">
                {getCourseFAQs(course).map((faq: any, idx: number) => {
                  const isOpen = activeFaqIdx === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-[20px] bg-white border border-slate-150 shadow-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-5 text-left font-heading font-bold text-slate-800 hover:text-primary transition-colors cursor-pointer outline-none"
                      >
                        <span className="text-sm md:text-base">{faq.q}</span>
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
                              <p className="text-xs md:text-sm text-slate-650 leading-relaxed font-semibold">
                                {faq.a}
                              </p>
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

          {/* Right Column (Spans 4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Program Checkout Card */}
            <div className="rounded-[24px] bg-white border border-slate-150 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block mb-2">Program Registration</span>
              <div className="flex flex-col gap-1 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono">{course.priceUpfront}</span>
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
              <div className="space-y-4 mb-8 text-xs font-bold text-slate-655">
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
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-bold text-base hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 outline-none"
                >
                  Enroll In Program <Play className="w-4.5 h-4.5 fill-white" />
                </button>
              )}
            </div>

            {/* Lead Capture & Free Career Guide Download Card */}
            <div className="rounded-[24px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-6 shadow-sm relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
              <div className="space-y-1">
                <span className="text-[9px] font-black text-primary uppercase tracking-widest block">Free Download</span>
                <h4 className="text-sm font-heading font-extrabold text-slate-900">Free Career Roadmap PDF</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Get the complete {course.title} career guide, ATS-optimized resume template, and interview prep guides.
                </p>
              </div>
              
              {downloadedGuide ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-3 text-center font-bold text-xs">
                  Sent! Check your email for download link.
                </div>
              ) : (
                <form onSubmit={handleGuideDownloadSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your professional email"
                    value={guideEmail}
                    onChange={(e) => setGuideEmail(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-primary/50 text-sm font-semibold"
                  />
                  <button
                    type="submit"
                    disabled={downloadingBrochure}
                    className="w-full py-2.5 bg-primary hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer outline-none"
                  >
                    <Download className="w-4 h-4" /> {downloadingBrochure ? 'Processing...' : 'Download Free Guide'}
                  </button>
                </form>
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
                        placeholder="e.g. +91 96679 75616"
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
    </>
  );
}
