# Semantic Design System - KodeToCareer

This document serves as the authoritative source of truth for all UI, layout, styling, and visual tokens for KodeToCareer.

## 🎨 Color Palette & Tokens

### Primary Theme (Dark Navy Glassmorphism)
- **Background**: `#050816` (`bg-[#050816]`) - Deep space navy canvas
- **Surface**: `#0F172A` (`bg-slate-900`) - Container & section background
- **Card Fill**: `#111827` / `rgba(15, 23, 42, 0.8)` (`glass`) - Card container surface
- **Border Overlay**: `rgba(255, 255, 255, 0.08)` (`border-slate-800/80`)
- **Primary Accent**: `#2563EB` (Royal Electric Blue)
- **Secondary Accent**: `#7C3AED` (Deep Violet)
- **Cyan Highlight**: `#06B6D4` (Neon Cyan)
- **Success Glow**: `#10B981` (Emerald Green)
- **Warning Glow**: `#F59E0B` (Amber Accent)

### Text Hierarchy
- **Text Primary**: `#FFFFFF` (`text-white`) - Headings, high emphasis text
- **Text Secondary**: `#94A3B8` (`text-slate-400`) - Body copy, descriptions
- **Text Muted**: `#64748B` (`text-slate-500`) - Captions, subtext, badges

---

## ✒️ Typography
- **Heading Font**: `Sora`, sans-serif (`font-heading`) - Modern tech geometric header font
- **Body Font**: `Inter`, sans-serif (`font-body`) - Highly legible UI copy
- **Monospace Font**: `Space Grotesk`, monospace (`font-mono`) - Metrics, codes, badges

---

## 🪟 Visual Utilities & Glassmorphism

```css
/* Glass containers */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Gradients */
.gradient-text {
  background: linear-gradient(135deg, #2563EB, #7C3AED, #06B6D4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Glow Effects */
.glow-primary {
  box-shadow: 0 0 25px rgba(37, 99, 235, 0.35);
}

.glow-accent {
  box-shadow: 0 0 25px rgba(6, 182, 212, 0.35);
}
```

---

## 🧱 Component Design Patterns

### 1. Action Buttons
- **Primary CTA**: Solid gradient (`from-blue-600 via-indigo-600 to-violet-600`), hover scale `1.02`, `shadow-lg shadow-blue-500/25`.
- **Secondary Glass Button**: `glass hover:bg-white/10 border border-white/10 text-white rounded-xl`.

### 2. Cards & Panels
- Rounded corners: `rounded-2xl` or `rounded-3xl`.
- Padding: `p-6` or `p-8`.
- Hover state: Subtle translateY (`-translate-y-1`), border highlight (`border-blue-500/30`).

### 3. 3D WebGL Canvas Containers
- Aspect ratio: Responsive height with `dpr={Math.min(2, window.devicePixelRatio)}` (or max DPR 1 on mobile).
- WebGL fallback: Static SVG / image fallback rendered inside `Suspense` or WebGL detection wrapper.
- Touch / Orbit Controls: Must disable scroll capture (`enableZoom={false}` or touch events delegated).

### 4. AI Interactive Widgets
- Floating trigger button: Pulse ring animation, fixed bottom-right (`bottom-6 right-6 z-50`).
- Chat messages: User messages aligned right (`bg-blue-600/90 text-white`), AI messages aligned left (`glass text-slate-200 border border-white/10`).
