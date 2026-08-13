import type { Metadata } from "next";
import { Sora, Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import BackgroundOrbs from "@/components/ui/background-orbs";
import ClientWidgets from "@/components/layout/client-widgets";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

import JsonLdSchema from "@/components/layout/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL('https://kodetocareer.com'),
  title: "KodeToCareer | Career-Focused Tech Courses, Internships & Placement Support",
  description:
    "Learn MERN Stack, Python, Data Science, Data Analytics, Java, AI, Cloud, DevOps and Digital Marketing through practical training, projects, internships and career support. Online programs available across India.",
  applicationName: 'KodeToCareer',
  authors: [{ name: 'KodeToCareer Team', url: 'https://kodetocareer.com' }],
  generator: 'Next.js',
  keywords: [
    'KodeToCareer',
    'Career Tech Courses India',
    'Full Stack Web Development Course',
    'Data Science AI Masterclass',
    'Data Analytics Course India',
    'Java Spring Boot Full Stack',
    'Cloud DevOps Certification',
    'Tech Internships with Placement Support',
    'Online Coding Bootcamp India',
    'Best Tech Courses After BCA BTech'
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'KodeToCareer Educational Institute',
  publisher: 'KodeToCareer Educational Institute',
  category: 'education',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/main-logo.png',
  },
  appleWebApp: {
    title: 'KodeToCareer',
    statusBarStyle: 'default',
    capable: true,
  },
  openGraph: {
    title: "KodeToCareer | Live Coding & AI Placement Institute",
    description:
      "Master Full Stack, Data Science, AI & DevOps with 100% live cohorts, guaranteed paid internships, and dedicated placement support in Noida & online.",
    url: 'https://kodetocareer.com',
    siteName: 'KodeToCareer',
    images: [
      {
        url: '/main-logo.png',
        width: 1200,
        height: 630,
        alt: 'KodeToCareer AI-Powered Software Training Institute',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "KodeToCareer | Live Coding & AI Placement Institute",
    description: "Master Full Stack, Data Science, AI & DevOps with 100% live cohorts, guaranteed paid internships, and dedicated placement support.",
    images: ['/main-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'msvalidate.01': '5C51AF66E37595BD309DE4C2B307A3DC',
    },
  },
  alternates: {
    canonical: 'https://kodetocareer.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="5C51AF66E37595BD309DE4C2B307A3DC" />
        {/* DNS prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://script.google.com" />
        {/* Preload actual LCP asset — the central orbit logo visible in viewport */}
        {/* NOTE: No preconnect to fonts.googleapis.com — next/font/google self-hosts fonts on our domain */}
        <link rel="preload" href="/logo-icon.png" as="image" type="image/png" fetchPriority="high" />
        <JsonLdSchema />
      </head>

      <body className="flex min-h-full flex-col bg-background text-text-primary font-body relative" suppressHydrationWarning>
        <BackgroundOrbs />
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1 pt-20 pb-20 md:pb-0 relative z-10" suppressHydrationWarning>{children}</main>
        <Footer />
        <ClientWidgets />
      </body>
    </html>
  );
}

