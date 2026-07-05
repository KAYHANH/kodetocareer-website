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
  return <ContactClient />;
}
