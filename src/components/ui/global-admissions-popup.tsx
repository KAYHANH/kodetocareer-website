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
  const [selectedCourse, setSelectedCourse] = useState('MERN Stack Development + AI Integration');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const COURSE_OPTIONS = [
    "MERN Stack Development + AI Integration",
    "Python Programming & Automation",
    "Data Science & Machine Learning Core",
    "Data Analytics & Business Intelligence",
    "Java Full Stack Developer Program",
    "Cloud Computing & DevOps Infrastructure",
    "Digital Marketing with AI & Growth Hacking",
    "Graphic Design + UI/UX Product Design",
    "Graphic Designing + Videography / Video Editing",
    "Industry-Ready MLOps & AI Systems Engineering"
  ];

  useEffect(() => {
    const handleOpenEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ courseTitle?: string }>;
      if (customEvent.detail?.courseTitle) {
        setSelectedCourse(customEvent.detail.courseTitle);
      }
      setSubmitted(false);
      setIsOpen(true);
    };

    window.addEventListener('open-admissions-popup', handleOpenEvent);
    return () => window.removeEventListener('open-admissions-popup', handleOpenEvent);
  }, []);

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
      // Trigger popup after 5 seconds (5000ms)
      console.log("GlobalAdmissionsPopup: Setting timer to display form in 5000ms");
      const timer = setTimeout(() => {
        console.log("GlobalAdmissionsPopup: Timer triggered, opening form...");
        setIsOpen(true);
      }, 5000);
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
    console.log("GlobalAdmissionsPopup: Submitting lead details...", { name, phone, qualification, status, year, selectedCourse });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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
          courseTitle: selectedCourse,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        console.log("GlobalAdmissionsPopup: Lead submitted successfully!");
      } else {
        console.warn("GlobalAdmissionsPopup: Server returned non-200 status:", res.status);
      }
    } catch (err) {
      console.error('Error submitting popup lead:', err);
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
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
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-[28px] shadow-2xl p-6 sm:p-7 z-20 text-slate-800 scrollbar-thin"
          >
            {/* Top right close button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer outline-none z-30 pointer-events-auto shadow-sm"
              aria-label="Close form"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
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
                  <span className="inline-flex items-center gap-1 bg-primary/10 border border-primary/20 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md text-blue-700">
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
                  {/* Select Course Dropdown */}
                  <div className="space-y-1">
                    <label htmlFor="global-popup-course-select" className="text-[10px] font-bold text-slate-700 uppercase block">
                      Select Preferred Course <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    <select
                      id="global-popup-course-select"
                      aria-label="Select Preferred Course"
                      required
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white font-semibold transition-all cursor-pointer"
                    >
                      {COURSE_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label htmlFor="global-popup-name-input" className="text-[10px] font-bold text-slate-700 uppercase block">
                      Full Name <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="global-popup-name-input"
                        aria-label="Full Name"
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
                    <label htmlFor="global-popup-phone-input" className="text-[10px] font-bold text-slate-700 uppercase block">
                      Phone Number <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="global-popup-phone-input"
                        aria-label="Phone Number"
                        type="tel"
                        required
                        maxLength={10}
                        pattern="[0-9]{10}"
                        placeholder="e.g. 9667975616"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white text-sm font-semibold transition-all"
                      />
                    </div>
                  </div>

                  {/* Class / Graduation */}
                  <div className="space-y-1">
                    <label htmlFor="global-popup-qualification-input" className="text-[10px] font-bold text-slate-500 uppercase block">
                      Class / Graduation degree <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="global-popup-qualification-input"
                        aria-label="Class or Graduation Degree"
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
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      Academic Status <span className="text-rose-500 font-extrabold">*</span>
                    </span>
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
                    <label htmlFor="global-popup-year-input" className="text-[10px] font-bold text-slate-500 uppercase block">
                      Graduation / Passing Year <span className="text-rose-500 font-extrabold">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="global-popup-year-input"
                        aria-label="Graduation or Passing Year"
                        type="text"
                        required
                        maxLength={4}
                        pattern="[0-9]{4}"
                        placeholder="e.g. 2026"
                        value={year}
                        onChange={(e) => setYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
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
