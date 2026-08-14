"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  Download,
  Share2,
  CheckCircle2,
  Calendar,
  User,
  BookOpen,
  QrCode,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { StoredCertificate } from "@/lib/certificates-store";

import { useRouter } from "next/navigation";

export default function VerifyClient({ cert }: { cert: StoredCertificate | null }) {
  const router = useRouter();
  const [searchId, setSearchId] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      router.push(`/verify/${encodeURIComponent(searchId.trim())}`);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const [postCopied, setPostCopied] = useState(false);

  const handleLinkedInShare = () => {
    if (!cert) return;
    const currentUrl = window.location.href;
    const postMsg = `🎓 Exciting News! I have officially earned my Verified Certificate of Completion in "${cert.courseTitle}" from KodeToCareer Academy!\n\nSpecial thanks to my instructor ${cert.trainerName || "Md Arbaaz"} and the KodeToCareer team for their guidance.\n\n🔍 Verify my official credential & view certificate:\n${currentUrl}\n\n#KodeToCareer #TechEducation #Certification #CareerGrowth #WebDevelopment`;

    navigator.clipboard.writeText(postMsg);
    setPostCopied(true);
    setTimeout(() => setPostCopied(false), 4000);

    const url = encodeURIComponent(currentUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  const handleAddToLinkedInProfile = () => {
    if (!cert) return;
    const verificationUrl = encodeURIComponent(window.location.href);
    const courseTitle = encodeURIComponent(cert.courseTitle);
    const orgName = encodeURIComponent("KodeToCareer Academy");
    const certId = encodeURIComponent(cert.id);

    // Extract year & month from issueDate string (e.g. "January 15, 2026")
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

  if (!cert) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-extrabold uppercase tracking-wider mb-3">
            Credential Verification Portal
          </span>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 mb-3">
            Verify Certificate
          </h1>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Enter the unique Certificate ID printed on your KodeToCareer credential or PDF to verify its authenticity.
          </p>

          <form onSubmit={handleSearch} className="space-y-3 mb-6">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="e.g. K2C-2026-MERN-101"
              className="w-full h-11 rounded-xl border border-slate-200 px-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <button
              type="submit"
              className="w-full h-11 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
            >
              Verify Credential
            </button>
          </form>

          <div className="flex gap-3 justify-center border-t border-slate-100 pt-6">
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Return Home
            </Link>
            <Link
              href="/courses"
              className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isValid = cert.status === "LIVE";

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isValid
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-amber-50 border-amber-200 text-amber-600"
                }`}
              >
                {isValid ? (
                  <ShieldCheck className="w-9 h-9" />
                ) : (
                  <ShieldAlert className="w-9 h-9" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                      isValid
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isValid ? "Verified Credential" : cert.status}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {cert.id}
                  </span>
                </div>
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 mt-2">
                  Official Certificate of Completion
                </h1>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <a
                href={`/api/certificate/${cert.id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-secondary transition-all shadow-md shadow-primary/20"
              >
                <Download className="w-4 h-4" /> Download PDF
              </a>
              <button
                onClick={handleAddToLinkedInProfile}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#0A66C2] text-white font-bold text-sm hover:bg-[#084e96] transition-colors shadow-sm"
                title="Add directly to your LinkedIn Profile's Licenses & Certifications section"
              >
                <Award className="w-4 h-4" /> Add to LinkedIn Profile
              </button>
              <button
                onClick={handleLinkedInShare}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-[#0A66C2] font-bold text-sm hover:bg-slate-200 transition-colors border border-slate-200"
                title="Share verification link in a LinkedIn post feed"
              >
                <Share2 className="w-4 h-4" /> Share Post
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors border border-slate-200"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied Link" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Credential Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info Columns (2 Columns) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-6">
                Credential Details
              </h2>

              <div className="space-y-6">
                {/* Student & Roll Number */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Awarded To</p>
                    <p className="text-xl font-extrabold text-slate-900 mt-0.5">{cert.studentName}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{cert.studentEmail}</p>
                    {cert.rollNumber && (
                      <span className="inline-block mt-1.5 text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        Roll No: {cert.rollNumber}
                      </span>
                    )}
                  </div>
                </div>

                {/* Official Certification Citation */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 border-l-4 border-l-primary">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Official Certification Statement
                  </p>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                    {cert.certificationText || `This is to certify that ${cert.studentName} has successfully completed the ${cert.courseTitle} at Kode To Career. During the program, the student demonstrated proficiency in full-stack web development, AI-assisted development, and successfully completed practical assignments and projects. We congratulate them and wish them success in their future career.`}
                  </p>
                </div>

                {/* Course & Mastered Skills */}
                <div className="flex items-start gap-4 border-t border-slate-100 pt-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Course Program & Skills</p>
                    <p className="text-lg font-extrabold text-slate-900 mt-0.5">{cert.courseTitle}</p>
                    {cert.skills && (
                      <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <span className="font-extrabold text-primary">⚡ Mastered Technologies:</span> {cert.skills}
                      </p>
                    )}
                    {cert.grade && (
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                        {cert.grade}
                      </span>
                    )}
                  </div>
                </div>

                {/* Issue Date, Training Duration & Signatories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Issue Date & Duration</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">{cert.issueDate}</p>
                      {cert.durationHours && (
                        <p className="text-[11px] text-slate-500 font-medium">{cert.durationHours}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Authorized Signatories</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">{cert.trainerName || "Md Arbaaz"}</p>
                      <p className="text-[11px] text-slate-500 font-medium">{cert.trainerDesignation || "Head of Academics"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptographic Verification Box */}
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading text-base font-bold">Cryptographic SHA-256 Verification</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                This credential is cryptographically anchored. Every generated PDF includes an embedded QR code, digital signature checksum, and microtext border for instant tamper detection.
              </p>
              <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-[11px] text-emerald-400 break-all">
                SHA256: {cert.id}-AUTHENTICATED-KODETOCAREER-ACADEMY-HASH
              </div>
            </div>
          </div>

          {/* Right Column: Preview Box & PDF CTA */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-full aspect-[1.414] rounded-2xl bg-gradient-to-br from-blue-600 via-primary to-indigo-700 p-6 text-white flex flex-col justify-between mb-6 shadow-md relative overflow-hidden">
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-widest font-extrabold text-blue-200">KODETOCAREER</p>
                  <p className="text-xs font-extrabold mt-1">Certificate of Completion</p>
                </div>
                <div className="my-2">
                  <p className="text-[10px] text-blue-100">Awarded to</p>
                  <p className="text-sm font-extrabold truncate">{cert.studentName}</p>
                </div>
                <div className="flex justify-between items-end text-[8px] text-blue-200 border-t border-white/20 pt-2">
                  <span>ID: {cert.id}</span>
                  <QrCode className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="font-heading text-base font-extrabold text-slate-900 mb-2">
                Official PDF Document
              </h3>
              <p className="text-slate-500 text-xs mb-6">
                Print-ready A4 Landscape vector PDF with high-resolution seals and embedded QR code.
              </p>

              <a
                href={`/api/certificate/${cert.id}/pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" /> View Full PDF
              </a>
            </div>

            {/* KodeToCareer Academy Assurance Card */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 text-slate-700 text-xs space-y-2">
              <p className="font-bold text-primary text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> KodeToCareer Verification Guarantee
              </p>
              <p className="text-slate-600 leading-relaxed">
                Certificates issued by KodeToCareer represent verified academic and technical performance. For corporate verification queries, contact <a href="mailto:verify@kodetocareer.com" className="text-primary font-bold hover:underline">verify@kodetocareer.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
