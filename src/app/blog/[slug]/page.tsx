import type { Metadata } from 'next';
import BlogDetailsClient from './BlogDetailsClient';
import { POSTS } from '../posts';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found | KodeToCareer',
      description: 'The requested blog publication could not be found.'
    };
  }

  const titleText = `${post.title} | KodeToCareer Blog`;
  const descText = post.desc;

  return {
    title: titleText,
    description: descText,
    openGraph: {
      title: titleText,
      description: descText,
      url: `https://kodetocareer.com/blog/${post.slug}`,
      siteName: 'KodeToCareer',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descText,
      images: [post.image],
    },
    alternates: {
      canonical: `https://kodetocareer.com/blog/${post.slug}`,
    }
  };
}

export default async function Page({ params }: PageProps) {
  return <BlogDetailsClient params={params} />;
}
