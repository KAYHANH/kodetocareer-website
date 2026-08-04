import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "Software Training Courses & Placement Bootcamps | KodeToCareer",
  description: "Learn MERN Stack Development, Python, AI Engineering, Data Analytics, Java, and DevOps through live interactive classes and guaranteed internships.",
  keywords: ["coding bootcamp", "career training", "AI courses", "web development", "data science", "placements", "internships"],
  openGraph: {
    title: "Software Training Courses & Placement Bootcamps | KodeToCareer",
    description: "Learn MERN Stack Development, Python, AI Engineering, Data Analytics, Java, and DevOps through live interactive classes and guaranteed internships.",
    url: "https://kodetocareer.com/courses",
    type: "website",
    locale: "en_US",
    siteName: "KodeToCareer",
    images: [
      {
        url: "/main-logo.png",
        width: 1200,
        height: 630,
        alt: "KodeToCareer Software Training Courses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Training Courses & Placement Bootcamps | KodeToCareer",
    description: "Learn MERN Stack Development, Python, AI Engineering, Data Analytics, Java, and DevOps through live interactive classes and guaranteed internships.",
    images: ["/main-logo.png"],
  },
  alternates: {
    canonical: "https://kodetocareer.com/courses",
  },
};

export default function Page() {
  return <CoursesClient />;
}
