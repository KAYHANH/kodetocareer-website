import type { Metadata } from "next";
import { Sora, Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingCta from "@/components/ui/floating-cta";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kodetocareer.com'),
  title: "KodeToCareer — AI-Powered Career Hub",
  description:
    "Empowering the next generation of tech professionals with industry-ready skills, global opportunities, and AI-driven career guidance.",
  openGraph: {
    title: "KodeToCareer — AI-Powered Career Hub",
    description:
      "Empowering the next generation of tech professionals with industry-ready skills, global opportunities, and AI-driven career guidance.",
    siteName: 'KodeToCareer',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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

      <body className="flex min-h-full flex-col bg-background text-text-primary font-body" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
