import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import StudentClient from "./StudentClient";

export const metadata: Metadata = {
  title: "Student Dashboard | KodeToCareer",
  description: "Student portal for viewing earned certificates and verified credentials.",
};

export default function StudentDashboardPage() {
  const certificates = getAllCertificates();
  return <StudentClient certificates={certificates} />;
}
