import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col relative">
      
      {/* Fixed Navbar */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity -ml-4">
            <Image src="/logo.png" alt="EarthDrop Logo" width={180} height={52} className="object-contain object-left w-[180px]" priority />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-4 text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8">
          <Mail className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
          Need help, found a bug, or just want to get in touch? Send us an email and we&apos;ll get back to you as soon as possible.
        </p>
        
        <a 
          href="mailto:hello.earthdrop@gmail.com" 
          className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-medium transition-all flex items-center gap-3 text-lg shadow-xl shadow-primary/20"
        >
          <Mail className="w-5 h-5" />
          hello.earthdrop@gmail.com
        </a>
      </div>
    </div>
  );
}
