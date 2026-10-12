import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | EarthDrop",
  description: "Get in touch with the EarthDrop team for questions, feedback, or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 flex flex-col selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-md mx-auto w-full flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 shadow-sm">
            <Mail className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
            Need help, found a bug, or just want to get in touch? Send us an email and we&apos;ll get back to you as soon as possible.
          </p>
          
          <a 
            href="mailto:hello.earthdrop@gmail.com" 
            className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-medium transition-all flex items-center gap-3 text-base sm:text-lg shadow-xl shadow-primary/20 active:scale-[0.98]"
          >
            <Mail className="w-5 h-5" />
            hello.earthdrop@gmail.com
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
