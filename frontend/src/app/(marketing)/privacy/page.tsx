import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";


export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950 pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity -ml-4">
            <Image src="/logo.png" alt="EarthDrop Logo" width={180} height={52} className="object-contain object-left w-[180px]" priority />
          </Link>
        </div>
      </header>
      <div className="flex-1">


      <div className="max-w-3xl mx-auto w-full">
        
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 sm:mb-12">Privacy Policy</h1>
        
        <div className="space-y-8 sm:space-y-10 text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">The Short Version</h2>
            <p>We do not collect, store, or sell your personal data. We do not track your IP address across the web. We do not store the files you transfer.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">How File Transfers Work</h2>
            <p>EarthDrop uses WebRTC technology. This means when you transfer a file, it travels directly from your device to the receiver&apos;s device. The files are end-to-end encrypted and never pass through our database or servers.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">What Data We Briefly Process</h2>
            <p>To connect two devices, our signaling server temporarily holds the 6-character room code you generate. This is purely to act as a handshake bridge between you and the receiver. Once the connection is established, or after the session expires, this handshake data is permanently destroyed.</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-3 sm:mb-4">Advertising & Cookies</h2>
            <p>To keep EarthDrop 100% free for everyone, our only source of revenue is displaying advertisements. We use third-party advertising companies (such as Google AdSense) to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites on the internet. You can opt out of personalized advertising by visiting the ad network&apos;s settings.</p>
          </section>
          
          <div className="pt-12 mt-12 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500">
              Last updated: October 2026. If you have any questions about this policy, reach out to us at <a href="mailto:hello.earthdrop@gmail.com" className="text-primary hover:underline">hello.earthdrop@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
