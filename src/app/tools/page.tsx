import type { Metadata } from 'next';
import ToolsClient from './ToolsClient';

export const metadata: Metadata = {
  title: 'Interactive Career Guidance Tools & Calculators | KodeToCareer',
  description: 'Use our AI counselor tool, tech stack selector, salary projection calculator, and curriculum builder to design your perfect career learning roadmap.',
  alternates: {
    canonical: 'https://kodetocareer.com/tools',
  }
};

export default function Page() {
  return <ToolsClient />;
}
