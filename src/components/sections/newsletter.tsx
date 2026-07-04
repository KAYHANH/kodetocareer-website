'use client';

import { Send } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/*  Newsletter Section                                                  */
/* ------------------------------------------------------------------ */

export default function Newsletter() {
  return (
    <section className="py-24 bg-white" aria-labelledby="newsletter-heading">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <motion.div
          className="relative overflow-hidden rounded-[40px] border border-blue-200/50 bg-gradient-to-br from-[#DBEAFE] via-[#BFDBFE] to-[#E0F2FE] p-12 md:p-16 shadow-xl shadow-blue-100/10"
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Decorative mesh gradient glows */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-white/40 blur-[80px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-white/40 blur-[80px]"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <h2
              id="newsletter-heading"
              className="font-heading text-3xl font-extrabold text-slate-900 md:text-4xl tracking-tight"
            >
              Stay Ahead of the Curve
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm text-slate-700 font-medium">
              Get the latest tech insights, career roadmaps, and placement drives delivered directly to your inbox.
            </p>

            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex flex-col sm:flex-row max-w-md gap-3"
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-800 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-all duration-300 text-sm font-medium"
              />
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-slate-900 px-6 py-4 font-bold text-white shadow-md shadow-slate-950/10 hover:bg-slate-800 transition-colors duration-300 text-sm"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>

            <p className="mt-4 text-xs font-semibold text-slate-500">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { Newsletter };
