'use client';

import React from 'react';

const SECTIONS = [
  { id: 'collect', title: '1. Information We Collect' },
  { id: 'use', title: '2. How We Use Information' },
  { id: 'sharing', title: '3. Data Sharing' },
  { id: 'cookies', title: '4. Cookies & Tracking' },
  { id: 'security', title: '5. Data Security' },
  { id: 'contact', title: '6. Contact Us' },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="border-b border-slate-200/50 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900">Privacy Policy</h1>
          <p className="text-slate-500 text-sm font-semibold mt-2">Last updated: July 1, 2026</p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Sticky Table of Contents (3 cols) */}
          <aside className="lg:col-span-3 sticky top-28 hidden lg:block">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-4">Table of Contents</h2>
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm font-bold text-slate-500 hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary/50 pl-4"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Column - Policy Text (9 cols) */}
          <div className="lg:col-span-9 p-8 md:p-10 rounded-[28px] border border-slate-200/50 bg-white/70 backdrop-blur-md shadow-sm space-y-10 border-glow-animate-light">
            
            <section id="collect" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                1. Information We Collect
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We collect personal information that you voluntarily provide to us when registering for our courses, utilizing the AI Career Assistant, subscribing to newsletters, or contacting us. This includes your name, email, phone number, education credentials, resume details, and billing information.
              </p>
            </section>

            <section id="use" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We use the collected data to provide and maintain our services, customize your learning roadmap, analyze your resume skills, facilitate placements with corporate partners, process payments, and communicate course updates.
              </p>
            </section>

            <section id="sharing" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                3. Data Sharing & Third Parties
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We do not sell your personal data. We may share information with recruitment partners and corporate hiring entities solely to facilitate student placements and internships, or with service vendors (e.g., payment processors, hosting services) under strict confidentiality agreements.
              </p>
            </section>

            <section id="cookies" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                4. Cookies and Tracking
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We use cookies to analyze web traffic, remember login preferences, and personalize advertisements. You can configure your browser to reject cookies, though some features of the dashboard may not function correctly.
              </p>
            </section>

            <section id="security" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                5. Security
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We implement industry-standard encryption, firewalls, and access controls to secure your data. However, no electronic storage or transmission method is 100% secure.
              </p>
            </section>

            <section id="contact" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                6. Contact Us
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                If you have any questions or concerns regarding this policy, email us at{' '}
                <a href="mailto:info@kodetocareer.com" className="text-primary font-bold hover:underline">
                  info@kodetocareer.com
                </a>.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
