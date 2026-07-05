'use client';

import React from 'react';

const SECTIONS = [
  { id: 'definition', title: '1. What Are Cookies' },
  { id: 'usage', title: '2. How We Use Cookies' },
  { id: 'thirdparty', title: '3. Third Party Cookies' },
  { id: 'management', title: '4. Managing Cookies' },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="border-b border-slate-200/50 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900">Cookie Policy</h1>
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
            
            <section id="definition" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                1. What Are Cookies
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                Cookies are small text files stored on your computer or mobile device when you visit website pages. They help website servers recall your authentication states, preferred settings, and browsing behavior to make your experience smoother.
              </p>
            </section>

            <section id="usage" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                2. How We Use Cookies
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We use essential cookies to maintain student login states and dashboard preferences. We also use analytics cookies (e.g., Google Analytics) to study user metrics, session durations, page performance, and optimize our learning resources.
              </p>
            </section>

            <section id="thirdparty" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                3. Third Party Cookies
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                Some pages may feature third-party pixels or widgets (like YouTube videos or payment processing scripts) which load their own cookies. We do not control these cookies and recommend checking the respective third-party privacy statements.
              </p>
            </section>

            <section id="management" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                4. Managing Cookies
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                You can adjust your browser settings to warn you about cookies or block them entirely. However, blocking essential cookies will prevent you from logging into the student or admin dashboard.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
