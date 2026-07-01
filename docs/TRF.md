# Technical Requirements File (TRF)

# Stack

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- GSAP
- Lucide Icons
- React Hook Form
- Zod

Backend

- Next.js Route Handlers
- Supabase
- PostgreSQL
- Prisma ORM (optional)

Authentication

- Supabase Auth
- Google Login
- Email Login

Deployment

- Vercel

---

# Architecture

App Router

Feature-based architecture

Reusable components

Atomic Design principles

Server Components where possible

Client Components only when required

---

# Folder Structure

/app

/components

/components/ui

/features

/hooks

/lib

/services

/utils

/types

/public

/styles

---

# Styling

Primary
#2563EB

Secondary
#7C3AED

Accent
#06B6D4

Background
#050816

Cards
#111827

Typography

Sora

Inter

Space Grotesk

---

# Performance

- Lighthouse 95+
- Lazy Loading
- Code Splitting
- Dynamic Imports
- Optimized Images
- Font Optimization
- Server Rendering
- Metadata API

---

# SEO

- Metadata API
- Sitemap
- Robots.txt
- JSON-LD
- OpenGraph
- Canonical URLs
- Structured Data

---

# Accessibility

- WCAG 2.2
- Keyboard Navigation
- Screen Reader Support
- Proper ARIA Labels
- Color Contrast
- Focus Indicators

---

# Security

- Input Validation
- Zod Validation
- Rate Limiting
- CSRF Protection
- XSS Prevention
- Secure Authentication
- Environment Variables

---

# Database Tables

Users

Students

Courses

Enrollments

Lessons

Assignments

Certificates

Payments

Blogs

Events

Faculty

Leads

StudyAbroadApplications

Companies

Placements

Testimonials

Notifications

---

# API Modules

Authentication

Courses

Payments

Blogs

AI Assistant

Study Abroad

Placements

Certificates

CRM

Analytics

---

# Integrations

- Razorpay
- WhatsApp
- Google Maps
- Google Analytics
- Meta Pixel
- Resend Email
- Cloudinary
- YouTube

---

# Animation Rules

Use Framer Motion

- Fade
- Slide
- Scale
- Scroll Reveal
- Hover Elevation
- Floating Cards
- Gradient Backgrounds

Animations should remain smooth and never block rendering.

---

# Coding Standards

- TypeScript Strict Mode
- ESLint
- Prettier
- Reusable Components
- No Duplicate Code
- Clean Architecture
- Modular Design
- Proper Error Handling
- Strong Type Safety

---

# Deployment Checklist

- Build passes
- No TypeScript errors
- No ESLint errors
- Responsive on all devices
- SEO complete
- Accessibility compliant
- Performance optimized
- Production ready
