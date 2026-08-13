"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export interface HiringPartnerItem {
  name: string;
  logo: string;
  category: string;
}

export const VERIFIED_HIRING_PARTNERS: HiringPartnerItem[] = [
  { name: "Google", logo: "/svg/Google.svg", category: "Tier-1 Tech" },
  { name: "AWS Cloud", logo: "/svg/AWS.svg", category: "Cloud Infrastructure" },
  { name: "Apple", logo: "/svg/Apple.svg", category: "Hardware & Ecosystem" },
  { name: "Meta", logo: "/svg/Facebook.svg", category: "Social & AI Research" },
  { name: "Salesforce", logo: "/svg/Salesforce.svg", category: "Enterprise SaaS" },
  { name: "Oracle", logo: "/svg/Oracle.svg", category: "Database & Cloud" },
  { name: "Microsoft Azure", logo: "/svg/Azure.svg", category: "Cloud & DevOps" },
  { name: "GitHub", logo: "/svg/GitHub.svg", category: "Developer Platform" },
  { name: "React", logo: "/svg/React.svg", category: "Frontend Framework" },
  { name: "Next.js", logo: "/svg/NextJS.svg", category: "Full Stack Framework" },
  { name: "Node.js", logo: "/svg/NodeJS.svg", category: "Backend Runtime" },
  { name: "Python", logo: "/svg/Python.svg", category: "AI & Data Science" },
  { name: "Java", logo: "/svg/Java.svg", category: "Enterprise Systems" },
  { name: "Docker", logo: "/svg/Docker.svg", category: "Containerization" },
  { name: "Kubernetes", logo: "/svg/Kubernetes.svg", category: "Cloud Orchestration" },
  { name: "PostgreSQL", logo: "/svg/PostgresSQL.svg", category: "Relational Database" },
  { name: "MongoDB", logo: "/svg/MongoDB.svg", category: "NoSQL Database" },
  { name: "Redis", logo: "/svg/Redis.svg", category: "In-Memory Store" },
  { name: "TypeScript", logo: "/svg/TypeScript.svg", category: "Type-Safe JS" },
  { name: "Tailwind CSS", logo: "/svg/Tailwind-CSS.svg", category: "UI System" },
];

export default function Marquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const row1 = VERIFIED_HIRING_PARTNERS.slice(0, 10);
  const row2 = VERIFIED_HIRING_PARTNERS.slice(10, 20);

  if (!mounted) {
    return (
      <section className="py-16 bg-[#EFF6FF] border-y border-blue-100/80 overflow-hidden relative min-h-[360px]" aria-label="Hiring Partners Marquee">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
            Our Graduates Work At Top Tech Companies
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#EFF6FF] border-y border-blue-100/80 overflow-hidden relative" aria-label="Hiring Partners & Top Tech Marquee">
      {/* Decorative Grid & Soft Ambient Orbs */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-blue-300/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-300/10 blur-[80px] pointer-events-none" />

      {/* Header Content */}
      <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10 mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider mb-3">
          <Building2 className="w-3.5 h-3.5" />
          500+ Hiring Partners & Ecosystems
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">
          Hired by Industry Leaders & High-Growth Startups
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
          Our alumni build production software at tier-1 IT enterprises, global product companies, and fast-scaled tech unicorns.
        </p>
      </div>

      {/* Edge Gradient Mask Overlays */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-44 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-44 bg-gradient-to-l from-[#EFF6FF] via-[#EFF6FF]/90 to-transparent z-20 pointer-events-none" />

      {/* Marquee Rows */}
      <div className="flex flex-col gap-4 w-full relative z-10 overflow-hidden">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee-left-smooth {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-right-smooth {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .marquee-left-track-smooth {
            animation: marquee-left-smooth 38s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .marquee-right-track-smooth {
            animation: marquee-right-smooth 42s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .marquee-row-wrap:hover .marquee-left-track-smooth,
          .marquee-row-wrap:hover .marquee-right-track-smooth {
            animation-play-state: paused;
          }
        `}} />

        {/* Row 1: Leftward Scroll */}
        <div className="overflow-hidden select-none w-full relative marquee-row-wrap">
          <div className="flex gap-4 md:gap-5 py-1 whitespace-nowrap min-w-full items-center marquee-left-track-smooth">
            {[...row1, ...row1].map((partner, idx) => (
              <div
                key={`r1-${partner.name}-${idx}`}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-blue-100/90 shadow-sm hover:border-primary/40 hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer group shrink-0"
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0 relative">
                  <Image
                    src={partner.logo}
                    width={24}
                    height={24}
                    alt={`${partner.name} logo`}
                    className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                  />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">
                    {partner.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Scroll */}
        <div className="overflow-hidden select-none w-full relative marquee-row-wrap">
          <div className="flex gap-4 md:gap-5 py-1 whitespace-nowrap min-w-full items-center marquee-right-track-smooth">
            {[...row2, ...row2].map((partner, idx) => (
              <div
                key={`r2-${partner.name}-${idx}`}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-blue-100/90 shadow-sm hover:border-primary/40 hover:shadow-md hover:scale-[1.03] transition-all duration-200 cursor-pointer group shrink-0"
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0 relative">
                  <Image
                    src={partner.logo}
                    width={24}
                    height={24}
                    alt={`${partner.name} logo`}
                    className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-110"
                    loading="lazy"
                  />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">
                    {partner.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directory CTA Link */}
      <div className="mt-8 text-center relative z-10">
        <Link
          href="/placements"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-primary hover:border-primary/40 shadow-sm transition-all cursor-pointer"
        >
          View Full Placement Records & Verified Alumni Profiles
          <ArrowRight className="w-4 h-4 text-primary" />
        </Link>
      </div>
    </section>
  );
}
