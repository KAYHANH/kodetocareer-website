import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Join Our Team | Careers at KodeToCareer',
  description: 'Explore remote and on-site career opportunities at KodeToCareer. Apply for corporate relation roles, AI specialist gigs, and tech instructor positions.',
  alternates: {
    canonical: 'https://kodetocareer.com/careers',
  }
};

export default function Page() {
  return <CareersClient />;
}
