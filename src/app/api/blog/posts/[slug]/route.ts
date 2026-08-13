import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/blog/repository';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { post, redirectTo } = getPostBySlug(slug, { allowDrafts: false });

    if (redirectTo) {
      return NextResponse.json({
        success: false,
        redirectTo
      }, { status: 301 });
    }

    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Article not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 });
  }
}
