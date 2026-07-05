import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/app/blog/posts';

export const dynamic = 'force-dynamic';

const DYNAMIC_POSTS_PATH = path.join(process.cwd(), 'src/app/blog/dynamic_posts.json');

// Helper to format date
function formatDate(dateStr: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

export async function GET() {
  try {
    // 1. Fetch recent dev.to programming articles
    const devToResponse = await fetch('https://dev.to/api/articles?tag=programming&per_page=5', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KodeToCareerBot/1.0)',
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!devToResponse.ok) {
      throw new Error(`Failed to fetch from dev.to API: ${devToResponse.statusText}`);
    }

    const articles = await devToResponse.json();

    // 2. Read existing dynamic posts
    let dynamicPosts: BlogPost[] = [];
    if (fs.existsSync(DYNAMIC_POSTS_PATH)) {
      try {
        const fileContent = fs.readFileSync(DYNAMIC_POSTS_PATH, 'utf8');
        dynamicPosts = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading dynamic_posts.json:', err);
      }
    }

    const existingSlugs = new Set(dynamicPosts.map(p => p.slug));
    let hasNewPosts = false;

    // 3. Process new articles
    for (const article of articles) {
      if (existingSlugs.has(article.slug)) {
        continue;
      }

      // Fetch full article for body markdown
      const detailsResponse = await fetch(`https://dev.to/api/articles/${article.id}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; KodeToCareerBot/1.0)',
        }
      });

      if (!detailsResponse.ok) {
        continue;
      }

      const fullArticle = await detailsResponse.json();
      const contentMarkdown = fullArticle.body_markdown || fullArticle.description || '';

      const newPost: BlogPost = {
        id: 1000 + article.id,
        title: article.title,
        category: article.tag_list && article.tag_list.length > 0 
          ? article.tag_list[0].toUpperCase() 
          : 'Technology',
        date: formatDate(article.published_at),
        author: article.user.name,
        readTime: `${article.reading_time || 5} min read`,
        desc: article.description,
        image: article.cover_image || article.social_image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=500&fit=crop',
        featured: false,
        slug: article.slug,
        content: contentMarkdown
      };

      dynamicPosts.unshift(newPost);
      hasNewPosts = true;
    }

    // 4. Save updated posts if there are additions
    if (hasNewPosts) {
      // Keep only last 25 dynamic posts to avoid bloating JSON
      if (dynamicPosts.length > 25) {
        dynamicPosts = dynamicPosts.slice(0, 25);
      }
      fs.writeFileSync(DYNAMIC_POSTS_PATH, JSON.stringify(dynamicPosts, null, 2), 'utf8');
    }

    return NextResponse.json({
      success: true,
      syncedCount: articles.length,
      hasNewPosts,
      totalDynamicCount: dynamicPosts.length
    });

  } catch (err: any) {
    console.error('Blog sync error:', err);
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 });
  }
}
