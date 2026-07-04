"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Play, ExternalLink, GitBranch, Heart, Eye } from "lucide-react";

interface StudentProject {
  title: string;
  category: string;
  studentName: string;
  studentBatch: string;
  description: string;
  stats: { stars: number; views: number };
  tech: string[];
  mockUi: React.ReactNode;
}

const PROJECTS: StudentProject[] = [
  {
    title: "AI Medical Chatbot & Clinic ERP",
    category: "AI Integration & Full Stack",
    studentName: "Aditya Roy",
    studentBatch: "Batch of '25 (Placed at Deloitte)",
    description: "An automated clinic system linking LLM diagnostic suggestions directly to patient records, billing, and scheduling queues.",
    stats: { stars: 142, views: 1204 },
    tech: ["OpenAI API", "React", "Node.js", "MongoDB"],
    mockUi: (
      <div className="w-full h-full bg-[#F6F8FA] text-[9px] text-slate-700 flex flex-col justify-between font-sans overflow-hidden">
        {/* Header */}
        <div className="bg-[#D6E4F0] px-3.5 py-2.5 flex items-center gap-2 border-b border-slate-200/40">
          <span className="text-slate-500 text-xs font-semibold cursor-pointer mr-1">{"<"}</span>
          <div className="w-8 h-8 rounded-xl bg-[#E65F2B] flex items-center justify-center text-white shadow-sm shrink-0">
            {/* Orange cross/shield icon */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[2.5] stroke-white" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-800 font-extrabold truncate">Bip Health</span>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-2 h-2 stroke-white fill-none stroke-[3.5]" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <span className="text-slate-555 text-[8px] block font-medium mt-0.5">Active now</span>
          </div>
        </div>

        {/* Chat Conversation Area */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
          {/* Bip Health Message 1 */}
          <div className="bg-white text-slate-800 p-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[82%] self-start border border-slate-100 font-medium leading-relaxed">
            Only 2 months until your scheduled surgery! Your last weigh-in was only 10lbs from your goal before surgery! Would you like some recipe ideas for this week?
          </div>

          {/* Quick replies */}
          <div className="flex gap-2 ml-1">
            <span className="bg-white border border-slate-200 text-slate-400 px-3 py-1 rounded-xl text-[8px] font-bold shadow-sm cursor-pointer hover:bg-slate-50">
              Yes, please!
            </span>
            <span className="bg-white border border-slate-200 text-blue-500 px-3 py-1 rounded-xl text-[8px] font-bold shadow-sm cursor-pointer hover:bg-slate-50">
              No, I've got this
            </span>
          </div>

          {/* User Reply 1 */}
          <div className="bg-[#E8F8D2] text-slate-800 p-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[82%] self-end font-medium leading-relaxed relative flex flex-col items-end">
            <span>Yes, please!</span>
            {/* Double blue checkmark */}
            <div className="flex justify-end mt-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-500 fill-none stroke-[2.5] stroke-current" aria-hidden="true">
                <path d="M2 12l5 5L20 4M8 12l5 5L22 7" />
              </svg>
            </div>
          </div>

          {/* Bip Health Message 2 */}
          <div className="bg-white text-slate-800 p-2.5 rounded-2xl rounded-tl-none shadow-sm max-w-[82%] self-start border border-slate-100 font-medium leading-relaxed">
            Here's a list of recipes to try out this week, high in protein and low on carbs.
          </div>

          {/* Weekly Recipes Button */}
          <div className="bg-white border border-slate-200 text-blue-600 font-bold px-4 py-2 rounded-xl text-[9px] shadow-sm text-center max-w-[70%] ml-1 hover:bg-slate-50 cursor-pointer">
            Weekly recipes
          </div>

          {/* User Reply 2 */}
          <div className="bg-[#E8F8D2] text-slate-800 p-2.5 rounded-2xl rounded-tr-none shadow-sm max-w-[82%] self-end font-medium leading-relaxed relative flex flex-col items-end">
            <span>Thanks, any recommendations for exercises? My knees have been bothering me.</span>
            <div className="flex justify-end mt-1">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-500 fill-none stroke-[2.5] stroke-current" aria-hidden="true">
                <path d="M2 12l5 5L20 4M8 12l5 5L22 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Input Bottom Bar */}
        <div className="bg-[#D6E4F0] px-3 py-2 flex items-center justify-between gap-2 border-t border-slate-200/40">
          <span className="text-slate-500 text-base font-medium cursor-pointer">+</span>
          <div className="flex-1 bg-white rounded-full h-7.5 px-3 border border-slate-200/50 flex items-center justify-between shadow-inner">
            <span className="text-slate-350 text-[8px] font-medium">Type a message...</span>
            {/* Attachment Page icon */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-slate-400 fill-none stroke-[2] stroke-current" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 17v-8a3 3 0 0 1 6 0v8" />
            </svg>
          </div>
          {/* Camera and Mic icons */}
          <div className="flex items-center gap-2 text-slate-500 shrink-0">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-[2] stroke-current" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-[2] stroke-current" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Real-time Streaming Video Dashboard",
    category: "Frontend Engineering",
    studentName: "Sneha Patel",
    studentBatch: "Batch of '25 (Placed at Adobe)",
    description: "Netflix clone with high-performance infinite scroll, client-side video transcoding, and real-time viewing statistics.",
    stats: { stars: 98, views: 842 },
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    mockUi: (
      <div className="w-full h-full bg-[#0F1014] text-slate-400 flex flex-row font-sans overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[26%] bg-[#0B0C0F] border-r border-slate-800/40 p-2.5 flex flex-col justify-between shrink-0">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-1 mb-4 border-b border-slate-800/40 pb-2">
              <span className="w-3.5 h-3.5 bg-[#FFB800] rounded flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 stroke-black fill-none stroke-[3.5]" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="text-white font-extrabold text-[8px] tracking-wider font-heading">MENONTON</span>
            </div>

            {/* Menu Groups */}
            <div className="space-y-3.5 text-[7px] font-bold">
              {/* Menu */}
              <div>
                <span className="text-slate-600 text-[6px] uppercase tracking-wider block mb-1">Menu</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-white bg-slate-900 border-r-2 border-[#FFB800] px-1.5 py-1 rounded">
                    <span>Discover</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
                    <span>Coming Soon</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
                    <span>Exclusive</span>
                  </div>
                </div>
              </div>

              {/* Library */}
              <div>
                <span className="text-slate-600 text-[6px] uppercase tracking-wider block mb-1">Library</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
                    <span>Playlist</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
                    <span>Downloaded</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
                    <span>Recent Play</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account bottom items */}
          <div className="text-[7px] font-bold space-y-1 border-t border-slate-800/40 pt-2">
            <div className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded cursor-pointer">
              <span>Settings</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#FFB800] px-1.5 py-0.5 rounded">
              <span>Premium</span>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 scrollbar-hide">
          {/* Header Search & Profile */}
          <div className="flex justify-between items-center">
            <div className="flex-1 max-w-[130px] bg-[#1B1D23] rounded-lg h-6 px-2 flex items-center text-[7px] text-slate-500 border border-slate-800/25">
              Search any type...
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* Notification icon */}
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-400 fill-none stroke-[2.5]" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              {/* Avatar */}
              <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-800" />
            </div>
          </div>

          {/* Popular Now Banner */}
          <div>
            <h4 className="text-white text-[8px] font-extrabold uppercase tracking-wide mb-1.5 leading-none">Popular Now</h4>
            <div className="relative w-full h-24 rounded-xl overflow-hidden flex items-end p-2.5 bg-gradient-to-tr from-red-600/35 via-slate-900/60 to-slate-950 border border-slate-800/40 shadow-md">
              <div className="absolute inset-0 bg-grid opacity-10" />
              <div className="relative z-10 w-full">
                <span className="text-[7px] text-[#FFB800] font-extrabold uppercase tracking-wider">Anime • 12 Episodes</span>
                <h3 className="text-white font-extrabold text-[10px] mt-0.5 leading-tight truncate max-w-[80%]">
                  Demon Slayer: Kimetsu No Yaiba
                </h3>
                <div className="flex items-center justify-between mt-1.5">
                  <button className="bg-[#FFB800] text-black font-extrabold px-3 py-1 rounded text-[7px] flex items-center gap-1 shadow-md hover:bg-amber-500 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-2 h-2 fill-black" aria-hidden="true">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Watch Now
                  </button>
                  <span className="text-[7px] text-slate-400 font-bold bg-black/40 px-1.5 py-0.5 rounded border border-white/5 font-mono">
                    IMDb 8.7
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Watching Section */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <h4 className="text-white text-[8px] font-extrabold uppercase tracking-wide leading-none">Continue Watching</h4>
              <span className="text-[#FFB800] text-[6px] font-bold uppercase tracking-wider cursor-pointer">See All</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Card 1 */}
              <div className="bg-[#121319] border border-slate-800/60 rounded-xl p-2 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[6px] text-slate-500 font-bold block uppercase leading-none">Top Gun: Maverick</span>
                  <span className="text-white font-extrabold text-[8px] mt-1 block truncate">Maverick (2022)</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#FFB800] h-1 rounded-full w-[70%]" />
                  </div>
                  <div className="flex justify-between text-[6px] text-slate-500 mt-1 font-mono font-semibold">
                    <span>60:41</span>
                    <span>90:21</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#121319] border border-slate-800/60 rounded-xl p-2 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[6px] text-slate-500 font-bold block uppercase leading-none">TV Series • 6 Ep</span>
                  <span className="text-white font-extrabold text-[8px] mt-1 block truncate">Obi-Wan Kenobi</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#FFB800] h-1 rounded-full w-[95%]" />
                  </div>
                  <div className="flex justify-between text-[6px] text-slate-500 mt-1 font-mono font-semibold">
                    <span>52:01</span>
                    <span>53:12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top 10 Movies Row */}
          <div>
            <h4 className="text-white text-[8px] font-extrabold uppercase tracking-wide mb-1.5 leading-none">Top Movies</h4>
            <div className="grid grid-cols-4 gap-2">
              {[
                { title: "Shawshank", num: "1", bg: "from-blue-600/20" },
                { title: "Godfather", num: "2", bg: "from-red-600/20" },
                { title: "Inception", num: "3", bg: "from-indigo-600/20" },
                { title: "Godfather II", num: "4", bg: "from-purple-600/20" },
              ].map((m) => (
                <div
                  key={m.num}
                  className={`bg-gradient-to-t ${m.bg} to-slate-900 border border-slate-800/40 rounded-xl p-1.5 aspect-[3/4] flex flex-col justify-between relative overflow-hidden shadow-inner`}
                >
                  <span className="text-[6px] text-slate-500 font-bold uppercase leading-none">Movie</span>
                  <div className="z-10">
                    <span className="text-white font-extrabold text-[7px] truncate block leading-tight">{m.title}</span>
                  </div>
                  {/* Huge Rank Number */}
                  <span className="absolute right-0.5 bottom-0 text-slate-800/35 font-heading font-black text-xl italic select-none">
                    {m.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    ),
  },
  {
    title: "E-Commerce Checkout Pipeline",
    category: "Full Stack Development",
    studentName: "Rahul Sen",
    studentBatch: "Batch of '24 (Placed at Stripe)",
    description: "Amazon clone featuring microservice-based inventory syncing, Stripe webhooks, and automated PDF invoice generation.",
    stats: { stars: 167, views: 1845 },
    tech: ["React", "Express", "Stripe API", "PostgreSQL"],
    mockUi: (
      <div className="w-full h-full bg-white text-slate-800 flex flex-col font-sans overflow-hidden">
        {/* Top Navbar */}
        <div className="h-10 bg-white border-b border-slate-100 px-3.5 flex items-center justify-between shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-0.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            </span>
            <span className="text-[#10B981] font-extrabold text-[10px] tracking-wider">LUU</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 text-[7px] text-slate-500 font-bold">
            <span className="hover:text-[#10B981] cursor-pointer">Shop</span>
            <span className="hover:text-[#10B981] cursor-pointer">About us</span>
            <span className="hover:text-[#10B981] cursor-pointer">Contact</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none stroke-[2.5]" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {/* Cart */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none stroke-[2.5]" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <button className="bg-[#10B981] hover:bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded text-[7px] cursor-pointer transition-colors">
              Login
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-row gap-3 scrollbar-hide">
          {/* Left Column: Shopping Card */}
          <div className="w-[58%] flex flex-col justify-between">
            <div>
              {/* Back button */}
              <span className="text-[7px] text-slate-500 font-bold cursor-pointer hover:text-slate-800 block mb-2">
                ← Back
              </span>
              
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="text-slate-800 font-extrabold text-[11px] leading-none">Shopping Card</h3>
                <span className="text-slate-500 text-[7px] font-bold underline cursor-pointer hover:text-slate-800">
                  Continue shopping &gt;
                </span>
              </div>

              {/* Table labels */}
              <div className="grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_0.5fr] text-[6px] font-bold text-slate-400 border-b border-slate-100 pb-1.5 mb-2 uppercase tracking-wider">
                <span>Product</span>
                <span className="text-center">Size</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Price</span>
                <span className="text-right text-red-500 cursor-pointer hover:underline">Clear</span>
              </div>

              {/* Product Rows */}
              <div className="space-y-3">
                {[
                  { title: "Sandqvist Zack", desc: "Blue Backpack", size: "35L", price: "$110.99", color: "bg-blue-500/10 border-blue-100" },
                  { title: "Sandqvist Zack", desc: "Green Backpack", size: "30L", price: "$259.99", color: "bg-emerald-500/10 border-emerald-100" },
                  { title: "Sandqvist Zack", desc: "Teal Backpack", size: "20L", price: "$109.99", color: "bg-cyan-500/10 border-cyan-100" },
                ].map((p, idx) => (
                  <div key={idx} className="grid grid-cols-[3fr_1.5fr_1.5fr_1.5fr_0.5fr] items-center text-[7px] font-semibold text-slate-700">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg ${p.color} border shrink-0`} />
                      <div className="min-w-0">
                        <span className="text-slate-800 font-bold block truncate leading-none">{p.title}</span>
                        <span className="text-slate-400 text-[6px] block mt-0.5 leading-none">{p.desc}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[6px] font-bold">
                        {p.size}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-[6px] font-bold cursor-pointer hover:bg-slate-200">-</span>
                      <span className="font-mono text-slate-800 text-[7px] font-bold">1</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-[6px] font-bold cursor-pointer hover:bg-slate-200">+</span>
                    </div>
                    <span className="text-right font-mono font-bold text-slate-850">{p.price}</span>
                    <span className="text-right text-slate-400 hover:text-red-500 cursor-pointer">×</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations summaries */}
            <div className="border-t border-slate-100 mt-5 pt-3.5 space-y-1.5 text-[8px] font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-800">$480.97</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-[9px] font-bold text-slate-800">
                <span>Total</span>
                <span className="font-mono font-extrabold text-[#10B981]">$480.97</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Form Card */}
          <div className="w-[42%] bg-slate-50/60 border border-slate-100 p-3.5 rounded-[22px] flex flex-col justify-between shadow-sm">
            <div className="space-y-3.5">
              <h4 className="text-slate-800 font-extrabold text-[9px] uppercase tracking-wide leading-none border-b border-slate-100 pb-2">
                Payment Details
              </h4>
              
              {/* Payment Methods */}
              <div className="space-y-1.5">
                <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block">Payment Method:</span>
                
                {/* Google Pay */}
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm cursor-pointer hover:bg-slate-50">
                  <span className="w-2.5 h-2.5 rounded-full border border-slate-300 flex-shrink-0" />
                  <span className="text-slate-600 font-bold text-[7px] flex items-center gap-1 leading-none">
                    <span className="text-blue-500 font-extrabold text-[8px]">G</span> Pay
                  </span>
                </div>

                {/* Credit Card (Selected) */}
                <div className="flex items-center gap-2 bg-white border border-[#10B981]/30 rounded-xl px-2.5 py-1.5 shadow-sm cursor-pointer bg-emerald-50/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] border border-[#10B981] flex-shrink-0 flex items-center justify-center">
                    <span className="w-1 h-1 bg-white rounded-full" />
                  </span>
                  <span className="text-slate-800 font-bold text-[7px] flex items-center gap-1.5 leading-none">
                    {/* card icon */}
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-slate-700 fill-none stroke-[2.5]" aria-hidden="true">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    Credit Card
                  </span>
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-2.5 text-[7px] font-bold text-slate-500">
                <div className="space-y-1">
                  <span>Name On Card</span>
                  <input
                    type="text"
                    readOnly
                    placeholder="Enter name on card"
                    className="w-full h-7 bg-white border border-slate-200 rounded-lg px-2.5 text-[7px] text-slate-800 placeholder:text-slate-350 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <span>Card Number</span>
                  <input
                    type="text"
                    readOnly
                    placeholder="Enter card number"
                    className="w-full h-7 bg-white border border-slate-200 rounded-lg px-2.5 text-[7px] text-slate-800 placeholder:text-slate-350 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <span>Expiration Date</span>
                    <input
                      type="text"
                      readOnly
                      placeholder="MM/YY"
                      className="w-full h-7 bg-white border border-slate-200 rounded-lg px-2 text-[7px] text-slate-800 placeholder:text-slate-350 outline-none text-center"
                    />
                  </div>
                  <div className="space-y-1">
                    <span>CVV</span>
                    <input
                      type="password"
                      readOnly
                      placeholder="***"
                      className="w-full h-7 bg-white border border-slate-200 rounded-lg px-2 text-[7px] text-slate-800 placeholder:text-slate-350 outline-none text-center"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Check Out button */}
            <button className="w-full py-2.5 bg-[#10B981] hover:bg-emerald-600 text-white text-[8px] font-extrabold rounded-xl shadow-md transition-colors cursor-pointer mt-4">
              Check Out
            </button>
          </div>

        </div>
      </div>
    ),
  },
  {
    title: "Corporate CRM Analytics Dashboard",
    category: "Data Analytics & Full Stack",
    studentName: "Pooja Hegde",
    studentBatch: "Batch of '24 (Placed at EY)",
    description: "A customer relationship platform containing interactive user segmentation, mock data pipelines, and monthly revenue graphs.",
    stats: { stars: 110, views: 994 },
    tech: ["Python", "Pandas", "Chart.js", "React"],
    mockUi: (
      <div className="w-full h-full bg-[#F0F2F5] text-slate-700 flex flex-col font-sans overflow-hidden">
        {/* Header */}
        <div className="h-10 bg-white border-b border-slate-200/50 px-3 flex items-center justify-between shrink-0">
          {/* Logo Left */}
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-white" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </span>
            <div>
              <span className="text-slate-800 font-extrabold text-[8px] block leading-none">CRM dashboard</span>
              <span className="text-blue-500 font-extrabold text-[4.5px] tracking-wider block mt-0.5 uppercase">COUPLER.IO</span>
            </div>
          </div>

          {/* Navigation Right */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2 text-[6px] font-bold">
              <span className="bg-[#1E3A8A] text-white px-2.5 py-0.5 rounded-full cursor-default">Overview</span>
              <span className="text-slate-500 hover:text-slate-800 cursor-pointer">Agents</span>
              <span className="text-slate-500 hover:text-slate-800 cursor-pointer">Deals</span>
            </div>
            <button className="bg-white border border-slate-200 text-slate-700 font-extrabold px-2 py-0.5 rounded text-[6px] shadow-sm cursor-pointer hover:bg-slate-50">
              Setup dashboard
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-2 overflow-y-auto flex flex-row gap-2 scrollbar-hide">
          {/* Left Column: Stats & Charts (Spans 58%) */}
          <div className="w-[58%] flex flex-col gap-2 shrink-0">
            {/* Stats Grid (2 rows x 4 cols) */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { title: "Total sales", val: "5.2M", bg: "bg-[#4F46E5] text-white" },
                { title: "Win rate", val: "16.92%", bg: "bg-[#1D4ED8] text-white" },
                { title: "Close rate", val: "14.47%", bg: "bg-[#0284C7] text-white" },
                { title: "Avg days to close", val: "60.70", bg: "bg-[#10B981] text-white" },
                { title: "Pipeline value", val: "77.8M", bg: "bg-[#4F46E5]/90 text-white" },
                { title: "Open deals", val: "1.6K", bg: "bg-[#1D4ED8]/90 text-white" },
                { title: "Weighted value", val: "35.6M", bg: "bg-[#0284C7]/90 text-white" },
                { title: "Avg open age", val: "201.67", bg: "bg-[#10B981]/90 text-white" },
              ].map((s, idx) => (
                <div key={idx} className={`${s.bg} rounded-lg p-1.5 shadow-sm`}>
                  <span className="text-[5.5px] uppercase tracking-wider font-semibold opacity-75 block leading-none">{s.title}</span>
                  <span className="text-[10px] font-extrabold block mt-1 leading-none font-mono">{s.val}</span>
                </div>
              ))}
            </div>

            {/* Chart 1: Won Deals */}
            <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-sm flex-1 flex flex-col justify-between min-h-[90px]">
              <div className="flex justify-between items-center text-[7px] font-bold text-slate-800 leading-none">
                <span>Won deals (last 12 months)</span>
                <span className="text-[6px] text-slate-400 font-semibold font-mono">May 24 — May 25</span>
              </div>
              {/* Simulated SVG Graph */}
              <div className="flex-1 my-1.5 relative flex items-center justify-center">
                <svg viewBox="0 0 200 60" className="w-full h-full fill-none">
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="200" y2="10" stroke="#F1F5F9" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="200" y2="30" stroke="#F1F5F9" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="0.5" />
                  {/* Line 1 (Closed value - dark blue) */}
                  <path d="M 0 50 Q 30 20 60 40 T 120 15 T 180 35 T 200 10" stroke="#1D4ED8" strokeWidth="1" />
                  {/* Line 2 (Won deals - light blue) */}
                  <path d="M 0 50 Q 30 38 60 25 T 120 40 T 180 30 T 200 25" stroke="#0284C7" strokeWidth="0.8" strokeDasharray="1 1" />
                </svg>
              </div>
            </div>

            {/* Chart 2: Deals Projection */}
            <div className="bg-white border border-slate-100 rounded-xl p-2 shadow-sm flex-1 flex flex-col justify-between min-h-[90px]">
              <div className="flex justify-between items-center text-[7px] font-bold text-slate-800 leading-none">
                <span>Deals projection (future 12 months)</span>
                <span className="text-[6px] text-slate-400 font-semibold font-mono">May 25 — May 26</span>
              </div>
              <div className="flex-1 my-1.5 relative flex items-center justify-center">
                <svg viewBox="0 0 200 60" className="w-full h-full fill-none">
                  <line x1="0" y1="10" x2="200" y2="10" stroke="#F1F5F9" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="200" y2="30" stroke="#F1F5F9" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="200" y2="50" stroke="#F1F5F9" strokeWidth="0.5" />
                  <path d="M 0 50 Q 40 25 80 30 T 160 10 T 200 35" stroke="#1D4ED8" strokeWidth="1" />
                  <path d="M 0 50 Q 40 38 80 20 T 160 25 T 200 45" stroke="#0284C7" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </div>

          {/* Middle Column: Donut Charts (Spans 24%) */}
          <div className="w-[24%] flex flex-col gap-2 shrink-0">
            {/* Donut 1: Sales pipeline */}
            <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm flex-1 flex flex-col justify-between min-h-[105px]">
              <span className="text-[7px] font-bold text-slate-800 block leading-none">Sales pipeline</span>
              <div className="flex-1 my-1 flex items-center justify-center relative">
                <svg viewBox="0 0 36 36" className="w-14 h-14">
                  {/* Segment 1 */}
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="55" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#4F46E5" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="75" />
                </svg>
                <div className="absolute text-[5.5px] font-mono font-extrabold text-slate-800">100%</div>
              </div>
              <span className="text-[5.5px] text-slate-400 font-semibold text-center block">Lead In 26.85%</span>
            </div>

            {/* Donut 2: Deal loss reasons */}
            <div className="bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm flex-1 flex flex-col justify-between min-h-[105px]">
              <span className="text-[7px] font-bold text-slate-800 block leading-none">Deal loss reasons</span>
              <div className="flex-1 my-1 flex items-center justify-center relative">
                <svg viewBox="0 0 36 36" className="w-14 h-14">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="25" />
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="65" />
                </svg>
                <div className="absolute text-[5.5px] font-mono font-extrabold text-slate-800">Losses</div>
              </div>
              <span className="text-[5.5px] text-slate-400 font-semibold text-center block">Feature Limits 32.97%</span>
            </div>
          </div>

          {/* Right Column: Filters (Spans 18%) */}
          <div className="w-[18%] bg-white border border-slate-100 rounded-xl p-2.5 shadow-sm flex flex-col justify-between shrink-0">
            <div className="space-y-3.5">
              <span className="text-[7px] text-slate-450 font-bold uppercase tracking-wider block">Filters</span>
              
              {/* Date selection */}
              <div className="space-y-1">
                <span className="text-[6px] font-bold text-slate-500 uppercase block">Report Date Range</span>
                <div className="flex justify-between items-center bg-slate-50 border border-slate-150 rounded px-1 py-0.5 text-[5.5px] font-mono text-slate-700">
                  <span>04/24</span>
                  <span className="text-slate-300">|</span>
                  <span>05/25</span>
                </div>
              </div>

              {/* Dropdowns */}
              {["Deal Owner", "Deal Stage", "Pipeline"].map((d) => (
                <div key={d} className="space-y-0.5">
                  <span className="text-[6px] font-bold text-slate-500 block">{d}</span>
                  <div className="bg-slate-50 border border-slate-150 rounded px-1.5 py-1 text-[6.5px] font-semibold text-slate-800 flex justify-between items-center cursor-pointer hover:bg-slate-100">
                    <span>All</span>
                    <span className="text-slate-400 text-[5px]">▼</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Questions banner */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 flex items-center gap-2 mt-4 shadow-sm">
              <div className="w-5 h-5 rounded-full bg-slate-700 border border-slate-800 shrink-0" />
              <div>
                <span className="text-[6px] font-bold text-slate-500 uppercase block leading-none">Need help?</span>
                <span className="text-[5.5px] font-extrabold text-blue-600 block mt-0.5 hover:underline cursor-pointer">Book a demo</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    ),
  },
];

export default function LiveProjects() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section 
      className="py-24 bg-white relative overflow-hidden border-y border-slate-100" 
      aria-labelledby="live-projects-heading"
    >
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-50/40 blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
            STUDENT PORTFOLIO SHOWCASE
          </p>
          <h2 
            id="live-projects-heading"
            className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            Built by Students, Trusted by Industry
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-medium">
            We don't build placeholder todo-apps. Explore actual production platforms architected and coded from scratch by students during their bootcamps.
          </p>
        </div>

        {/* Dynamic Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Projects List Selector (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {PROJECTS.map((proj, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={proj.title}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-white border-primary/30 shadow-lg shadow-primary/5 scale-102"
                      : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isActive ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-500"
                      }`}>
                        {proj.category}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {proj.studentBatch.split(" (")[0]}
                      </span>
                    </div>
                    <h3 className={`text-base font-extrabold transition-colors ${
                      isActive ? "text-primary" : "text-slate-800"
                    }`}>
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-medium line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100/50 mt-4 pt-3 text-[11px] font-semibold text-slate-400">
                    <span>By {proj.studentName}</span>
                    <span className="text-slate-500">{proj.studentBatch.includes("Placed") ? "✓ Placed" : ""}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Screen Preview (Right) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-xl relative flex-1 flex flex-col justify-between min-h-[400px]">
              {/* Browser Window Frame */}
              <div className="w-full rounded-2xl border border-slate-200/80 bg-slate-50 overflow-hidden flex-1 flex flex-col shadow-inner">
                {/* Window Topbar */}
                <div className="bg-slate-100 px-4 py-3 border-b border-slate-200/80 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1 text-[10px] text-slate-400 font-mono flex items-center justify-between truncate">
                    <span>https://localhost:3000/student-apps/{PROJECTS[activeIdx].title.toLowerCase().replace(/ /g, "-")}</span>
                    <Layout className="w-3 h-3 text-slate-300" />
                  </div>
                </div>

                {/* Simulated App Area */}
                <div className="flex-1 bg-white relative overflow-hidden flex items-center justify-center p-4 min-h-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full rounded-xl border border-slate-100 shadow-md overflow-hidden"
                    >
                      {PROJECTS[activeIdx].mockUi}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Project Details Footer */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 leading-none">
                    {PROJECTS[activeIdx].title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-400 mt-1.5">
                    Coded by <strong className="text-slate-700">{PROJECTS[activeIdx].studentName}</strong> • {PROJECTS[activeIdx].studentBatch}
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                    <Eye className="w-3.5 h-3.5" /> {PROJECTS[activeIdx].stats.views} Views
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {PROJECTS[activeIdx].stats.stars} Stars
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
