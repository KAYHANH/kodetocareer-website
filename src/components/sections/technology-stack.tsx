"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Layout, Server, Database, Brain, Sparkles, Terminal, Code2 } from "lucide-react";

interface TechTool {
  name: string;
  icon: string;
  isInlineSvg?: boolean;
  inlineSvg?: React.ReactNode;
}

interface TechCategory {
  title: string;
  description: string;
  icon: any;
  colorClass: string;
  tools: TechTool[];
}

const CATEGORIES: TechCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Build beautiful, highly interactive user interfaces and responsive web apps.",
    icon: Layout,
    colorClass: "from-blue-500/10 to-cyan-500/10 text-blue-600 border-blue-100",
    tools: [
      { name: "React", icon: "/svg/React.svg" },
      { name: "Next.js", icon: "/svg/Next.js.svg" },
      { name: "TypeScript", icon: "/svg/TypeScript.svg" },
      { name: "Tailwind CSS", icon: "/svg/Tailwind-CSS.svg" },
      { name: "HTML5", icon: "/svg/HTML5.svg" },
      { name: "CSS3", icon: "/svg/CSS3.svg" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Architect secure, scalable servers, serverless APIs, and distributed systems.",
    icon: Server,
    colorClass: "from-violet-500/10 to-purple-500/10 text-violet-600 border-violet-100",
    tools: [
      { name: "Node.js", icon: "/svg/Node.js.svg" },
      { name: "Express.js", icon: "/svg/Express.svg" },
      { name: "Java", icon: "/svg/Java.svg" },
      { name: "Python", icon: "/svg/Python.svg" },
      { name: "Docker", icon: "/svg/Docker.svg" },
      { name: "PHP", icon: "/svg/PHP.svg" },
    ],
  },
  {
    title: "Database & Cloud",
    description: "Design relational & document schemas, memory caches, and cloud infrastructure.",
    icon: Database,
    colorClass: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-100",
    tools: [
      { name: "PostgreSQL", icon: "/svg/PostgresSQL.svg" },
      { name: "MongoDB", icon: "/svg/MongoDB.svg" },
      { name: "MySQL", icon: "/svg/MySQL.svg" },
      { name: "AWS", icon: "/svg/AWS.svg" },
      { name: "Firebase", icon: "/svg/Firebase.svg" },
      { name: "Git", icon: "/svg/Git.svg" },
    ],
  },
  {
    title: "AI & Automation",
    description: "Integrate LLMs, neural networks, orchestration pipelines, and workflow agents.",
    icon: Brain,
    colorClass: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-100",
    tools: [
      { name: "TensorFlow", icon: "/svg/TensorFlow.svg" },
      { name: "PyTorch", icon: "/svg/PyTorch.svg" },
      {
        name: "OpenAI API",
        icon: "",
        isInlineSvg: true,
        inlineSvg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-800" aria-hidden="true">
            <path d="M21.7 8c-.2-1.3-.8-2.4-1.8-3.1-.7-.5-1.5-.8-2.4-.9-.3-.5-.7-.9-1.2-1.2-1.2-.7-2.6-.9-3.9-.4-.7.3-1.3.8-1.7 1.4-.5-.1-1-.1-1.5.1-1.3.3-2.4.9-3.1 1.8-.5.7-.8 1.5-.9 2.4-.5.3-.9.7-1.2 1.2-.7 1.2-.9 2.6-.4 3.9.3.7.8 1.3 1.4 1.7-.1.5-.1 1 .1 1.5.3 1.3.9 2.4 1.8 3.1.7.5 1.5.8 2.4.9.3.5.7.9 1.2 1.2 1.2.7 2.6.9 3.9.4.7-.3 1.3-.8 1.7-1.4.5.1 1 .1 1.5-.1 1.3-.3 2.4-.9 3.1-1.8.5-.7.8-1.5.9-2.4.5-.3.9-.7 1.2-1.2.7-1.2.9-2.6.4-3.9-.3-.7-.8-1.3-1.4-1.7zm-9.7 10c-.8 0-1.5-.3-2.1-.8l4-2.3 2.1 1.2v4.6c-1.3.4-2.7.2-4-.7zm-5.4-3.1c-.4-.7-.6-1.5-.6-2.3 0-1.3.6-2.5 1.7-3.2l4 2.3v2.4l-2.1 1.2-3 1.7v-2.1zm-.8-6.9c.4-.7 1-1.3 1.7-1.7.6-.3 1.3-.5 2-.5v4.6l-4 2.3-1.7-1v-3.7zm7 1.7l-4-2.3-2.1-1.2V1.6c1.3-.4 2.7-.2 4 .7.8.5 1.5 1.2 1.9 2.1l-.2.1-1.7 1-1.9-1.1v2.4zm5.4 3.1c.4.7.6 1.5.6 2.3 0 1.3-.6 2.5-1.7 3.2l-4-2.3V11.5l2.1-1.2 3-1.7v2.1zm.8 6.9c-.4.7-1 1.3-1.7 1.7-.6.3-1.3.5-2 .5v-4.6l4-2.3 1.7 1v3.7zm-9.2-5.4L6.9 9.3l-2.1-1.2 1.7-1 4 2.3v2.3zm2.2.9l2.1-1.2 2.1 1.2-2.1 1.2-2.1-1.2z" />
          </svg>
        ),
      },
      {
        name: "Claude AI",
        icon: "",
        isInlineSvg: true,
        inlineSvg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-slate-800" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        ),
      },
      {
        name: "Gemini",
        icon: "",
        isInlineSvg: true,
        inlineSvg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-indigo-600" aria-hidden="true">
            <path d="M12 2a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 14a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm8-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zM4 11a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm12.364-5.364a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM6.929 15.657a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zm9.9-1.414a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM7.636 6.929a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0z" />
          </svg>
        ),
      },
      {
        name: "LangChain",
        icon: "",
        isInlineSvg: true,
        inlineSvg: (
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-violet-600" aria-hidden="true">
            <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z" />
          </svg>
        ),
      },
    ],
  },
];

export default function TechnologyStack() {
  return (
    <section 
      className="py-24 bg-white relative overflow-hidden" 
      aria-labelledby="tech-stack-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
            ACADEMIC TECH DIRECTORY
          </p>
          <h2 
            id="tech-stack-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Master the Modern Tech Stack
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">
            We don't teach legacy tools. Learn the exact categorized ecosystems demanded by engineering teams at high-growth startups and tech giants.
          </p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category, catIdx) => {
            const Icon = category.icon;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgba(15,23,42,0.015)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.05)] hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.colorClass} border shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-extrabold text-slate-900">{category.title}</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
                        {category.tools.length} Technologies Included
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-500 mb-8 font-medium">
                    {category.description}
                  </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:scale-102 hover:shadow-md transition-all duration-200 group cursor-pointer"
                    >
                      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 relative">
                        {tool.isInlineSvg ? (
                          tool.inlineSvg
                        ) : (
                          <Image
                            src={tool.icon}
                            width={20}
                            height={20}
                            alt={tool.name}
                            className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-105"
                            unoptimized
                          />
                        )}
                      </span>
                      <span className="text-[12px] font-bold text-slate-700 group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
