"use client";

export default function FooterNewsletter() {
  return (
    <div className="py-8 border-b border-slate-100 flex items-center justify-end">
      <form
        className="flex items-center gap-2 max-w-sm w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Newsletter email
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          placeholder="Newsletter email"
          className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
        />
        <button
          type="submit"
          className="h-10 bg-slate-900 text-white rounded-xl px-4 text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors"
        >
          Join{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3 h-3"
            aria-hidden="true"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
