import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us | KodeToCareer Academy',
  description: 'Learn about KodeToCareer, an AI-powered technology academy on a mission to build pre-vetted developer talent and link them directly to top hiring partners.',
  alternates: {
    canonical: 'https://kodetocareer.com/about',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://kodetocareer.com/about/#webpage",
        "url": "https://kodetocareer.com/about",
        "name": "About Us | KodeToCareer Academy",
        "description": "Learn about KodeToCareer, an AI-powered technology academy on a mission to build pre-vetted developer talent and link them directly to top hiring partners.",
        "mainEntity": {
          "@id": "https://kodetocareer.com/#organization"
        }
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://kodetocareer.com/#organization",
        "name": "KodeToCareer",
        "url": "https://kodetocareer.com",
        "logo": "https://kodetocareer.com/main-logo.png",
        "description": "AI-Powered Software Engineering & Placement Institute offering 100% live cohorts, guaranteed internships, and dedicated career placement support.",
        "foundingDate": "2021",
        "award": [
          "ISO 9001:2015 Accredited",
          "NSDC Partner",
          "Startup India Recognized"
        ],
        "founder": {
          "@type": "Person",
          "name": "Md Arbaaz",
          "jobTitle": "Founder & Lead Tech Instructor"
        },
        "member": [
          {
            "@type": "Person",
            "name": "Md Arbaaz",
            "jobTitle": "Founder & Lead Tech Instructor"
          },
          {
            "@type": "Person",
            "name": "Mohd Kaunain",
            "jobTitle": "Managing Director & Co-Founder"
          },
          {
            "@type": "Person",
            "name": "Farhan",
            "jobTitle": "Full Stack & AI Mentor"
          },
          {
            "@type": "Person",
            "name": "Ayesha Kamal",
            "jobTitle": "Learning & Design Specialist"
          },
          {
            "@type": "Person",
            "name": "Md Faiz",
            "jobTitle": "Brand & Content Lead"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClient />
    </>
  );
}

