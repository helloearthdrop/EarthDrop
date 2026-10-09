import Footer from "@/components/Footer";
import Link from 'next/link';
import { ArrowLeft, Shield, Zap, Globe, Lock } from 'lucide-react';

export const metadata = {
  title: 'About | EarthDrop',
  description: 'Learn about EarthDrop, our mission, and how we are revolutionizing secure, unlimited peer-to-peer file transfers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-900 selection:bg-primary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      <div className="flex-1">
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-700/50">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-6">
            About EarthDrop
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
            <p className="text-lg leading-relaxed mb-8">
              EarthDrop was born out of a simple frustration: sharing large files should not require cloud storage subscriptions, mandatory accounts, or sacrificing your privacy. We believe that file transfer should be as simple and direct as handing something to a friend.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Privacy First</h3>
                <p className="text-sm">We use WebRTC technology to establish a direct connection between devices. Your files never touch our servers, meaning they cannot be intercepted, stored, or leaked.</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Unlimited Speed</h3>
                <p className="text-sm">Because transfers are direct (P2P), speeds are only limited by your internet connection. Skip the upload-then-download wait times entirely.</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to democratize secure data transfer. In an age where digital privacy is constantly eroded, EarthDrop provides a sanctuary for your data. We do not require accounts, we do not track your transfers, and we impose zero artificial limitations on file sizes.
            </p>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-12">
              <h3 className="text-xl font-bold text-primary mb-2">How is it free?</h3>
              <p className="text-sm mb-4">
                EarthDrop is able to remain free and unlimited because we don&apos;t pay for expensive cloud storage or bandwidth to host your files. The actual transfer happens directly between your device and the receiver&apos;s device over WebRTC. Our servers simply facilitate the initial handshake. We cover our minimal server costs through non-intrusive advertising.
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/transfer" 
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-2xl shadow-lg shadow-primary/25"
              >
                Start Sharing Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
