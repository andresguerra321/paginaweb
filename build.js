const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, 'public');
const DIST = path.join(__dirname, 'dist');

// Clean previous dist
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
}

console.log('Building clean dist/ folder from ./public...');
fs.cpSync(PUBLIC, DIST, { recursive: true });

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
console.log(`✅ Done — ${count} files synchronized from ./public to ./dist`);
