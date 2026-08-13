'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CheckCircle2, HelpCircle, ArrowRight, RotateCcw, 
  BookOpen, Award, Check, X 
} from 'lucide-react';
import Link from 'next/link';

interface CourseQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTIONS = [
  {
    id: 'background',
    title: 'What is your current background?',
    options: [
      { label: 'BCA / B.Tech / CS Student', category: 'all' },
      { label: 'Non-CS Graduate (B.Com/B.Sc/BA)', category: 'web' },
      { label: 'Working Professional (Seeking Switch)', category: 'ai' },
      { label: 'Complete Beginner / Fresher', category: 'web' }
    ]
  },
  {
    id: 'interest',
    title: 'Which tech domain excites you the most?',
    options: [
      { label: 'Building Web Apps & Platforms (MERN / React)', course: 'mern-stack-development', name: 'MERN Stack Development' },
      { label: 'AI, Machine Learning & Data Analytics', course: 'data-science-machine-learning', name: 'Data Science & AI' },
      { label: 'Python Automation & Backend Engineering', course: 'python-programming', name: 'Python Full Stack' },
      { label: 'Cloud Infrastructure, DevOps & Docker', course: 'cloud-devops', name: 'Cloud & DevOps' },
      { label: 'UI/UX Design & Product Experience', course: 'graphic-design-ui-ux', name: 'UI/UX Design' }
    ]
  },
  {
    id: 'goal',
    title: 'What is your primary career goal?',
    options: [
      { label: 'Land a high-paying job (6-12 LPA+)', goal: 'job' },
      { label: 'Secure a paid internship during college', goal: 'internship' },
      { label: 'Upskill for a promotion/role switch', goal: 'upskill' }
    ]
  }
];

export default function CourseQuizModal({ isOpen, onClose }: CourseQuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [recommendedCourse, setRecommendedCourse] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSelectOption = (questionId: string, option: any) => {
    const nextAnswers = { ...answers, [questionId]: option };
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate recommendation
      const selectedInterest = nextAnswers['interest'];
      setRecommendedCourse({
        courseSlug: selectedInterest?.course || 'mern-stack-development',
        name: selectedInterest?.name || 'MERN Stack Development Program',
        matchScore: '98%',
        perks: [
          '100% Live Interactive Cohorts',
          'Guaranteed Internship Opportunity',
          '1-on-1 Mentorship & Mock Interviews',
          'Dedicated Placement Support Across 500+ Hiring Partners'
        ]
      });
      setStep(QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setRecommendedCourse(null);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Career Quiz
          </div>
          <h2 className="text-xl font-heading font-black text-white">Which Program Fits You Best?</h2>
          <p className="text-xs text-slate-400">Answer 3 quick questions to discover your ideal tech career path.</p>
        </div>

        {/* Quiz Steps */}
        {step < QUESTIONS.length ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>Question {step + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(((step + 1) / QUESTIONS.length) * 100)}% Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300" 
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="text-sm font-bold text-slate-100">{QUESTIONS[step].title}</h3>

            <div className="space-y-2.5">
              {QUESTIONS[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(QUESTIONS[step].id, opt)}
                  className="w-full text-left p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-primary/50 text-xs text-slate-200 font-semibold transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Recommendation Result */
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                {recommendedCourse?.matchScore} Match Recommended
              </span>
              <h3 className="text-lg font-heading font-black text-white mt-1">
                {recommendedCourse?.name}
              </h3>
            </div>

            <ul className="text-xs text-slate-400 space-y-2 text-left bg-slate-900/60 p-4 rounded-xl border border-slate-800 font-medium">
              {recommendedCourse?.perks.map((perk: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <Link
                href={`/courses/${recommendedCourse?.courseSlug}`}
                onClick={onClose}
                className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
              >
                View Course Syllabus <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleReset}
                className="py-3 px-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
