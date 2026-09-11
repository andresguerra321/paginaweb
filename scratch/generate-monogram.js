const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = 'C:\\Users\\andre\\.gemini\\antigravity-ide\\brain\\29652189-b662-4b46-b3ec-530a9cd5cd4a';
const outDir = path.resolve(__dirname, '../public/img/logo');

// Convert AI generated concepts to PNG
async function convertConcepts() {
  const c1 = path.join(brainDir, 'guerra_venture_geometric_monogram_1789053105180.jpg');
  const c2 = path.join(brainDir, 'guerra_monogram_interlocking_1789053143658.jpg');
  const c3 = path.join(brainDir, 'guerra_abstract_monogram_1789053079852.jpg');

  if (fs.existsSync(c1)) {
    await sharp(c1).png({ quality: 100 }).toFile(path.join(outDir, 'monograma-catalyst-arrow.png'));
    console.log('Saved monograma-catalyst-arrow.png');
  }
  if (fs.existsSync(c2)) {
    await sharp(c2).png({ quality: 100 }).toFile(path.join(outDir, 'monograma-vortex-ventures.png'));
    console.log('Saved monograma-vortex-ventures.png');
  }
  if (fs.existsSync(c3)) {
    await sharp(c3).png({ quality: 100 }).toFile(path.join(outDir, 'monograma-geometric-crystal.png'));
    console.log('Saved monograma-geometric-crystal.png');
  }
}

// Build the Mathematical Pure Vector Monogram: "THE CATALYST G"
// Pure geometric isometric ribbons in shades of blue.
// Represents:
// 1. Structural foundation (Software Architecture)
// 2. Interlocking loop (Incubation, Sponsorship, Local Community)
// 3. Ascending Vector Arrow (Elevation, Startup Growth, Scaling)
function createCatalystVectorSvg(size = 1000) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="${size}" height="${size}" fill="none">
  <defs>
    <!-- Rich Blue Gradients -->
    <!-- 1. Left Foundation Pillar (Software Architecture) -->
    <linearGradient id="gradLeftPillar" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="50%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#38BDF8"/>
    </linearGradient>

    <!-- 2. Top Arch (Strategic Protection & Mentorship) -->
    <linearGradient id="gradTopArch" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="60%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#93C5FD"/>
    </linearGradient>

    <!-- 3. Dynamic Catalyst Arrow (Impulse / Startup Growth) -->
    <linearGradient id="gradArrow" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="50%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#E0F2FE"/>
    </linearGradient>

    <!-- 4. Bottom Base & Isometric Chisel -->
    <linearGradient id="gradBase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="50%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>

    <!-- 5. Central Inward Arm of the G (Sponsorship Bridge) -->
    <linearGradient id="gradBridge" x1="100%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#1D4ED8"/>
      <stop offset="60%" stop-color="#38BDF8"/>
      <stop offset="100%" stop-color="#BAE6FD"/>
    </linearGradient>

    <!-- 6. Inner Shadow Facets (Isometric Depth) -->
    <linearGradient id="gradShadowFacet" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F172A" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0.95"/>
    </linearGradient>

    <!-- Ambient Glow Filter -->
    <filter id="blueAtmosphere" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="20" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Group centered in 1000x1000 with harmonious padding -->
  <g transform="translate(10, 10)">
    
    <!-- SUB-LAYER: Ambient Backing Glow -->
    <path d="M 320 220 
             L 600 220 
             L 750 120 
             L 780 280 
             L 680 340 
             L 680 500 
             L 500 500 
             L 500 580 
             L 660 580 
             L 660 680 
             L 320 780 
             L 200 640 
             L 200 360 Z" 
          fill="#2563EB" opacity="0.15" filter="url(#blueAtmosphere)"/>

    <!-- ==================== ISOMETRIC FACETS OF THE MONOGRAM "G" ==================== -->

    <!-- 1. LEFT PILLAR - OUTER FACET (Software Foundation) -->
    <!-- Represents the stability and deep technical infrastructure -->
    <polygon points="200,360 320,260 320,720 200,640" 
             fill="url(#gradLeftPillar)"/>

    <!-- 2. LEFT PILLAR - INNER FACET (Depth & Core) -->
    <polygon points="320,260 400,320 400,660 320,720" 
             fill="url(#gradShadowFacet)"/>

    <!-- 3. TOP HORIZONTAL BEAM (Sponsorship Umbrella / Mentorship) -->
    <!-- Reaches from left pillar to top curve -->
    <polygon points="320,260 600,260 540,340 400,340" 
             fill="url(#gradTopArch)"/>

    <!-- 4. ASCENDING CATALYST VECTOR (The Arrow of Growth for Entrepreneurs) -->
    <!-- Breaks out of the G to signify progress, scaling, and market launch -->
    <!-- Arrow Head -->
    <polygon points="760,110 820,270 730,240 700,290 620,210 670,180" 
             fill="url(#gradArrow)"/>
    <!-- Arrow Stem / Ramp -->
    <polygon points="540,340 670,180 730,240 600,400" 
             fill="url(#gradBase)"/>

    <!-- 5. RIGHT SIDE DESCENT & EMBRACE -->
    <polygon points="680,420 760,480 760,660 680,600" 
             fill="url(#gradLeftPillar)"/>

    <!-- 6. LOWER BASE FOUNDATION (Modular Economic Support) -->
    <polygon points="200,640 320,720 680,720 600,800 280,800 160,700" 
             fill="url(#gradBase)"/>

    <!-- 7. INNER BRIDGE (The G Inward Hook - Venture Partnership) -->
    <!-- Bridges the community of entrepreneurs to the software platform -->
    <polygon points="680,600 760,660 520,660 520,560 660,560 660,480 440,480 440,400 600,400" 
             fill="url(#gradBridge)"/>

    <!-- 8. INNER CHISELED ACCENT LINES (High-Precision Engineering Aesthetic) -->
    <!-- Crisp chamfer highlights -->
    <line x1="200" y1="360" x2="320" y2="260" stroke="#BAE6FD" stroke-width="4" stroke-linecap="round"/>
    <line x1="320" y1="260" x2="600" y2="260" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    <line x1="760" y1="110" x2="820" y2="270" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
    <line x1="760" y1="110" x2="670" y2="180" stroke="#E0F2FE" stroke-width="4" stroke-linecap="round"/>
    <line x1="520" y1="560" x2="660" y2="560" stroke="#BAE6FD" stroke-width="4" stroke-linecap="round"/>

    <!-- Micro Tech / Architectural Node Points -->
    <circle cx="760" cy="110" r="6" fill="#FFFFFF"/>
    <circle cx="200" cy="360" r="5" fill="#38BDF8"/>
    <circle cx="520" cy="560" r="5" fill="#60A5FA"/>
  </g>
</svg>`;
}

// Master Multi-Use Brand Lockup: Monogram + GUERRA + Dual Mission Subtitle
function createMultiUseBrandSvg(width = 1800, height = 650) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="textGradWhite" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>

    <linearGradient id="textGradBlue" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="50%" stop-color="#60A5FA"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>

    <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="40%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="rgba(37, 99, 235, 0)"/>
    </linearGradient>
  </defs>

  <!-- Symbol Left Scaled -->
  <g transform="translate(60, 50) scale(0.55)">
    ${createCatalystVectorSvg(1000).replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>

  <!-- Typography Zone (Multi-Use Enterprise & Venture) -->
  <g transform="translate(650, 0)">
    <!-- Pill Tag: Dual Identity -->
    <g transform="translate(0, 185)">
      <rect x="0" y="-22" width="340" height="34" rx="17" fill="rgba(37, 99, 235, 0.15)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="1.5"/>
      <circle cx="18" cy="-5" r="5" fill="#38BDF8"/>
      <text x="36" y="1" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#38BDF8" letter-spacing="2">SOFTWARE &amp; VENTURE CATALYST</text>
    </g>

    <!-- Main Wordmark: GUERRA -->
    <text x="0" y="315" 
          font-family="'Outfit', system-ui, -apple-system, sans-serif" 
          font-size="124" 
          font-weight="900" 
          fill="url(#textGradWhite)" 
          letter-spacing="12">GUERRA</text>

    <!-- Architectural Growth Line -->
    <rect x="0" y="348" width="1020" height="4" fill="url(#dividerGrad)" rx="2"/>
    <rect x="0" y="348" width="160" height="4" fill="#38BDF8" rx="2"/>

    <!-- Mission Descriptor 1 (Software) -->
    <text x="4" y="405" 
          font-family="'JetBrains Mono', monospace" 
          font-size="24" 
          font-weight="700" 
          fill="url(#textGradBlue)" 
          letter-spacing="6">INGENIERÍA DE SOFTWARE // PATROCINIO LOCAL</text>

    <!-- Mission Descriptor 2 (Entrepreneurial Impulse) -->
    <text x="6" y="450" 
          font-family="'DM Sans', system-ui, sans-serif" 
          font-size="20" 
          font-weight="500" 
          fill="#94A3B8" 
          letter-spacing="1">Plataforma tecnológica &amp; Capital semilla para proyectos de emprendedores locales</text>
  </g>
</svg>`;
}

// Sponsor Badge Lockup: Specially designed for event banners, partner sites, pitch decks
function createSponsorBadgeSvg(width = 1200, height = 400) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none">
  <defs>
    <linearGradient id="badgeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#1E3A8A" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="badgeBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0E131F"/>
      <stop offset="100%" stop-color="#07090E"/>
    </linearGradient>
  </defs>

  <!-- Framed Container -->
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="20" 
        fill="url(#badgeBg)" stroke="url(#badgeBorder)" stroke-width="2"/>

  <!-- Symbol Left -->
  <g transform="translate(40, 20) scale(0.36)">
    ${createCatalystVectorSvg(1000).replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>

  <!-- Typography Right -->
  <g transform="translate(440, 0)">
    <text x="0" y="125" font-family="'JetBrains Mono', monospace" font-size="16" font-weight="700" fill="#38BDF8" letter-spacing="4">IMPULSADO &amp; PATROCINADO POR</text>
    <text x="0" y="210" font-family="'Outfit', sans-serif" font-size="76" font-weight="900" fill="#FFFFFF" letter-spacing="8">GUERRA</text>
    <text x="0" y="260" font-family="'DM Sans', sans-serif" font-size="20" font-weight="600" fill="#60A5FA" letter-spacing="3">VENTURE &amp; SOFTWARE PARTNER</text>
    <text x="0" y="300" font-family="'DM Sans', sans-serif" font-size="16" fill="#94A3B8">Acelerando la innovación y el talento emprendedor local</text>
  </g>
</svg>`;
}

async function run() {
  await convertConcepts();

  const catalystSvg = createCatalystVectorSvg(1000);
  const multiUseSvg = createMultiUseBrandSvg(1800, 650);
  const sponsorBadgeSvg = createSponsorBadgeSvg(1200, 400);

  // Save SVGs
  fs.writeFileSync(path.join(outDir, 'monograma-guerra-catalyst.svg'), catalystSvg, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'monograma-guerra-full.svg'), multiUseSvg, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'monograma-guerra-sponsor-badge.svg'), sponsorBadgeSvg, 'utf-8');
  console.log('Saved SVG files');

  // Render Transparent PNGs via Sharp
  await sharp(Buffer.from(catalystSvg))
    .resize(1024, 1024)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'monograma-guerra-catalyst-1024.png'));
  console.log('Generated monograma-guerra-catalyst-1024.png (Transparent)');

  await sharp(Buffer.from(catalystSvg))
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'monograma-guerra-catalyst-512.png'));
  console.log('Generated monograma-guerra-catalyst-512.png (Transparent)');

  await sharp(Buffer.from(multiUseSvg))
    .resize(1800, 650)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'monograma-guerra-full-lockup.png'));
  console.log('Generated monograma-guerra-full-lockup.png (Transparent)');

  await sharp(Buffer.from(sponsorBadgeSvg))
    .resize(1200, 400)
    .png({ quality: 100 })
    .toFile(path.join(outDir, 'monograma-guerra-sponsor-badge.png'));
  console.log('Generated monograma-guerra-sponsor-badge.png');

  console.log('ALL MONOGRAM ASSETS COMPLETED!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
