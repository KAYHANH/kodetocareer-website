"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  Plus,
  Search,
  ExternalLink,
  Download,
  Check,
  Copy,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { StoredCertificate } from "@/lib/certificates-store";

export default function CertificatesAdminClient({
  initialCertificates,
}: {
  initialCertificates: StoredCertificate[];
}) {
  const [certificates, setCertificates] = useState<StoredCertificate[]>(initialCertificates);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [courseTitle, setCourseTitle] = useState("Full Stack MERN Web Development");
  const [grade, setGrade] = useState("Pass with Distinction (94%)");
  const [trainerName, setTrainerName] = useState("Md Arbaaz");
  const [trainerDesignation, setTrainerDesignation] = useState("Founder & Lead Tech Instructor");
  const [skills, setSkills] = useState("React 19, Next.js, Node.js, Express, MongoDB, Tailwind CSS, REST APIs");
  const [durationHours, setDurationHours] = useState("480+ Hours of Practical Industry Capstones");
  const [rollNumber, setRollNumber] = useState(() => `KTC-REG-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [isLive, setIsLive] = useState(true);

  const filtered = certificates.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !courseTitle) return;

    setLoading(true);

    try {
      const res = await fetch("/api/certificates/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          studentEmail,
          courseTitle,
          grade,
          trainerName,
          trainerDesignation,
          skills,
          durationHours,
          rollNumber,
          isLive,
        }),
      });

      const data = await res.json();
      if (res.ok && data.certificate) {
        setCertificates([data.certificate, ...certificates]);
        setIsModalOpen(false);
        setStudentName("");
        setStudentEmail("");
      } else {
        alert(data.error || "Failed to issue certificate");
      }
    } catch (err) {
      console.error(err);
      alert("Error issuing certificate");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (cert: StoredCertificate) => {
    const nextStatus = cert.status === "LIVE" ? "DRAFT" : "LIVE";
    try {
      const res = await fetch("/api/certificates/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cert.id, status: nextStatus }),
      });
      const data = await res.json();
      if (res.ok && data.certificate) {
        setCertificates(
          certificates.map((c) => (c.id === cert.id ? { ...c, status: nextStatus } : c))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyVerificationLink = (id: string) => {
    const link = `${window.location.origin}/verify/${id}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-primary text-xs font-extrabold uppercase tracking-wider">
                SUPER ADMIN & TRAINER CONSOLE
              </span>
              <span className="text-xs text-slate-500 font-bold">
                {certificates.filter((c) => c.status === "LIVE").length} LIVE Certificates
              </span>
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-slate-900">
              Certificate Authoring & Live Publishing Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Issue certificates, enrich credential metadata, and toggle LIVE visibility for students.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-secondary transition-all shadow-lg shadow-primary/25 shrink-0"
          >
            <Plus className="w-5 h-5" /> Issue & Publish Certificate
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student, course, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing {filtered.length} of {certificates.length} certificates
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Certificate ID & Roll No</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course Program & Skills</th>
                  <th className="px-6 py-4">Publish Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono font-bold text-primary">{cert.id}</div>
                      {cert.rollNumber && (
                        <div className="text-[10px] text-slate-400 font-medium">{cert.rollNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-slate-900">{cert.studentName}</div>
                      <div className="text-[11px] text-slate-400">{cert.studentEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{cert.courseTitle}</div>
                      {cert.skills && (
                        <div className="text-[10px] text-slate-500 truncate max-w-xs mt-0.5">
                          ⚡ {cert.skills}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(cert)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all border ${
                          cert.status === "LIVE"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle LIVE / DRAFT status"
                      >
                        {cert.status === "LIVE" ? (
                          <ToggleRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-amber-600" />
                        )}
                        {cert.status === "LIVE" ? "LIVE ON PORTAL" : "DRAFT"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/verify/${cert.id}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                          title="View Public Verification Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <a
                          href={`/api/certificate/${cert.id}/pdf`}
                          target="_blank"
                          className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-primary font-bold transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => copyVerificationLink(cert.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                          title="Copy Verification Link"
                        >
                          {copiedId === cert.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issue & Publish Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-8 shadow-2xl relative my-8">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-extrabold text-slate-900">
                      Author & Publish Certificate
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Configure rich metadata, skills, signatories, and live publishing.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleIssue} className="space-y-4 text-xs font-medium">
                {/* Publish Toggle */}
                <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900">Publish Directly Live to Student Portal?</p>
                    <p className="text-[11px] text-slate-500">
                      If checked, student can view & verify immediately on their portal.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isLive}
                    onChange={(e) => setIsLive(e.target.checked)}
                    className="w-5 h-5 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Student Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul.sharma@example.com"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Course Program *
                    </label>
                    <select
                      value={courseTitle}
                      onChange={(e) => setCourseTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                    >
                      <option value="Full Stack MERN Web Development">Full Stack MERN Web Development</option>
                      <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                      <option value="Java Full Stack Enterprise Development">Java Full Stack Enterprise Development</option>
                      <option value="Python & AI Integration Engineering">Python & AI Integration Engineering</option>
                      <option value="Cloud DevOps & Infrastructure Engineering">Cloud DevOps & Infrastructure Engineering</option>
                      <option value="UI/UX Product Design & Prototyping">UI/UX Product Design & Prototyping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Registration / Roll Number
                    </label>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Technologies & Skills Mastered (Printed on Certificate)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React 19, Next.js, Node.js, Express, MongoDB, REST APIs"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Training Duration & Hours
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 480+ Hours of Practical Industry Training"
                      value={durationHours}
                      onChange={(e) => setDurationHours(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-extrabold mb-1.5">
                      Graduation Grade / Honors
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pass with Distinction (95%)"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Authorized Instructor Signature
                  </label>
                  <input
                    type="text"
                    value={trainerName}
                    onChange={(e) => setTrainerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    {loading ? "Generating..." : isLive ? "Publish LIVE Certificate" : "Save as Draft"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
