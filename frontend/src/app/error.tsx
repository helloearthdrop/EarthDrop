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
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 selection:bg-primary/30 p-4 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 p-8 sm:p-12 overflow-hidden relative">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          Something went wrong!
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-medium">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200 transition-all bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 active:scale-[0.98] rounded-2xl"
          >
            Try Again
          </button>
          <Link 
            href="/" 
            className="flex-1 inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-white transition-all bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-2xl shadow-lg shadow-primary/25"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
