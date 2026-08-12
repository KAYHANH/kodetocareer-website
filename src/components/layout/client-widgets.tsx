'use client';

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const FloatingCta = dynamic(() => import("@/components/ui/floating-cta"), { ssr: false });
const GlobalAdmissionsPopup = dynamic(() => import("@/components/ui/global-admissions-popup"), { ssr: false });
const AICareerCounselorWidget = dynamic(() => import("@/components/ui/AICareerCounselorWidget"), { ssr: false });

export default function ClientWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay non-critical widgets until after page is fully interactive
    // This prevents them from competing with LCP and reducing TBT score
    const timer = setTimeout(() => setMounted(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <FloatingCta />
      <GlobalAdmissionsPopup />
      <AICareerCounselorWidget />
    </>
  );
}
