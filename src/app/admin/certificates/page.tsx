import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import CertificatesAdminClient from "./CertificatesAdminClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Admin Certificate Portal | KodeToCareer",
  description: "Official KodeToCareer administrative portal to issue, manage, audit, and securely verify student graduation certificates and academic credentials.",
};

export default function CertificatesAdminPage() {
  const initialCertificates = getAllCertificates();
  return <CertificatesAdminClient initialCertificates={initialCertificates} />;
}
