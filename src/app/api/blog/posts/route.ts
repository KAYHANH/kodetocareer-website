import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { POSTS, BlogPost } from '@/app/blog/posts';

export const dynamic = 'force-dynamic';

const DYNAMIC_POSTS_PATH = path.join(process.cwd(), 'src/app/blog/dynamic_posts.json');

export async function GET() {
  try {
    let dynamicPosts: BlogPost[] = [];
    if (fs.existsSync(DYNAMIC_POSTS_PATH)) {
      try {
        const fileContent = fs.readFileSync(DYNAMIC_POSTS_PATH, 'utf8');
        dynamicPosts = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading dynamic_posts.json:', err);
      }
    }

    // Merge static posts and dynamic posts
    // We put dynamic posts first so new tech news items appear at the very top of the list!
    const merged = [...dynamicPosts, ...POSTS];

    return NextResponse.json({
      success: true,
      posts: merged
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 });
  }
}
