'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserCheck, GraduationCap, DollarSign, 
  TrendingUp, PhoneCall, FileText, Settings, Bell, Search, Filter 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [leadFilter, setLeadFilter] = useState('All');

  const LEADS = [
    { name: 'Amit Verma', email: 'amit@gmail.com', phone: '9876543210', course: 'MERN Stack', status: 'Hot', date: 'July 1, 2026' },
    { name: 'Sneha Rao', email: 'sneha@yahoo.com', phone: '9988776655', course: 'UI/UX Design', status: 'Warm', date: 'June 30, 2026' },
    { name: 'Vikram Sen', email: 'vsen@gmail.com', phone: '9122334455', course: 'Data Science', status: 'Cold', date: 'June 29, 2026' },
    { name: 'Priya Das', email: 'priya@gmail.com', phone: '8877665544', course: 'MERN Stack', status: 'Hot', date: 'June 28, 2026' },
  ];

  const STATS = [
    { label: 'Total Students', value: '1,240', icon: Users, color: 'text-primary' },
    { label: 'Active Faculty', value: '18', icon: GraduationCap, color: 'text-secondary' },
    { label: 'New Leads', value: '45', icon: PhoneCall, color: 'text-accent' },
    { label: 'Monthly Revenue', value: '₹14.2L', icon: DollarSign, color: 'text-success' },
  ];

  const filteredLeads = LEADS.filter(l => leadFilter === 'All' || l.status === leadFilter);

  return (
    <div className="min-h-screen bg-background pt-10 pb-20 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-8 border-b border-white/[0.06]">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Admin Console</h1>
            <p className="text-sm text-text-secondary mt-1">Manage courses, monitor placement rates, track student queries, and overview leads.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center text-text-secondary hover:text-white transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl bg-white/5 border border-white/[0.08]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-white block">Admin Dashboard</span>
                <span className="text-[10px] text-text-secondary/60 block">Super Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="rounded-[20px] bg-white/5 border border-white/[0.08] p-6 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-text-secondary font-medium">{stat.label}</span>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/[0.04]`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-3xl font-bold font-mono text-white block">{stat.value}</span>
              </div>
            );
          })}
        </div>

        {/* CRM / Leads Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CRM Leads Table */}
          <div className="lg:col-span-8 rounded-[20px] bg-white/5 border border-white/[0.08] p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Lead Pipeline</h2>
                <p className="text-xs text-text-secondary mt-0.5">Track registration leads and qualification status</p>
              </div>
              {/* Filter */}
              <div className="flex gap-2">
                {['All', 'Hot', 'Warm', 'Cold'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      leadFilter === st
                        ? 'bg-primary text-white'
                        : 'bg-white/5 text-text-secondary hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] text-xs text-text-secondary/70 uppercase">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Course Interest</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-text-secondary divide-y divide-white/[0.04]">
                  {filteredLeads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3">
                        <span className="font-bold text-white block">{lead.name}</span>
                        <span className="text-xs text-text-secondary/60">{lead.phone}</span>
                      </td>
                      <td className="py-3">{lead.course}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          lead.status === 'Hot' ? 'bg-error/10 text-error' :
                          lead.status === 'Warm' ? 'bg-warning/10 text-warning' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-xs">{lead.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CRM Activities / Logs */}
          <div className="lg:col-span-4 rounded-[20px] bg-white/5 border border-white/[0.08] p-6">
            <h3 className="font-heading font-bold text-white text-lg mb-4">Activities Log</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-success flex-shrink-0 mt-1.5" />
                <div>
                  <span className="text-xs font-semibold text-white block">Lead assigned: Amit Verma</span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">Assigned to Counselor Raj for immediate callback registration.</p>
                  <span className="text-[9px] text-text-secondary/50 block mt-1">2 mins ago</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                <div>
                  <span className="text-xs font-semibold text-white block">Course modified: MERN Stack</span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">Faculty updated Lesson 12 documentation files.</p>
                  <span className="text-[9px] text-text-secondary/50 block mt-1">1 hour ago</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-warning flex-shrink-0 mt-1.5" />
                <div>
                  <span className="text-xs font-semibold text-white block">Payment verification required</span>
                  <p className="text-[10px] text-text-secondary leading-relaxed">Student ID #1049 payments invoice verification pending.</p>
                  <span className="text-[9px] text-text-secondary/50 block mt-1">4 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
