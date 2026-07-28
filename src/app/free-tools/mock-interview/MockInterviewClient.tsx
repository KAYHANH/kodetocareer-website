'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, RefreshCw, Award, CheckCircle, HelpCircle, ArrowRight, Play, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  category: string;
  sampleAnswerHint: string;
}

export default function MockInterviewClient() {
  const [targetRole, setTargetRole] = useState('fullstack-mern');
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<{ id: number; score: number; feedback: string; question: string }[]>([]);
  const [completed, setCompleted] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    setScores([]);
    setCompleted(false);
    setCurrentQIndex(1);

    try {
      const res = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'start', targetRole }),
      });

      const data = await res.json();
      setCurrentQuestion(data.firstQuestion);
      setSessionActive(true);
    } catch (err) {
      console.error('Failed to start interview:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim() || loading || !currentQuestion) return;

    setLoading(true);

    try {
      const res = await fetch('/api/ai/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          targetRole,
          questionId: currentQuestion.id,
          userResponse: userAnswer,
        }),
      });

      const data = await res.json();

      setScores((prev) => [
        ...prev,
        {
          id: currentQuestion.id,
          score: data.score,
          feedback: data.feedback,
          question: currentQuestion.question,
        },
      ]);

      setUserAnswer('');

      if (data.isCompleted || !data.nextQuestion) {
        setCompleted(true);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setCurrentQIndex((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Failed to evaluate answer:', err);
    } finally {
      setLoading(false);
    }
  };

  const avgScore = scores.length
    ? Math.round(scores.reduce((acc, curr) => acc + curr.score, 0) / scores.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#050816] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Mic className="w-4 h-4 text-cyan-400" />
            AI Technical Interview Simulator
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Practice Real <span className="gradient-text">Tech Interviews</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Simulate 5-question technical rounds with instant AI evaluation, answer scoring, and feedback.
          </p>
        </div>

        {/* State 1: Role Selection & Start Screen */}
        {!sessionActive && (
          <div className="glass rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Select Your Desired Technical Role:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setTargetRole('fullstack-mern')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    targetRole === 'fullstack-mern'
                      ? 'bg-blue-600/20 border-blue-500 text-cyan-300 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-white font-heading">Full Stack MERN Developer</div>
                  <div className="text-xs text-slate-400 mt-1">React 19, Node.js, Express, MongoDB & Microservices</div>
                </button>

                <button
                  onClick={() => setTargetRole('data-science')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    targetRole === 'data-science'
                      ? 'bg-blue-600/20 border-blue-500 text-cyan-300 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm text-white font-heading">Data Science & AI Engineer</div>
                  <div className="text-xs text-slate-400 mt-1">Python, Pandas, ML, Deep Learning & LLMs</div>
                </button>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={startInterview}
                disabled={loading}
                className="px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-base hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Preparing Questions...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 text-cyan-300 fill-cyan-300" />
                    <span>Start Mock Interview</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* State 2: Active Interview Round */}
        {sessionActive && !completed && currentQuestion && (
          <div className="glass rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-mono font-bold">
                  Question {currentQIndex} of 5
                </span>
                <span className="text-xs text-slate-400 font-semibold">{currentQuestion.category}</span>
              </div>
              <button
                onClick={() => setSessionActive(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Quit Session
              </button>
            </div>

            {/* Question Text */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed font-heading">
                "{currentQuestion.question}"
              </p>
            </div>

            {/* User Response Area */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Your Technical Answer:
              </label>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Explain your approach, key technical terms, trade-offs, and examples..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors leading-relaxed font-body"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                onClick={submitAnswer}
                disabled={loading || !userAnswer.trim()}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm disabled:opacity-40 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Response...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit & Next Question</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* State 3: Completed Scorecard */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-6 sm:p-10 border border-emerald-500/30 shadow-2xl space-y-8 bg-slate-900/90"
          >
            <div className="text-center space-y-3">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto animate-bounce" />
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                Interview Completed!
              </h2>
              <p className="text-slate-400 text-sm">
                Here is your detailed performance analysis for {targetRole === 'fullstack-mern' ? 'Full Stack MERN' : 'Data Science & AI'}.
              </p>
            </div>

            {/* Score Banner */}
            <div className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/30 text-center">
              <div>
                <div className="text-4xl font-extrabold text-cyan-300 font-heading">{avgScore} / 100</div>
                <div className="text-xs text-slate-400 mt-1 font-semibold">Overall Readiness Score</div>
              </div>
            </div>

            {/* Individual Breakdown */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Question Breakdown:
              </h3>
              {scores.map((s, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-200">
                    <span>Q{idx + 1}: {s.question}</span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-cyan-300 font-mono text-xs">
                      {s.score} / 100
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{s.feedback}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={startInterview}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs transition-all"
              >
                Retake Interview
              </button>
              <Link
                href="/courses"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all text-center"
              >
                Enroll in 100% Placement Program
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
