"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Award,
  Users,
  CheckCircle2,
  ExternalLink,
  Plus,
  BookOpen,
  Calendar,
  Download,
  FileCheck,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { StoredCertificate } from "@/lib/certificates-store";

export default function TrainerClient({
  certificates: initialCertificates,
}: {
  certificates: StoredCertificate[];
}) {
  const [certificates, setCertificates] = useState<StoredCertificate[]>(initialCertificates);
  const [search, setSearch] = useState("");

  const filteredCerts = certificates.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-primary shrink-0">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-primary text-xs font-extrabold uppercase tracking-wider">
                  TRAINER PORTAL
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  Md Arbaaz (Lead Tech Instructor)
                </span>
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
                Trainer Dashboard & Student Authoring
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href="/admin/certificates"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold text-xs hover:bg-secondary transition-all shadow-md shadow-primary/20"
            >
              <Plus className="w-4 h-4" /> Issue & Publish Certificate
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
            >
              Switch Role
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Published</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {certificates.filter((c) => c.status === "LIVE").length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Batch Roster</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">48 Students</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Draft / Pending</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">
                {certificates.filter((c) => c.status !== "LIVE").length}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="font-heading text-lg font-extrabold text-slate-900">
              Assigned Student Credentials & Publishing Control
            </h2>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or course..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Certificate ID</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Course Program & Skills</th>
                  <th className="px-6 py-4">Live Status</th>
                  <th className="px-6 py-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCerts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-primary">{c.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-extrabold text-slate-900">{c.studentName}</div>
                      <div className="text-[10px] text-slate-400">{c.studentEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{c.courseTitle}</div>
                      {c.skills && (
                        <div className="text-[10px] text-slate-400 truncate max-w-xs">{c.skills}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(c)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold transition-all border ${
                          c.status === "LIVE"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                        }`}
                        title="Click to toggle status"
                      >
                        {c.status === "LIVE" ? (
                          <ToggleRight className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="w-3.5 h-3.5 text-amber-600" />
                        )}
                        {c.status === "LIVE" ? "LIVE ON PORTAL" : "DRAFT"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/verify/${c.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                      >
                        Public Verify <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
