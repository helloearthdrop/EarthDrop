import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";


export default function TermsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white dark:bg-slate-950">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity -ml-4">
            <Image src="/logo.png" alt="EarthDrop Logo" width={180} height={52} className="object-contain object-left w-[180px]" priority />
          </Link>
        </div>
      </header>
      <div className="flex-1 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">


      <div className="max-w-3xl mx-auto w-full">
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 sm:mb-12">Terms of Service</h1>
        
        <div className="space-y-8 sm:space-y-10 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">1. Keep it Legal</h2>
            <p>EarthDrop is a peer-to-peer file transfer tool. You agree not to use this service to transfer illegal, pirated, or malicious files. You are completely and solely responsible for the data you choose to send and receive.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">2. Zero Liability</h2>
            <p>Because files are transferred directly between devices and never touch our servers, we have absolutely no control over the content. EarthDrop is provided &quot;as is&quot; without any warranties. We are not liable for any data loss, network issues, or damages resulting from using the service.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">3. Fair Use</h2>
            <p>EarthDrop is currently completely free. We ask that you do not attempt to overload, attack, or abuse our signaling servers. We reserve the right to temporarily or permanently block access to anyone abusing the platform.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">4. Absolute Privacy</h2>
            <p>We do not track you. We do not store your files. Your files travel through an encrypted tunnel directly to the recipient. Our server only briefly holds the 6-character room code to connect the two devices, and destroys that data the second the session ends.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">5. Unregistered Status & Legal Immunity</h2>
            <p>EarthDrop is an independent, unregistered hobby project and is not backed by a registered corporation or legal entity. By choosing to use this free website, you explicitly waive any right to sue, make claims, or take any legal action against the developers, creators, or hosting providers under any circumstances.</p>
          </section>
          
          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">
              Last updated: October 2026. If you have any questions, reach out to us at <a href="mailto:hello.earthdrop@gmail.com" className="text-primary hover:underline">hello.earthdrop@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
