import type { Metadata } from 'next';
import ResumeGraderClient from './ResumeGraderClient';

export const metadata: Metadata = {
  title: 'Free AI Resume Grader & ATS Score Checker | KodeToCareer',
  description:
    'Evaluate your resume for software engineering, data science, and cloud roles in India. Get instant ATS compatibility score, missing tech keywords, and actionable tips.',
};

export default function ResumeGraderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "KodeToCareer AI Resume Grader & ATS Checker",
            "operatingSystem": "All",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "description": "Evaluate your resume for software engineering, data science, and cloud roles in India. Get instant ATS compatibility score, missing tech keywords, and actionable tips."
          })
        }}
      />
      <ResumeGraderClient />
    </>
  );
}
