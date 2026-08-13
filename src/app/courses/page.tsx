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
  const corePrograms = [
    {
      position: 1,
      name: "MERN Stack Development + AI Integration",
      url: "https://kodetocareer.com/courses/mern-stack-development",
      description: "Master full-stack web development and learn to build AI-powered features, chatbots, and automation workflows.",
    },
    {
      position: 2,
      name: "Python Programming & Automation",
      url: "https://kodetocareer.com/courses/python-programming",
      description: "Learn core python scripting, database connections, automated workflows, scraping, and integrating AI endpoints.",
    },
    {
      position: 3,
      name: "Data Science & Machine Learning Core",
      url: "https://kodetocareer.com/courses/data-science-machine-learning",
      description: "Master Python, SQL, Machine Learning, Deep Learning, Power BI, and Generative AI through live training and real-world projects.",
    },
    {
      position: 4,
      name: "Graphic Design + UI/UX Product Design Systems",
      url: "https://kodetocareer.com/courses/graphic-design-ui-ux",
      description: "Master layout theory, user psychology, information hierarchy, wireframing, high-fidelity prototypes, and component design systems.",
    },
    {
      position: 5,
      name: "Data Analytics & Business Intelligence",
      url: "https://kodetocareer.com/courses/data-analytics",
      description: "Master Microsoft Excel, SQL databases, Python analytics libraries, and Power BI dashboards through live sessions and case studies.",
    },
    {
      position: 6,
      name: "Java Full Stack Developer Program",
      url: "https://kodetocareer.com/courses/java-full-stack",
      description: "Master Core Java, Spring Boot, Hibernate, microservices, databases, and React frontend integrations.",
    },
    {
      position: 7,
      name: "Cloud Computing & DevOps Infrastructure",
      url: "https://kodetocareer.com/courses/cloud-devops",
      description: "Learn to design highly-scalable cloud architectures, write Infrastructure-as-Code scripts, compile containers, and launch pipelines.",
    },
    {
      position: 8,
      name: "Digital Marketing with AI & Growth Hacking",
      url: "https://kodetocareer.com/courses/digital-marketing",
      description: "Master marketing fundamentals, manage paid campaigns on social sites, optimize organic rankings, and write AI-powered copy.",
    },
    {
      position: 9,
      name: "Graphic Designing + Videography / Video Editing",
      url: "https://kodetocareer.com/courses/videography-video-editing",
      description: "Learn professional graphic design, photography, cinematographic video capture, Premiere Pro editing, and After Effects motion graphics.",
    },
    {
      position: 10,
      name: "Industry-Ready MLOps & AI Systems Engineering",
      url: "https://kodetocareer.com/courses/mlops-ai-systems",
      description: "Build, deploy, optimize, monitor, and scale enterprise AI systems and LLM inference clusters in production.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "KodeToCareer Core Software & Tech Training Programs",
    "description": "Comprehensive career-focused software engineering, data science, design, and cloud bootcamps.",
    "numberOfItems": corePrograms.length,
    "itemListElement": corePrograms.map((program) => ({
      "@type": "ListItem",
      "position": program.position,
      "name": program.name,
      "url": program.url,
      "description": program.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoursesClient />
    </>
  );
}

