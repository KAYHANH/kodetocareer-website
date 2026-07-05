import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Tech News & Career Guidance Publications | KodeToCareer Blog',
  description: 'Read the latest programming tips, AI integration tutorials, interview preparation questions, MERN roadmaps, and career service announcements.',
  alternates: {
    canonical: 'https://kodetocareer.com/blog',
  }
};

export default function Page() {
  return <BlogClient />;
}
