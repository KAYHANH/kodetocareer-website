import { NextRequest, NextResponse } from "next/server";
import { issueNewCertificate } from "@/lib/certificates-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      studentName,
      studentEmail,
      courseTitle,
      grade,
      trainerName,
      trainerDesignation,
      registrarName,
      skills,
      durationHours,
      rollNumber,
      isLive,
    } = body;

    if (!studentName || !courseTitle) {
      return NextResponse.json(
        { error: "Student Name and Course Title are required fields." },
        { status: 400 }
      );
    }

    const newCert = issueNewCertificate({
      studentName,
      studentEmail: studentEmail || "student@kodetocareer.com",
      courseTitle,
      grade,
      trainerName,
      trainerDesignation,
      registrarName,
      skills,
      durationHours,
      rollNumber,
      isLive: isLive !== false, // default true / LIVE
    });

    return NextResponse.json(
      {
        success: true,
        message: `Certificate issued successfully! Status: ${newCert.status}`,
        certificate: newCert,
        verificationUrl: `/verify/${newCert.id}`,
        pdfUrl: `/api/certificate/${newCert.id}/pdf`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Certificate Issue API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during certificate issuance" },
      { status: 500 }
    );
  }
}
