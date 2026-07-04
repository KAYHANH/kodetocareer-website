"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SVG_ICONS } from "@/data/svgList";

export default function HiringPartners() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-24 bg-[#EFF6FF] border-y border-blue-100 overflow-hidden relative min-h-[600px]">
        <div className="max-w-[1440px] mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-6">
            Master 400+ Technologies
          </h2>
        </div>
      </section>
    );
  }

  // Split all 424+ icons into 5 rows
  const rowCount = 5;
  const itemsPerRow = Math.ceil(SVG_ICONS.length / rowCount);
  
  const rows = Array.from({ length: rowCount }, (_, rowIndex) => {
    const start = rowIndex * itemsPerRow;
    const end = start + itemsPerRow;
    const items = SVG_ICONS.slice(start, end);
    // Duplicate the row to ensure seamless infinite scroll
    return [...items, ...items];
  });

  // Speeds for each row (s slower makes it feel premium)
  const rowSpeeds = [80, 100, 90, 110, 95];
  const rowDirections = ["left", "right", "left", "right", "left"];

  return (
    <section className="py-24 bg-[#EFF6FF] border-y border-blue-100 overflow-hidden relative" aria-label="Hiring Partners & Technologies">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
      
      {/* Decorative blurred background */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-300/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-300/10 blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 text-center relative z-10 mb-16">

        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4">
          Master 400+ Technologies & Tools
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base font-medium">
          Our comprehensive curriculum covers the entire modern development ecosystem. Learn, build, and deploy with the tools used by world-class engineering teams.
        </p>
      </div>

      {/* Mask overlays for fade-out edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#EFF6FF] via-[#EFF6FF]/70 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#EFF6FF] via-[#EFF6FF]/70 to-transparent z-20 pointer-events-none" />

      {/* Marquee Rows Container */}
      <div className="flex flex-col gap-6 w-full relative z-10 overflow-visible">
        {rows.map((rowItems, rowIndex) => {
          const speed = rowSpeeds[rowIndex];
          const direction = rowDirections[rowIndex];
          const animName = `marquee-${rowIndex}`;

          return (
            <div 
              key={rowIndex} 
              className="flex overflow-hidden select-none w-full relative"
            >
              {/* Dynamic keyframe generation */}
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes ${animName} {
                  0% { transform: translateX(${direction === "left" ? "0%" : "-50%"}); }
                  100% { transform: translateX(${direction === "left" ? "-50%" : "0%"}); }
                }
                .${animName}-class {
                  animation: ${animName} ${speed}s linear infinite;
                }
              `}} />

              <div className={`flex gap-6 py-2 whitespace-nowrap min-w-full items-center ${animName}-class`}>
                {rowItems.map((filename, idx) => {
                  const displayName = filename.replace(".svg", "").replace(/-/g, " ");
                  return (
                    <div
                      key={`${filename}-${idx}`}
                      className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-white border border-blue-50/80 shadow-[0_4px_12px_rgba(37,99,235,0.02)] hover:shadow-[0_8px_20px_rgba(37,99,235,0.06)] hover:border-primary/20 hover:scale-105 hover:z-30 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="w-5.5 h-5.5 flex items-center justify-center flex-shrink-0 relative">
                        <Image
                          src={`/svg/${filename}`}
                          width={22}
                          height={22}
                          alt={displayName}
                          className="object-contain w-full h-full transition-transform duration-300 group-hover:rotate-6"
                          unoptimized
                        />
                      </span>
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-primary transition-colors">
                        {displayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
