import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import TrainerClient from "./TrainerClient";

export const metadata: Metadata = {
  title: "Trainer Dashboard | KodeToCareer",
  description: "Trainer portal for managing student rosters and course certificates.",
};

export default function TrainerDashboardPage() {
  const certificates = getAllCertificates();
  return <TrainerClient certificates={certificates} />;
}
