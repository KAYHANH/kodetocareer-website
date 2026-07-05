"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight, BookOpen } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  id: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/about", id: "about" },
  { label: "Courses", href: "/courses", id: "courses", hasDropdown: true },
  { label: "Placements", href: "https://devsunite.com/jobs", id: "placements" },
  { label: "Career Solutions", href: "/career-services", id: "career-services", hasDropdown: true },
  { label: "Blog", href: "/blog", id: "blog" },
  { label: "Free Tools", href: "/tools", id: "tools" },
  { label: "Contact", href: "/contact", id: "contact" },
];

/* ───── overlay backdrop variants ───── */
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ───── drawer slide-in variants ───── */
const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "tween" as const, duration: 0.35, ease: [0.25, 1, 0.5, 1] as const },
  },
  exit: {
    x: "100%",
    transition: { type: "tween" as const, duration: 0.3, ease: [0.5, 0, 0.75, 0] as const },
  },
};

/* ───── stagger container for mobile links ───── */
const linkListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const linkItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Track separate hover states for desktop dropdowns
  const [coursesHovered, setCoursesHovered] = useState(false);
  const [solutionsHovered, setSolutionsHovered] = useState(false);

  // Track separate collapsible states for mobile drawer
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  /* ── scroll listener ── */
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ── lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ease-out ${
          scrolled
            ? "glass"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="KodeToCareer – Home"
          >
            <Image
              src="/main-logo.png"
              width={200}
              height={50}
              alt="KodeToCareer Logo"
              className="h-10 md:h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Links ── */}
          <ul className="hidden items-center gap-1 lg:flex h-full">
            {NAV_LINKS.map(({ label, href, id, hasDropdown }) => {
              const isCourses = id === "courses";
              const isSolutions = id === "career-services";
              const currentHoverState = isCourses ? coursesHovered : isSolutions ? solutionsHovered : false;
              const setHoverState = isCourses ? setCoursesHovered : isSolutions ? setSolutionsHovered : () => {};

              return (
                <li
                  key={href}
                  className="relative flex items-center h-full"
                  onMouseEnter={hasDropdown ? () => setHoverState(true) : undefined}
                  onMouseLeave={hasDropdown ? () => setHoverState(false) : undefined}
                >
                  {hasDropdown ? (
                    <div className="py-5">
                      <button
                        className={`relative rounded-[10px] px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 cursor-pointer outline-none ${
                          isActive(href)
                            ? "text-primary font-bold"
                            : "text-text-secondary hover:text-slate-900"
                        }`}
                      >
                        {label}
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${currentHoverState ? "rotate-180" : ""}`} />
                        {isActive(href) && (
                          <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={href}
                      className={`relative rounded-[10px] px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(href)
                          ? "text-primary font-bold"
                          : "text-text-secondary hover:text-slate-900"
                      }`}
                    >
                      {label}
                      {isActive(href) && (
                        <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary" />
                      )}
                    </Link>
                  )}

                  {/* ── 1. Mega Dropdown: Courses ── */}
                  {hasDropdown && isCourses && (
                    <AnimatePresence>
                      {coursesHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-[80%] left-0 mt-1 w-[720px] rounded-2xl border border-slate-150 bg-white p-6 shadow-2xl z-50 text-slate-800 text-left pointer-events-auto"
                        >
                          <div className="grid grid-cols-4 gap-6">
                            {/* Column 1: Tech & Dev */}
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Software Engineering</h4>
                              <div className="space-y-2">
                                <Link href="/courses/mern-stack-development" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">MERN Stack</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">6 Months + AI Integration</span>
                                </Link>
                                <Link href="/courses/java-full-stack" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Java Full Stack</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">5 Months Live Classes</span>
                                </Link>
                                <Link href="/courses/python-programming" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Python & Automation</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">4 Months Scripting</span>
                                </Link>
                              </div>
                            </div>

                            {/* Column 2: Data & AI */}
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Data & AI</h4>
                              <div className="space-y-2">
                                <Link href="/courses/data-science-machine-learning" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Data Science & ML</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">6 Months Live Training</span>
                                </Link>
                                <Link href="/courses/data-analytics" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Data Analytics</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">4 Months BI Tools</span>
                                </Link>
                              </div>
                            </div>

                            {/* Column 3: Cloud & MLOps */}
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Cloud & MLOps</h4>
                              <div className="space-y-2">
                                <Link href="/courses/cloud-devops" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Cloud & DevOps</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">6 Months DevOps/CI/CD</span>
                                </Link>
                                <Link href="/courses/mlops-ai-systems" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Industry MLOps</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">28 Weeks AI Platforms</span>
                                </Link>
                              </div>
                            </div>

                            {/* Column 4: Creative & Growth */}
                            <div className="space-y-3">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Creative & Growth</h4>
                              <div className="space-y-2">
                                <Link href="/courses/graphic-design-ui-ux" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">UI/UX Product Design</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">4 Months Design System</span>
                                </Link>
                                <Link href="/courses/digital-marketing" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Digital Marketing</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">3 Months Growth Hacking</span>
                                </Link>
                                <Link href="/courses/videography-video-editing" onClick={() => setCoursesHovered(false)} className="group/item block p-1.5 rounded-lg hover:bg-slate-50">
                                  <span className="block text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors">Graphic & Video Editing</span>
                                  <span className="block text-[9px] text-slate-450 mt-0.5 font-semibold">4 Months Live Studio</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                            <span className="text-[10px] text-slate-450 font-bold">Ready to check all programs?</span>
                            <Link
                              href="/courses"
                              className="text-[10px] font-black text-primary hover:underline flex items-center gap-0.5"
                              onClick={() => setCoursesHovered(false)}
                            >
                              Explore All 9 Courses <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* ── 2. Mega Dropdown: Career Solutions ── */}
                  {hasDropdown && isSolutions && (
                    <AnimatePresence>
                      {solutionsHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-[80%] left-1/2 -translate-x-1/2 mt-1 w-[580px] rounded-2xl border border-slate-150 bg-white p-6 shadow-2xl z-50 text-slate-800 text-left pointer-events-auto"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Career Growth</h4>
                              <Link
                                href="/career-services/placements"
                                className="group/item flex gap-1 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                onClick={() => setSolutionsHovered(false)}
                              >
                                <div>
                                  <h5 className="text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors flex items-center gap-1">
                                    Placement Outcomes <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                  </h5>
                                  <p className="text-[10px] text-slate-550 mt-0.5 leading-normal font-semibold">
                                    Resume audits, mock interviews, and direct hiring partner referrals.
                                  </p>
                                </div>
                              </Link>
                              <div className="pl-2 space-y-1.5">
                                <Link href="/career-services/placements" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• Resume & ATS Review</Link>
                                <Link href="/career-services/placements" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• Mock Interviews</Link>
                                <Link href="/contact" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• Mentorship Support</Link>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Academics</h4>
                              <Link
                                href="/career-services/admissions"
                                className="group/item flex gap-1 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                onClick={() => setSolutionsHovered(false)}
                              >
                                <div>
                                  <h5 className="text-xs font-extrabold text-slate-900 group-hover/item:text-primary transition-colors flex items-center gap-1">
                                    College Admissions <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                  </h5>
                                  <p className="text-[10px] text-slate-550 mt-0.5 leading-normal font-semibold">
                                    Accredited Regular, Online, and Distance degrees from top universities.
                                  </p>
                                </div>
                              </Link>
                              <div className="pl-2 space-y-1.5">
                                <Link href="/contact" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• Career Counselling</Link>
                                <Link href="/career-services/admissions" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• UGC Approved Programs</Link>
                                <Link href="/career-services/admissions" onClick={() => setSolutionsHovered(false)} className="block text-[10px] font-bold text-slate-500 hover:text-primary transition-colors">• Career Gap Support</Link>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-slate-100 mt-6 pt-4 flex items-center justify-between bg-slate-50/50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                            <span className="text-[10px] text-slate-450 font-bold">Confused about your path?</span>
                            <Link
                              href="/contact"
                              className="text-[10px] font-black text-primary hover:underline flex items-center gap-0.5"
                              onClick={() => setSolutionsHovered(false)}
                            >
                              Book counselling session <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA Buttons ── */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/start"
              className="btn-primary-gradient px-5 py-2.5 text-sm font-semibold text-white"
            >
              Start Learning
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            className="flex items-center justify-center rounded-[10px] p-2 text-text-secondary transition-colors hover:text-slate-900 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              key="mobile-drawer"
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white border-l border-slate-100 shadow-2xl lg:hidden"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex h-20 items-center justify-between px-6">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <Image
                    src="/main-logo.png"
                    width={160}
                    height={40}
                    alt="KodeToCareer Logo"
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-[10px] p-2 text-text-secondary transition-colors hover:text-slate-900"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <motion.ul
                className="flex-1 space-y-1 overflow-y-auto px-4 pt-4"
                variants={linkListVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map(({ label, href, id, hasDropdown }) => {
                  const isCourses = id === "courses";
                  const isSolutions = id === "career-services";
                  const currentMobileOpen = isCourses ? mobileCoursesOpen : isSolutions ? mobileSolutionsOpen : false;
                  const setMobileOpenState = isCourses ? setMobileCoursesOpen : isSolutions ? setMobileSolutionsOpen : () => {};

                  return (
                    <motion.li key={href} variants={linkItemVariants} className="space-y-1">
                      {hasDropdown ? (
                        <>
                          <button
                            onClick={() => setMobileOpenState(!currentMobileOpen)}
                            className="flex w-full items-center justify-between rounded-[10px] px-4 py-3 text-base font-medium transition-colors text-text-secondary hover:bg-black/[0.02] hover:text-slate-900 outline-none"
                          >
                            <span>{label}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${currentMobileOpen ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {currentMobileOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-6 space-y-1 overflow-hidden"
                              >
                                {isCourses ? (
                                  <>
                                    <Link href="/courses/mern-stack-development" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">MERN Stack + AI</Link>
                                    <Link href="/courses/data-science-machine-learning" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">Data Science & ML</Link>
                                    <Link href="/courses/mlops-ai-systems" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">Industry MLOps</Link>
                                    <Link href="/courses" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-primary hover:underline">Explore All Courses →</Link>
                                  </>
                                ) : (
                                  <>
                                    <Link href="/career-services/placements" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">Placement Outcomes</Link>
                                    <Link href="/career-services/admissions" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">College Admissions</Link>
                                    <Link href="/career-services/admissions" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">Career Gap Support</Link>
                                    <Link href="/contact" onClick={() => setMobileOpen(false)} className="flex rounded-[10px] px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary">Career Counselling</Link>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex rounded-[10px] px-4 py-3 text-base font-medium transition-colors ${
                            isActive(href)
                              ? "bg-black/[0.04] text-primary"
                              : "text-text-secondary hover:bg-black/[0.02] hover:text-slate-900"
                          }`}
                        >
                          {label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Drawer Footer */}
              <div className="border-t border-white/[0.08] p-6 space-y-3">
                <Link
                  href="/start"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary-gradient flex w-full items-center justify-center py-3 text-sm font-semibold text-white"
                >
                  Start Learning
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
