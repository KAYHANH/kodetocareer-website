'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Send, MessageSquare, PhoneCall, 
  CheckCircle2, Clock, Calendar, Users, HelpCircle, 
  ExternalLink, Sparkles, AlertCircle 
} from 'lucide-react';

const COUNSELLORS = [
  { name: "Neha Sharma", role: "Senior Admissions Counsellor", exp: "5+ Yrs Exp", avatar: "NS" },
  { name: "David Miller", role: "Career Path Advisor", exp: "4+ Yrs Exp", avatar: "DM" }
];

const WORKING_HOURS = [
  { days: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
  { days: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { days: "Sunday", hours: "Closed" }
];

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "3:30 PM", "5:00 PM"];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', course: 'MERN Stack Development', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', phone: '', course: 'MERN Stack Development', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-24 relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] rounded-full bg-indigo-100/30 blur-[130px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10 space-y-20">

        {/* ── 1. Hero Header Section ── */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">
            <PhoneCall className="w-4 h-4 animate-bounce" />
            GET IN TOUCH
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-slate-900 leading-tight">
            Let's Build Your <br />
            <span className="gradient-text">Career Together</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-semibold leading-relaxed">
            Have questions about admissions, fees, placement references, or partnerships? Our counselor team is here to assist.
          </p>
        </section>

        {/* ── 2. Contact Details & Form Grid ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Left (Spans 5) */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-xl font-heading font-extrabold text-slate-900 border-b border-slate-200 pb-2">
              Contact Information
            </h2>

            {/* Quick Cards Stack */}
            <div className="space-y-4">
              <div className="flex gap-4 items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Email Address</span>
                  <a href="mailto:hello@kodetocareer.com" className="text-slate-800 hover:text-primary transition-colors text-xs font-bold mt-1 block">
                    hello@kodetocareer.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Call Admissions</span>
                  <a href="tel:+919876543210" className="text-slate-800 hover:text-secondary transition-colors text-xs font-bold mt-1 block font-mono">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">WhatsApp Support</span>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:text-emerald-600 transition-colors text-xs font-bold mt-1 block">
                    Chat with Counselor
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none">Campus Address</span>
                  <span className="text-slate-800 text-xs font-bold mt-1 block leading-relaxed">
                    123 Innovation Drive, Block C, Tech Park, Bangalore, India
                  </span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white border border-slate-150 p-5 rounded-[24px] shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Clock className="w-4 h-4 text-primary" /> Admissions Desk Hours
              </h4>
              <div className="space-y-2 text-xs font-semibold text-slate-700">
                {WORKING_HOURS.map((h, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-50 pb-1.5 last:border-0 last:pb-0">
                    <span className="text-slate-500">{h.days}</span>
                    <span className="font-mono text-slate-800">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meet Counselor cards */}
            <div className="bg-white border border-slate-150 p-5 rounded-[24px] shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Users className="w-4 h-4 text-secondary" /> Assigned Admissions Desk
              </h4>
              <div className="space-y-3">
                {COUNSELLORS.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-3 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-[10px]">
                      {c.avatar}
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 leading-none">{c.name}</h5>
                      <span className="text-[9px] text-slate-400 font-bold block mt-1">{c.role} • {c.exp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Calendar Form Right (Spans 7) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-150 rounded-[28px] p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              
              <h2 className="text-xl font-heading font-extrabold text-slate-900 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-primary" /> Book Counselling
              </h2>
              <p className="text-xs text-slate-500 mb-6 font-semibold">
                Submit the form below, select a preferred callback time slot, and our advisors will dial you back.
              </p>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
                  <h3 className="text-xl font-heading font-extrabold text-slate-900">Request Logged Successfully!</h3>
                  <p className="text-slate-500 text-xs max-w-sm mx-auto font-semibold leading-relaxed">
                    Thank you. We have scheduled your admissions audit callback for **{selectedDate}** at **{selectedTimeSlot}**. A coordinator will connect with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="block text-slate-500">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-slate-500">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-slate-500">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="course" className="block text-slate-500">Program Track Interests</label>
                      <select
                        id="course"
                        value={formState.course}
                        onChange={(e) => setFormState({ ...formState, course: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-primary/50 focus:bg-white"
                      >
                        <option value="MERN Stack Development">MERN Full Stack + AI</option>
                        <option value="Data Science & ML">Data Science & ML</option>
                        <option value="UI/UX Product Design">UI/UX Design Systems</option>
                        <option value="Data Analytics">Data Analytics & BI</option>
                        <option value="Cloud Computing & DevOps">Cloud & DevOps Architect</option>
                      </select>
                    </div>
                  </div>

                  {/* Calendar / Callback Scheduler Grid */}
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">
                      Select Preferred Consultation Slot
                    </span>
                    
                    {/* Dates */}
                    <div className="flex gap-2">
                      {["Today", "Tomorrow", "Next Monday"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`px-3.5 py-1.5 border rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                            selectedDate === d
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>

                    {/* Time slots */}
                    <div className="flex flex-wrap gap-2 pt-1.5">
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTimeSlot(t)}
                          className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold font-mono cursor-pointer transition-all ${
                            selectedTimeSlot === t
                              ? "bg-primary border-primary text-white"
                              : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 space-y-1.5 pt-2">
                    <label htmlFor="message" className="block text-slate-500">Brief Message / Background (Optional)</label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about your educational background or target job roles..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-[14px] shadow-lg shadow-primary/10 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    Confirm Callback Request <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
