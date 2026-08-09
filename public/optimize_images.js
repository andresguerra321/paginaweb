const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directories = [
  'img',
  'proyecto-bot-whatsapp/img',
  'proyecto-bot-whatsapp/img/images'
];

const sizes = [1200, 800];
const formats = ['avif', 'webp'];

async function processDirectory(dir) {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    // Skip already processed files (containing -1200 or -800)
    if (file.includes('-1200') || file.includes('-800')) {
      continue;
    }

    const filePath = path.join(dirPath, file);
    const basename = path.basename(file, ext);
    
    // Check if outputs already exist and are up to date
    const checkPath = path.join(dirPath, `${basename}-1200.avif`);
    if (fs.existsSync(checkPath)) {
      const origStat = fs.statSync(filePath);
      const outStat = fs.statSync(checkPath);
      if (outStat.mtimeMs > origStat.mtimeMs) {
        continue;
      }
    }

    console.log(`Processing: ${filePath}`);

    for (const size of sizes) {
      // Generate AVIF and WEBP
      for (const format of formats) {
        const outName = `${basename}-${size}.${format}`;
        const outPath = path.join(dirPath, outName);
        
        await sharp(filePath)
          .resize({ width: size, withoutEnlargement: true })
          .toFormat(format, { quality: 80 })
          .toFile(outPath)
          .catch(err => console.error(`Error processing ${outPath}:`, err));
      }
      
      // Generate fallback resized image (original format)
      const outName = `${basename}-${size}${ext}`;
      const outPath = path.join(dirPath, outName);
      
      await sharp(filePath)
        .resize({ width: size, withoutEnlargement: true })
        .toFile(outPath)
        .catch(err => console.error(`Error processing ${outPath}:`, err));
    }
  }
}

async function main() {
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log('Finished processing images.');
}

main();
