"use client";

import { useEffect, useState } from "react";
import { Activity, Users } from "lucide-react";

export default function LiveCounter() {
  const [studentsOnline, setStudentsOnline] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate live drift of online students
      setStudentsOnline((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-slate-900 border-y border-slate-950 py-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-6 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        
        {/* Live indicator title */}
        <div className="flex items-center gap-3">
          <span className="relative flex h-3.5 w-3.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
          </span>
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block leading-none">Live Metrics</span>
            <h3 className="text-sm font-heading font-extrabold text-white mt-1 flex items-center gap-1.5 leading-none">
              Academy Live Activity <Activity className="w-3.5 h-3.5 text-slate-400" />
            </h3>
          </div>
        </div>

        {/* Counter Pill */}
        <div className="flex sm:justify-end">
          <div className="bg-slate-800/50 border border-slate-800 rounded-2xl px-5 py-2.5 flex items-center gap-3 shadow-md">
            <Users className="w-4.5 h-4.5 text-primary shrink-0" />
            <div>
              <span className="text-[8px] font-bold text-slate-400 uppercase block leading-none">Online Students</span>
              <span className="text-sm font-extrabold text-white mt-1.5 block leading-none font-mono">
                {studentsOnline} Live
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
