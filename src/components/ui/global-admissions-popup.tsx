'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Phone, User, GraduationCap, Calendar, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function GlobalAdmissionsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [status, setStatus] = useState('Pursuing');
  const [year, setYear] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log("GlobalAdmissionsPopup: Component mounted on path:", pathname);
    let isSubmitted = false;
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        isSubmitted = !!sessionStorage.getItem('global_popup_submitted');
        console.log("GlobalAdmissionsPopup: sessionStorage check 'isSubmitted' =", isSubmitted);
      }
    } catch (e) {
      console.warn("GlobalAdmissionsPopup: sessionStorage is blocked or unavailable:", e);
    }

    if (!isSubmitted) {
      // Trigger popup after 1.5 seconds for faster testing and display
      console.log("GlobalAdmissionsPopup: Setting timer to display form in 1500ms");
      const timer = setTimeout(() => {
        console.log("GlobalAdmissionsPopup: Timer triggered, opening form...");
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    console.log("GlobalAdmissionsPopup: User clicked close button");
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !qualification || !year) return;

    setSubmitting(true);
    console.log("GlobalAdmissionsPopup: Submitting lead details...", { name, phone, qualification, status, year });
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
          courseTitle: `Global Popup Form (Page: ${pathname})`,
        }),
      });

      if (res.ok) {
        console.log("GlobalAdmissionsPopup: Lead submitted successfully!");
        setSubmitted(true);
        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            sessionStorage.setItem('global_popup_submitted', 'true');
          }
        } catch (storageErr) {
          console.warn("GlobalAdmissionsPopup: Could not write to sessionStorage:", storageErr);
        }
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        console.error("GlobalAdmissionsPopup: Server returned error status:", res.status);
      }
    } catch (err) {
      console.error('Error submitting popup lead:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white border border-slate-200 rounded-[28px] shadow-2xl p-7 z-10 overflow-hidden text-slate-800"
          >
            {/* Top right close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-150 flex items-center justify-center text-slate-450 hover:text-slate-700 transition-colors cursor-pointer outline-none"
              aria-label="Close form"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">Registration Complete!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto font-semibold">
                  Thank you for submitting your details. Our academic counselors will get in touch with you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-1.5 pr-6">
                  <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md text-primary">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" /> FREE COUNSELLING & ROADMAP
                  </span>
                  <h3 className="text-xl font-heading font-black text-slate-900 leading-tight">
                    Start Your Tech Journey
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                    Leave your academic details below to get a free placement roadmap and live consultation with industry mentors.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9667975616"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Class / Graduation */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Class / Graduation degree</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. B.Tech / BCA / MCA / 12th"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Status Selection (Pursuing / Completed) */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Academic Status</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setStatus('Pursuing')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          status === 'Pursuing'
                            ? 'bg-primary/5 border-primary text-primary'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        Pursuing
                      </button>
                      <button
                        type="button"
                        onClick={() => setStatus('Completed')}
                        className={`py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          status === 'Completed'
                            ? 'bg-primary/5 border-primary text-primary'
                            : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>

                  {/* Graduation Year */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Graduation / Passing Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 2026"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold text-sm rounded-xl mt-4 cursor-pointer outline-none shadow-lg shadow-primary/10 transition-all flex items-center justify-center gap-1.5"
                  >
                    {submitting ? 'Submitting details...' : 'Claim Free Counselling'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
