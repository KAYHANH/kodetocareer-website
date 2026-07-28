"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Founder() {
  return (
    <section 
      className="py-24 bg-white relative overflow-hidden border-y border-slate-100" 
      aria-labelledby="founder-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-50/20 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Founder Visual Frame (Left Column) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] aspect-[4/5] rounded-[32px] bg-gradient-to-br from-primary via-indigo-600 to-secondary p-1 shadow-2xl flex items-center justify-center group"
            >
              {/* Founder Photo Image */}
              <div className="w-full h-full rounded-[30px] overflow-hidden relative border border-white/10 shadow-inner">
                <Image
                  src="/founder-arbaaz-official.png"
                  fill
                  alt="Md Arbaaz - Founder & Director"
                  className="object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, 340px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="text-white font-extrabold text-xl leading-none drop-shadow-sm">Md Arbaaz</h3>
                  <p className="text-xs font-semibold text-slate-200 mt-1.5 leading-tight drop-shadow-sm">Founder & Director</p>
                  <p className="text-[10px] text-slate-300 font-bold mt-0.5 leading-tight drop-shadow-sm">Software Engineer & Tech Educator</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founder Bio / Details (Right Column) */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Founder&apos;s Vision & Leadership
              </div>

              <h2 
                id="founder-heading"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight tracking-tight mb-6"
              >
                &ldquo;Engineering education must evolve beyond textbook syntax.&rdquo;
              </h2>
            </motion.div>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                As a Software Engineer and Tech Educator, I saw first-hand how legacy college curriculums failed to match the rapid advancements of commercial engineering stacks. Students were graduating with degrees, yet had zero knowledge of Docker pipelines, Next.js hydration, or LLM integrations.
              </p>
              <p>
                We established <strong className="text-slate-800 font-extrabold">KodeToCareer</strong> to provide a rigorous, production-grade academy. We train talent using real codebase pull requests, collaborative project sprints, and AI-driven career alignments.
              </p>
            </div>

            {/* Mission & Vision Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 border-t border-slate-100 pt-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Our Mission</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  To train 10,000+ developers in Next.js, Cloud architectures, and AI integrations, turning beginners into highly-compensated tech talent.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Our Vision</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  To replace legacy training paradigms with micro-credentials, live client contract bootcamps, and direct job matchings.
                </p>
              </div>
            </div>

            {/* LinkedIn CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-50">
              <a
                href="https://www.linkedin.com/in/md-arbaaz-arz-309476154/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0A66C2] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#0959a8] active:scale-[0.98] transition-all cursor-pointer"
              >
                Connect on LinkedIn <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
