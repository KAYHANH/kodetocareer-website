import Link from "next/link";
import Image from "next/image";
import FooterNewsletter from "./footer-newsletter";
import { MapPin, Phone, Mail, Map } from "lucide-react";
import type { SVGProps } from "react";

/* ------------------------------------------------------------------ */
/*  Social SVGs                                                        */
/* ------------------------------------------------------------------ */

function IconGithub(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function IconX(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

function IconYoutube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: IconLinkedin, href: "https://www.linkedin.com/company/kode2career/", label: "LinkedIn" },
  { icon: IconInstagram, href: "https://www.instagram.com/kodetocareer", label: "Instagram" },
  { icon: IconYoutube, href: "https://www.youtube.com/@KodeToCareer", label: "YouTube" },
  { icon: IconFacebook, href: "https://www.facebook.com/profile.php?id=100009800075661", label: "Facebook" },
] as const;

/* ------------------------------------------------------------------ */
/*  Links Data                                                         */
/* ------------------------------------------------------------------ */

const PROGRAMS = [
  { label: "MERN Stack Development", href: "/courses/mern-stack-development" },
  { label: "Java Full Stack Development", href: "/courses/java-full-stack" },
  { label: "Python Programming & Automation", href: "/courses/python-programming" },
  { label: "Data Science & Machine Learning", href: "/courses/data-science-machine-learning" },
  { label: "Data Analytics & BI", href: "/courses/data-analytics" },
  { label: "DevOps Engineering & CI/CD", href: "/courses/cloud-devops" },
  { label: "Industry-Ready MLOps", href: "/courses/mlops-ai-systems" },
  { label: "UI/UX Product Design", href: "/courses/graphic-design-ui-ux" },
  { label: "Digital Marketing with AI", href: "/courses/digital-marketing" },
  { label: "Graphic & Video Editing", href: "/courses/videography-video-editing" },
] as const;

const RESOURCES = [
  { label: "Blog", href: "/blog" },
  { label: "Verify Certificate", href: "/verify" },
  { label: "Free AI Career Tools", href: "/free-tools" },
  { label: "AI Resume Grader", href: "/free-tools/resume-grader" },
  { label: "AI Mock Interview", href: "/free-tools/mock-interview" },
  { label: "Placements Support", href: "/placements" },
  { label: "SQL Cheat Sheet", href: "/learn/sql" },
] as const;

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Contact Careers", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Academic Partners", href: "/partners" },
] as const;

/* ------------------------------------------------------------------ */
/*  Footer Column Helper                                                */
/* ------------------------------------------------------------------ */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="mb-5 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer Component                                                    */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white relative overflow-hidden" role="contentinfo">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-[1440px] px-6 relative z-10">
        
        {/* ── Top Section: 5-column grid (Brand, 3 Link Cols, Address/Map) ── */}
        <div className="grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 border-b border-slate-100">
          
          {/* Brand Column (Spans 3 cols) */}
          <div className="space-y-5 lg:col-span-3">
            <Link href="/" className="inline-block rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/50" aria-label="KodeToCareer – Home">
              <Image
                src="/main-logo.png"
                width={200}
                height={50}
                alt="KodeToCareer Logo"
                sizes="200px"
                loading="lazy"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-[11px] font-extrabold text-primary uppercase tracking-widest leading-none">
              AI-Powered Career & Dev Academy
            </p>

            <p className="text-xs leading-relaxed text-slate-500 font-medium max-w-[260px]">
              Empowering developers with production-level skills, live internships, and direct job outcomes in tech.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:border-primary/20 hover:text-primary hover:bg-slate-50 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns (Spans 6 cols total, 2 each) */}
          <div className="lg:col-span-2">
            <FooterColumn title="Academies" links={PROGRAMS} />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Resources" links={RESOURCES} />
          </div>
          <div className="lg:col-span-2">
            <FooterColumn title="Company" links={COMPANY} />
          </div>

          {/* Contact, Campus Address & Maps Placeholder (Spans 3 cols) */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
              Campus Office
            </h3>
            
            <div className="space-y-3.5 text-xs font-semibold text-slate-500">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  A-48 Basement, Sector 2,<br />
                  Near Sector 15 Metro Station,<br />
                  Noida, UP 201301, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap gap-x-1">
                  <a href="tel:+919667975616" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">+91 96679 75616</a>
                  <span>/</span>
                  <a href="tel:+919667915616" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">+91 96679 15616</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <div className="flex flex-wrap gap-x-1">
                  <a href="mailto:info@kodetocareer.com" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">info@kodetocareer.com</a>
                  <span>/</span>
                  <a href="mailto:kodetocareer@gmail.com" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">kodetocareer@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Campus Map Mini Placeholder */}
            <a 
              href="https://maps.app.goo.gl/bfGjKfn5kQwnZUCt8?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View KodeToCareer Sector 2 Noida Campus Location on Google Maps"
              className="w-full h-24 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative flex items-center justify-center shadow-inner group cursor-pointer hover:border-primary/20 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100 to-transparent pointer-events-none" />
              <span className="relative z-10 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 group-hover:text-primary transition-colors">
                <Map className="w-3.5 h-3.5" aria-hidden="true" /> Sector 2 Noida Campus Map View
              </span>
            </a>
          </div>

        </div>

        {/* ── Newsletter Section ── */}
        <FooterNewsletter />

        {/* ── Legal & Business Information Section ── */}
        <div className="py-6 border-t border-slate-100 text-xs text-slate-500">
          <h3 className="mb-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
            Legal & Business Information
          </h3>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-6 font-medium">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Company Registration No.</span>
              <span className="font-mono text-slate-600 break-all select-text">IN-UP48967679168206Y</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold text-slate-700 shrink-0">GSTIN</span>
              <span className="font-mono text-slate-600 break-all select-text">09ABFFK9368K1ZJ</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="font-semibold text-slate-700 shrink-0">Udyam/MSME Registration No.</span>
              <span className="font-mono text-slate-600 break-all select-text">UDYAM-UP-28-0229837</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 border-t border-slate-100 sm:flex-row text-xs font-semibold text-slate-400">
          <p>
            &copy; 2026 KodeToCareer. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">Privacy</Link>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <Link href="/terms" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">Terms</Link>
            <span className="text-slate-200" aria-hidden="true">·</span>
            <Link href="/cookies" className="hover:text-primary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
