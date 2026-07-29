import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Sign In — Unified Credential & Academic Portal | KodeToCareer",
  description: "Sign in as Super Admin, Trainer, or Student to access certificate issuance, student rosters, and digital credentials.",
};

export default function LoginPage() {
  return <LoginClient />;
}
