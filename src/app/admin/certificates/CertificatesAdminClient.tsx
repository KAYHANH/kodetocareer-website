"use client";

import { useState, useEffect } from "react";
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
  Users,
  UserPlus,
  Trash2,
  KeyRound,
  ShieldCheck,
  UserCheck,
  GraduationCap,
} from "lucide-react";
import { StoredCertificate } from "@/lib/certificates-store";
import { getUsers, addUser, deleteUser, UserAccount, RoleType } from "@/lib/user-store";

export default function CertificatesAdminClient({
  initialCertificates,
}: {
  initialCertificates: StoredCertificate[];
}) {
  const [certificates, setCertificates] = useState<StoredCertificate[]>(initialCertificates);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"certificates" | "users">("certificates");
  
  // Certificate Modal State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [loadingCert, setLoadingCert] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User Management State
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<RoleType>("trainer");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userSuccessMsg, setUserSuccessMsg] = useState("");

  // Load User Accounts on mount
  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Form State for Certificate
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

  const filteredCerts = certificates.filter(
    (c) =>
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role.toLowerCase().includes(userSearch.toLowerCase())
  );

  const handleIssueCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !courseTitle) return;

    setLoadingCert(true);

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
        setIsCertModalOpen(false);
        setStudentName("");
        setStudentEmail("");
      } else {
        alert(data.error || "Failed to issue certificate");
      }
    } catch (err) {
      console.error(err);
      alert("Error issuing certificate");
    } finally {
      setLoadingCert(false);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPassword) return;

    const created = addUser({
      name: userName,
      email: userEmail,
      password: userPassword,
      role: userRole,
    });

    setUsers(getUsers());
    setUserName("");
    setUserEmail("");
    setUserPassword("");
    setIsUserModalOpen(false);
    setUserSuccessMsg(`Successfully created account for ${created.name} (${created.email})`);
    setTimeout(() => setUserSuccessMsg(""), 4000);
  };

  const handleDeleteUserAccount = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove user account for ${name}?`)) {
      deleteUser(id);
      setUsers(getUsers());
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
                SUPER ADMIN CONSOLE
              </span>
              <span className="text-xs text-slate-500 font-bold">
                Logged in as: <span className="text-slate-900 font-extrabold">kodetocareer@gmail.com</span>
              </span>
            </div>
            <h1 className="font-heading text-3xl font-extrabold text-slate-900">
              Academy Management & Authoring Console
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Issue certificates, manage Trainer/Student credentials, and publish verified credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "certificates" ? (
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-secondary transition-all shadow-lg shadow-primary/25 shrink-0 cursor-pointer"
              >
                <Plus className="w-5 h-5" /> Issue & Publish Certificate
              </button>
            ) : (
              <button
                onClick={() => setIsUserModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 shrink-0 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" /> Create Trainer / Student ID
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "certificates"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates Directory ({certificates.length})
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "users"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            User Account Management ({users.length})
          </button>
        </div>

        {userSuccessMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
            <span>🎉 {userSuccessMsg}</span>
            <button onClick={() => setUserSuccessMsg("")} className="text-emerald-600 hover:text-emerald-900 font-bold">✕</button>
          </div>
        )}

        {/* TAB 1: CERTIFICATES */}
        {activeTab === "certificates" && (
          <>
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
                Showing {filteredCerts.length} of {certificates.length} certificates
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
                    {filteredCerts.map((cert) => (
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
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold transition-all border cursor-pointer ${
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
                              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
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
          </>
        )}

        {/* TAB 2: USER MANAGEMENT */}
        {activeTab === "users" && (
          <>
            {/* Search & Action Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-slate-900"
                />
              </div>

              <button
                onClick={() => setIsUserModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Add Trainer or Student ID
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4">User Name</th>
                      <th className="px-6 py-4">Login Email ID</th>
                      <th className="px-6 py-4">Assigned Role</th>
                      <th className="px-6 py-4">Password</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4 font-extrabold text-slate-900 flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ${
                            u.role === "super_admin" ? "bg-slate-900" : u.role === "trainer" ? "bg-primary" : "bg-emerald-600"
                          }`}>
                            {u.name.slice(0, 2).toUpperCase()}
                          </div>
                          {u.name}
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-slate-800">
                          {u.email}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            u.role === "super_admin"
                              ? "bg-slate-100 text-slate-900 border border-slate-300"
                              : u.role === "trainer"
                              ? "bg-blue-50 text-primary border border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}>
                            {u.role === "super_admin" && <ShieldCheck className="w-3 h-3" />}
                            {u.role === "trainer" && <UserCheck className="w-3 h-3" />}
                            {u.role === "student" && <GraduationCap className="w-3 h-3" />}
                            {u.role.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-500">
                          {u.role === "super_admin" ? "••••••••" : u.password}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {u.role !== "super_admin" ? (
                            <button
                              onClick={() => handleDeleteUserAccount(u.id, u.name)}
                              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-colors cursor-pointer"
                              title="Delete User Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Owner</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Issue & Publish Certificate Modal */}
        {isCertModalOpen && (
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
                  onClick={() => setIsCertModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleIssueCert} className="space-y-4 text-xs font-medium">
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
                    onClick={() => setIsCertModalOpen(false)}
                    className="w-1/2 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingCert}
                    className="w-1/2 py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loadingCert ? "Generating..." : isLive ? "Publish LIVE Certificate" : "Save as Draft"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create User Account Modal */}
        {isUserModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-8 shadow-2xl relative my-8">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-extrabold text-slate-900">
                      Create User Credentials
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Provision ID and password for Trainer or Student.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Select Account Role *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUserRole("trainer")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        userRole === "trainer"
                          ? "bg-blue-50 border-primary text-primary"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      👨‍🏫 Trainer
                    </button>

                    <button
                      type="button"
                      onClick={() => setUserRole("student")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        userRole === "student"
                          ? "bg-emerald-50 border-emerald-600 text-emerald-700"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      🎓 Student
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikas Sharma"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Login Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikas.trainer@kodetocareer.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-extrabold mb-1.5">
                    Set Login Password *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Set account password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900 font-mono"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUserModalOpen(false)}
                    className="w-1/2 py-3.5 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Create Account
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
