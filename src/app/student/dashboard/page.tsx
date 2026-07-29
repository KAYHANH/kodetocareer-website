import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import StudentClient from "./StudentClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Student Portal & Credential Hub | KodeToCareer",
  description: "View and verify your earned certificates and course credentials.",
};

export default function StudentDashboardPage() {
  const certificates = getAllCertificates();
  return <StudentClient certificates={certificates} />;
}
