"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Briefcase, DollarSign, ArrowRight, Award } from "lucide-react";

interface TechItem {
  name: string;
  icon: string;
  duration: string;
  projects: number;
  roles: string;
  salary: string;
  link: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: "React",
    icon: "/svg/React.svg",
    duration: "6 Months",
    projects: 15,
    roles: "React Dev, Frontend Engineer",
    salary: "₹6-15 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "Next.js",
    icon: "/svg/Next.js.svg",
    duration: "6 Months",
    projects: 15,
    roles: "Full Stack Engineer",
    salary: "₹8-18 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "Node.js",
    icon: "/svg/Node.js.svg",
    duration: "6 Months",
    projects: 15,
    roles: "Backend Developer",
    salary: "₹7-16 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "Express.js",
    icon: "/svg/Express.svg",
    duration: "6 Months",
    projects: 15,
    roles: "API Systems Architect",
    salary: "₹6-12 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "MongoDB",
    icon: "/svg/MongoDB.svg",
    duration: "6 Months",
    projects: 15,
    roles: "Database Dev, MERN Dev",
    salary: "₹6-14 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "PostgreSQL",
    icon: "/svg/PostgresSQL.svg",
    duration: "6 Months",
    projects: 10,
    roles: "Backend Developer",
    salary: "₹7-15 LPA",
    link: "/courses/java-full-stack",
  },
  {
    name: "Python",
    icon: "/svg/Python.svg",
    duration: "4 Months",
    projects: 8,
    roles: "Automation Engineer",
    salary: "₹5-12 LPA",
    link: "/courses/digital-marketing",
  },
  {
    name: "Java",
    icon: "/svg/Java.svg",
    duration: "6 Months",
    projects: 10,
    roles: "Enterprise Developer",
    salary: "₹8-20 LPA",
    link: "/courses/java-full-stack",
  },
  {
    name: "Docker",
    icon: "/svg/Docker.svg",
    duration: "6 Months",
    projects: 10,
    roles: "DevOps Engineer",
    salary: "₹9-18 LPA",
    link: "/courses/java-full-stack",
  },
  {
    name: "Git",
    icon: "/svg/Git.svg",
    duration: "All Courses",
    projects: 25,
    roles: "Software Engineer",
    salary: "₹6-15 LPA",
    link: "/courses",
  },
  {
    name: "AWS",
    icon: "/svg/AWS.svg",
    duration: "6 Months",
    projects: 10,
    roles: "Cloud Solutions Architect",
    salary: "₹9-22 LPA",
    link: "/courses/java-full-stack",
  },
  {
    name: "Firebase",
    icon: "/svg/Firebase.svg",
    duration: "6 Months",
    projects: 15,
    roles: "Web & Mobile Dev",
    salary: "₹6-12 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "TensorFlow",
    icon: "/svg/TensorFlow.svg",
    duration: "6 Months",
    projects: 12,
    roles: "Machine Learning Engineer",
    salary: "₹10-25 LPA",
    link: "/courses/data-science-machine-learning",
  },
  {
    name: "Tailwind CSS",
    icon: "/svg/Tailwind-CSS.svg",
    duration: "6 Months",
    projects: 15,
    roles: "UI/UX Developer",
    salary: "₹6-11 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "TypeScript",
    icon: "/svg/TypeScript.svg",
    duration: "6 Months",
    projects: 15,
    roles: "TypeScript Architect",
    salary: "₹7-16 LPA",
    link: "/courses/mern-stack-development",
  },
  {
    name: "PyTorch",
    icon: "/svg/PyTorch.svg",
    duration: "6 Months",
    projects: 12,
    roles: "Deep Learning Engineer",
    salary: "₹12-30 LPA",
    link: "/courses/data-science-machine-learning",
  },
];

export default function TechStackCircle() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Particle state for hydration safety
  interface Particle {
    width: number;
    height: number;
    top: number;
    left: number;
    duration: number;
    delay: number;
  }
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = [...Array(20)].map(() => ({
      width: Math.random() * 4 + 2,
      height: Math.random() * 4 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  // Animation Ref variables
  const orbitRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Smooth orbit animation loop (zero-re-render)
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (!isHoveredRef.current) {
        // ~35s per revolution (0.12 degree per frame at 60fps)
        angleRef.current = (angleRef.current + 0.12) % 360;
        
        if (orbitRef.current) {
          orbitRef.current.style.transform = `rotate(${angleRef.current}deg)`;
        }
        
        // Counter rotate each icon to keep it upright
        const counterIcons = document.querySelectorAll(".counter-rotate-icon");
        counterIcons.forEach((el) => {
          (el as HTMLElement).style.transform = `rotate(${-angleRef.current}deg)`;
        });
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Parallax mouse movements
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30; // parallax factor
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const onIconHoverStart = (tech: TechItem) => {
    isHoveredRef.current = true;
    setHoveredTech(tech);
  };

  const onIconHoverEnd = () => {
    isHoveredRef.current = false;
    setHoveredTech(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center w-full h-full min-h-[480px] lg:min-h-[640px] overflow-visible select-none"
    >
      {/* ── Background Moving Particles / Stars ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/20 blur-[1px] animate-pulse"
            style={{
              width: `${p.width}px`,
              height: `${p.height}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Parallax Wrapper ── */}
      <div
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: "transform 0.15s ease-out",
        }}
        className="scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.65] xl:scale-[0.8] 2xl:scale-95 transition-transform duration-500 origin-center flex items-center justify-center relative w-[680px] h-[680px]"
      >
        {/* Ring 4: Soft blurred outer glow */}
        <div className="absolute w-[700px] h-[700px] rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        {/* Ring 3: Animated Pulse */}
        <div className="absolute w-[680px] h-[680px] rounded-full border border-blue-500/10 opacity-30 animate-ping duration-[6000ms]" />

        {/* Ring 1: Solid glowing outer orbit */}
        <div className="absolute w-[620px] h-[620px] rounded-full border border-primary/20 bg-primary/2 shadow-[0_0_80px_rgba(37,99,235,0.08)] pointer-events-none" />

        {/* Ring 2: Dashed rotating ring */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-accent/25 animate-spin-slow duration-[80s]" />

        {/* AI Chip Illustration behind the central K logo card */}
        <div
          style={{
            transform: `translate3d(${-mousePos.x * 0.25}px, ${-mousePos.y * 0.25}px, 0)`,
            transition: "transform 0.2s ease-out",
          }}
          className="absolute z-10 w-[300px] h-[300px] rounded-full border border-blue-100 bg-blue-50/50 flex items-center justify-center pointer-events-none animate-spin-slow duration-[120s] shadow-inner"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary/25 fill-none stroke-[0.6]">
            <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="32" />
            <path d="M 50 8 L 50 25" />
            <path d="M 50 92 L 50 75" />
            <path d="M 8 50 L 25 50" />
            <path d="M 92 50 L 75 50" />
            <path d="M 20 20 L 32 32" />
            <path d="M 80 80 L 68 68" />
            <path d="M 20 80 L 32 68" />
            <path d="M 80 20 L 68 32" />
            <rect x="47" y="22" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#2563EB" strokeWidth="0.8" />
            <rect x="47" y="72" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#2563EB" strokeWidth="0.8" />
            <rect x="22" y="47" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#2563EB" strokeWidth="0.8" />
            <rect x="72" y="47" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#2563EB" strokeWidth="0.8" />
          </svg>
        </div>

        {/* ── Rotating Orbit Container ── */}
        <div
          ref={orbitRef}
          className={`relative w-[620px] h-[620px] ${hoveredTech ? "z-30" : "z-10"}`}
        >
          {/* Animated Network Connection Lines inside the rotating container */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes line-dash-anim-sub {
                0% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -100; }
              }
              .animate-line-dash-sub {
                animation: line-dash-anim-sub 8s linear infinite;
              }
            `}} />
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {TECH_STACK.map((tech, index) => {
              const angle = (360 / TECH_STACK.length) * index;
              const radius = isCollapsed ? 0 : 300;
              const x1 = 310; // Center of 620px container
              const y1 = 310;
              const x2 = 310 + radius * Math.cos(((angle - 90) * Math.PI) / 180);
              const y2 = 310 + radius * Math.sin(((angle - 90) * Math.PI) / 180);
              return (
                <g 
                  key={tech.name}
                  style={{
                    opacity: isCollapsed ? 0 : 1,
                    transition: "opacity 0.5s ease",
                  }}
                >
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGrad)"
                    strokeWidth="1.2"
                  />
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    strokeDasharray="6 24"
                    className="animate-line-dash-sub"
                  />
                </g>
              );
            })}
          </svg>

          {TECH_STACK.map((tech, index) => {
            const angle = (360 / TECH_STACK.length) * index;
            const radius = isCollapsed ? 0 : 300; // Radius of orbit

            const x = radius * Math.cos(((angle - 90) * Math.PI) / 180);
            const y = radius * Math.sin(((angle - 90) * Math.PI) / 180);

            const isCurrentHovered = hoveredTech?.name === tech.name;
            const isTopHalf = y < 0;

            return (
              <div
                key={tech.name}
                className="absolute flex items-center justify-center"
                style={{
                  left: `calc(50% + ${x}px - 44px)`,
                  top: `calc(50% + ${y}px - 44px)`,
                  zIndex: isCurrentHovered ? 50 : 1,
                  opacity: isCollapsed ? 0 : 1,
                  transform: `scale(${isCollapsed ? 0 : 1})`,
                  transition: "left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {/* 
                  Counter rotate container 
                  Applying transform style via class counter-rotate-icon to keep it upright.
                */}
                <div
                  onMouseEnter={() => onIconHoverStart(tech)}
                  onMouseLeave={onIconHoverEnd}
                  className="counter-rotate-icon relative flex items-center justify-center"
                >
                  <div
                    className={`group flex items-center justify-center w-22 h-22 rounded-full border bg-white/95 shadow-md transition-all duration-300 cursor-pointer ${
                      isCurrentHovered
                        ? "scale-115 border-primary shadow-lg shadow-primary/20 bg-white"
                        : "border-black/[0.08] hover:border-primary/50"
                    }`}
                  >
                    <Link href={tech.link} className="flex items-center justify-center w-full h-full">
                      <Image
                        src={tech.icon}
                        width={44}
                        height={44}
                        alt={tech.name}
                        className="object-contain filter transition-all duration-300"
                        unoptimized
                      />
                    </Link>

                    {/* Expand Detail Tooltip */}
                    <AnimatePresence>
                      {isCurrentHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: isTopHalf ? -15 : 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: isTopHalf ? -15 : 15, scale: 0.95 }}
                          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className={`absolute left-1/2 -translate-x-1/2 w-64 p-5 rounded-2xl bg-white/98 border border-black/[0.08] shadow-2xl backdrop-blur-xl z-50 text-left cursor-default select-text ${isTopHalf ? "top-24" : "bottom-24"}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Title */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/[0.06] flex items-center justify-center p-1.5">
                              <Image src={tech.icon} width={20} height={20} alt={tech.name} unoptimized />
                            </span>
                            <div>
                              <h4 className="text-sm font-heading font-bold text-slate-900 leading-none">{tech.name}</h4>
                              <span className="text-[9px] text-primary block font-medium mt-0.5">Learn This Technology</span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-2 mb-4 border-t border-black/[0.06] pt-3">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              <span>Duration: <strong className="text-slate-800">{tech.duration}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Award className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                              <span>Projects: <strong className="text-slate-800">{tech.projects}+ Built</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <DollarSign className="w-3.5 h-3.5 text-success flex-shrink-0" />
                              <span>Salary: <strong className="text-primary font-mono">{tech.salary}</strong></span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Briefcase className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                              <span className="truncate">Role: <strong className="text-slate-800">{tech.roles.split(",")[0]}</strong></span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <Link
                            href={tech.link}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-lg shadow-primary/20"
                          >
                            Explore Program
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>

                          {/* Small Pointer Arrow */}
                          <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white ${isTopHalf ? "top-[-6px] border-l border-t border-black/[0.08]" : "bottom-[-6px] border-r border-b border-black/[0.08]"}`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Central fixed logo card (does not rotate) ── */}
        <div
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            transform: `translate3d(${-mousePos.x * 0.4}px, ${-mousePos.y * 0.4}px, 0)`,
            transition: "transform 0.2s ease-out",
          }}
          className="absolute z-20 flex items-center justify-center w-56 h-56 rounded-full bg-gradient-to-br from-surface to-background border border-black/[0.06] shadow-[0_0_80px_rgba(144,213,255,0.45)] overflow-hidden animate-float-delayed cursor-pointer hover:scale-105 transition-all duration-300"
        >
          {/* Subtle pulse circles */}
          <div className="absolute w-44 h-44 rounded-full bg-primary/10 border border-primary/25 animate-pulse" />
          <Image
            src="/logo-icon.png"
            width={110}
            height={110}
            alt="KodeToCareer"
            className="object-contain relative z-10"
            priority
          />
        </div>
        
      </div>
    </div>
  );
}
