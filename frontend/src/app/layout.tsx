import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#338a61",
};

export const metadata: Metadata = {
  title: "EarthDrop | Secure P2P File Transfer",
  description: "Move files between devices instantly using just your web browser. No limits, no tracking, completely free.",
  keywords: ["file transfer", "p2p", "peer-to-peer", "share files", "secure transfer", "web rtc", "large file transfer", "no size limit", "send files free"],
  authors: [{ name: "EarthDrop" }],
  metadataBase: new URL('https://www.earthdrop.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "EarthDrop | Secure P2P File Transfer",
    description: "Move files between devices instantly using just your web browser. No limits, no tracking, completely free.",
    url: "https://www.earthdrop.in",
    siteName: "EarthDrop",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EarthDrop | Secure P2P File Transfer",
    description: "Move files between devices instantly using just your web browser. No limits, no tracking, completely free.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EarthDrop",
  },
  manifest: '/manifest.json',
  icons: {
    apple: "/icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          id="adsense"
          strategy="afterInteractive" 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3444542685708016" 
          crossOrigin="anonymous" 
        />
        {/* Google Analytics 4 */}
        <Script 
          id="ga-src"
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-WE7CSDVDGV'}`} 
        />
        <Script
          id="ga-inline"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-WE7CSDVDGV'}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Script
          id="service-worker-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
