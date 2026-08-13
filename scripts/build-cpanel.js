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
  try {
    fs.rmSync(distDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch (e) {
    console.warn('Warning removing distDir:', e.message);
  }
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

  // Copy dynamic_posts.json
  const blogJsonSrc = path.join(__dirname, '../src/app/blog/dynamic_posts.json');
  const blogJsonDest = path.join(distDir, 'src/app/blog/dynamic_posts.json');
  if (fs.existsSync(blogJsonSrc)) {
    fs.mkdirSync(path.dirname(blogJsonDest), { recursive: true });
    fs.copyFileSync(blogJsonSrc, blogJsonDest);
  }
} else {
  // Standard copy fallback
  ['.next', 'public', 'package.json'].forEach(item => {
    const src = path.join(__dirname, '..', item);
    const dest = path.join(distDir, item);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  });
}

// Always copy server.js and .htaccess to distDir root
const serverSrc = path.join(__dirname, '../server.js');
if (fs.existsSync(serverSrc)) {
  fs.copyFileSync(serverSrc, path.join(distDir, 'server.js'));
}

const htaccessSrc = path.join(__dirname, '../.htaccess');
if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, path.join(distDir, '.htaccess'));
}

// Sanitize hardcoded Windows paths in server.js and configuration files for Linux cPanel compatibility
const filesToSanitize = [
  path.join(distDir, 'server.js'),
  path.join(distDir, '.next/standalone/server.js'),
  path.join(distDir, '.next/required-server-files.json')
];

filesToSanitize.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace drive letters and Windows paths with relative Linux paths
    content = content.replace(/[a-zA-Z]:\\\\.*?\\\\kodetocareer/gi, '.');
    content = content.replace(/[a-zA-Z]:\\.*?\\kodetocareer/gi, '.');
    content = content.replace(/C:\\\\KodeToCareer/gi, '.');
    content = content.replace(/C:\\\\kodetocareer/gi, '.');
    content = content.replace(/C:\\KodeToCareer/gi, '.');
    content = content.replace(/C:\\kodetocareer/gi, '.');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('✅ cpanel-deploy folder created and sanitized for Linux!');

// 3. Zip for cPanel upload using standard .NET ZipFile
const zipPath = path.join(__dirname, '../cpanel-deploy.zip');
const desktopDir = path.join(process.env.USERPROFILE || 'C:\\Users\\Asus', 'Desktop');
const desktopZip = path.join(desktopDir, 'kodetocareer-deploy.zip');

console.log('🤐 Step 3: Compressing into standard cpanel-deploy.zip via .NET ZipFile...');

if (fs.existsSync(zipPath)) {
  try { fs.unlinkSync(zipPath); } catch (e) {}
}
if (fs.existsSync(desktopZip)) {
  try { fs.unlinkSync(desktopZip); } catch (e) {}
}

const psScript = `
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path '${desktopZip.replace(/\\/g, '\\\\')}') { Remove-Item -Path '${desktopZip.replace(/\\/g, '\\\\')}' -Force }
if (Test-Path '${zipPath.replace(/\\/g, '\\\\')}') { Remove-Item -Path '${zipPath.replace(/\\/g, '\\\\')}' -Force }
[System.IO.Compression.ZipFile]::CreateFromDirectory('${distDir.replace(/\\/g, '\\\\')}', '${desktopZip.replace(/\\/g, '\\\\')}')
Copy-Item -Path '${desktopZip.replace(/\\/g, '\\\\')}' -Destination '${zipPath.replace(/\\/g, '\\\\')}' -Force
`;

const tempPsFile = path.join(__dirname, 'zip-helper.ps1');
fs.writeFileSync(tempPsFile, psScript, 'utf8');

try {
  execSync(`powershell -ExecutionPolicy Bypass -File "${tempPsFile}"`, { stdio: 'inherit' });
  const stats = fs.statSync(desktopZip);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 SUCCESS! Deploy Zip created (${sizeMB} MB) at: ${desktopZip}`);
  console.log('👉 Upload kodetocareer-deploy.zip to your cPanel File Manager & Extract!');
} finally {
  if (fs.existsSync(tempPsFile)) {
    try { fs.unlinkSync(tempPsFile); } catch (e) {}
  }
}
