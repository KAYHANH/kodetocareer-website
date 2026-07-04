"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Placements", href: "https://devsunite.com/jobs" },
  { label: "Career Services", href: "/career-services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/* ───── overlay backdrop variants ───── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ───── drawer slide-in variants ───── */
const drawerVariants = {
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
const linkListVariants = {
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const linkItemVariants = {
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
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
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
              </li>
            ))}
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
                {NAV_LINKS.map(({ label, href }) => (
                  <motion.li key={href} variants={linkItemVariants}>
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
                  </motion.li>
                ))}
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
