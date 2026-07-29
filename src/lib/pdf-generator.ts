import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import crypto from "crypto";

export interface CertificateData {
  certificateId: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  grade?: string;
  trainerName?: string;
  trainerDesignation?: string;
  skills?: string;
  durationHours?: string;
  rollNumber?: string;
  certificationText?: string;
  verificationUrl: string;
}

export async function generateCertificatePDF(data: CertificateData): Promise<Buffer> {
  // Generate QR Code data URL
  const qrCodeDataUrl = await QRCode.toDataURL(data.verificationUrl, {
    margin: 1,
    width: 250,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
  });

  // Calculate SHA-256 checksum for security microtext
  const checksumRaw = `${data.certificateId}:${data.studentName}:${data.courseTitle}:${data.issueDate}`;
  const checksumHash = crypto.createHash("sha256").update(checksumRaw).digest("hex");

  // Create PDF Document (A4 Landscape: 841.89 x 595.27 pt)
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.27]);
  const { width, height } = page.getSize();

  // Load fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // Palette: KodeToCareer Brand Colors
  const bgRgb = rgb(0.98, 0.99, 1.0); // Slate 50
  const primaryRgb = rgb(0.0, 0.45, 1.0); // Electric Blue #0072FF
  const secondaryRgb = rgb(0.06, 0.09, 0.16); // Slate 900
  const textMutedRgb = rgb(0.35, 0.4, 0.5); // Slate 500
  const goldRgb = rgb(0.85, 0.65, 0.15); // Gold Accent

  // 1. Background Fill
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: bgRgb,
  });

  // 2. Outer & Inner Borders
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderColor: secondaryRgb,
    borderWidth: 3,
  });

  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderColor: primaryRgb,
    borderWidth: 1.5,
  });

  // 3. Header Logo & Title
  const headerText = "KODETOCAREER • ACADEMY CREDENTIAL";
  const headerWidth = helveticaBold.widthOfTextAtSize(headerText, 11);
  page.drawText(headerText, {
    x: width / 2 - headerWidth / 2,
    y: height - 55,
    size: 11,
    font: helveticaBold,
    color: primaryRgb,
  });

  if (data.rollNumber) {
    const rollText = `REGISTRATION NO: ${data.rollNumber}`;
    const rollWidth = helveticaBold.widthOfTextAtSize(rollText, 8);
    page.drawText(rollText, {
      x: width / 2 - rollWidth / 2,
      y: height - 70,
      size: 8,
      font: helveticaBold,
      color: textMutedRgb,
    });
  }

  const titleText = "CERTIFICATE OF COMPLETION";
  const titleWidth = helveticaBold.widthOfTextAtSize(titleText, 25);
  page.drawText(titleText, {
    x: width / 2 - titleWidth / 2,
    y: height - 110,
    size: 25,
    font: helveticaBold,
    color: secondaryRgb,
  });

  // 4. Subtitle Presentation
  const presentText = "This official credential is proudly awarded to";
  const presentWidth = timesItalic.widthOfTextAtSize(presentText, 14);
  page.drawText(presentText, {
    x: width / 2 - presentWidth / 2,
    y: height - 145,
    size: 14,
    font: timesItalic,
    color: textMutedRgb,
  });

  // 5. Student Name (Primary Focus)
  const nameText = data.studentName;
  const nameWidth = helveticaBold.widthOfTextAtSize(nameText, 28);
  page.drawText(nameText, {
    x: width / 2 - nameWidth / 2,
    y: height - 190,
    size: 28,
    font: helveticaBold,
    color: primaryRgb,
  });

  // Divider Line below student name
  page.drawLine({
    start: { x: width / 2 - 140, y: height - 202 },
    end: { x: width / 2 + 140, y: height - 202 },
    color: primaryRgb,
    thickness: 1.5,
  });

  // 6. Official Paragraph Citation (User Requested Format)
  const defaultCitation = `This is to certify that ${data.studentName} has successfully completed the ${data.durationHours || "4-Month"} ${data.courseTitle} at Kode To Career.\nDuring the program, the student demonstrated proficiency in full-stack web development, AI-assisted development, and successfully completed practical assignments and projects.\nWe congratulate them and wish them success in their future career.`;

  const citationToUse = data.certificationText || defaultCitation;
  const citationLines = citationToUse.split("\n");

  let currentY = height - 230;
  for (const line of citationLines) {
    if (!line.trim()) continue;
    // Word wrap line for PDF width
    const words = line.split(" ");
    let currentLine = "";
    const maxWidth = width - 180;

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = helvetica.widthOfTextAtSize(testLine, 10);
      if (testWidth > maxWidth && currentLine) {
        const lineW = helvetica.widthOfTextAtSize(currentLine, 10);
        page.drawText(currentLine, {
          x: width / 2 - lineW / 2,
          y: currentY,
          size: 10,
          font: helvetica,
          color: secondaryRgb,
        });
        currentY -= 15;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      const lineW = helvetica.widthOfTextAtSize(currentLine, 10);
      page.drawText(currentLine, {
        x: width / 2 - lineW / 2,
        y: currentY,
        size: 10,
        font: helvetica,
        color: secondaryRgb,
      });
      currentY -= 16;
    }
  }

  // Additional Details: Skills & Duration
  if (data.skills) {
    const skillsText = `Technologies & Skills Mastered: ${data.skills}`;
    const skillsWidth = helveticaBold.widthOfTextAtSize(skillsText, 8.5);
    page.drawText(skillsText, {
      x: width / 2 - skillsWidth / 2,
      y: currentY - 10,
      size: 8.5,
      font: helveticaBold,
      color: primaryRgb,
    });
    currentY -= 20;
  }

  if (data.grade) {
    const gradeText = `Honors & Assessment Grade: ${data.grade}`;
    const gradeWidth = helveticaBold.widthOfTextAtSize(gradeText, 9);
    page.drawText(gradeText, {
      x: width / 2 - gradeWidth / 2,
      y: currentY - 5,
      size: 9,
      font: helveticaBold,
      color: goldRgb,
    });
  }

  // 8. Footer Section (Authorized Instructor, Issue Date, QR Code)
  const footerY = 85;

  // Left: Authorized Instructor Signature
  const trainerName = data.trainerName || "Md Arbaaz";
  const trainerRole = data.trainerDesignation || "Founder & Lead Tech Instructor";

  page.drawText(trainerName, {
    x: 90,
    y: footerY + 20,
    size: 16,
    font: timesItalic,
    color: secondaryRgb,
  });

  page.drawLine({
    start: { x: 80, y: footerY + 5 },
    end: { x: 260, y: footerY + 5 },
    color: textMutedRgb,
    thickness: 1,
  });

  page.drawText(trainerName, {
    x: 80,
    y: footerY - 12,
    size: 10,
    font: helveticaBold,
    color: secondaryRgb,
  });

  page.drawText(trainerRole, {
    x: 80,
    y: footerY - 24,
    size: 8,
    font: helvetica,
    color: textMutedRgb,
  });

  // Center: Issue Date
  const dateX = width / 2 - 50;
  page.drawLine({
    start: { x: dateX, y: footerY + 5 },
    end: { x: dateX + 110, y: footerY + 5 },
    color: textMutedRgb,
    thickness: 1,
  });

  page.drawText("ISSUE DATE", {
    x: dateX + 25,
    y: footerY - 12,
    size: 8,
    font: helveticaBold,
    color: textMutedRgb,
  });

  page.drawText(data.issueDate, {
    x: dateX + 10,
    y: footerY - 24,
    size: 8.5,
    font: helveticaBold,
    color: primaryRgb,
  });

  // Right: QR Code & Certificate Number
  const qrX = width - 150;
  const qrY = 45;
  const qrSize = 75;

  const qrBase64 = qrCodeDataUrl.split(",")[1];
  const qrBytes = Buffer.from(qrBase64, "base64");
  const qrImage = await pdfDoc.embedPng(qrBytes);

  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrSize,
    height: qrSize,
  });

  page.drawText(`ID: ${data.certificateId}`, {
    x: qrX - 25,
    y: qrY - 12,
    size: 7.5,
    font: helveticaBold,
    color: secondaryRgb,
  });

  page.drawText("Scan to verify credential", {
    x: qrX - 15,
    y: qrY - 22,
    size: 6.5,
    font: helvetica,
    color: textMutedRgb,
  });

  // Security Microtext Checksum at Bottom
  const microtext = `SHA256 CHECKSUM: ${checksumHash.substring(0, 32)}... • CRYPTOGRAPHICALLY VERIFIED AT ${data.verificationUrl}`;
  page.drawText(microtext, {
    x: 35,
    y: 11,
    size: 5.5,
    font: helvetica,
    color: textMutedRgb,
    opacity: 0.7,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
