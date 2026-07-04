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
  title: "KodeToCareer — AI-Powered Career Hub",
  description:
    "Empowering the next generation of tech professionals with industry-ready skills, global opportunities, and AI-driven career guidance.",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const clean = (node) => {
                  if (node && node.nodeType === 1) {
                    if (node.hasAttribute('bis_skin_checked')) {
                      node.removeAttribute('bis_skin_checked');
                    }
                    const kids = node.querySelectorAll('[bis_skin_checked]');
                    for (let i = 0; i < kids.length; i++) {
                      kids[i].removeAttribute('bis_skin_checked');
                    }
                  }
                };
                if (typeof document !== 'undefined' && document.documentElement) {
                  clean(document.documentElement);
                }
                const observer = new MutationObserver((mutations) => {
                  for (let i = 0; i < mutations.length; i++) {
                    const m = mutations[i];
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    } else if (m.type === 'childList') {
                      for (let j = 0; j < m.addedNodes.length; j++) {
                        clean(m.addedNodes[j]);
                      }
                    }
                  }
                });
                observer.observe(document.documentElement, {
                  childList: true,
                  subtree: true,
                  attributes: true,
                  attributeFilter: ['bis_skin_checked']
                });
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-text-primary font-body" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
