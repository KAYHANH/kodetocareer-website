import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Counselor Team | KodeToCareer',
  description: 'Connect with KodeToCareer partner relations or book counseling sessions to discuss tech course enrollments, fees, placements, and syllabus details.',
  alternates: {
    canonical: 'https://kodetocareer.com/contact',
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://kodetocareer.com/contact/#webpage",
        "url": "https://kodetocareer.com/contact",
        "name": "Contact Counselor Team | KodeToCareer",
        "description": "Connect with KodeToCareer partner relations or book counseling sessions to discuss tech course enrollments, fees, placements, and syllabus details.",
        "mainEntity": {
          "@id": "https://kodetocareer.com/#organization"
        }
      },
      {
        "@type": ["LocalBusiness", "EducationalOrganization"],
        "@id": "https://kodetocareer.com/#organization",
        "name": "KodeToCareer",
        "url": "https://kodetocareer.com",
        "logo": "https://kodetocareer.com/main-logo.png",
        "telephone": "+91 93117 24200",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-48, Basement, Sector 2",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.585943,
          "longitude": 77.312582
        },
        "openingHours": [
          "Mo-Fr 09:00-19:00",
          "Sa 10:00-16:00"
        ],
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "19:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "10:00",
            "closes": "16:00"
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
      <ContactClient />
    </>
  );
}

