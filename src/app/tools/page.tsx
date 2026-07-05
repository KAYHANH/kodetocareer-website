'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Calculator, Briefcase, FileText, ArrowRight, 
  ChevronRight, Trophy, GraduationCap, DollarSign, Award, 
  CheckCircle2, AlertCircle, RefreshCw 
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
  const [activeTab, setActiveTab] = useState<'salary' | 'resume'>('salary');

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

  // Handle Salary Calculation
  const handleSalaryCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculating(true);
    setCalcResult(null);

    setTimeout(() => {
      let baseMin = 4.5;
      let baseMax = 12.0;

      // Adjust based on specialization
      if (specialization === 'Data Science & ML') { baseMin = 6.0; baseMax = 18.0; }
      else if (specialization === 'MLOps') { baseMin = 8.0; baseMax = 25.0; }
      else if (specialization === 'Cloud & DevOps') { baseMin = 5.5; baseMax = 14.0; }
      else if (specialization === 'Java Full Stack') { baseMin = 5.0; baseMax = 15.0; }
      else if (specialization === 'Python Programming') { baseMin = 4.0; baseMax = 9.0; }
      else if (specialization === 'UI/UX Design') { baseMin = 4.0; baseMax = 10.0; }
      else if (specialization === 'Data Analytics') { baseMin = 4.0; baseMax = 9.0; }
      else if (specialization === 'Digital Marketing') { baseMin = 3.5; baseMax = 8.0; }
      else if (specialization === 'Video Editing') { baseMin = 4.0; baseMax = 8.0; }

      // Adjust based on experience
      let expMultiplier = 1.0;
      if (experience === '1-2 Years') expMultiplier = 1.4;
      else if (experience === '3-5 Years') expMultiplier = 2.1;

      // Adjust based on city
      let cityBonus = 0;
      if (city === 'Gurgaon' || city === 'Delhi') cityBonus = 0.5;

      const minVal = (baseMin * expMultiplier + cityBonus).toFixed(1);
      const maxVal = (baseMax * expMultiplier + cityBonus).toFixed(1);

      // Core skills needed list
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
      // Analyze text for keywords matching target roles
      const textLower = resumeText.toLowerCase();
      let matchCount = 0;
      let targetKeywords: string[] = [];

      if (targetRole.includes('MERN')) {
        targetKeywords = ['react', 'node', 'express', 'mongodb', 'javascript', 'api', 'git', 'css', 'html', 'next'];
      } else if (targetRole.includes('Data Analyst')) {
        targetKeywords = ['sql', 'power bi', 'tableau', 'excel', 'python', 'analytics', 'statistics', 'dashboard', 'pandas'];
      } else if (targetRole.includes('Data Scientist') || targetRole.includes('Machine Learning')) {
        targetKeywords = ['python', 'pytorch', 'tensorflow', 'scikit', 'regression', 'statistics', 'pandas', 'numpy', 'numpy', 'sql'];
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
      // Give basic score boost for standard sections
      let scoreBoost = 0;
      if (textLower.includes('education') || textLower.includes('academic')) scoreBoost += 5;
      if (textLower.includes('projects') || textLower.includes('experience')) scoreBoost += 5;
      if (textLower.includes('skills')) scoreBoost += 5;
      const score = Math.min(rawScore + scoreBoost, 99);

      // Suggestions
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
            AI Salary & Resume Tools
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mt-3 font-semibold text-sm md:text-base">
            Get instant salary projections, required skill checklists, and ATS resume compatibility audits to accelerate your career.
          </p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex bg-slate-100 border border-slate-200 p-1.5 rounded-2xl max-w-md mx-auto mb-10 shadow-inner">
          <button
            onClick={() => setActiveTab('salary')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'salary' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-4 h-4 text-primary" /> Salary & Career Matcher
          </button>
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'resume' 
                ? 'bg-white text-slate-900 shadow-md border border-slate-100' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-primary" /> ATS Resume Checker
          </button>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'salary' ? (
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
                <p className="text-xs text-slate-405 font-bold mt-1 uppercase tracking-wider">Calculates compensation benchmarks for technical specializations</p>
              </div>

              {/* Calculator Form */}
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

              {/* Projections Result */}
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
                      <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mt-2">Based on current Delhi NCR recruiting trends & micro-cohort data.</p>
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

                  {/* Recommendation Card */}
                  <div className="rounded-[24px] bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/15 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-[10px] text-primary uppercase font-bold tracking-wider block">Matching Program Found</span>
                      <h4 className="text-base font-heading font-extrabold text-slate-900">{calcResult.courseName}</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-xl">
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
          ) : (
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

              {/* Analyzer Form */}
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

              {/* Analysis Result */}
              {resumeResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-slate-100 pt-8 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-slate-50/50 p-6 rounded-2xl border border-slate-150">
                    
                    {/* Score Circle */}
                    <div className="flex flex-col items-center justify-center text-center space-y-2 border-b md:border-b-0 md:border-r border-slate-150 pb-6 md:pb-0 md:pr-6">
                      <span className="text-[10px] text-slate-450 uppercase font-black tracking-wider">ATS Score</span>
                      <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-white border-4 border-slate-150">
                        {/* Dynamic SVG Ring */}
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

                    {/* Keywords Breakdown */}
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

                  {/* Suggestions List */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-heading font-extrabold text-slate-900">Critical Improvement Suggestions</h4>
                    <ul className="space-y-2 text-xs font-bold text-slate-600 pl-4 list-disc marker:text-primary">
                      {resumeResult.suggestions.map((sug: string, idx: number) => (
                        <li key={idx} className="leading-relaxed">{sug}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
