import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 glass">
      <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity -ml-4">
          <Image 
            src="/logo.png" 
            alt="EarthDrop Logo" 
            width={180} 
            height={52} 
            className="object-contain object-left w-[180px]" 
            priority 
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="/#security" className="hover:text-primary transition-colors">Security</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4 shrink-0">
          <Link 
            href="/transfer" 
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all flex items-center gap-1 sm:gap-2 shadow-sm shrink-0"
          >
            <ArrowRight className="w-4 h-4 hidden sm:block" />
            <span>Start Transfer</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
