import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Learn Coding with Placement Assistance | KodeToCareer",
  description: "Learn MERN Stack, Python, AI, Data Analytics and more with live classes, projects, internship and placement support.",
  keywords: ["coding bootcamp", "career training", "AI courses", "web development", "data science", "placements", "internships", "study abroad"],
  openGraph: {
    title: "Learn Coding with Placement Assistance | KodeToCareer",
    description: "Learn MERN Stack, Python, AI, Data Analytics and more with live classes, projects, internship and placement support.",
    type: "website",
    locale: "en_US",
    siteName: "KodeToCareer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Coding with Placement Assistance | KodeToCareer",
    description: "Learn MERN Stack, Python, AI, Data Analytics and more with live classes, projects, internship and placement support.",
  },
};

export default function Page() {
  return <CoursesClient />;
}
