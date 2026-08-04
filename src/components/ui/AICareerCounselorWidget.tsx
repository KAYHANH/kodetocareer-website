'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, Send, X, ChevronRight, User, RotateCcw, Compass, DollarSign, GraduationCap, Zap } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: { title: string; slug: string; fee: string; duration: string }[];
}

export function AICareerCounselorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hi! I am your **AI Senior Career Counselor** at KodeToCareer.\n\nAsk me anything about tech career roadmaps, salaries, or which course fits your goals!',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: `user-${performance.now()}`,
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${performance.now()}`,
        role: 'assistant',
        content: data.reply || 'Thank you for reaching out! Let me know if you would like specific course details.',
        recommendations: data.recommendations,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Counselor send error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I am having trouble connecting right now. Please call our team directly at +91 96679 75616!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { text: 'Which course is best for me?', icon: Compass },
    { text: 'What is MERN stack salary in India?', icon: DollarSign },
    { text: 'I am a 3rd year student. Guide me!', icon: GraduationCap },
    { text: 'How does 100% placement work?', icon: Zap },
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3" suppressHydrationWarning>
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/40 shadow-xl text-xs font-bold text-cyan-300 pointer-events-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>AI Career Counselor</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-blue-500/40 border border-blue-400/30 focus:outline-none cursor-pointer"
          aria-label="Toggle AI Career Counselor"
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Bot className="w-7 h-7 text-white" />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-slate-950"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Expanded Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 md:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[78vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl shadow-black/80 overflow-hidden text-slate-100"
          >
            {/* High-Contrast Gradient Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/15 border border-white/20 text-white shadow-inner">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide font-heading">
                    AI Career Counselor
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      ONLINE
                    </span>
                  </h3>
                  <p className="text-[11px] text-blue-100 font-medium">Instant tech roadmaps & course advice</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: 'reset',
                        role: 'assistant',
                        content: 'Chat reset! How else can I assist your career goals?',
                      },
                    ])
                  }
                  title="Reset Chat"
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer outline-none"
                  aria-label="Close counselor chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs leading-relaxed bg-slate-950">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none font-medium shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-line font-body leading-relaxed">{msg.content}</div>

                    {/* Course Recommendation Cards */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2 pt-2.5 border-t border-slate-800">
                        <p className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-cyan-400" /> Recommended Programs
                        </p>
                        {msg.recommendations.map((rec) => (
                          <Link
                            key={rec.slug}
                            href={`/courses/${rec.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all group"
                          >
                            <div>
                              <div className="font-bold text-white group-hover:text-cyan-300 transition-colors text-xs">
                                {rec.title}
                              </div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="text-blue-300">⏱️ {rec.duration}</span>
                                <span className="text-emerald-400 font-mono">💳 {rec.fee}</span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 border border-indigo-400 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    <span className="text-xs text-slate-400 font-medium">Counselor is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length < 3 && (
              <div className="px-3.5 py-2.5 border-t border-slate-800 bg-slate-900 shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, i) => {
                    const IconComp = prompt.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt.text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-xl bg-slate-950 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/50 text-slate-200 hover:text-cyan-300 transition-all text-left"
                      >
                        <IconComp className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{prompt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about roadmaps, fees, placements..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AICareerCounselorWidget;
