import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BACKUP_FILE = path.join(process.cwd(), 'enrollments.json');

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, phone, qualification, status, year, courseTitle } = data;

    if (!name || !phone || !qualification || !status || !year || !courseTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newEnrollment = {
      timestamp: new Date().toISOString(),
      courseTitle,
      name,
      phone,
      qualification,
      status,
      year,
    };

    // ── Save to local backup file ──
    let enrollments = [];
    if (fs.existsSync(BACKUP_FILE)) {
      try {
        const fileContent = fs.readFileSync(BACKUP_FILE, 'utf-8');
        enrollments = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading backup file:', err);
      }
    }
    enrollments.push(newEnrollment);
    fs.writeFileSync(BACKUP_FILE, JSON.stringify(enrollments, null, 2), 'utf-8');

    // ── Send to Google Sheets Apps Script Web App ──
    const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBAPP_URL;
    
    if (webAppUrl) {
      try {
        const sheetResponse = await fetch(webAppUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEnrollment),
        });

        if (!sheetResponse.ok) {
          console.warn('Google Sheet submission returned non-200 status:', sheetResponse.status);
        }
      } catch (sheetErr) {
        console.error('Error forwarding data to Google Sheet:', sheetErr);
      }
    } else {
      console.log('Google Sheets Webapp URL is not configured. Saved to local backup.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enrollment API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
