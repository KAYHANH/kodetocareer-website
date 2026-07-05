'use client';

import React from 'react';

const SECTIONS = [
  { id: 'agreement', title: '1. Agreement to Terms' },
  { id: 'eligibility', title: '2. Eligibility & Account' },
  { id: 'payment', title: '3. Registration & Payments' },
  { id: 'placement', title: '4. Placement Assistance' },
  { id: 'liability', title: '5. Limitation of Liability' },
  { id: 'changes', title: '6. Changes to Terms' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-transparent pt-12 pb-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="border-b border-slate-200/50 pb-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900">Terms of Service</h1>
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
            
            <section id="agreement" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                1. Agreement to Terms
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                By registering on or using the KodeToCareer website, tools, or dashboard, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>
            </section>

            <section id="eligibility" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                2. Eligibility & Account
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                You must be at least 16 years old to create an account. You are responsible for keeping your login credentials secure and for all activities that occur under your account.
              </p>
            </section>

            <section id="payment" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                3. Course Registration & Payments
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                Registration fees are payable in advance or via approved installment plans. Course credentials, materials, and learning resources are for personal, non-commercial use only. Unauthorized sharing of logins or curriculum materials will result in account termination without refund.
              </p>
            </section>

            <section id="placement" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                4. Placement Assistance Policy
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                While our placement cell works diligently to prepare you and schedule interviews with partner hiring entities, successful placement depends on student interview performance, assignment submission, project standards, and attendance requirements. Enrollment does not guarantee employment.
              </p>
            </section>

            <section id="liability" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                5. Limitation of Liability
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                KodeToCareer shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our platform or educational services.
              </p>
            </section>

            <section id="changes" className="space-y-4 scroll-mt-28">
              <h2 className="text-2xl font-heading font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                6. Changes to Terms
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                We reserve the right to modify these terms at any time. Changes will be posted here with an updated revision date. Continued usage constitutes acceptance of new terms.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
