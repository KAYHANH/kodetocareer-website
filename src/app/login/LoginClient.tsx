"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { authenticateUser, RoleType } from "@/lib/user-store";

export default function LoginClient() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState<RoleType>("super_admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset credentials when switching active role
    setEmail("");
    setPassword("");
    setError("");
  }, [activeRole]);

  const handleRoleSwitch = (role: RoleType) => {
    setActiveRole(role);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      const user = authenticateUser(email, password, activeRole);
      
      if (!user) {
        setError(`Invalid email address or password for ${activeRole.replace("_", " ")} access.`);
        return;
      }

      // Store current user session
      if (typeof window !== "undefined") {
        localStorage.setItem("ktc_active_user", JSON.stringify(user));
      }

      if (activeRole === "super_admin") {
        router.push("/admin/certificates");
      } else if (activeRole === "trainer") {
        router.push("/trainer/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50/50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="font-heading text-2xl font-black tracking-tight text-slate-900">
              KODETO<span className="text-primary">CAREER</span>
            </span>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-extrabold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Portal SSO Sign-In
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-900 mt-4">
            Unified Credential & Academic Portal
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Select your access role below to sign in to your dashboard.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-sm grid grid-cols-3 gap-1 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSwitch("super_admin")}
            className={`flex flex-col items-center py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRole === "super_admin"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <ShieldCheck className="w-4 h-4 mb-1" />
            <span>Super Admin</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch("trainer")}
            className={`flex flex-col items-center py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRole === "trainer"
                ? "bg-primary text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <UserCheck className="w-4 h-4 mb-1" />
            <span>Trainer</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch("student")}
            className={`flex flex-col items-center py-3 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeRole === "student"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <GraduationCap className="w-4 h-4 mb-1" />
            <span>Student</span>
          </button>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xl relative overflow-hidden">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              {error}
            </div>
          )}

          <div className="mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                Authentication Mode
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                  activeRole === "super_admin"
                    ? "bg-slate-100 text-slate-800"
                    : activeRole === "trainer"
                    ? "bg-blue-50 text-primary"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                {activeRole.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm font-extrabold text-slate-900 mt-1">
              {activeRole === "super_admin" && "Super Admin Portal & User Management"}
              {activeRole === "trainer" && "Trainer Roster & Student Assessment"}
              {activeRole === "student" && "Student Certificate Showcase & Portfolio"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter registered email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                activeRole === "super_admin"
                  ? "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
                  : activeRole === "trainer"
                  ? "bg-primary hover:bg-secondary shadow-primary/20"
                  : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
              }`}
            >
              {loading ? "Authenticating..." : `Sign In as ${activeRole.replace("_", " ")}`}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Footer Quick Links */}
        <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            Need to verify an existing credential?{" "}
            <Link
              href="/verify/KTC-MERN-2026-1001"
              className="text-primary font-bold hover:underline"
            >
              Public Verification Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
