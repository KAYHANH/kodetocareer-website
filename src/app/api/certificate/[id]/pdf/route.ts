import { NextRequest, NextResponse } from "next/server";
import { getCertificateById } from "@/lib/certificates-store";
import { generateCertificatePDF } from "@/lib/pdf-generator";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      certificationText: cert.certificationText,
      verificationUrl,
    });

    const filename = `Certificate_${cert.id}.pdf`;

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
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
