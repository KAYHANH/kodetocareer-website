'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-6 py-24 text-center">
      <div className="max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
          Something went wrong!
        </h2>
        <p className="text-slate-500 text-xs font-semibold mt-3 leading-relaxed">
          An unexpected error occurred while loading this page. Please try again or return to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-blue-700 transition-all cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
