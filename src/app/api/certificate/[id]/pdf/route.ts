import { NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/certificates-store";
import { generateCertificatePDF } from "@/lib/pdf-generator";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cert = getCertificateById(id);

    if (!cert) {
      return NextResponse.json(
        { error: "Certificate record not found" },
        { status: 404 }
      );
    }

    const origin = request.nextUrl.origin || "https://kodetocareer.com";
    const verificationUrl = `${origin}/verify/${cert.id}`;

    // Generate PDF Buffer on the fly
    const pdfBuffer = await generateCertificatePDF({
      certificateId: cert.id,
      studentName: cert.studentName,
      courseTitle: cert.courseTitle,
      issueDate: cert.issueDate,
      grade: cert.grade,
      trainerName: cert.trainerName,
      trainerDesignation: cert.trainerDesignation,
      skills: cert.skills,
      durationHours: cert.durationHours,
      rollNumber: cert.rollNumber,
      verificationUrl,
    });

    const filename = `Certificate_${cert.id}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("PDF Generation Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate certificate PDF" },
      { status: 500 }
    );
  }
}
