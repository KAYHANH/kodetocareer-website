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
  registrarName?: string;
  skills?: string;
  durationHours?: string;
  rollNumber?: string;
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
  const textMutedRgb = rgb(0.4, 0.45, 0.55); // Slate 500
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
    y: height - 60,
    size: 11,
    font: helveticaBold,
    color: primaryRgb,
  });

  if (data.rollNumber) {
    const rollText = `REGISTRATION NO: ${data.rollNumber}`;
    const rollWidth = helveticaBold.widthOfTextAtSize(rollText, 8);
    page.drawText(rollText, {
      x: width / 2 - rollWidth / 2,
      y: height - 76,
      size: 8,
      font: helveticaBold,
      color: textMutedRgb,
    });
  }

  const titleText = "CERTIFICATE OF COMPLETION";
  const titleWidth = helveticaBold.widthOfTextAtSize(titleText, 26);
  page.drawText(titleText, {
    x: width / 2 - titleWidth / 2,
    y: height - 120,
    size: 26,
    font: helveticaBold,
    color: secondaryRgb,
  });

  // 4. Subtitle Presentation
  const presentText = "This official credential is proudly awarded to";
  const presentWidth = timesItalic.widthOfTextAtSize(presentText, 15);
  page.drawText(presentText, {
    x: width / 2 - presentWidth / 2,
    y: height - 160,
    size: 15,
    font: timesItalic,
    color: textMutedRgb,
  });

  // 5. Student Name (Primary Focus)
  const nameText = data.studentName;
  const nameWidth = helveticaBold.widthOfTextAtSize(nameText, 30);
  page.drawText(nameText, {
    x: width / 2 - nameWidth / 2,
    y: height - 210,
    size: 30,
    font: helveticaBold,
    color: primaryRgb,
  });

  // Divider Line below student name
  page.drawLine({
    start: { x: width / 2 - 140, y: height - 225 },
    end: { x: width / 2 + 140, y: height - 225 },
    color: primaryRgb,
    thickness: 1.5,
  });

  // 6. Completion Sentence
  const completionText = "for successfully completing all rigorous coursework, industry project requirements, and technical evaluations in";
  const completionWidth = helvetica.widthOfTextAtSize(completionText, 10.5);
  page.drawText(completionText, {
    x: width / 2 - completionWidth / 2,
    y: height - 255,
    size: 10.5,
    font: helvetica,
    color: textMutedRgb,
  });

  // 7. Course Title
  const courseText = data.courseTitle;
  const courseWidth = helveticaBold.widthOfTextAtSize(courseText, 21);
  page.drawText(courseText, {
    x: width / 2 - courseWidth / 2,
    y: height - 290,
    size: 21,
    font: helveticaBold,
    color: secondaryRgb,
  });

  // Additional Details: Skills & Duration
  if (data.skills) {
    const skillsText = `Technologies & Skills Mastered: ${data.skills}`;
    const skillsWidth = helvetica.widthOfTextAtSize(skillsText, 8.5);
    page.drawText(skillsText, {
      x: width / 2 - skillsWidth / 2,
      y: height - 315,
      size: 8.5,
      font: helvetica,
      color: textMutedRgb,
    });
  }

  if (data.durationHours || data.grade) {
    const metaParts = [];
    if (data.durationHours) metaParts.push(`Duration: ${data.durationHours}`);
    if (data.grade) metaParts.push(`Honors: ${data.grade}`);
    const metaText = metaParts.join("  •  ");
    const metaWidth = helveticaBold.widthOfTextAtSize(metaText, 9.5);
    page.drawText(metaText, {
      x: width / 2 - metaWidth / 2,
      y: height - 338,
      size: 9.5,
      font: helveticaBold,
      color: goldRgb,
    });
  }

  // 8. Footer Section (Signatures, Issue Date, QR Code)
  const footerY = 90;

  // Left: Authorized Instructor Signature
  const trainerName = data.trainerName || "Md Arbaaz";
  const trainerRole = data.trainerDesignation || "Head of Academics & Founder";

  page.drawText(trainerName, {
    x: 60,
    y: footerY + 20,
    size: 15,
    font: timesItalic,
    color: secondaryRgb,
  });

  page.drawLine({
    start: { x: 55, y: footerY + 5 },
    end: { x: 210, y: footerY + 5 },
    color: textMutedRgb,
    thickness: 1,
  });

  page.drawText(trainerName, {
    x: 55,
    y: footerY - 12,
    size: 9.5,
    font: helveticaBold,
    color: secondaryRgb,
  });

  page.drawText(trainerRole, {
    x: 55,
    y: footerY - 24,
    size: 7.5,
    font: helvetica,
    color: textMutedRgb,
  });

  // Center-Right: Academic Registrar Signature
  const registrarName = data.registrarName || "Dr. S. K. Verma (Academic Registrar)";

  page.drawText(registrarName.split("(")[0].trim(), {
    x: 255,
    y: footerY + 20,
    size: 15,
    font: timesItalic,
    color: secondaryRgb,
  });

  page.drawLine({
    start: { x: 250, y: footerY + 5 },
    end: { x: 405, y: footerY + 5 },
    color: textMutedRgb,
    thickness: 1,
  });

  page.drawText("Dr. S. K. Verma", {
    x: 250,
    y: footerY - 12,
    size: 9.5,
    font: helveticaBold,
    color: secondaryRgb,
  });

  page.drawText("Academic Registrar", {
    x: 250,
    y: footerY - 24,
    size: 7.5,
    font: helvetica,
    color: textMutedRgb,
  });

  // Center: Issue Date
  const dateX = 440;
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
  const qrY = 50;
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
