import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 selection:bg-primary/30 p-4 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none border border-slate-100 dark:border-slate-700/50 p-8 sm:p-12 overflow-hidden relative">
        <h2 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-4">
          404
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-medium">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-semibold text-white transition-all bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-2xl shadow-lg shadow-primary/25"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
