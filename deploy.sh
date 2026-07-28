#!/bin/bash
# 🚀 Automated Production Deployment Script for KodeToCareer

echo "========================================="
echo "  Deploying KodeToCareer (Next.js 16)   "
echo "========================================="

# Stop script on first error
set -e

# Pull latest changes if in git repo
if [ -d ".git" ]; then
    echo "📥 Pulling latest git changes..."
    git pull origin main || true
fi

# Check if Docker is installed
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Deploying via Docker Compose..."
    docker-compose down
    docker-compose up --build -d
    echo "✅ Docker deployment complete! Running on port 3000."
    exit 0
fi

# Fallback: PM2 / Node.js Deployment
if command -v pm2 &> /dev/null; then
    echo "⚡ Deploying via PM2..."
    npm ci
    npm run build
    pm2 reload kodetocareer || pm2 start npm --name "kodetocareer" -- start
    pm2 save
    echo "✅ PM2 deployment complete!"
    exit 0
fi

# Basic Node.js fallback
echo "📦 Installing dependencies & building..."
npm ci
npm run build

echo "🎉 Build finished successfully!"
echo "To start in production: npm run start"
