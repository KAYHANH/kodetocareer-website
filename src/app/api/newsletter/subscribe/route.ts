import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NEWSLETTER_FILE = path.join(process.cwd(), 'src/data/newsletter-subscribers.json');

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Valid email address is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    let subscribers: Array<{ email: string; date: string }> = [];

    if (fs.existsSync(NEWSLETTER_FILE)) {
      try {
        const content = fs.readFileSync(NEWSLETTER_FILE, 'utf8');
        subscribers = JSON.parse(content);
      } catch (err) {
        console.error('Error reading newsletter subscribers file:', err);
      }
    }

    // Check if already subscribed
    const exists = subscribers.some(s => s.email === cleanEmail);
    if (!exists) {
      subscribers.push({
        email: cleanEmail,
        date: new Date().toISOString()
      });

      const dir = path.dirname(NEWSLETTER_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2), 'utf8');
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription successful! Welcome to KodeToCareer Insights.'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
