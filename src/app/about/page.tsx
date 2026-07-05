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
  return <AboutClient />;
}
