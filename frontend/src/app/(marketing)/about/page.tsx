import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, Zap, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About | EarthDrop",
  description: "Learn about EarthDrop, our mission, and how we are revolutionizing secure, unlimited peer-to-peer file transfers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white dark:bg-slate-950 selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            About EarthDrop
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300 mb-10">
            EarthDrop was born out of a simple frustration: sharing large files should not require cloud storage subscriptions, mandatory accounts, or sacrificing your privacy. We believe that file transfer should be as simple and direct as handing something to a friend.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Privacy First</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                We use WebRTC technology to establish a direct connection between devices. Your files never touch our servers, meaning they cannot be intercepted, stored, or leaked.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-primary/20">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Unlimited Speed</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Because transfers are direct (P2P), speeds are only limited by your internet connection. Skip the upload-then-download wait times entirely.
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-12 mb-4">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10">
            Our mission is to democratize secure data transfer. In an age where digital privacy is constantly eroded, EarthDrop provides a sanctuary for your data. We do not require accounts, we do not track your transfers, and we impose zero artificial limitations on file sizes.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 mt-10 mb-12">
            <h3 className="text-xl font-bold text-primary mb-3">How is it free?</h3>
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
              EarthDrop is able to remain free and unlimited because we don&apos;t pay for expensive cloud storage or bandwidth to host your files. The actual transfer happens directly between your device and the receiver&apos;s device over WebRTC. Our servers simply facilitate the initial handshake. We cover our minimal server costs through non-intrusive advertising.
            </p>
          </div>

          <div className="text-center pt-4">
            <Link 
              href="/transfer" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all bg-primary hover:bg-primary-hover active:scale-[0.98] rounded-2xl shadow-lg shadow-primary/25"
            >
              <span>Start Sharing Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
