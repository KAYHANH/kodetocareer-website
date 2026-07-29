import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import CertificatesAdminClient from "./CertificatesAdminClient";

export const metadata: Metadata = {
  title: "Admin Certificate Portal | KodeToCareer",
  description: "Issue, manage, and verify student certificates.",
};

export default function CertificatesAdminPage() {
  const initialCertificates = getAllCertificates();
  return <CertificatesAdminClient initialCertificates={initialCertificates} />;
}
