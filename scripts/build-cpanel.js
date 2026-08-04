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
  // Standard copy
  ['.next', 'public', 'package.json', 'server.js', '.htaccess'].forEach(item => {
    const src = path.join(__dirname, '..', item);
    const dest = path.join(distDir, item);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  });
}

const serverSrc = path.join(__dirname, '../server.js');
if (fs.existsSync(serverSrc)) {
  fs.copyFileSync(serverSrc, path.join(distDir, 'server.js'));
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
    content = content.replace(/C:\\\\KodeToCareer/gi, '.');
    content = content.replace(/C:\\\\kodetocareer/gi, '.');
    content = content.replace(/C:\\KodeToCareer/gi, '.');
    content = content.replace(/C:\\kodetocareer/gi, '.');
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('✅ cpanel-deploy folder created and sanitized for Linux!');

// 3. Zip for cPanel upload using native tar (handles Windows long paths cleanly)
try {
  const zipPath = path.join(__dirname, '../cpanel-deploy.zip');
  if (fs.existsSync(zipPath)) {
    try {
      fs.unlinkSync(zipPath);
    } catch (e) {
      console.warn('Existing zip locked, attempting overwrite:', e.message);
    }
  }
  console.log('🤐 Step 3: Compressing into cpanel-deploy.zip...');
  try {
    execSync(`tar -a -cf "${zipPath}" -C "${distDir}" .`, { stdio: 'inherit' });
  } catch (tarErr) {
    console.warn('Tar failed, falling back to Compress-Archive:', tarErr.message);
    const psCmd = `powershell -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`;
    execSync(psCmd, { stdio: 'inherit' });
  }
  console.log('\n🎉 SUCCESS! Standard PKZIP cpanel-deploy.zip created in project root!');
  console.log('👉 Upload cpanel-deploy.zip to your cPanel File Manager & Extract!');
} catch (err) {
  console.error('Packaging error:', err);
  console.log('Folder cpanel-deploy ready for manual zip upload.');
}
