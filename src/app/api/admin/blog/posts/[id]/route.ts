import { NextRequest, NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/blog/repository';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = getPostById(id);
    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, post });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updatePost(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Post not found or update failed' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${updated.slug}`);
    } catch (e) {
      console.error('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = updatePost(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      revalidatePath(`/blog/${updated.slug}`);
    } catch (e) {
      console.error('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = getPostById(id);
    const deleted = deletePost(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Post not found or could not be deleted' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      if (post) revalidatePath(`/blog/${post.slug}`);
    } catch (e) {
      console.error('Revalidation warning:', e);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
