"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CheckCircle2, ArrowRight } from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  host: string;
  seatsLeft: number;
  description: string;
}

const WORKSHOPS: Workshop[] = [
  {
    id: "ai-ws",
    title: "Generative AI & LLM Workshop",
    category: "AI & Machine Learning",
    date: "July 12, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Online (Zoom)",
    host: "Amit Roy (Senior Staff Dev, Google)",
    seatsLeft: 12,
    description: "Learn to build production-grade workflows using OpenAI APIs, LangChain orchestrations, and local models.",
  },
  {
    id: "hack",
    title: "KodeToCareer Hackathon 2026",
    category: "Full Stack Hackathon",
    date: "July 18-20, 2026",
    time: "48 Hours Continuous",
    location: "Noida Campus & Discord",
    host: "DevsUnite & Partner Sponsors",
    seatsLeft: 45,
    description: "Form teams, build functional SaaS products in 48 hours, and present to venture capitalists and recruiters.",
  },
  {
    id: "resume",
    title: "Resume Building & ATS Optimization",
    category: "Career Services",
    date: "July 22, 2026",
    time: "6:00 PM - 7:30 PM",
    location: "Online (Interactive Zoom)",
    host: "Priya Das (Director of HR, Stripe)",
    seatsLeft: 8,
    description: "A live resume surgery workshop. Learn to align keyword matchings to high-scoring ATS standards.",
  },
  {
    id: "bootcamp",
    title: "Mock Interview Bootcamp",
    category: "Placements support",
    date: "July 26, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Online & In-person",
    host: "Mock Panelists (ex-Microsoft)",
    seatsLeft: 15,
    description: "Practice white-board coding, algorithm analyses, and behavioral questions under real pressure.",
  },
];

export default function UpcomingWorkshops() {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const handleRegister = (id: string) => {
    if (registeredIds.includes(id)) return;
    setIsSubmitting(id);

    setTimeout(() => {
      setRegisteredIds((prev) => [...prev, id]);
      setIsSubmitting(null);
    }, 1200);
  };

  return (
    <section 
      className="py-24 bg-white relative overflow-hidden border-y border-slate-100" 
      aria-labelledby="upcoming-workshops-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-blue-50/40 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
            UPCOMING TECH EVENTS
          </p>
          <h2 
            id="upcoming-workshops-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Live Technical Workshops & Events
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">
            Accelerate your learning curve. Join our live events hosted by engineering leaders from top global companies.
          </p>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WORKSHOPS.map((ws) => {
            const isRegistered = registeredIds.includes(ws.id);
            const loading = isSubmitting === ws.id;

            return (
              <div
                key={ws.id}
                className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.015)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                      {ws.category}
                    </span>
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {ws.seatsLeft} Seats Remaining
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                    {ws.title}
                  </h3>

                  {/* Host */}
                  <p className="text-xs font-semibold text-slate-400 mt-2">
                    Hosted by <span className="text-slate-700">{ws.host}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-500 mt-3 font-medium leading-relaxed">
                    {ws.description}
                  </p>
                </div>

                {/* Event specs */}
                <div className="border-t border-slate-50 mt-6 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Date: <span className="text-slate-800">{ws.date}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>Time: <span className="text-slate-800">{ws.time}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Location: <span className="text-slate-800">{ws.location}</span></span>
                  </div>
                </div>

                {/* Register CTA Button */}
                <div className="border-t border-slate-50 mt-5 pt-4">
                  <button
                    disabled={isRegistered || loading}
                    onClick={() => handleRegister(ws.id)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      isRegistered
                        ? "bg-emerald-550/10 border border-emerald-200 text-emerald-600 shadow-none cursor-default"
                        : loading
                        ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-wait shadow-none"
                        : "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] cursor-pointer"
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Registered Successfully
                      </>
                    ) : loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> Securing Seat...
                      </>
                    ) : (
                      <>
                        Register For Free <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
