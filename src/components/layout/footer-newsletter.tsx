"use client";

import { useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-8 border-b border-slate-100 flex items-center justify-end">
      {status === "success" ? (
        <p className="text-xs font-bold text-emerald-600 max-w-sm w-full text-right">
          ✓ Subscribed! You&apos;ll receive our next digest.
        </p>
      ) : (
        <form
          className="flex items-center gap-2 max-w-sm w-full"
          onSubmit={handleSubmit}
        >
          <label htmlFor="footer-newsletter-email" className="sr-only">
            Newsletter email
          </label>
          <input
            id="footer-newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Newsletter email"
            className="h-10 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={submitting}
            className="h-10 bg-slate-900 text-white rounded-xl px-4 text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-800 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-slate-900/50 disabled:opacity-60"
          >
            {submitting ? "…" : "Join"}{" "}
            {!submitting && (
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
            )}
          </button>
          {status === "error" && (
            <span className="text-[10px] text-rose-500 font-semibold absolute mt-10">
              Something went wrong. Try again.
            </span>
          )}
        </form>
      )}
    </div>
  );
}
