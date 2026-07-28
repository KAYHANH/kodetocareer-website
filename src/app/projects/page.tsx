import type { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Student Portfolio Showcase & Capstone Projects | KodeToCareer',
  description: 'Explore production-grade full stack web applications, CNN deep learning models, and interface prototypes designed and deployed by our students.',
  alternates: {
    canonical: 'https://kodetocareer.com/projects',
  }
};

export default function Page() {
  return <ProjectsClient />;
}
