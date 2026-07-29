"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Award,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";
import { StoredCertificate } from "@/lib/certificates-store";

export default function StudentClient({
  certificates,
}: {
  certificates: StoredCertificate[];
}) {
  // Student Aditya Roy's LIVE certificates
  const studentCerts = certificates.filter(
    (c) =>
      (c.studentName.toLowerCase().includes("aditya") || c.studentName.toLowerCase().includes("roy")) &&
      c.status === "LIVE"
  );
  const activeCert = studentCerts[0] || certificates[0];

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string) => {
    const link = `${window.location.origin}/verify/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const [postCopiedId, setPostCopiedId] = useState<string | null>(null);

  const handleLinkedInShare = (cert: StoredCertificate) => {
    const certUrl = `${window.location.origin}/verify/${cert.id}`;
    const postMsg = `🎓 Exciting News! I have officially earned my Verified Certificate of Completion in "${cert.courseTitle}" from KodeToCareer Academy!\n\nSpecial thanks to my instructor ${cert.trainerName || "Md Arbaaz"} and the KodeToCareer team for their guidance.\n\n🔍 Verify my official credential & view certificate:\n${certUrl}\n\n#KodeToCareer #TechEducation #Certification #CareerGrowth #WebDevelopment`;

    navigator.clipboard.writeText(postMsg);
    setPostCopiedId(cert.id);
    setTimeout(() => setPostCopiedId(null), 4000);

    const url = encodeURIComponent(certUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const handleAddToLinkedInProfile = (cert: StoredCertificate) => {
    const verificationUrl = encodeURIComponent(`${window.location.origin}/verify/${cert.id}`);
    const courseTitle = encodeURIComponent(cert.courseTitle);
    const orgName = encodeURIComponent("KodeToCareer Academy");
    const certId = encodeURIComponent(cert.id);

    let year = "2026";
    let month = "1";
    try {
      const d = new Date(cert.issueDate);
      if (!isNaN(d.getTime())) {
        year = d.getFullYear().toString();
        month = (d.getMonth() + 1).toString();
      }
    } catch {}

    const addUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${courseTitle}&organizationName=${orgName}&issueYear=${year}&issueMonth=${month}&certUrl=${verificationUrl}&certId=${certId}`;
    window.open(addUrl, "_blank");
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Student Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-wider">
                  STUDENT PORTAL
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Verified Graduate Profile
                </span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                Welcome back, Aditya Roy!
              </h1>
              <p className="text-slate-500 text-xs mt-1">
                Manage your earned digital certificates, verify credentials, and share achievements on LinkedIn.
              </p>
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Switch Role
            </Link>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="mb-8">
          <h2 className="font-heading text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" /> My Earned Certificates ({studentCerts.length})
          </h2>

          {studentCerts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">
                No Certificates Found
              </h3>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                No official digital certificates have been issued for your account yet. Complete your course curriculum and project assessments to earn your verified credential.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED CREDENTIAL
                      </span>
                      <h3 className="font-heading text-lg font-extrabold text-slate-900 mt-2">
                        {cert.courseTitle}
                      </h3>
                      <p className="text-xs font-mono font-bold text-primary mt-0.5">
                        ID: {cert.id}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">Awarded To:</span>
                      <span className="font-extrabold text-slate-800">{cert.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold">Issue Date:</span>
                      <span className="font-bold text-slate-700">{cert.issueDate}</span>
                    </div>
                    {cert.grade && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 font-bold">Grade / Honors:</span>
                        <span className="font-bold text-amber-600">{cert.grade}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`/api/certificate/${cert.id}/pdf`}
                      target="_blank"
                      className="py-2.5 px-3 rounded-xl bg-primary text-white font-bold text-xs hover:bg-secondary transition-colors text-center inline-flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </a>
                    <button
                      onClick={() => handleAddToLinkedInProfile(cert)}
                      className="py-2.5 px-3 rounded-xl bg-[#0A66C2] text-white font-bold text-xs hover:bg-[#084e96] transition-colors inline-flex items-center gap-1.5 shadow-sm"
                      title="Add directly to your LinkedIn Licenses & Certifications"
                    >
                      <Award className="w-3.5 h-3.5" /> Add to LinkedIn Profile
                    </button>
                    <button
                      onClick={() => handleLinkedInShare(cert)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 text-[#0A66C2] font-bold text-xs hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
                      title="Share post to LinkedIn feed"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share Post
                    </button>
                    <Link
                      href={`/verify/${cert.id}`}
                      target="_blank"
                      className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors inline-flex items-center gap-1.5"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
