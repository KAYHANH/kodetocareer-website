"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

// Top 18 recognizable industry ecosystems for homepage (reduces 848 DOM nodes to 36 for 60fps mobile speed)
const FEATURED_TECH = [
  { filename: "React.svg", name: "React" },
  { filename: "NextJS.svg", name: "Next.js" },
  { filename: "NodeJS.svg", name: "Node.js" },
  { filename: "Python.svg", name: "Python" },
  { filename: "Java.svg", name: "Java" },
  { filename: "AWS.svg", name: "AWS Cloud" },
  { filename: "Docker.svg", name: "Docker" },
  { filename: "PostgresSQL.svg", name: "PostgreSQL" },
  { filename: "MongoDB.svg", name: "MongoDB" },
  { filename: "TensorFlow.svg", name: "TensorFlow" },
  { filename: "Tailwind-CSS.svg", name: "Tailwind CSS" },
  { filename: "TypeScript.svg", name: "TypeScript" },
  { filename: "Git.svg", name: "Git" },
  { filename: "MySQL.svg", name: "MySQL" },
  { filename: "GraphQL.svg", name: "GraphQL" },
  { filename: "PyTorch.svg", name: "PyTorch" },
  { filename: "Kubernetes.svg", name: "Kubernetes" },
  { filename: "Figma.svg", name: "Figma" },
];

export default function HiringPartners() {
  // Split into 2 rows of 9 items each
  const row1 = FEATURED_TECH.slice(0, 9);
  const row2 = FEATURED_TECH.slice(9, 18);

  return (
    <section className="py-20 bg-[#EFF6FF] border-y border-blue-100 overflow-hidden relative" aria-label="Hiring Partners & Core Tech Stacks">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      
      {/* Decorative blurred background */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-300/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-300/10 blur-[90px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10 mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Industry Core Ecosystems
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight">
          Master Industry-Standard Tech Stacks
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base font-medium leading-relaxed">
          Learn, build, and deploy production projects using the exact toolchains used by tier-1 engineering teams and high-growth tech startups.
        </p>
      </div>

      {/* Mask overlays for fade-out edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#EFF6FF] via-[#EFF6FF]/80 to-transparent z-20 pointer-events-none" />

      {/* Hardware-Accelerated Marquee Rows Container */}
      <div className="flex flex-col gap-5 w-full relative z-10 overflow-hidden">
        {/* Inline CSS Keyframe definitions for GPU hardware acceleration */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee-left-gpu {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          @keyframes marquee-right-gpu {
            0% { transform: translate3d(-50%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
          .marquee-left-track {
            animation: marquee-left-gpu 35s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .marquee-right-track {
            animation: marquee-right-gpu 40s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .marquee-container:hover .marquee-left-track,
          .marquee-container:hover .marquee-right-track {
            animation-play-state: paused;
          }
        `}} />

        {/* Row 1: Moving Left */}
        <div className="overflow-hidden select-none w-full relative marquee-container">
          <div className="flex gap-4 md:gap-6 py-1 whitespace-nowrap min-w-full items-center marquee-left-track">
            {[...row1, ...row1].map((item, idx) => (
              <div
                key={`r1-${item.filename}-${idx}`}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-blue-100/80 shadow-sm hover:border-primary/30 hover:scale-105 transition-all duration-200 cursor-pointer group shrink-0"
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0 relative">
                  <Image
                    src={`/svg/${item.filename}`}
                    width={24}
                    height={24}
                    alt={item.name}
                    unoptimized
                    className="object-contain w-full h-full transition-transform duration-200 group-hover:rotate-6"
                    loading="lazy"
                  />
                </span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving Right */}
        <div className="overflow-hidden select-none w-full relative marquee-container">
          <div className="flex gap-4 md:gap-6 py-1 whitespace-nowrap min-w-full items-center marquee-right-track">
            {[...row2, ...row2].map((item, idx) => (
              <div
                key={`r2-${item.filename}-${idx}`}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-blue-100/80 shadow-sm hover:border-primary/30 hover:scale-105 transition-all duration-200 cursor-pointer group shrink-0"
              >
                <span className="w-6 h-6 flex items-center justify-center shrink-0 relative">
                  <Image
                    src={`/svg/${item.filename}`}
                    width={24}
                    height={24}
                    alt={item.name}
                    unoptimized
                    className="object-contain w-full h-full transition-transform duration-200 group-hover:rotate-6"
                    loading="lazy"
                  />
                </span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Directory Link CTA */}
      <div className="mt-10 text-center relative z-10">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:text-primary hover:border-primary/40 shadow-sm transition-all cursor-pointer"
        >
          Explore All Course Curriculum & Tech Directories
          <ArrowRight className="w-4 h-4 text-primary" />
        </Link>
      </div>
    </section>
  );
}
