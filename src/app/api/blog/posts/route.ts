import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getPostBySlug } from '@/lib/blog/repository';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'All';
    const tag = searchParams.get('tag') || undefined;
    const search = searchParams.get('q') || searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const result = getPosts({
      status: 'published',
      category,
      tag,
      search,
      page,
      limit
    });

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message || 'Unknown error'
    }, { status: 500 });
  }
}
