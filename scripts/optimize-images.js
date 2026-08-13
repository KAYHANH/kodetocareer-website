const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimize() {
  console.log('🚀 Optimizing public images...');

  const publicDir = path.join(__dirname, '../public');

  // 1. logo-icon.png (512x512 -> 240x240)
  const logoIcon = path.join(publicDir, 'logo-icon.png');
  if (fs.existsSync(logoIcon)) {
    const buffer = await sharp(logoIcon)
      .resize(240, 240, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 85, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(logoIcon, buffer);
    console.log(`✅ logo-icon.png optimized (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  // 2. main-logo.png (400x134 -> 300x100)
  const mainLogo = path.join(publicDir, 'main-logo.png');
  if (fs.existsSync(mainLogo)) {
    const buffer = await sharp(mainLogo)
      .resize(300, 100, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 85, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(mainLogo, buffer);
    console.log(`✅ main-logo.png optimized (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  // 3. founder-arbaaz-official.png (147 KB -> compressed ~30 KB)
  const founder = path.join(publicDir, 'founder-arbaaz-official.png');
  if (fs.existsSync(founder)) {
    const buffer = await sharp(founder)
      .resize(600, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    fs.writeFileSync(founder, buffer);
    console.log(`✅ founder-arbaaz-official.png optimized (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  console.log('🎉 Image optimization complete!');
}

optimize().catch(err => console.error(err));
