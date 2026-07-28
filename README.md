# KodeToCareer — AI-Powered Career Hub

> **Empowering the Next Generation of Tech Professionals**  
> Master software engineering, MERN Stack, Data Science, Java, and Cloud DevOps with live cohorts, guaranteed corporate internships, and 100% placement support.

---

## 🌟 Key Features

- **🤖 AI Interactive Tools**: Built-in AI Career Counselor, AI Mock Interview Simulator, and AI Resume Grader.
- **🎓 Industry-Led Career Academies**: Comprehensive programs covering MERN Stack, Python AI/ML, Data Science, Java Full Stack, Cloud DevOps, and UI/UX Design.
- **💼 Direct Placement Network**: Partnership with 100+ top tech companies to dispatch audited student portfolios.
- **🚀 Project Showcase**: Real-world student case studies and live interactive product builds.
- **📍 Multi-Location & SEO Landing Pages**: 500+ static prerendered pages for localized and price-budget career searches across major tech hubs.
- **⚡ Core Web Vitals Optimized**: Sub-2-second page loads, WebP media format, dynamic route-level code splitting, and long-term caching.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI & Styling**: [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Viewport-scoped)
- **Icons**: [Lucide React](https://lucide.dev/) (Tree-shaken package imports)
- **Fonts**: [Next Font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (`Inter`, `Sora`, `Space Grotesk`)
- **Deployment**: Standalone cPanel Node.js package & Vercel Edge Serverless

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.x or higher
- **Package Manager**: `npm`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/KAYHANH/kodetocareer-website.git

# Navigate into the project folder
cd kodetocareer-website

# Install dependencies
npm install
```

### 3. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Building for Production

### Standard Production Build
```bash
npm run build
npm run start
```

### 🚢 Building cPanel Deployment Package (`cpanel-deploy.zip`)
To generate a standalone ZIP package ready for cPanel File Manager upload:

```bash
node scripts/build-cpanel.js
```
This script:
1. Runs `next build` to generate static SSG routes and standalone server files.
2. Packages `.next/standalone`, `public/`, `server.js`, and `.htaccess` into `cpanel-deploy.zip` (~39 MB).

#### Deployment to cPanel:
1. Upload `cpanel-deploy.zip` to cPanel File Manager in your domain root (`public_html`).
2. Click **Extract**.
3. In cPanel **Setup Node.js App**, set startup file to `server.js` and click **Restart**.

---

## ⚡ Performance Optimizations

- **WebP Image Format**: All program banner PNGs converted to compressed `.webp` format, reducing image payload by **88.7%** (~2.2 MB to ~248 KB).
- **Dynamic Imports**: Below-the-fold homepage sections dynamically loaded (`next/dynamic`) for minimal initial JavaScript bundle size.
- **Server Compression**: Brotli (`mod_brotli`) and Gzip (`mod_deflate`) filters enabled in `.htaccess`.
- **Browser Caching**: 1-year immutable caching (`Cache-Control: public, max-age=31536000, immutable`) for static assets.

---

## 📄 License

Copyright © 2026 **KodeToCareer**. All rights reserved.
