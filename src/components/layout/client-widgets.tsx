'use client';

import dynamic from "next/dynamic";

const FloatingCta = dynamic(() => import("@/components/ui/floating-cta"), { ssr: false });
const GlobalAdmissionsPopup = dynamic(() => import("@/components/ui/global-admissions-popup"), { ssr: false });
const AICareerCounselorWidget = dynamic(() => import("@/components/ui/AICareerCounselorWidget"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <FloatingCta />
      <GlobalAdmissionsPopup />
      <AICareerCounselorWidget />
    </>
  );
}
