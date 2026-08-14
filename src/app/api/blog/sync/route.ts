import { NextResponse } from 'next/server';

// ─── Blog sync from dev.to has been DISABLED ─────────────────────────────────
//
// Why it was disabled (see antigravity-prompt.md §3 for full analysis):
//
//  1. FILESYSTEM — fs.writeFileSync() to src/app/blog/dynamic_posts.json
//     fails silently on Vercel serverless (read-only fs outside /tmp, not
//     shared across invocations) and is wiped on every Docker/cPanel redeploy.
//
//  2. COPYRIGHT — The endpoint fetched full body_markdown from third-party
//     dev.to articles and republished them verbatim under kodetocareer.com
//     without a syndication license. This is a likely ToS violation and
//     duplicate-content SEO risk.
//
//  3. CRON SCOPE — The Vercel cron in vercel.json (0 */6 * * *) only fires
//     when deployed on Vercel. Docker/cPanel installs never received updates.
//
// ─── ACTION REQUIRED (owner decision) ────────────────────────────────────────
//  Choose ONE content strategy and implement accordingly:
//   a) Short original summaries + "Read full post on dev.to →" link back
//   b) Original posts pipeline authored by the KodeToCareer team
//   c) An explicitly licensed/RSS-fed content source with attribution
// ─────────────────────────────────────────────────────────────────────────────

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      disabled: true,
      message:
        'Blog sync has been disabled pending a content-sourcing decision. ' +
        'See src/app/api/blog/sync/route.ts for details.',
    },
    { status: 503 }
  );
}
