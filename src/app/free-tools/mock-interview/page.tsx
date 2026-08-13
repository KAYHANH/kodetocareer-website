import type { Metadata } from 'next';
import MockInterviewClient from './MockInterviewClient';
import SchemaMarkup from '@/components/seo/schema-markup';

export const metadata: Metadata = {
  title: 'Free AI Mock Technical Interview Simulator | KodeToCareer',
  description:
    'Practice 5-question technical interview rounds for Full Stack MERN, Data Science, Java, and Cloud roles. Get instant scoring and feedback.',
};

export default function MockInterviewPage() {
  const softwareAppData = {
    name: 'KodeToCareer AI Mock Technical Interview Simulator',
    operatingSystem: 'All',
    applicationCategory: 'EducationalApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    },
    description: 'Practice 5-question technical interview rounds for Full Stack MERN, Data Science, Java, and Cloud roles. Get instant scoring and feedback.'
  };

  const howToData = {
    name: 'How to Practice Technical Interviews with AI',
    description: 'Step-by-step guide to practicing technical interview rounds for MERN, Data Science, Java, and Cloud roles with AI.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Select Tech Track & Experience Level',
        text: 'Select your target tech track (such as Full Stack MERN, Data Science, Java, or Cloud/DevOps) and experience level.'
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Start Live AI Audio/Text Session',
        text: 'Initiate your interactive live AI mock technical interview session.'
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Answer System Design & Coding Prompts',
        text: 'Respond to realistic coding, architecture, and system design interview prompts.'
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Get Detailed Performance & Skill Feedback',
        text: 'Review comprehensive feedback, performance scores, and technical skill improvement recommendations.'
      }
    ]
  };

  return (
    <>
      <SchemaMarkup type="SoftwareApplication" data={softwareAppData} />
      <SchemaMarkup type="HowTo" data={howToData} />
      <MockInterviewClient />
    </>
  );
}
