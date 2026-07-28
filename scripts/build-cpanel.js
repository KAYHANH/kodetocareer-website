const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building KodeToCareer for cPanel Deployment...\n');

// 1. Run Next.js production build
console.log('📦 Step 1: Running next build...');
execSync('npm run build', { stdio: 'inherit' });

// 2. Prepare cpanel-deploy directory
const distDir = path.join(__dirname, '../cpanel-deploy');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

console.log('\n📂 Step 2: Copying deployment files to cpanel-deploy/...');

// Copy standalone files if output: standalone is enabled
const standaloneDir = path.join(__dirname, '../.next/standalone');
if (fs.existsSync(standaloneDir)) {
  fs.cpSync(standaloneDir, distDir, { recursive: true });
  
  // Copy static assets into .next/static inside standalone
  const staticSrc = path.join(__dirname, '../.next/static');
  const staticDest = path.join(distDir, '.next/static');
  fs.cpSync(staticSrc, staticDest, { recursive: true });
  
  // Copy public folder
  const publicSrc = path.join(__dirname, '../public');
  const publicDest = path.join(distDir, 'public');
  fs.cpSync(publicSrc, publicDest, { recursive: true });
} else {
  // Standard copy
  ['.next', 'public', 'package.json', 'server.js', '.htaccess'].forEach(item => {
    const src = path.join(__dirname, '..', item);
    const dest = path.join(distDir, item);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  });
}

// Copy .htaccess and server.js
const htaccessSrc = path.join(__dirname, '../.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(distDir, '.htaccess'));
}

const serverSrc = path.join(__dirname, '../server.js');
if (fs.existsSync(serverSrc)) {
  fs.copyFileSync(serverSrc, path.join(distDir, 'server.js'));
}

console.log('✅ cpanel-deploy folder created successfully!');

// 3. Zip for cPanel upload using bsdtar (handles long paths natively)
try {
  const zipPath = path.join(__dirname, '../cpanel-deploy.zip');
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  console.log('🤐 Step 3: Compressing into cpanel-deploy.zip via tar...');
  execSync('tar -a -c -f cpanel-deploy.zip cpanel-deploy', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
  console.log('\n🎉 SUCCESS! cpanel-deploy.zip created in project root!');
  console.log('👉 Upload cpanel-deploy.zip to your cPanel File Manager & Extract!');
} catch (err) {
  console.error('Packaging error:', err);
  console.log('Folder cpanel-deploy ready for manual zip upload.');
}
