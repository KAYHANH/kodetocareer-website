import type { Metadata } from 'next';
import BlogDetailsClient from './BlogDetailsClient';
import { getMergedPostsServer } from '../posts-loader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const posts = getMergedPostsServer();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

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

export async function generateStaticParams() {
  const posts = getMergedPostsServer();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const posts = getMergedPostsServer();
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  const postDateRaw = post ? ((post as any).publishedAt || (post as any).datePublished || post.date) : null;
  let datePublished = '2025-01-15T08:00:00+05:30';
  if (postDateRaw) {
    const parsedDate = new Date(postDateRaw);
    if (!isNaN(parsedDate.getTime())) {
      datePublished = parsedDate.toISOString();
    }
  }

  const postModifiedRaw = post ? ((post as any).dateModified || (post as any).updatedAt) : null;
  let dateModified = new Date().toISOString();
  if (postModifiedRaw) {
    const parsedModified = new Date(postModifiedRaw);
    if (!isNaN(parsedModified.getTime())) {
      dateModified = parsedModified.toISOString();
    }
  }

  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.desc,
    image: post.image?.startsWith('http') ? post.image : `https://kodetocareer.com${post.image}`,
    url: `https://kodetocareer.com/blog/${post.slug}`,
    datePublished,
    dateModified,
    wordCount: post.content ? post.content.split(/\s+/).length : undefined,
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.blog-intro', 'article p:first-of-type']
    },
    publisher: {
      '@type': 'Organization',
      name: 'KodeToCareer',
      logo: {
        '@type': 'ImageObject',
        url: 'https://kodetocareer.com/main-logo.png'
      }
    },
    author: {
      '@type': 'Person',
      name: post.author || 'Md Arbaaz',
      jobTitle: 'Founder & Lead Tech Instructor',
      url: 'https://kodetocareer.com/about'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kodetocareer.com/blog/${post.slug}`
    }
  } : null;

  return (
    <>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
      <BlogDetailsClient slug={resolvedParams.slug} initialPost={post} />
    </>
  );
}
