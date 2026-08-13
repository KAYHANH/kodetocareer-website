import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/blog/repository';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { posts } = getPosts({ status: 'published', limit: 100 });

  const itemsXml = posts
    .map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://kodetocareer.com/blog/${post.slug}</link>
      <guid isPermaLink="true">https://kodetocareer.com/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt || post.createdAt).toUTCString()}</pubDate>
      <category><![CDATA[${post.category}]]></category>
      <dc:creator><![CDATA[${post.authorName}]]></dc:creator>
    </item>`)
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>KodeToCareer Official Blog</title>
    <link>https://kodetocareer.com/blog</link>
    <description>Latest tech industry trends, system design architectures, programming tutorials, and placement guides from KodeToCareer.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://kodetocareer.com/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}
