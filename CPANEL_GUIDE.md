# 📦 cPanel Deployment Guide for KodeToCareer (Next.js)

Bhai, cPanel ke liye poora automatic setup kar diya hai! Tera production zip package **`cpanel-deploy.zip`** ready ho gaya hai.

---

## ⚡ Step-by-Step cPanel Deployment Guide

### Step 1: Open cPanel Setup Node.js App
1. cPanel mein login kar aur **"Setup Node.js App"** ya **"Node.js Selector"** par click kar.
2. **"Create Application"** button par click kar.
3. Configure settings:
   - **Node.js version**: Choose `20.x` or `18.x`
   - **Application mode**: `Production`
   - **Application root**: `public_html` (ya aisi folder jahan domain point kar raha hai)
   - **Application URL**: `yourdomain.com`
   - **Application startup file**: `server.js`
4. Click **"Create"**.

---

### Step 2: Upload `cpanel-deploy.zip`
1. cPanel mein **"File Manager"** khol.
2. Apne domain ki folder (`public_html`) mein ja.
3. UpAR **"Upload"** button par click kar aur [cpanel-deploy.zip](file:///c:/kodetocareer/cpanel-deploy.zip) upload kar de.
4. Upload hone ke baad ZIP file ko select kar ke **"Extract"** par click kar.

---

### Step 3: Start Node.js Application
1. Wapas cPanel ke **"Setup Node.js App"** page par ja.
2. Apni app ke aage **"Restart"** button (ya **Run JS script**) par click kar.
3. 🔥 **Boom! Teri KodeToCareer Next.js website cPanel par live ho jayegi!**

---

### 🛠️ Key Files Created for cPanel:

| File / Folder | Description |
| --- | --- |
| [cpanel-deploy.zip](file:///c:/kodetocareer/cpanel-deploy.zip) | **Ready-to-upload ZIP file** containing standalone Next.js server & static assets |
| [cpanel-deploy/](file:///c:/kodetocareer/cpanel-deploy) | Uncompressed deployment folder |
| [server.js](file:///c:/kodetocareer/server.js) | Custom Node.js production server for cPanel Phusion Passenger |
| [.htaccess](file:///c:/kodetocareer/.htaccess) | Apache / LiteSpeed reverse proxy rewrite rules |
| `npm run build:cpanel` | Command to rebuild `cpanel-deploy.zip` anytime you make changes |
