const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

// Directories and files to skip when copying to the clean dist/ folder
const SKIP = new Set([
  '.git',
  'node_modules',
  'dist',
  'build.js',
  'replace.js',
  'replace.py',
  'update_about_img.py',
  'update_portfolio.py',
  'optimize_images.js',
  'package.json',
  'package-lock.json',
  '.assetsignore',
  'startbootstrap-agency-gh-pages.zip',
  '.antigravityignore'
]);

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      if (SKIP.has(entry)) continue;
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    // Skip files larger than 24 MB
    if (stat.size > 24 * 1024 * 1024) {
      console.log(`  SKIP (too large): ${src} (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
      return;
    }
    fs.copyFileSync(src, dest);
  }
}

// Clean previous dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}

console.log('Building clean dist/ folder...');
copyRecursive(__dirname, DIST);

// Count files
let count = 0;
function countFiles(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) countFiles(full);
    else count++;
  }
}
countFiles(DIST);
console.log(`✅ Done — ${count} files copied to dist/`);
