import type { Metadata } from 'next';
import ResumeGraderClient from './ResumeGraderClient';
import SchemaMarkup from '@/components/seo/schema-markup';

export const metadata: Metadata = {
  title: 'Free AI Resume Grader & ATS Score Checker | KodeToCareer',
  description:
    'Evaluate your resume for software engineering, data science, and cloud roles in India. Get instant ATS compatibility score, missing tech keywords, and actionable tips.',
};

export default function ResumeGraderPage() {
  const softwareAppData = {
    name: 'KodeToCareer AI Resume Grader & ATS Checker',
    operatingSystem: 'All',
    applicationCategory: 'EducationalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    },
    description: 'Evaluate your resume for software engineering, data science, and cloud roles in India. Get instant ATS compatibility score, missing tech keywords, and actionable tips.'
  };

  const howToData = {
    name: 'How to Grade and Optimize Your Tech Resume for ATS',
    description: 'Step-by-step guide to grading your tech resume, analyzing ATS keyword gaps, and optimizing for software engineering and data roles.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Upload Resume PDF/Word',
        text: 'Upload your existing resume file in PDF or Word format to the AI Resume Grader.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Enter Target Job Role',
        text: 'Specify your target job role such as Full Stack Engineer, Data Scientist, or Cloud Engineer.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Analyze ATS Match & Keyword Gaps',
        text: 'Run the AI analysis to view your overall ATS compatibility score and identify missing technical keywords.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Apply Recommendations',
        text: 'Apply tailored recommendations and keyword suggestions to optimize your resume for recruiters and ATS filters.'
      }
    ]
  };

  return (
    <>
      <SchemaMarkup type="SoftwareApplication" data={softwareAppData} />
      <SchemaMarkup type="HowTo" data={howToData} />
      <ResumeGraderClient />
    </>
  );
}
