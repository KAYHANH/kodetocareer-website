"use client";

import { useState } from "react";
import { MessageSquare, Phone, X, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingCta() {
  const [isOpen, setIsOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
        setEmailInput("");
      }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* ── Desktop/Tablet Floating Actions ── */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50 flex flex-col items-end gap-3.5 select-none pointer-events-none">
        
        {/* Expanding Counselling Dialog Form */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="w-[320px] rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl backdrop-blur-md pointer-events-auto"
            >
              {/* Dialog Header */}
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4.5 h-4.5 text-primary" />
                  <h4 className="text-sm font-extrabold text-slate-900 leading-none">Free Career Counselling</h4>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 rounded p-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close counselling modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {success ? (
                <div className="text-center py-5">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto mb-2" />
                  <h5 className="text-xs font-extrabold text-slate-950">Slot Booking Requested!</h5>
                  <p className="text-[10px] text-slate-500 mt-1 font-medium leading-relaxed">
                    Our coordinator will reach out to you on email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    Select a date and leave your email to reserve a free live consultation.
                  </p>
                  
                  <div>
                    <label htmlFor="float-date" className="sr-only">Preferred Date</label>
                    <input
                      id="float-date"
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full h-9 border border-slate-200 bg-slate-50 px-3 rounded-lg text-xs text-slate-700 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label htmlFor="float-email" className="sr-only">Email address</label>
                    <input
                      id="float-email"
                      type="email"
                      required
                      placeholder="Enter email to confirm"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full h-9 border border-slate-200 bg-slate-50 px-3 rounded-lg text-xs text-slate-700 outline-none focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-lg hover:opacity-95 transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {loading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Scheduling...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Buttons Bar */}
        <div className="flex flex-row items-center gap-3 pointer-events-auto">
          {/* Counselling Button (Blue Pill) */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="h-12 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Phone className="w-4 h-4 text-primary" /> Book Counselling
          </button>

          {/* WhatsApp Button (Green Circle) */}
          <a
            href="https://wa.me/919667975616"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Contact us on WhatsApp"
          >
            <MessageSquare className="w-5.5 h-5.5 fill-white text-emerald-500" />
          </a>
        </div>
      </div>

      {/* ── 2. Mobile Sticky Bottom CTA Bar (Only visible on screens < 768px) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-[8px] border-t border-slate-100 p-3.5 flex items-center gap-3.5 md:hidden shadow-[0_-8px_32px_rgba(0,0,0,0.06)] select-none">
        {/* Mobile Call Button */}
        <a
          href="tel:+919667975616"
          className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-650 hover:bg-slate-50 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Call KodeToCareer"
        >
          <Phone className="w-4.5 h-4.5" />
        </a>

        {/* Mobile WhatsApp Button */}
        <a
          href="https://wa.me/919667975616"
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageSquare className="w-4.5 h-4.5 fill-white text-emerald-500" />
        </a>

        {/* Mobile Enroll Primary Button */}
        <Link
          href="/courses"
          className="flex-1 h-11 bg-primary text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center hover:bg-blue-700 outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Start Your Career
        </Link>
      </div>
    </>
  );
}
