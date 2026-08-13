import { notFound, redirect } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, getPosts } from '@/lib/blog/repository';
import BlogDetailsClient from './BlogDetailsClient';

export const revalidate = 60; // Revalidate dynamic blog posts

export async function generateStaticParams() {
  const { posts } = getPosts({ status: 'published', limit: 50 });
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, redirectTo } = getPostBySlug(slug, { allowDrafts: true });

  if (redirectTo) {
    redirect(`/blog/${redirectTo}`);
  }

  if (!post) {
    return {
      title: 'Publication Not Found | KodeToCareer Blog',
      description: 'The requested article could not be found.'
    };
  }

  return {
    title: post.seoTitle || `${post.title} | KodeToCareer`,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || `https://kodetocareer.com/blog/${post.slug}`
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `https://kodetocareer.com/blog/${post.slug}`,
      siteName: 'KodeToCareer',
      images: [
        {
          url: post.ogImage || post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title
        }
      ],
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.ogImage || post.featuredImage]
    }
  };
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, redirectTo } = getPostBySlug(slug, { allowDrafts: true });

  if (redirectTo) {
    redirect(`/blog/${redirectTo}`);
  }

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  return <BlogDetailsClient post={post} relatedPosts={relatedPosts} />;
}
