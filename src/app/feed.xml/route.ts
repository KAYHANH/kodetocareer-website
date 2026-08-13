import { GET as getRss } from '../blog/rss.xml/route';

export const dynamic = 'force-dynamic';

export async function GET() {
  return getRss();
}
