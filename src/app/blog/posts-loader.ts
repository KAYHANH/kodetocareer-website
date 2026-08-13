import { getPosts } from '@/lib/blog/repository';

export function getMergedPostsServer(): any[] {
  const { posts } = getPosts({ status: 'published', limit: 100 });
  return posts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    desc: p.excerpt,
    content: p.content,
    image: p.featuredImage,
    author: p.authorName,
    category: p.category,
    tags: p.tags,
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : 'Recent',
    readTime: p.readingTime,
    featured: p.isFeatured
  }));
}
