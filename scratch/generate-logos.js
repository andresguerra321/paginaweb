const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\andre\\.gemini\\antigravity-ide\\brain\\29652189-b662-4b46-b3ec-530a9cd5cd4a';
const outDir = path.resolve(__dirname, '../public/img/logo');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Convert the generated 3D shield render to PNG in public/img/logo/
const img3dSource = path.join(brainDir, 'guerra_software_logo_1789052468675.jpg');
const imgNeonSource = path.join(brainDir, 'guerra_logo_minimal_vector_1789052487817.jpg');

async function processImages() {
  if (fs.existsSync(img3dSource)) {
    await sharp(img3dSource)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(outDir, 'guerra-shield-3d.png'));
    console.log('Generated guerra-shield-3d.png');
  }

  if (fs.existsSync(imgNeonSource)) {
    await sharp(imgNeonSource)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(outDir, 'guerra-neon-concept.png'));
    console.log('Generated guerra-neon-concept.png');
  }
}

// 2. Build the Master Vector SVG (Clean, Precision Geometric Isotipo & Full Lockup)
// Inspired by elite software security & high-performance engineering
function createSymbolSvg(size = 1000) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="${size}" height="${size}" fill="none">
  <defs>
    <!-- Background / Glow Filters -->
    <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="16" result="blur1" />
      <feGaussianBlur stdDeviation="32" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="laserGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Gradients -->
    <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="30%" stop-color="#4F46E5"/>
      <stop offset="70%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>

    <linearGradient id="shieldFacetLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#0B0F19" stop-opacity="0.98"/>
    </linearGradient>

    <linearGradient id="shieldFacetRight" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.98"/>
    </linearGradient>

    <linearGradient id="gBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="45%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>

    <linearGradient id="innerArmorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#030712"/>
    </linearGradient>

    <radialGradient id="quantumCoreGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#38BDF8"/>
      <stop offset="65%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#064E3B" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="trackGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#818CF8"/>
    </linearGradient>
  </defs>

  <!-- ==================== TACTICAL SHIELD BASE (ISOTIPO) ==================== -->
  
  <!-- Outer Atmospheric Aura -->
  <path d="M 500 80 L 820 220 L 820 540 L 500 890 L 180 540 L 180 220 Z" 
        stroke="url(#shieldBorderGrad)" stroke-width="4" stroke-opacity="0.35" fill="none" filter="url(#laserGlow)"/>

  <!-- Main Outer Armor Plates (Geometric Faceted Shield) -->
  <path d="M 500 105 L 800 235 L 800 530 L 500 860 L 200 530 L 200 235 Z" 
        fill="url(#innerArmorGrad)" stroke="#1E293B" stroke-width="8"/>

  <!-- Left Armor Facet (Shadow & Depth) -->
  <path d="M 500 105 L 200 235 L 200 530 L 500 860 Z" 
        fill="url(#shieldFacetLeft)"/>

  <!-- Right Armor Facet (Reflective Chiseled Specular) -->
  <path d="M 500 105 L 800 235 L 800 530 L 500 860 Z" 
        fill="url(#shieldFacetRight)"/>

  <!-- Internal Shield Border Trench -->
  <path d="M 500 140 L 765 255 L 765 515 L 500 815 L 235 515 L 235 255 Z" 
        stroke="url(#shieldBorderGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="#070A12"/>

  <!-- ==================== THE "G" CYBERNETIC ARCHITECTURE ==================== -->
  <!-- Master "G" Silhouette forged inside the shield -->
  <!-- Top Bar & Arc of the G -->
  <path d="M 720 330 
           L 500 210 
           L 300 300 
           L 300 520 
           L 500 660 
           L 700 535 
           L 700 450 
           L 500 450" 
        stroke="url(#gBeamGrad)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none" filter="url(#laserGlow)"/>

  <!-- Inner G Edge Contour for 3D Chisel -->
  <path d="M 680 340 
           L 500 240 
           L 340 315 
           L 340 500 
           L 500 615 
           L 660 515 
           L 660 480 
           L 500 480" 
        stroke="#FFFFFF" stroke-opacity="0.85" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- ==================== CIRCUITRY & DATA HIGHWAYS ==================== -->
  <!-- Code bracket nodes: Left < bracket -->
  <path d="M 270 385 L 235 410 L 270 435" stroke="#38BDF8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Code bracket nodes: Right > bracket -->
  <path d="M 730 385 L 765 410 L 730 435" stroke="#38BDF8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Horizontal Data Highway into the Core -->
  <line x1="340" y1="380" x2="440" y2="380" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"/>
  <circle cx="370" cy="380" r="6" fill="#38BDF8"/>

  <!-- Vertical Bus from Top Crown -->
  <line x1="500" y1="145" x2="500" y2="210" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"/>
  <circle cx="500" cy="180" r="5" fill="#38BDF8"/>

  <!-- Diagonal Circuit Tracks -->
  <path d="M 370 460 L 420 410 L 460 410" stroke="#6366F1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="370" cy="460" r="5" fill="#6366F1"/>

  <path d="M 630 380 L 580 380 L 550 410" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="630" cy="380" r="5" fill="#10B981"/>

  <!-- Lower Anchor Bus -->
  <line x1="500" y1="660" x2="500" y2="780" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-dasharray="10 8"/>
  <circle cx="500" cy="740" r="6" fill="#10B981"/>

  <!-- ==================== QUANTUM EMERALD/CYAN CORE ==================== -->
  <!-- Ambient Core Bloom -->
  <circle cx="500" cy="450" r="75" fill="url(#quantumCoreGrad)" filter="url(#coreGlow)"/>

  <!-- Outer Orbital Ring -->
  <circle cx="500" cy="450" r="44" stroke="#38BDF8" stroke-width="3" stroke-dasharray="12 6" fill="none"/>

  <!-- Inner Citadel Node (Hexagon Core) -->
  <polygon points="500,422 524,436 524,464 500,478 476,464 476,436" 
           fill="#0F172A" stroke="#10B981" stroke-width="4"/>

  <!-- Active Status Beacon (Zero-Downtime Heartbeat) -->
  <circle cx="500" cy="450" r="12" fill="#10B981" filter="url(#coreGlow)"/>
  <circle cx="500" cy="450" r="5" fill="#FFFFFF"/>

  <!-- Micro Coordinate Callouts (Tactical Tech Detailing) -->
  <text x="500" y="845" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#64748B" text-anchor="middle" letter-spacing="4">SYS.VER // BATTLE-TESTED</text>
</svg>`;
}

// Master Brand Lockup SVG: Symbol + Typography "GUERRA" + Subtitle "SOFTWARE ECOSYSTEM"
function createFullBrandSvg(width = 1600, height = 600) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <!-- Filter -->
    <filter id="fullLaserGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <linearGradient id="brandTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>

    <linearGradient id="accentLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#6366F1"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  </defs>

  <!-- Nested Symbol Group (Scaled and positioned on the left) -->
  <g transform="translate(60, 50) scale(0.5)">
    ${createSymbolSvg(1000).replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>

  <!-- Typography Zone -->
  <g transform="translate(620, 0)">
    <!-- Category Tag -->
    <g transform="translate(0, 190)">
      <rect x="0" y="-22" width="220" height="32" rx="6" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
      <circle cx="16" cy="-6" r="4" fill="#10B981"/>
      <text x="32" y="0" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="700" fill="#38BDF8" letter-spacing="2">PRIVATE ENG // V2</text>
    </g>

    <!-- Main Logotype: GUERRA -->
    <text x="0" y="310" 
          font-family="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" 
          font-size="118" 
          font-weight="900" 
          fill="url(#brandTextGrad)" 
          letter-spacing="14">GUERRA</text>

    <!-- Decorative Tactical Baseline -->
    <rect x="0" y="340" width="880" height="4" fill="url(#accentLineGrad)" rx="2"/>
    <rect x="0" y="340" width="140" height="4" fill="#38BDF8" rx="2" filter="url(#fullLaserGlow)"/>

    <!-- Subtitle & Descriptor -->
    <text x="4" y="395" 
          font-family="'JetBrains Mono', monospace" 
          font-size="28" 
          font-weight="600" 
          fill="#38BDF8" 
          letter-spacing="10">SOFTWARE ECOSYSTEM</text>

    <!-- Mission Descriptor -->
    <text x="6" y="440" 
          font-family="'DM Sans', system-ui, sans-serif" 
          font-size="20" 
          font-weight="500" 
          fill="#94A3B8" 
          letter-spacing="1">Arquitectura de Alta Resiliencia &amp; Código Propietario</text>
  </g>
</svg>`;
}

// Dark Card Presentation (Luxury Obsidian Showcase)
function createDarkCardSvg(width = 1600, height = 900) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <radialGradient id="bgGlow" cx="35%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1E1B4B" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#0E131F" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#07090E"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Dark Obsidian Base -->
  <rect width="${width}" height="${height}" fill="#07090E"/>
  <rect width="${width}" height="${height}" fill="url(#bgGlow)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Border Frame -->
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" 
        fill="none" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2"/>

  <!-- Corner Brackets -->
  <path d="M 40 80 L 40 40 L 80 40" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <path d="M ${width - 80} 40 L ${width - 40} 40 L ${width - 40} 80" stroke="#38BDF8" stroke-width="3" fill="none"/>
  <path d="M 40 ${height - 80} L 40 ${height - 40} L 80 ${height - 40}" stroke="#10B981" stroke-width="3" fill="none"/>
  <path d="M ${width - 80} ${height - 40} L ${width - 40} ${height - 40} L ${width - 40} ${height - 80}" stroke="#10B981" stroke-width="3" fill="none"/>

  <!-- Content Group -->
  <g transform="translate(0, 150)">
    ${createFullBrandSvg(1600, 600).replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
</svg>`;
}

async function run() {
  await processImages();

  // Save SVGs
  const symbolSvg = createSymbolSvg(1000);
  const fullSvg = createFullBrandSvg(1600, 600);
  const darkCardSvg = createDarkCardSvg(1600, 900);

  fs.writeFileSync(path.join(outDir, 'logo-guerra.svg'), symbolSvg, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'logo-guerra-full.svg'), fullSvg, 'utf-8');
  console.log('Saved vector SVGs');

  // Render PNGs via Sharp (Transparent background)
  await sharp(Buffer.from(symbolSvg))
    .resize(1024, 1024)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'logo-guerra-symbol.png'));
  console.log('Generated logo-guerra-symbol.png (1024x1024 transparent)');

  await sharp(Buffer.from(symbolSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'logo-guerra-symbol-512.png'));
  console.log('Generated logo-guerra-symbol-512.png (512x512 transparent)');

  await sharp(Buffer.from(fullSvg))
    .resize(1600, 600)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'logo-guerra-full.png'));
  console.log('Generated logo-guerra-full.png (1600x600 transparent)');

  await sharp(Buffer.from(darkCardSvg))
    .resize(1600, 900)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'logo-guerra-dark-card.png'));
  console.log('Generated logo-guerra-dark-card.png (1600x900 showcase)');

  console.log('ALL LOGO ASSETS SUCCESSFULLY GENERATED!');
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
