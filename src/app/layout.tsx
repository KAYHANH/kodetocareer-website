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
  title: "AI-Powered Software Training Institute | Full Stack, Data Science & Placement | KodeToCareer",
  description:
    "Master Full Stack Development, Data Science, AI, and DevOps through live industry projects. Join KodeToCareer for placement-focused training with 100% career support.",
  openGraph: {
    title: "AI-Powered Software Training Institute | Full Stack, Data Science & Placement | KodeToCareer",
    description:
      "Master Full Stack Development, Data Science, AI, and DevOps through live industry projects. Join KodeToCareer for placement-focused training with 100% career support.",
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
    title: "AI-Powered Software Training Institute | KodeToCareer",
    description: "Master Full Stack Development, Data Science, AI, and DevOps through live industry projects with 100% placement support.",
    images: ['/main-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
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

