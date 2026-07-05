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
    // 1. Fetch recent dev.to programming articles from a random tech tag to ensure fresh updates
    const TAGS = ['programming', 'webdev', 'javascript', 'react', 'python', 'ai', 'devops', 'career', 'interview'];
    const randomTag = TAGS[Math.floor(Math.random() * TAGS.length)];
    const devToResponse = await fetch(`https://dev.to/api/articles?tag=${randomTag}&per_page=15`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KodeToCareerBot/1.0)',
      },
      cache: 'no-store'
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

      // Map dev.to tags to our local category filters
      let category = 'Programming';
      const itemTags = (article.tag_list || []).map((t: string) => t.toLowerCase());
      if (itemTags.includes('ai') || itemTags.includes('machinelearning') || itemTags.includes('chatgpt') || itemTags.includes('openai') || itemTags.includes('llm')) {
        category = 'AI';
      } else if (itemTags.includes('datascience') || itemTags.includes('python') || itemTags.includes('pandas') || itemTags.includes('sql') || itemTags.includes('data')) {
        category = 'Data Science';
      } else if (itemTags.includes('webdev') || itemTags.includes('react') || itemTags.includes('javascript') || itemTags.includes('nextjs') || itemTags.includes('html') || itemTags.includes('css')) {
        category = 'Web Development';
      } else if (itemTags.includes('career') || itemTags.includes('jobs') || itemTags.includes('placement') || itemTags.includes('internship')) {
        category = 'Career';
      } else if (itemTags.includes('interview') || itemTags.includes('preparation') || itemTags.includes('questions')) {
        category = 'Interview';
      }

      const newPost: BlogPost = {
        id: 1000 + article.id,
        title: article.title,
        category: category,
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
