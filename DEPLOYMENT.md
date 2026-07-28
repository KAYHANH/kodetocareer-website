# 🚀 KodeToCareer Deployment Guide

This guide provides step-by-step instructions to deploy the **KodeToCareer Next.js 16 Application** to production.

---

## ⚡ Option 1: Deploy to Vercel (Recommended — Easiest & Fastest)

Vercel is built by the creators of Next.js and provides zero-config deployment with global CDN and automated SSL.

### Step 1: Deploy via Vercel CLI
Run the following commands in your terminal:
```bash
npx vercel
```
- Follow the interactive prompts to link your project.
- To deploy directly to **Production**:
```bash
npx vercel --prod
```

### Step 2: Deploy via GitHub (Automated CI/CD)
1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Prepare production deployment"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository `kodetocareer`.
4. Click **Deploy**. Vercel will automatically build and deploy every new commit.

---

## 🐳 Option 2: Deploy to VPS / Cloud using Docker (Hostinger, AWS, DigitalOcean, Hetzner)

The project includes an optimized **multi-stage Dockerfile** (~100MB standalone container).

### Step 1: Transfer Code to your Server
```bash
git clone <your-repo-url> /var/www/kodetocareer
cd /var/www/kodetocareer
```

### Step 2: Run Docker Compose
```bash
docker-compose up --build -d
```
Your application will be live at `http://YOUR_SERVER_IP:3000`.

---

## 🐧 Option 3: Deploy to VPS using PM2 & Nginx (Ubuntu / Debian)

### Step 1: Install Node.js 20 & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

### Step 2: Build & Start App
```bash
cd /var/www/kodetocareer
npm ci
npm run build
pm2 start npm --name "kodetocareer" -- start
pm2 save
pm2 startup
```

### Step 3: Configure Nginx Reverse Proxy & SSL
Edit `/etc/nginx/sites-available/kodetocareer`:
```nginx
server {
    server_name kodetocareer.com www.kodetocareer.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
Enable site & install free SSL certificate via Certbot:
```bash
sudo ln -s /etc/nginx/sites-available/kodetocareer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d kodetocareer.com -d www.kodetocareer.com
```

---

## 🛠️ Created Deployment Files

| File | Purpose |
| --- | --- |
| [next.config.ts](file:///c:/kodetocareer/next.config.ts) | Configured with `output: 'standalone'` for lightweight production builds |
| [Dockerfile](file:///c:/kodetocareer/Dockerfile) | Production multi-stage Docker build |
| [docker-compose.yml](file:///c:/kodetocareer/docker-compose.yml) | 1-click Docker orchestration with auto-restart |
| [.dockerignore](file:///c:/kodetocareer/.dockerignore) | Excludes node_modules & development assets from Docker builds |
| [deploy.sh](file:///c:/kodetocareer/deploy.sh) | Automated Linux deployment script |
| [vercel.json](file:///c:/kodetocareer/vercel.json) | Vercel production cron & configuration settings |
