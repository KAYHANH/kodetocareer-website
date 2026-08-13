import { getPosts } from '@/lib/blog/repository';
import BlogClient from './BlogClient';

export const revalidate = 60; // Revalidate static page every 60 seconds

export const metadata = {
  title: 'KodeToCareer Tech Blog & Career Insights | Live Software Engineering Tutorials',
  description: 'Explore technical guides, system design architectures, MERN stack roadmaps, Python data analytics, and interview strategies from KodeToCareer mentors.',
  alternates: {
    canonical: 'https://kodetocareer.com/blog',
    types: {
      'application/rss+xml': 'https://kodetocareer.com/blog/rss.xml'
    }
  }
};

export default function BlogPage() {
  // Fetch initial published posts on the server for instant SSR HTML rendering
  const initialData = getPosts({
    status: 'published',
    page: 1,
    limit: 20
  });

  return <BlogClient initialData={initialData} />;
}
