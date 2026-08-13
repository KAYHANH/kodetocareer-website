'use client';

import { useState } from 'react';
import { Download, Sparkles, CheckCircle, X, FileText } from 'lucide-react';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle?: string;
}

export default function LeadMagnetModal({ isOpen, onClose, resourceTitle = '2026 Tech Career & Interview Roadmap PDF' }: LeadMagnetModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Please fill in all fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          course: resourceTitle,
          notes: `Lead Magnet Download: ${resourceTitle}`
        })
      });

      const data = await res.json();
      if (data.success || res.ok) {
        setDownloaded(true);
      } else {
        setError(data.error || 'Failed to request download.');
      }
    } catch (err: any) {
      setError(err.message || 'Error submitting request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            <Download className="w-3.5 h-3.5" /> Free Resource Access
          </div>
          <h2 className="text-xl font-heading font-black text-white">Download Free Guide</h2>
          <p className="text-xs text-slate-400">{resourceTitle}</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-bold">
            {error}
          </div>
        )}

        {downloaded ? (
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-900/50 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Download Sent!</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                We have emailed your download link to <strong>{email}</strong>. Our mentors will also share the complete syllabus bundle.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Amit Sharma"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Phone / WhatsApp Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <Download className="w-4 h-4" />
              {submitting ? 'Preparing Download...' : 'Download PDF Instantly'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
