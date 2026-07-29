import { NextRequest, NextResponse } from "next/server";
import { updateCertificateStatus } from "@/lib/certificates-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Certificate ID and Status are required fields." },
        { status: 400 }
      );
    }

    const updated = updateCertificateStatus(id, status);

    if (!updated) {
      return NextResponse.json(
        { error: "Certificate not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Certificate ${id} is now ${status}!`,
        certificate: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Status Update API Error:", error);
    return NextResponse.json(
      { error: "Failed to update certificate status" },
      { status: 500 }
    );
  }
}
