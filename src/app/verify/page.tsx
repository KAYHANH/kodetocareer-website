import { Metadata } from "next";
import VerifyClient from "./[id]/VerifyClient";

export const metadata: Metadata = {
  title: "Verify Student Certificates & Credentials | KodeToCareer",
  description:
    "Verify digital certificates and academic credentials issued by KodeToCareer Academy using cryptographic verification.",
};

export default function VerifyIndexPage() {
  return <VerifyClient cert={null} />;
}
