const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const catDir = path.join(publicDir, 'categories');
const prodDir = path.join(publicDir, 'products');

[publicDir, catDir, prodDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Helper for T-Shirt Mockup SVG
function createTshirtSvg(title, subtitle, colorBg, colorShirt, graphicColor, accentColor, graphicText) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#222228" />
      <stop offset="100%" stop-color="${colorBg}" />
    </radialGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="25" stdDeviation="30" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>
  <!-- Background Canvas -->
  <rect width="800" height="1000" fill="url(#bgGlow)" />
  
  <!-- Subtle Editorial Grid & Watermark -->
  <line x1="60" y1="60" x2="740" y2="60" stroke="#333338" stroke-width="1" />
  <line x1="60" y1="940" x2="740" y2="940" stroke="#333338" stroke-width="1" />
  <text x="60" y="45" fill="#71717a" font-family="monospace" font-size="12" letter-spacing="3">UNFOLD // PERSPECTIVE ARCHIVE</text>
  <text x="740" y="45" text-anchor="end" fill="#71717a" font-family="monospace" font-size="12" letter-spacing="2">240 GSM HEAVYWEIGHT</text>
  
  <!-- T-Shirt Silhouette Group -->
  <g filter="url(#shadow)">
    <!-- T-shirt Shape (Oversized Boxy Tee) -->
    <path d="M 280 140 
             C 320 185, 480 185, 520 140 
             L 680 230 
             L 620 370 
             L 550 330 
             L 550 820 
             C 550 830, 540 840, 520 840 
             L 280 840 
             C 260 840, 250 830, 250 820 
             L 250 330 
             L 180 370 
             L 120 230 
             Z" 
          fill="${colorShirt}" stroke="#3f3f46" stroke-width="1.5" />
          
    <!-- Ribbed Collar Detail -->
    <path d="M 280 140 C 320 190, 480 190, 520 140 C 475 165, 325 165, 280 140 Z" fill="#18181b" stroke="#3f3f46" stroke-width="1"/>
    
    <!-- Sleeve Stitch Lines -->
    <path d="M 180 370 L 250 330" stroke="#27272a" stroke-width="2" stroke-dasharray="4 3" />
    <path d="M 620 370 L 550 330" stroke="#27272a" stroke-width="2" stroke-dasharray="4 3" />
    
    <!-- Center Graphic Artwork Area -->
    <g transform="translate(400, 420)">
      <!-- Artwork Box -->
      <rect x="-140" y="-120" width="280" height="300" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.4"/>
      
      <!-- Graphic Elements -->
      <circle cx="0" cy="-20" r="55" fill="none" stroke="${graphicColor}" stroke-width="3" opacity="0.8"/>
      <polygon points="0,-70 45,15 -45,15" fill="${accentColor}" opacity="0.25" />
      
      <!-- Graphic Typography -->
      <text x="0" y="30" text-anchor="middle" fill="${graphicColor}" font-family="Arial Black, Impact, sans-serif" font-size="22" font-weight="900" letter-spacing="4">${graphicText}</text>
      <text x="0" y="55" text-anchor="middle" fill="${accentColor}" font-family="monospace" font-size="11" letter-spacing="6">UNFOLD PERSPECTIVE</text>
      <text x="0" y="80" text-anchor="middle" fill="#a1a1aa" font-family="sans-serif" font-size="10" letter-spacing="2">EDITION 01 • VERIFIED</text>
      
      <!-- Barcode Accent -->
      <rect x="-60" y="110" width="4" height="25" fill="${graphicColor}"/>
      <rect x="-52" y="110" width="2" height="25" fill="${graphicColor}"/>
      <rect x="-46" y="110" width="8" height="25" fill="${graphicColor}"/>
      <rect x="-34" y="110" width="3" height="25" fill="${graphicColor}"/>
      <rect x="-27" y="110" width="6" height="25" fill="${graphicColor}"/>
      <rect x="-17" y="110" width="2" height="25" fill="${graphicColor}"/>
      <rect x="-11" y="110" width="5" height="25" fill="${graphicColor}"/>
      <rect x="-2" y="110" width="2" height="25" fill="${graphicColor}"/>
      <rect x="4" y="110" width="7" height="25" fill="${graphicColor}"/>
      <rect x="15" y="110" width="3" height="25" fill="${graphicColor}"/>
      <rect x="22" y="110" width="6" height="25" fill="${graphicColor}"/>
      <rect x="32" y="110" width="2" height="25" fill="${graphicColor}"/>
      <rect x="38" y="110" width="8" height="25" fill="${graphicColor}"/>
      <rect x="50" y="110" width="3" height="25" fill="${graphicColor}"/>
      <text x="0" y="148" text-anchor="middle" fill="#71717a" font-family="monospace" font-size="9" letter-spacing="4">89043219001</text>
    </g>
  </g>
  
  <!-- Lower Info Card -->
  <text x="60" y="900" fill="#f4f4f5" font-family="Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="2">${title}</text>
  <text x="60" y="924" fill="#a1a1aa" font-family="monospace" font-size="13" letter-spacing="1">${subtitle}</text>
</svg>`;
}

// Helper for Category Banner SVG
function createCategorySvg(title, vibe, bgGradientFrom, bgGradientTo, accentColor, tag) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1100" width="900" height="1100">
  <defs>
    <linearGradient id="catGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradientFrom}" />
      <stop offset="100%" stop-color="${bgGradientTo}" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="50%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.85" />
    </linearGradient>
  </defs>
  
  <rect width="900" height="1100" fill="url(#catGrad)" />
  
  <!-- Graphic Street Art Elements -->
  <g opacity="0.15" stroke="#ffffff" stroke-width="1.5">
    <circle cx="450" cy="450" r="300" fill="none" />
    <circle cx="450" cy="450" r="200" fill="none" stroke-dasharray="10 8" />
    <line x1="100" y1="100" x2="800" y2="800" />
    <line x1="800" y1="100" x2="100" y2="800" />
  </g>
  
  <!-- Large Perspective Typography Overlay -->
  <text x="450" y="480" text-anchor="middle" fill="#ffffff" opacity="0.07" font-family="Arial Black, Impact, sans-serif" font-size="160" font-weight="900" letter-spacing="10">${tag}</text>
  
  <!-- Gradient Fade -->
  <rect width="900" height="1100" fill="url(#overlay)" />
  
  <!-- Badge -->
  <rect x="70" y="70" width="160" height="34" rx="17" fill="#000000" stroke="${accentColor}" stroke-width="1.5" />
  <text x="150" y="92" text-anchor="middle" fill="${accentColor}" font-family="monospace" font-size="11" font-weight="700" letter-spacing="3">CATEGORY</text>
  
  <!-- Category Details -->
  <g transform="translate(70, 940)">
    <text x="0" y="0" fill="#ffffff" font-family="Arial Black, Impact, sans-serif" font-size="44" font-weight="900" letter-spacing="2">${title.toUpperCase()}</text>
    <text x="0" y="38" fill="${accentColor}" font-family="sans-serif" font-size="17" font-weight="500" letter-spacing="1">${vibe}</text>
    <text x="0" y="70" fill="#ffffff" font-family="monospace" font-size="13" letter-spacing="4">EXPLORE COLLECTION →</text>
  </g>
</svg>`;
}

// Hero SVG
function createHeroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 900" width="1920" height="900">
  <defs>
    <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d11" />
      <stop offset="50%" stop-color="#18181f" />
      <stop offset="100%" stop-color="#09090b" />
    </linearGradient>
    <radialGradient id="heroAccent" cx="75%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d4ff00" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>
  
  <rect width="1920" height="900" fill="url(#heroGrad)" />
  <rect width="1920" height="900" fill="url(#heroAccent)" />
  
  <!-- Grid Lines -->
  <line x1="100" y1="0" x2="100" y2="900" stroke="#222228" stroke-width="1" />
  <line x1="1820" y1="0" x2="1820" y2="900" stroke="#222228" stroke-width="1" />
  <line x1="0" y1="120" x2="1920" y2="120" stroke="#222228" stroke-width="1" />
  <line x1="0" y1="780" x2="1920" y2="780" stroke="#222228" stroke-width="1" />
  
  <!-- Giant Watermark Typography -->
  <text x="960" y="550" text-anchor="middle" fill="#ffffff" opacity="0.03" font-family="Arial Black, Impact, sans-serif" font-size="340" font-weight="900" letter-spacing="20">UNFOLD</text>
  
  <!-- Fashion Graphic Accent -->
  <g transform="translate(1320, 240)">
    <rect x="0" y="0" width="380" height="480" fill="#121217" stroke="#33333d" stroke-width="1.5" />
    <rect x="20" y="20" width="340" height="440" fill="#181820" />
    <circle cx="190" cy="220" r="90" fill="none" stroke="#d4ff00" stroke-width="2" stroke-dasharray="12 6" />
    <text x="190" y="228" text-anchor="middle" fill="#ffffff" font-family="Arial Black" font-size="28" letter-spacing="4">DROP 01</text>
    <text x="190" y="260" text-anchor="middle" fill="#d4ff00" font-family="monospace" font-size="12" letter-spacing="4">PERSPECTIVE</text>
  </g>
</svg>`;
}

// Generate Files
fs.writeFileSync(path.join(publicDir, 'hero.svg'), createHeroSvg());

// Category SVGs
fs.writeFileSync(path.join(catDir, 'street-urban.svg'), 
  createCategorySvg('Street / Urban', 'Oversized • Bold • Edgy • Skate', '#1a180f', '#0d0d0f', '#d4ff00', 'STREET'));
fs.writeFileSync(path.join(catDir, 'art-creative.svg'), 
  createCategorySvg('Art / Creative', 'Experimental • Surreal • Aesthetic', '#1c1024', '#0c0a12', '#c084fc', 'ART'));
fs.writeFileSync(path.join(catDir, 'statement-attitude.svg'), 
  createCategorySvg('Statement / Attitude', 'Relatable • Gen-Z • Unapologetic', '#241010', '#0f0909', '#f87171', 'ATTITUDE'));
fs.writeFileSync(path.join(catDir, 'vintage-culture.svg'), 
  createCategorySvg('Vintage / Culture', 'Retro • 90s Halftone • Timeless', '#1c1b12', '#0d0c0a', '#fbbf24', 'VINTAGE'));

// Product SVGs
fs.writeFileSync(path.join(prodDir, 'street-01.svg'),
  createTshirtSvg('REBELLION CHRONICLES', 'Drop Shoulder 240 GSM Combed Cotton', '#09090b', '#18181b', '#d4ff00', '#fafafa', 'REBEL'));
fs.writeFileSync(path.join(prodDir, 'street-01-back.svg'),
  createTshirtSvg('REBELLION CHRONICLES (BACK)', 'High-Density Puff Print Artwork', '#09090b', '#18181b', '#ffffff', '#d4ff00', 'UNFOLD'));
fs.writeFileSync(path.join(prodDir, 'street-02.svg'),
  createTshirtSvg('CONCRETE METROPOLIS', 'Washed Charcoal Skate Graphic Tee', '#0a0a0c', '#27272a', '#38bdf8', '#e2e8f0', 'METRO'));
fs.writeFileSync(path.join(prodDir, 'art-01.svg'),
  createTshirtSvg('SURREAL HORIZON', 'Raw Off-White DTG Organic Pima Cotton', '#121114', '#e4e4e7', '#8b5cf6', '#18181b', 'SURREAL'));
fs.writeFileSync(path.join(prodDir, 'art-02.svg'),
  createTshirtSvg('CYBER DISSOLUTION', 'Jet Black Glitch Collage Art Tee', '#0c0a10', '#18181b', '#ec4899', '#06b6d4', 'GLITCH'));
fs.writeFileSync(path.join(prodDir, 'statement-01.svg'),
  createTshirtSvg('DO NOT DISTURB MY PEACE', 'Pitch Black Minimalist Brutalist Tee', '#0f0909', '#121214', '#ef4444', '#ffffff', 'PEACE'));
fs.writeFileSync(path.join(prodDir, 'statement-02.svg'),
  createTshirtSvg('CONTROL IS AN ILLUSION', 'Chalk White Swiss Type Existential Tee', '#0d0d0f', '#f4f4f5', '#18181b', '#ef4444', 'ILLUSION'));
fs.writeFileSync(path.join(prodDir, 'vintage-01.svg'),
  createTshirtSvg('1988 TOKYO MIDNIGHT RACER', 'Faded Olive Heavy Washed Boxy Tee', '#10110c', '#3f4537', '#f59e0b', '#ffffff', 'TOKYO 88'));
fs.writeFileSync(path.join(prodDir, 'vintage-02.svg'),
  createTshirtSvg('ANALOG TAPES 1994', 'Vintage Washed Black Cassette Graphic', '#0e0e10', '#1c1917', '#eab308', '#d6d3d1', 'ANALOG 94'));

console.log('✅ Generated 14 high-fidelity streetwear SVGs in public/images');
