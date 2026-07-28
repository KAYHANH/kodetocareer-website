'use client';

import { motion } from 'framer-motion';
import { Star, Building2, UserCheck, ShieldCheck, MapPin, GraduationCap } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Star, label: 'Google Rated', color: 'text-amber-500', href: 'https://share.google/jiy4gpopf2ha66NCh' },
  { icon: Building2, label: 'Registered Company', color: 'text-blue-600' },
  { icon: UserCheck, label: 'Industry Trainers', color: 'text-emerald-500' },
  { icon: ShieldCheck, label: 'Verifiable Certificates', color: 'text-indigo-500' },
  { icon: MapPin, label: 'Noida Campus', color: 'text-rose-500' },
  { icon: GraduationCap, label: '10 Career Programs', color: 'text-primary' },
];

export default function TrustStrip() {
  return (
    <section className="py-8 bg-white border-y border-slate-100" aria-label="Trust indicators">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <Icon className={`w-4.5 h-4.5 ${item.color}`} />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {item.label}
                </span>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-100 hover:bg-slate-100/50 hover:border-slate-200 transition-all cursor-pointer"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-100"
              >
                {content}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
