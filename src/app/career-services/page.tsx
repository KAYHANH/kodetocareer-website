import type { Metadata } from 'next';
import CareerServicesClient from './CareerServicesClient';

export const metadata: Metadata = {
  title: 'AI-Powered Career Services | KodeToCareer',
  description: 'Master technical interviews, get pre-vetted recruiter profiles, request corporate placement references, and fast-track admissions with our career services.',
  alternates: {
    canonical: 'https://kodetocareer.com/career-services',
  }
};

export default function Page() {
  return <CareerServicesClient />;
}
