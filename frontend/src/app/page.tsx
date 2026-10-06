"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, MonitorSmartphone, Smartphone, Laptop, Download, CheckCircle2, Lock, EyeOff, FileKey, FileImage, FileVideo, FileCode2, Monitor, Tablet } from "lucide-react";

export default function Home() {
  const devicePairs = [
    { left: Laptop, right: Smartphone },
    { left: Smartphone, right: Smartphone },
    { left: Monitor, right: Laptop },
    { left: Tablet, right: Smartphone },
  ];
  
  const [pairIndex, setPairIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPairIndex((prev) => (prev + 1) % devicePairs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const LeftIcon = devicePairs[pairIndex].left;
  const RightIcon = devicePairs[pairIndex].right;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EarthDrop',
    url: 'https://www.earthdrop.in',
    description: 'Secure, unlimited peer-to-peer file transfer directly in your web browser.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen flex flex-col selection:bg-primary/30">
        {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="w-full px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity -ml-4">
              <Image src="/logo.png" alt="EarthDrop Logo" width={180} height={52} className="object-contain object-left w-[180px]" priority />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-base font-medium text-slate-600 dark:text-slate-300">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#security" className="hover:text-primary transition-colors">Security</Link>
          </nav>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/transfer" className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl transition-all flex items-center gap-1 sm:gap-2 shadow-sm shrink-0">
              <ArrowRight className="w-4 h-4 hidden sm:block" />
              <span>Start Transfer</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 sm:mb-8 border border-primary/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              EarthDrop 1.0 is live
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]"
            >
              Transfer Anything.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Between Any Device.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl"
            >
              Direct peer-to-peer file transfers using your browser. No installation, no size limits, securely encrypted end-to-end.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link href="/transfer" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-xl shadow-primary/30 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Transfer
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#how-it-works" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-full text-base font-medium transition-colors w-full sm:w-auto justify-center flex">
                Learn More
              </Link>
            </motion.div>

            {/* Hero Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-16 w-full max-w-5xl"
            >
              <div className="glass-card aspect-[21/9] min-h-[300px] w-full rounded-3xl overflow-hidden border border-white/20 dark:border-white/10 flex items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] relative">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                
                {/* Left Aura */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute left-[15%] w-64 h-64 bg-primary/20 rounded-full blur-[60px]"
                />
                
                {/* Right Aura */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 2, ease: "easeInOut" }}
                  className="absolute right-[15%] w-64 h-64 bg-accent/20 rounded-full blur-[60px]"
                />

                <div className="flex flex-col items-center relative z-10 w-full px-2 sm:px-12 md:px-24">
                   <div className="flex items-center justify-between w-full max-w-2xl mx-auto relative">
                      
                      {/* Left Node */}
                      <motion.div 
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        className="relative flex flex-col items-center"
                      >
                        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl relative border border-slate-200 dark:border-slate-700">
                          <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={pairIndex}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                              >
                                <LeftIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                              </motion.div>
                            </AnimatePresence>
                          </div>
                          
                          {/* Pulsing Dot */}
                          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-primary rounded-full border-2 sm:border-4 border-slate-50 dark:border-slate-900 z-20">
                            <span className="animate-ping absolute inset-0 rounded-full bg-primary opacity-75"></span>
                          </div>
                        </div>
                        <span className="mt-2 sm:mt-4 text-xs sm:text-sm font-medium text-slate-500">Device 1</span>
                      </motion.div>
                      
                      {/* Connection Line & Flying Files */}
                      <div className="flex-1 flex flex-col items-center justify-center relative px-2 sm:px-8 h-24 sm:h-32">
                        {/* The Wire */}
                        <div className="h-[2px] w-full bg-slate-200 dark:bg-slate-800 relative overflow-hidden rounded-full flex-shrink-0">
                          <motion.div 
                            animate={{ x: ["-100%", "200%", "-100%"] }} 
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
                          />
                        </div>
                        
                        {/* Flying File Left to Right */}
                        <motion.div 
                          animate={{ x: ["-150%", "300%"], opacity: [0, 1, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                          className="absolute top-2 sm:top-4 left-1/4 bg-white dark:bg-slate-800 p-1 sm:p-2 rounded-md sm:rounded-lg shadow-md border border-slate-100 dark:border-slate-700 text-primary"
                        >
                          <FileImage className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.div>

                        {/* Flying File Right to Left */}
                        <motion.div 
                          animate={{ x: ["300%", "-150%"], opacity: [0, 1, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 2.5, delay: 1.2, ease: "easeInOut" }}
                          className="absolute bottom-2 sm:bottom-4 left-1/4 bg-white dark:bg-slate-800 p-1 sm:p-2 rounded-md sm:rounded-lg shadow-md border border-slate-100 dark:border-slate-700 text-accent"
                        >
                          <FileCode2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.div>

                        {/* Label */}
                        <div className="absolute top-1/2 -translate-y-1/2 mt-6 sm:mt-8 md:mt-10 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 z-20">
                          <span className="text-[10px] sm:text-xs md:text-sm font-mono font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent whitespace-nowrap">
                            P2P Bidirectional
                          </span>
                        </div>
                      </div>

                      {/* Right Node */}
                      <motion.div 
                        animate={{ y: [5, -5, 5] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative flex flex-col items-center"
                      >
                        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl relative border border-slate-200 dark:border-slate-700">
                          <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl flex items-center justify-center">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={pairIndex}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                transition={{ duration: 0.4, ease: "backOut", delay: 0.1 }}
                              >
                                <RightIcon className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                              </motion.div>
                            </AnimatePresence>
                          </div>
                          
                          {/* Pulsing Dot */}
                          <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-accent rounded-full border-2 sm:border-4 border-slate-50 dark:border-slate-900 z-20">
                            <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-75" style={{ animationDelay: '1s' }}></span>
                          </div>
                        </div>
                        <span className="mt-2 sm:mt-4 text-xs sm:text-sm font-medium text-slate-500">Device 2</span>
                      </motion.div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards */}
        <section id="features" className="py-20 px-6 bg-white dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Everything you need, nothing you don&apos;t.</h2>
              <p className="text-slate-500">EarthDrop is built for pure speed and simplicity.</p>
            </div>
            {/* Horizontal Marquee Container */}
            <div className="relative w-full overflow-hidden flex group py-10 -my-10">
              
              {/* Fade masks for the edges */}
              <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none"></div>

              {/* The scrolling track */}
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {/* We map the array twice to create a seamless infinite scroll loop */}
                {[
                  { icon: Zap, title: "Blazing Fast", desc: "Files transfer directly between devices using WebRTC Data Channels. No intermediate servers slowing you down." },
                  { icon: Shield, title: "End-to-End Secure", desc: "Your files never touch our servers. They are encrypted and sent directly to the receiver." },
                  { icon: MonitorSmartphone, title: "Cross Platform", desc: "Works perfectly on Windows, macOS, Linux, iOS, and Android. If it has a browser, it works." },
                  { icon: Download, title: "Browser Based", desc: "Files stream directly through your web browser's memory without needing to be uploaded to a cloud server." },
                  { icon: Smartphone, title: "No Installation", desc: "Stop downloading sketchy apps to transfer files. EarthDrop runs entirely in your web browser." },
                  { icon: CheckCircle2, title: "100% Free", desc: "No subscriptions, no accounts, no premium tiers. Just free, open file sharing for everyone." },
                  // DUPLICATED FOR INFINITE LOOP
                  { icon: Zap, title: "Blazing Fast", desc: "Files transfer directly between devices using WebRTC Data Channels. No intermediate servers slowing you down." },
                  { icon: Shield, title: "End-to-End Secure", desc: "Your files never touch our servers. They are encrypted and sent directly to the receiver." },
                  { icon: MonitorSmartphone, title: "Cross Platform", desc: "Works perfectly on Windows, macOS, Linux, iOS, and Android. If it has a browser, it works." },
                  { icon: Download, title: "Browser Based", desc: "Files stream directly through your web browser's memory without needing to be uploaded to a cloud server." },
                  { icon: Smartphone, title: "No Installation", desc: "Stop downloading sketchy apps to transfer files. EarthDrop runs entirely in your web browser." },
                  { icon: CheckCircle2, title: "100% Free", desc: "No subscriptions, no accounts, no premium tiers. Just free, open file sharing for everyone." },
                ].map((feature, i) => (
                  <div key={i} className="w-[320px] sm:w-[380px] flex-shrink-0 mx-4">
                    <div className="glass-card p-8 flex flex-col items-start group/card relative h-full">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-6 group-hover/card:bg-primary group-hover/card:text-white transition-all shadow-md relative z-10 group-hover/card:scale-110 group-hover/card:rotate-6 duration-300">
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 relative z-10">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed relative z-10">{feature.desc}</p>
                      
                      {/* Hover background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-6 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How it works</h2>
              <p className="text-slate-500">Start transferring in seconds.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Open EarthDrop", desc: "Visit EarthDrop.com on both devices." },
                { step: "2", title: "Generate Code", desc: "Click 'Start Transfer' to get a secure 6-digit room code." },
                { step: "3", title: "Connect", desc: "Enter the code on the receiving device to pair them." },
                { step: "4", title: "Drag & Drop", desc: "Drop files into the window and watch them transfer instantly." },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.4, ease: "easeInOut" }}
                    whileHover={{ scale: 1.15 }}
                    className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-primary mb-6 z-10 border-4 border-slate-50 dark:border-slate-950 shadow-md"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                  
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[50%] w-[100%] h-[2px] bg-slate-100 dark:bg-slate-800 -z-0">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: (i * 0.2) + 0.3, ease: "easeInOut" }}
                        className="h-full bg-primary/30"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section - Animated & Minimal */}
        <section id="security" className="py-24 px-6 border-b border-slate-100 dark:border-slate-800 scroll-mt-10 relative overflow-hidden">
          {/* Subtle animated background shapes */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"
          />
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="flex-1 text-center md:text-left">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 shadow-sm border border-primary/20 relative"
              >
                <motion.div 
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  <Shield className="w-10 h-10" />
                </motion.div>
                {/* Radar sweep effect */}
                <div className="absolute inset-0 rounded-3xl border border-primary/30 animate-ping" style={{ animationDuration: '3s' }}></div>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Security & Privacy First.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
              >
                EarthDrop is built on the fundamental principle that your files belong to you. We act merely as a temporary bridge to introduce your two devices.
              </motion.p>
            </div>
            
            <div className="flex-1 w-full">
              <ul className="space-y-8">
                {[
                  { icon: Lock, title: "End-to-End Encryption", text: "Files are encrypted before leaving your browser using WebRTC standard DTLS/SRTP." },
                  { icon: EyeOff, title: "No Server Storage", text: "Your files are transferred directly via P2P. We don't have databases storing your data." },
                  { icon: FileKey, title: "Temporary Sessions", text: "Room codes expire, and sessions are immediately destroyed when the browser is closed." },
                ].map((item, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 4, delay: i * 0.8, ease: "easeInOut" },
                      opacity: { duration: 0.4, delay: i * 0.1 },
                      x: { duration: 0.4, delay: i * 0.1 }
                    }}
                    key={i} 
                    className="flex gap-5 items-start bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} EarthDrop.</p>
            <span className="hidden sm:inline">•</span>
            <p>Dhyey Raja</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
