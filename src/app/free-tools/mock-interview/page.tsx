import type { Metadata } from 'next';
import MockInterviewClient from './MockInterviewClient';

export const metadata: Metadata = {
  title: 'Free AI Mock Technical Interview Simulator | KodeToCareer',
  description:
    'Practice 5-question technical interview rounds for Full Stack MERN, Data Science, Java, and Cloud roles. Get instant scoring and feedback.',
};

export default function MockInterviewPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "KodeToCareer AI Mock Technical Interview Simulator",
            "operatingSystem": "All",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Practice 5-question technical interview rounds for Full Stack MERN, Data Science, Java, and Cloud roles. Get instant scoring and feedback."
          })
        }}
      />
      <MockInterviewClient />
    </>
  );
}
