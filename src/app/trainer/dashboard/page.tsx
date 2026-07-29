import { Metadata } from "next";
import { getAllCertificates } from "@/lib/certificates-store";
import TrainerClient from "./TrainerClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Trainer Console | KodeToCareer",
  description: "Manage student certificates and class progress.",
};

export default function TrainerDashboardPage() {
  const certificates = getAllCertificates();
  return <TrainerClient certificates={certificates} />;
}
