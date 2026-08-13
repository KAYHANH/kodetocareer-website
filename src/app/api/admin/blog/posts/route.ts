import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost, getPostById } from '@/lib/blog/repository';
import { revalidatePath, revalidateTag } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const post = getPostById(id);
      if (!post) {
        return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, post });
    }

    const status = searchParams.get('status') || 'all';
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('q') || undefined;

    const result = getPosts({
      status: status as any,
      category,
      search,
      page: 1,
      limit: 100
    });

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: 'Title and content are required.' }, { status: 400 });
    }

    const post = createPost(body);

    // Revalidate paths if published
    if (post.status === 'published') {
      try {
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
      } catch (e) {
        console.error('Revalidation warning:', e);
      }
    }

    return NextResponse.json({
      success: true,
      post
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
