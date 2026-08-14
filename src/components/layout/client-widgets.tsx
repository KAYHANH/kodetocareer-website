'use client';

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const FloatingCta = dynamic(() => import("@/components/ui/floating-cta"), { ssr: false });
const GlobalAdmissionsPopup = dynamic(() => import("@/components/ui/global-admissions-popup"), { ssr: false });
const AICareerCounselorWidget = dynamic(() => import("@/components/ui/AICareerCounselorWidget"), { ssr: false });

export default function ClientWidgets() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount widgets on initial client render so interactive triggers and popup listeners are immediately active
    setMounted(true);
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
