'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Calculator, Briefcase, FileText, ArrowRight, 
  ChevronRight, Trophy, GraduationCap, DollarSign, Award, 
  CheckCircle2, AlertCircle, RefreshCw, Compass, HelpCircle, 
  Target, Zap, Code
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Course slug mappings for recommendation links
const COURSE_RECS = {
  'MERN Stack Development': { slug: 'mern-stack-development', name: 'MERN Stack Development + AI Integration' },
  'Python Programming': { slug: 'python-programming', name: 'Python Programming & Automation' },
  'Data Science & ML': { slug: 'data-science-machine-learning', name: 'Data Science & Machine Learning Core' },
  'UI/UX Design': { slug: 'graphic-design-ui-ux', name: 'Graphic Design + UI/UX Product Design Systems' },
  'Data Analytics': { slug: 'data-analytics', name: 'Data Analytics & Business Intelligence' },
  'Java Full Stack': { slug: 'java-full-stack', name: 'Java Full Stack Developer Program' },
  'Cloud & DevOps': { slug: 'cloud-devops', name: 'Cloud Computing & DevOps Infrastructure' },
  'Digital Marketing': { slug: 'digital-marketing', name: 'Digital Marketing with AI & Growth Hacking' },
  'Video Editing': { slug: 'videography-video-editing', name: 'Graphic Designing + Videography / Video Editing' },
  'MLOps': { slug: 'mlops-ai-systems', name: 'Industry-Ready MLOps & AI Systems Engineering' }
};

export default function ToolsHub() {
  const [activeTab, setActiveTab] = useState<'salary' | 'resume' | 'roadmap' | 'quiz'>('salary');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'quiz' || tab === 'salary' || tab === 'resume' || tab === 'roadmap') {
        setActiveTab(tab as any);
      }
    }
  }, []);

  // Salary Calculator State
  const [specialization, setSpecialization] = useState('MERN Stack Development');
  const [experience, setExperience] = useState('Fresher');
  const [city, setCity] = useState('Noida');
  const [calcResult, setCalcResult] = useState<any>(null);
  const [calculating, setCalculating] = useState(false);

  // Resume Checker State
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('MERN Stack Developer');
  const [resumeResult, setResumeResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Roadmap Generator State
  const [roadmapSkills, setRoadmapSkills] = useState('');
  const [roadmapTarget, setRoadmapTarget] = useState('Full Stack Developer');
  const [roadmapResult, setRoadmapResult] = useState<any>(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);

  // Quiz State
  const [quizStep, setQuizStep] = useState(-1); // -1 = start, 0..4 = Qs, 5 = result
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<any>(null);

  const QUIZ_QUESTIONS = [
    {
      q: "What type of technical projects excite you most?",
      options: [
        "Building beautiful visual interfaces, pages, and interactive layouts.",
        "Engineering APIs, server pipelines, and databases.",
        "Building models, data visualization, and analyzing metrics.",
        "Automating build pipelines, server environments, and containers."
      ]
    },
    {
      q: "Which language do you prefer or want to master first?",
      options: [
        "JavaScript / TypeScript (very flexible, powers web and UI).",
        "Python (perfect for scripting, AI, data science, and automation).",
        "Java (standard for enterprise, compile-time checks, banks).",
        "SQL / Bash (for querying databases and managing server systems)."
      ]
    },
    {
      q: "How do you feel about writing math & statistics?",
      options: [
        "Prefer to avoid it completely (focus on clean design, logic, layout).",
        "Okay with basic arithmetic, business KPIs, and SQL group queries.",
        "Love it! Want to write neural networks and machine learning models."
      ]
    },
    {
      q: "What is your primary career goal?",
      options: [
        "Join high-growth startups, write code fast, or build SaaS products.",
        "Secure a structured developer role in enterprise, finance, or consultancy.",
        "Become a business data analyst, reporting lead, or analytics consultant.",
        "Design cloud architecture, DevOps automation pipelines, or LLM serving systems."
      ]
    },
    {
      q: "What is your current programming experience level?",
      options: [
        "Absolute beginner (never written code, looking for first steps).",
        "Intermediate (know basic HTML/CSS, basic scripting, loops, variables).",
        "Advanced (comfortable building full apps, looking to scale databases or systems)."
      ]
    }
  ];

  // Handle Salary Calculation
  const handleSalaryCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      let baseMin = 4.5;
      let baseMax = 12.0;

      if (specialization === 'Data Science & ML') { baseMin = 6.0; baseMax = 18.0; }
      else if (specialization === 'MLOps') { baseMin = 8.0; baseMax = 25.0; }
      else if (specialization === 'Cloud & DevOps') { baseMin = 5.5; baseMax = 14.0; }
      else if (specialization === 'Java Full Stack') { baseMin = 5.0; baseMax = 15.0; }
      else if (specialization === 'Python Programming') { baseMin = 4.0; baseMax = 9.0; }
      else if (specialization === 'UI/UX Design') { baseMin = 4.0; baseMax = 10.0; }
      else if (specialization === 'Data Analytics') { baseMin = 4.0; baseMax = 9.0; }
      else if (specialization === 'Digital Marketing') { baseMin = 3.5; baseMax = 8.0; }
      else if (specialization === 'Video Editing') { baseMin = 4.0; baseMax = 8.0; }

      let expMultiplier = 1.0;
      if (experience === '1-2 Years') expMultiplier = 1.4;
      else if (experience === '3-5 Years') expMultiplier = 2.1;

      let cityBonus = 0;
      if (city === 'Gurgaon' || city === 'Delhi') cityBonus = 0.5;

      const minVal = (baseMin * expMultiplier + cityBonus).toFixed(1);
      const maxVal = (baseMax * expMultiplier + cityBonus).toFixed(1);

      let skillsList: string[] = [];
      if (specialization.includes('MERN')) skillsList = ['React.js', 'Node.js', 'Express', 'MongoDB', 'Next.js', 'REST APIs'];
      else if (specialization.includes('Python')) skillsList = ['Python scripting', 'Selenium', 'Web Scraping', 'SQL', 'Django basics'];
      else if (specialization.includes('Data Science')) skillsList = ['Python', 'Scikit-learn', 'PyTorch', 'Supervised Learning', 'NLP', 'SQL'];
      else if (specialization.includes('UI/UX')) skillsList = ['Figma', 'Wireframing', 'High-Fidelity Prototypes', 'Design Systems', 'User Research'];
      else if (specialization.includes('Analytics')) skillsList = ['SQL', 'Tableau', 'Power BI', 'Excel pivot tables', 'Statistical analysis'];
      else if (specialization.includes('Java')) skillsList = ['Java Core', 'Spring Boot', 'Hibernate', 'Microservices', 'REST APIs', 'PostgreSQL'];
      else if (specialization.includes('DevOps')) skillsList = ['Docker', 'Kubernetes EKS', 'Terraform IaC', 'CI/CD Pipelines', 'AWS Cloud', 'Bash'];
      else if (specialization.includes('Marketing')) skillsList = ['SEO & SEM', 'Google Ads', 'Meta Campaigns', 'Growth Funnels', 'Google Analytics'];
      else if (specialization.includes('Video')) skillsList = ['Premiere Pro', 'After Effects', 'Storyboarding', 'Color Grading', 'Sound Mix'];
      else if (specialization.includes('MLOps')) skillsList = ['vLLM', 'Triton Server', 'Model Drift (EvidentlyAI)', 'Docker/K8s', 'Kubeflow', 'MLflow'];

      const rec = COURSE_RECS[specialization as keyof typeof COURSE_RECS] || COURSE_RECS['MERN Stack Development'];

      setCalcResult({
        min: minVal,
        max: maxVal,
        skills: skillsList,
        courseName: rec.name,
        courseSlug: rec.slug
      });
      setCalculating(false);
    }, 1200);
  };

  // Handle Resume Analysis
  const handleResumeAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    setResumeResult(null);

    setTimeout(() => {
      const textLower = resumeText.toLowerCase();
      let matchCount = 0;
      let targetKeywords: string[] = [];

      if (targetRole.includes('MERN')) {
        targetKeywords = ['react', 'node', 'express', 'mongodb', 'javascript', 'api', 'git', 'css', 'html', 'next'];
      } else if (targetRole.includes('Data Analyst')) {
        targetKeywords = ['sql', 'power bi', 'tableau', 'excel', 'python', 'analytics', 'statistics', 'dashboard', 'pandas'];
      } else if (targetRole.includes('Data Scientist') || targetRole.includes('Machine Learning')) {
        targetKeywords = ['python', 'pytorch', 'tensorflow', 'scikit', 'regression', 'statistics', 'pandas', 'numpy', 'sql'];
      } else if (targetRole.includes('DevOps')) {
        targetKeywords = ['docker', 'kubernetes', 'terraform', 'aws', 'ci/cd', 'linux', 'bash', 'git', 'pipelines', 'jenkins'];
      } else if (targetRole.includes('Java')) {
        targetKeywords = ['java', 'spring', 'hibernate', 'sql', 'microservices', 'git', 'maven', 'rest', 'api'];
      } else if (targetRole.includes('MLOps')) {
        targetKeywords = ['mlflow', 'kubeflow', 'docker', 'kubernetes', 'gpu', 'triton', 'vllm', 'monitoring', 'gitops', 'python'];
      } else {
        targetKeywords = ['figma', 'design', 'ui', 'ux', 'wireframe', 'prototype', 'typography', 'branding'];
      }

      const presentKeywords: string[] = [];
      const missingKeywords: string[] = [];

      targetKeywords.forEach(kw => {
        if (textLower.includes(kw)) {
          matchCount++;
          presentKeywords.push(kw.toUpperCase());
        } else {
          missingKeywords.push(kw.toUpperCase());
        }
      });

      const rawScore = Math.round((matchCount / targetKeywords.length) * 100);
      let scoreBoost = 0;
      if (textLower.includes('education') || textLower.includes('academic')) scoreBoost += 5;
      if (textLower.includes('projects') || textLower.includes('experience')) scoreBoost += 5;
      if (textLower.includes('skills')) scoreBoost += 5;
      const score = Math.min(rawScore + scoreBoost, 99);

      const suggestions: string[] = [];
      if (missingKeywords.length > 0) {
        suggestions.push(`Integrate missing keywords: ${missingKeywords.slice(0, 3).join(', ')}.`);
      }
      if (!textLower.includes('projects')) {
        suggestions.push("Add a dedicated 'Projects' section displaying live links.");
      }
      if (resumeText.length < 300) {
        suggestions.push("Describe project features and metrics in detail using action-oriented bullets.");
      }
      if (!textLower.includes('education')) {
        suggestions.push("Add your Highest Qualification and graduation details.");
      }

      setResumeResult({
        score,
        present: presentKeywords,
        missing: missingKeywords,
        suggestions: suggestions.length > 0 ? suggestions : ["Your resume matches this role perfectly! Optimize layouts for clean visual readability."]
      });
      setAnalyzing(false);
    }, 1500);
  };

  // Handle AI Roadmap Generation
  const handleGenerateRoadmap = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingRoadmap(true);
    setRoadmapResult(null);

    setTimeout(() => {
      const milestones = [
        {
          title: "Milestone 1: Foundational Programming & Logic",
          duration: "Weeks 1-4",
          topics: ["Variable Scopes & Control Structures", "Dynamic Data Structures (Arrays, Lists)", "Complex Logic & Functional Paradigms", "Git & Collaboration Protocols"]
        },
        {
          title: "Milestone 2: Framework Mastery & Data Integrity",
          duration: "Weeks 5-12",
          topics: [`Frameworks for ${roadmapTarget}`, "State Management Models", "Database Indexing & Normalization", "Security Tokens & Middleware"]
        },
        {
          title: "Milestone 3: Production Deployments & Systems",
          duration: "Weeks 13-18",
          topics: ["Docker Containerization", "AWS Cloud Resource Hosting", "CI/CD Deployment Pipelines", "Observability (Logging & Logs Audit)"]
        },
        {
          title: "Milestone 4: Live Internship & Capstone Project",
          duration: "Weeks 19-24",
          topics: ["Working with Industry Mentors", "Resume ATS Keywords Insertion", "GitHub Portfolio Polish", "Placement Referrals & Interviews Ready"]
        }
      ];

      let recommendedCourse = COURSE_RECS['MERN Stack Development'];
      const targetLower = roadmapTarget.toLowerCase();

      if (targetLower.includes('data science') || targetLower.includes('ml') || targetLower.includes('machine')) {
        recommendedCourse = COURSE_RECS['Data Science & ML'];
      } else if (targetLower.includes('mlops') || targetLower.includes('ai system')) {
        recommendedCourse = COURSE_RECS['MLOps'];
      } else if (targetLower.includes('devops') || targetLower.includes('cloud')) {
        recommendedCourse = COURSE_RECS['Cloud & DevOps'];
      } else if (targetLower.includes('java') || targetLower.includes('spring')) {
        recommendedCourse = COURSE_RECS['Java Full Stack'];
      } else if (targetLower.includes('analytics') || targetLower.includes('bi')) {
        recommendedCourse = COURSE_RECS['Data Analytics'];
      } else if (targetLower.includes('design') || targetLower.includes('ui') || targetLower.includes('ux')) {
        recommendedCourse = COURSE_RECS['UI/UX Design'];
      } else if (targetLower.includes('python')) {
        recommendedCourse = COURSE_RECS['Python Programming'];
      }

      setRoadmapResult({
        milestones,
        courseName: recommendedCourse.name,
        courseSlug: recommendedCourse.slug
      });
      setGeneratingRoadmap(false);
    }, 1550);
  };

  // Handle Quiz Answer click
  const handleQuizAnswer = (answerIdx: number) => {
    const updatedAnswers = [...quizAnswers, answerIdx];
    setQuizAnswers(updatedAnswers);

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      let uiScore = 0;
      let devScore = 0;
      let dataScore = 0;
      let cloudScore = 0;

      updatedAnswers.forEach((ans, qIdx) => {
        if (qIdx === 0) {
          if (ans === 0) uiScore += 3;
          else if (ans === 1) devScore += 3;
          else if (ans === 2) dataScore += 3;
          else if (ans === 3) cloudScore += 3;
        } else if (qIdx === 1) {
          if (ans === 0) devScore += 2;
          else if (ans === 1) dataScore += 2;
          else if (ans === 2) devScore += 3;
          else if (ans === 3) cloudScore += 3;
        } else if (qIdx === 2) {
          if (ans === 0) uiScore += 2;
          else if (ans === 1) devScore += 1;
          else if (ans === 2) dataScore += 3;
        } else if (qIdx === 3) {
          if (ans === 0) devScore += 2;
          else if (ans === 1) devScore += 3;
          else if (ans === 2) dataScore += 3;
          else if (ans === 3) cloudScore += 3;
        }
      });

      let match = COURSE_RECS['MERN Stack Development'];
      let description = "MERN Stack Development + AI Integration is your ideal fit. You love writing core web application logic, building frontends with React, and setting up servers with Node.js!";

      if (uiScore > devScore && uiScore > dataScore && uiScore > cloudScore) {
        match = COURSE_RECS['UI/UX Design'];
        description = "Graphic Design & UI/UX Design is your top recommendation. You have a great eye for visual style, design systems, and client interfaces!";
      } else if (dataScore > devScore && dataScore > cloudScore) {
        match = COURSE_RECS['Data Science & ML'];
        description = "Data Science & Machine Learning Core matches your interests. You enjoy analytics, coding with Python, and training intelligence pipelines!";
      } else if (cloudScore > devScore && cloudScore > dataScore) {
        match = COURSE_RECS['Cloud & DevOps'];
        description = "Cloud Computing & DevOps infrastructure matches your style. You enjoy container orchestration, cloud hosting, and shell scripting automation!";
      }

      setQuizResult({
        match,
        description
      });
      setQuizStep(5);
    }
  };

  const resetQuiz = () => {
    setQuizStep(-1);
    setQuizAnswers([]);
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-12 pb-24 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-[15%] left-[-150px] w-[500px] h-[500px] rounded-full bg-blue-100/35 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-150px] w-[500px] h-[500px] rounded-full bg-indigo-100/35 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> FREE AI-POWERED CAREER HUB
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight leading-tight">
            AI Career & Learning Tools
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mt-3 font-semibold text-sm md:text-base">
            Get instant salary projections, ATS resume compatibility audits, personalized roadmap blueprints, and tech specialization recommendations.
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex bg-slate-100 border border-slate-200 p-1.5 rounded-2xl max-w-3xl mx-auto mb-10 shadow-inner overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('salary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salary' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-primary" /> Salary Matcher
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'resume' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-primary" /> ATS Resume Checker
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'roadmap' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-primary" /> AI Roadmap Builder
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'quiz' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-primary" /> Career Path Quiz
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'salary' && (
            <motion.div
              key="salary-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-150 p-6 md:p-8 rounded-[28px] shadow-sm relative overflow-hidden space-y-8"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" /> Projected Salary & Career Finder
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Calculates compensation benchmarks for technical specializations</p>
              </div>

              <form onSubmit={handleSalaryCalc} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-slate-700">
                <div className="space-y-2">
                  <label htmlFor="select-spec" className="text-slate-500">Tech Specialization</label>
                  <select
                    id="select-spec"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                  >
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Python Programming">Python Programming</option>
                    <option value="Data Science & ML">Data Science & ML</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Data Analytics">Data Analytics</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="MLOps">MLOps</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="select-exp" className="text-slate-500">Experience Level</label>
                  <select
                    id="select-exp"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                  >
                    <option value="Fresher">Fresher / Career Changer</option>
                    <option value="1-2 Years">1 - 2 Years Experience</option>
                    <option value="3-5 Years">3 - 5 Years Experience</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="select-city" className="text-slate-500">Target Region / City</label>
                  <select
                    id="select-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                  >
                    <option value="Noida">Noida (Delhi NCR)</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Ghaziabad">Ghaziabad / Faridabad</option>
                    <option value="Online">Online / Remote (India)</option>
                  </select>
                </div>

                <div className="md:col-span-3 pt-2">
                  {calculating ? (
                    <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing market benchmarks...
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 text-sm"
                    >
                      Calculate Projections <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {calcResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-slate-100 pt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-150 relative">
                    <div className="absolute top-4 right-4 text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Live Estimate</div>
                    
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Salary Range</span>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-3xl md:text-4xl font-extrabold text-slate-900 font-mono">₹{calcResult.min} - {calcResult.max}</span>
                        <span className="text-sm font-bold text-slate-500">LPA</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-semibold mt-2">Based on current Delhi NCR recruiting trends & micro-cohort data.</p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Recommended Skills Blueprint</span>
                      <div className="flex flex-wrap gap-1.5">
                        {calcResult.skills.map((skill: string) => (
                          <span key={skill} className="text-[10px] bg-white border border-slate-150 font-bold text-slate-700 px-2.5 py-0.5 rounded-full">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[24px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">Matching Program Found</span>
                      <h4 className="text-base font-heading font-extrabold text-slate-900">{calcResult.courseName}</h4>
                      <p className="text-xs text-slate-500 font-semibold max-w-xl leading-relaxed">
                        Acquire all of the {calcResult.skills.length} target skills in our structured cohort, complete with 1-on-1 mentorship, live projects, and guaranteed placement support.
                      </p>
                    </div>
                    <Link
                      href={`/courses/${calcResult.courseSlug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 rounded-xl font-bold text-xs shadow-md hover:opacity-95 transition-opacity shrink-0 cursor-pointer"
                    >
                      View Syllabus <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'resume' && (
            <motion.div
              key="resume-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-150 p-6 md:p-8 rounded-[28px] shadow-sm relative overflow-hidden space-y-8"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" /> AI ATS Resume Score Checker
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Audits keyword matches, sections, and structural issues</p>
              </div>

              <form onSubmit={handleResumeAnalysis} className="space-y-5 text-xs font-bold text-slate-700">
                <div className="space-y-2">
                  <label htmlFor="select-role" className="text-slate-500">Target Role</label>
                  <select
                    id="select-role"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                  >
                    <option value="MERN Stack Developer">MERN Stack Developer</option>
                    <option value="Python Scripting Engineer">Python Scripting Engineer</option>
                    <option value="Data Scientist / ML Engineer">Data Scientist / ML Engineer</option>
                    <option value="UI/UX Product Designer">UI/UX Product Designer</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Java Full Stack Developer">Java Full Stack Developer</option>
                    <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                    <option value="MLOps Platform Engineer">MLOps Platform Engineer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="textarea-resume" className="text-slate-500">Paste Resume Text</label>
                  <textarea
                    id="textarea-resume"
                    required
                    rows={8}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste the text of your resume here to analyze matches and extract keyword optimization gaps..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white text-sm font-semibold leading-relaxed"
                  />
                </div>

                <div>
                  {analyzing ? (
                    <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Audit engine scanning resume...
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 text-sm"
                    >
                      Audit Resume compatibility <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {resumeResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-slate-100 pt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-150">
                    
                    <div className="flex flex-col items-center justify-center text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-150 pb-6 md:pb-0 md:pr-6">
                      <span className="text-[10px] text-slate-455 uppercase font-black tracking-wider">ATS Score</span>
                      <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-white border-4 border-slate-150">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="56" cy="56" r="48" fill="transparent" stroke="#E2E8F0" strokeWidth="6" />
                          <circle cx="56" cy="56" r="48" fill="transparent" stroke={resumeResult.score > 75 ? '#10B981' : '#F59E0B'} strokeWidth="6" strokeDasharray="301.59" strokeDashoffset={301.59 * (1 - resumeResult.score / 100)} />
                        </svg>
                        <span className="absolute text-2xl font-black text-slate-800 font-mono">{resumeResult.score}%</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        resumeResult.score > 75 ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {resumeResult.score > 75 ? 'Optimized Match' : 'Optimization Needed'}
                      </span>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Identified Keywords</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resumeResult.present.length > 0 ? (
                            resumeResult.present.map((kw: string) => (
                              <span key={kw} className="text-[9px] bg-emerald-50 border border-emerald-100 font-bold text-emerald-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {kw}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-400 font-semibold italic">Zero technical keywords detected matching target role.</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Missing Keywords</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resumeResult.missing.length > 0 ? (
                            resumeResult.missing.map((kw: string) => (
                              <span key={kw} className="text-[9px] bg-red-50 border border-red-100 font-bold text-red-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <AlertCircle className="w-3 h-3 text-red-500" /> {kw}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">Zero Keyword Gaps!</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-heading font-extrabold text-slate-900">Critical Improvement Suggestions</h4>
                    <ul className="space-y-2 text-xs font-bold text-slate-655 pl-4 list-disc marker:text-primary">
                      {resumeResult.suggestions.map((sug: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{sug}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-150 p-6 md:p-8 rounded-[28px] shadow-sm relative overflow-hidden space-y-8"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary" /> AI Career Roadmap Generator
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Generates custom week-by-week technical blueprints</p>
              </div>

              <form onSubmit={handleGenerateRoadmap} className="space-y-5 text-xs font-bold text-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="input-target" className="text-slate-500">Dream Career / Job Role</label>
                    <input
                      id="input-target"
                      type="text"
                      required
                      value={roadmapTarget}
                      onChange={(e) => setRoadmapTarget(e.target.value)}
                      placeholder="e.g. DevOps Engineer, Machine Learning Specialist..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="input-skills" className="text-slate-500">Current Skills (Optional)</label>
                    <input
                      id="input-skills"
                      type="text"
                      value={roadmapSkills}
                      onChange={(e) => setRoadmapSkills(e.target.value)}
                      placeholder="e.g. HTML, Python basics, Excel..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:bg-white text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  {generatingRoadmap ? (
                    <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl py-3.5 text-center text-sm font-bold flex items-center justify-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Structuring dynamic roadmap milestones...
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3.5 rounded-xl font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 text-sm"
                    >
                      Build AI Learning Blueprint <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              {roadmapResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-slate-100 pt-8 space-y-8"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Custom Learning Milestones</span>
                    <h3 className="text-lg font-heading font-extrabold text-slate-900">Your Roadmap to {roadmapTarget}</h3>
                  </div>

                  {/* Vertical Roadmap Timeline */}
                  <div className="relative border-l-2 border-slate-150 ml-4 space-y-8">
                    {roadmapResult.milestones.map((m: any, idx: number) => (
                      <div key={idx} className="relative pl-8">
                        <div className="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-sm" />
                        
                        <div className="bg-slate-50/50 border border-slate-150 rounded-[20px] p-5 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-heading font-black text-slate-900">{m.title}</h4>
                            <span className="text-[9px] font-black uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">{m.duration}</span>
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-semibold text-slate-550">
                            {m.topics.map((topic: string, i: number) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[24px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">Aligned Training Path</span>
                      <h4 className="text-base font-heading font-extrabold text-slate-900">{roadmapResult.courseName}</h4>
                      <p className="text-xs text-slate-500 font-semibold max-w-xl leading-relaxed">
                        Skip manual learning curves. Master this complete roadmap under live expert mentorship, build production portfolios, and secure placements at hiring partner firms.
                      </p>
                    </div>
                    <Link
                      href={`/courses/${roadmapResult.courseSlug}`}
                      className="inline-flex h-11 items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 rounded-xl font-bold text-xs shadow-md hover:opacity-95 transition-opacity shrink-0 cursor-pointer"
                    >
                      Explore Course Syllabus <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border border-slate-150 p-6 md:p-8 rounded-[28px] shadow-sm relative overflow-hidden space-y-8"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" /> Tech Career Path Quiz
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Uncover your ideal specialization in under 60 seconds</p>
              </div>

              {quizStep === -1 && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-heading font-black text-slate-900">Which Career Stacks Match Your Logic?</h3>
                    <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto leading-relaxed">
                      Answer 5 quick multiple choice questions to match your problem-solving style to software, analytics, design, or infrastructure.
                    </p>
                  </div>
                  <button
                    onClick={() => setQuizStep(0)}
                    className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
                  >
                    Start Career Quiz
                  </button>
                </div>
              )}

              {quizStep >= 0 && quizStep < 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-455">
                      <span>Question {quizStep + 1} of 5</span>
                      <span>{Math.round(((quizStep) / 5) * 100)}% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((quizStep + 1) / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-base font-heading font-black text-slate-900 leading-snug">{QUIZ_QUESTIONS[quizStep].q}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all text-xs font-bold text-slate-700 cursor-pointer outline-none flex justify-between items-center group"
                        >
                          <span className="max-w-[90%] leading-relaxed">{option}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {quizStep === 5 && quizResult && (
                <div className="space-y-6 pt-2">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-500">
                      <Trophy className="w-6 h-6 animate-bounce" />
                    </div>
                    <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider block">Recommended Path Identified</span>
                    <h3 className="text-xl font-heading font-black text-slate-900">{quizResult.match.name}</h3>
                  </div>

                  <div className="bg-slate-50/50 border border-slate-150 p-5 rounded-2xl text-center space-y-2">
                    <p className="text-xs text-slate-600 font-semibold leading-relaxed max-w-lg mx-auto">
                      {quizResult.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-655 font-bold text-xs rounded-xl cursor-pointer transition-colors"
                    >
                      Retake Quiz
                    </button>
                    <Link
                      href={`/courses/${quizResult.match.slug}`}
                      className="inline-flex h-11 items-center justify-center px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-black shadow-md hover:opacity-95 transition-opacity cursor-pointer"
                    >
                      View Syllabus & Enroll
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
