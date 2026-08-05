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
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kodetocareer.com'),
  title: "KodeToCareer | Live Coding & AI Placement Institute",
  description:
    "Master Full Stack, Data Science, AI & DevOps with 100% live cohorts, guaranteed paid internships, and dedicated placement support in Noida & online.",
  applicationName: 'KodeToCareer',
  authors: [{ name: 'KodeToCareer Team', url: 'https://kodetocareer.com' }],
  generator: 'Next.js',
  keywords: [
    'MERN Stack Course Noida',
    'Data Science Institute Noida',
    'AI Coding Bootcamp',
    'Full Stack Placement Support',
    'Python Training Noida',
    'Java Full Stack Course'
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://script.google.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/main-logo.png" as="image" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EducationalOrganization",
                  "@id": "https://kodetocareer.com/#organization",
                  "name": "KodeToCareer",
                  "url": "https://kodetocareer.com",
                  "logo": "https://kodetocareer.com/main-logo.png",
                  "description": "AI-Powered Software Engineering & Placement Institute offering 100% live cohorts, guaranteed internships, and dedicated career placement support.",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "A-48, Basement, Sector 2",
                    "addressLocality": "Noida",
                    "addressRegion": "Uttar Pradesh",
                    "postalCode": "201301",
                    "addressCountry": "IN"
                  },
                  "telephone": "+919667975616",
                  "sameAs": [
                    "https://www.linkedin.com/company/kode2career/",
                    "https://www.instagram.com/kodetocareer",
                    "https://www.youtube.com/@KodeToCareer"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://kodetocareer.com/#website",
                  "url": "https://kodetocareer.com",
                  "name": "KodeToCareer",
                  "publisher": {
                    "@id": "https://kodetocareer.com/#organization"
                  }
                }
              ]
            })
          }}
        />
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

