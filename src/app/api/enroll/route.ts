import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, qualification, status, year, courseTitle, email, message } = data;

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: Name and Phone are required' },
        { status: 400 }
      );
    }

    const newEnrollment = {
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      courseTitle: courseTitle || 'General Inquiry',
      name,
      phone,
      email: email || '',
      qualification: qualification || 'N/A',
      status: status || 'N/A',
      year: year || 'N/A',
      message: message || '',
    };

    // ── Send to Google Sheets Apps Script Web App (Non-blocking with 4s timeout) ──
    const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || 
                      process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL ||
                      'https://script.google.com/macros/s/AKfycbzQtu_7_zuaDWy1HAqra_J5IVUJfMXXza7JA2N7JFn7-u0BvIp3mKipo_FKd8PD1AM/exec';
    
    if (webAppUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      // Asynchronously post to Google Sheets so client receives immediate response
      fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnrollment),
        signal: controller.signal,
      })
        .then((sheetResponse) => {
          if (!sheetResponse.ok) {
            console.warn('Google Sheet submission returned non-200 status:', sheetResponse.status);
          }
        })
        .catch((sheetErr) => {
          console.error('Error forwarding data to Google Sheet:', sheetErr);
        })
        .finally(() => {
          clearTimeout(timeoutId);
        });
    } else {
      console.warn('Google Sheets Webapp URL is not configured.');
    }

    // Always respond immediately to client (< 200ms)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enrollment API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
