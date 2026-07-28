import type { Metadata } from 'next';
import MockInterviewClient from './MockInterviewClient';

export const metadata: Metadata = {
  title: 'Free AI Mock Technical Interview Simulator | KodeToCareer',
  description:
    'Practice 5-question technical interview rounds for Full Stack MERN, Data Science, Java, and Cloud roles. Get instant scoring and feedback.',
};

export default function MockInterviewPage() {
  return <MockInterviewClient />;
}
