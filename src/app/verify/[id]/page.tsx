import { Metadata } from "next";
import { getCertificateById } from "@/lib/certificates-store";
import VerifyClient from "./VerifyClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const cert = getCertificateById(id);

  if (!cert) {
    return {
      title: "Certificate Verification | KodeToCareer",
      description: "Verify digital certificates and credentials issued by KodeToCareer Academy.",
    };
  }

  return {
    title: `Verified Certificate: ${cert.studentName} — ${cert.courseTitle} | KodeToCareer`,
    description: `Official verified credential awarded to ${cert.studentName} for ${cert.courseTitle}. Certificate ID: ${cert.id}.`,
    openGraph: {
      title: `Verified Certificate: ${cert.studentName} — KodeToCareer`,
      description: `Official credential for ${cert.courseTitle}. Verified status: ${cert.status}.`,
    },
  };
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cert = getCertificateById(id);

  return <VerifyClient cert={cert} />;
}
