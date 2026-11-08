const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imagesDir = path.join(__dirname, "..", "public", "images");
const audioDir = path.join(__dirname, "..", "public", "audio");

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

// Gopuram Temple Silhouette SVG
const gopuramSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8D9A0" stop-opacity="0.9" />
      <stop offset="50%" stop-color="#C9A227" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#F6EBB8" stop-opacity="0.95" />
    </linearGradient>
  </defs>
  <g fill="url(#goldGrad)" opacity="0.85">
    <!-- Kalasam Spire at the apex -->
    <path d="M 400 30 L 405 50 L 395 50 Z" />
    <circle cx="400" cy="58" r="7" />
    <path d="M 390 65 L 410 65 L 405 85 L 395 85 Z" />
    <!-- Tier 1 -->
    <rect x="360" y="85" width="80" height="30" rx="3" />
    <path d="M 350 115 L 450 115 L 440 150 L 360 150 Z" />
    <!-- Tier 2 -->
    <rect x="330" y="150" width="140" height="35" rx="4" />
    <path d="M 315 185 L 485 185 L 470 230 L 330 230 Z" />
    <!-- Tier 3 -->
    <rect x="295" y="230" width="210" height="40" rx="5" />
    <path d="M 275 270 L 525 270 L 510 325 L 290 325 Z" />
    <!-- Tier 4 -->
    <rect x="250" y="325" width="300" height="45" rx="6" />
    <path d="M 230 370 L 570 370 L 550 435 L 250 435 Z" />
    <!-- Tier 5 / Base -->
    <rect x="200" y="435" width="400" height="55" rx="8" />
    <!-- Gateway Arch (Gopuram Entrance) -->
    <path d="M 330 600 L 330 490 Q 400 440 470 490 L 470 600 Z" fill="#2D051B" opacity="0.6"/>
    <!-- Decorative side pilasters -->
    <rect x="180" y="490" width="140" height="110" />
    <rect x="480" y="490" width="140" height="110" />
  </g>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, "gopuram-silhouette.svg"), gopuramSvg.trim());

// Mandala SVG
const mandalaSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="mandalaGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8D9A0" />
      <stop offset="50%" stop-color="#C9A227" />
      <stop offset="100%" stop-color="#F6EBB8" />
    </linearGradient>
  </defs>
  <g stroke="url(#mandalaGold)" fill="none" stroke-width="1.8" opacity="0.85">
    <circle cx="300" cy="300" r="280" stroke-dasharray="8 6" />
    <circle cx="300" cy="300" r="260" />
    <circle cx="300" cy="300" r="220" />
    <circle cx="300" cy="300" r="170" />
    <circle cx="300" cy="300" r="120" stroke-dasharray="4 4" />
    <circle cx="300" cy="300" r="70" />
    <circle cx="300" cy="300" r="20" fill="url(#mandalaGold)" />
    <!-- Petals array -->
    ${Array.from({ length: 16 }).map((_, i) => {
      const angle = (i * 360) / 16;
      return `<path d="M 300 300 Q 340 200 300 130 Q 260 200 300 300 Z" transform="rotate(${angle} 300 300)" opacity="0.6"/>`;
    }).join("")}
    ${Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      return `<circle cx="300" cy="110" r="5" transform="rotate(${angle} 300 300)" fill="url(#mandalaGold)"/>`;
    }).join("")}
    ${Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 360) / 12;
      return `<path d="M 300 300 C 330 250 360 230 300 60 C 240 230 270 250 300 300 Z" transform="rotate(${angle} 300 300)" opacity="0.45"/>`;
    }).join("")}
  </g>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, "mandala.svg"), mandalaSvg.trim());

// Kalasam SVG
const kalasamSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="200" height="240">
  <defs>
    <linearGradient id="kGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0BE" />
      <stop offset="50%" stop-color="#C9A227" />
      <stop offset="100%" stop-color="#9E7B16" />
    </linearGradient>
  </defs>
  <g fill="url(#kGold)" stroke="#FFF8E7" stroke-width="1.5">
    <!-- Coconut top -->
    <path d="M 100 20 C 130 50 140 85 100 100 C 60 85 70 50 100 20 Z" fill="#9E7B16"/>
    <!-- Mango leaves -->
    <path d="M 100 80 C 140 60 170 70 170 95 C 140 105 110 95 100 80 Z" />
    <path d="M 100 80 C 60 60 30 70 30 95 C 60 105 90 95 100 80 Z" />
    <!-- Pot Body -->
    <ellipse cx="100" cy="98" rx="35" ry="8" />
    <path d="M 70 100 C 30 130 30 190 75 210 L 125 210 C 170 190 170 130 130 100 Z" />
    <ellipse cx="100" cy="210" rx="30" ry="8" />
  </g>
</svg>
`;
fs.writeFileSync(path.join(imagesDir, "kalasam.svg"), kalasamSvg.trim());

// Helper to render high quality SVG to JPEG
async function generateJpeg(svgString, outputPath, width, height) {
  await sharp(Buffer.from(svgString))
    .resize(width, height)
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

// Generate couple photos
async function createAllImages() {
  // Groom Image
  const groomSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D051B" />
        <stop offset="50%" stop-color="#4A0E2E" />
        <stop offset="100%" stop-color="#700938" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF3C4" />
        <stop offset="50%" stop-color="#C9A227" />
        <stop offset="100%" stop-color="#8C6B0F" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="800" height="1000" fill="url(#bg)" />
    <!-- Ornate Arch -->
    <path d="M 80 920 L 80 380 C 80 180 720 180 720 380 L 720 920" fill="none" stroke="url(#gold)" stroke-width="6" opacity="0.9" />
    <path d="M 105 920 L 105 390 C 105 210 695 210 695 390 L 695 920" fill="none" stroke="url(#gold)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
    
    <!-- Decorative Temple Pillars -->
    <rect x="65" y="880" width="30" height="50" rx="3" fill="url(#gold)" opacity="0.8" />
    <rect x="705" y="880" width="30" height="50" rx="3" fill="url(#gold)" opacity="0.8" />

    <!-- Groom Traditional Silhouette & Motif -->
    <g transform="translate(400, 480)" text-anchor="middle">
      <circle cx="0" cy="-140" r="75" fill="url(#gold)" opacity="0.25" filter="url(#glow)"/>
      <!-- Turban / Traditional headwear shape -->
      <path d="M -50 -160 C -55 -215 55 -215 50 -160 C 45 -145 -45 -145 -50 -160 Z" fill="url(#gold)" />
      <!-- Head / Face silhouette -->
      <circle cx="0" cy="-135" r="42" fill="#E8D9A0" />
      <!-- Angavastram / Silk veshti attire drapery -->
      <path d="M -90 -80 C -40 -100 40 -100 90 -80 C 110 50 80 200 65 260 L -65 260 C -80 200 -110 50 -90 -80 Z" fill="#FFF8E7" opacity="0.95" />
      <!-- Gold Brocade Borders (Zari) -->
      <path d="M -40 -85 L -10 260 L 15 260 L -15 -85 Z" fill="url(#gold)" />
      <path d="M 65 -60 C 20 -20 -20 120 -40 260" stroke="url(#gold)" stroke-width="12" fill="none" />
      <circle cx="0" cy="-20" r="8" fill="#B0125B" />
      <circle cx="0" cy="40" r="8" fill="#B0125B" />
      <circle cx="0" cy="100" r="8" fill="#B0125B" />
    </g>

    <!-- Names & Typography -->
    <text x="400" y="810" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="url(#gold)" text-anchor="middle" letter-spacing="2">M. DEIVENDRAN</text>
    <text x="400" y="850" font-family="Georgia, serif" font-size="20" fill="#E8D9A0" text-anchor="middle" letter-spacing="4">B.E., PGDBM</text>
    <text x="400" y="890" font-family="Georgia, serif" font-size="16" fill="#FCE7F3" text-anchor="middle" letter-spacing="3" opacity="0.8">THE GROOM</text>
  </svg>
  `;
  await generateJpeg(groomSvg, path.join(imagesDir, "groom.jpg"), 800, 1000);

  // Bride Image
  const brideSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
    <defs>
      <linearGradient id="bgB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A0E2E" />
        <stop offset="50%" stop-color="#700938" />
        <stop offset="100%" stop-color="#B0125B" />
      </linearGradient>
      <linearGradient id="goldB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF3C4" />
        <stop offset="50%" stop-color="#C9A227" />
        <stop offset="100%" stop-color="#8C6B0F" />
      </linearGradient>
      <filter id="glowB" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="800" height="1000" fill="url(#bgB)" />
    <!-- Ornate Arch -->
    <path d="M 80 920 L 80 380 C 80 180 720 180 720 380 L 720 920" fill="none" stroke="url(#goldB)" stroke-width="6" opacity="0.9" />
    <path d="M 105 920 L 105 390 C 105 210 695 210 695 390 L 695 920" fill="none" stroke="url(#goldB)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
    
    <rect x="65" y="880" width="30" height="50" rx="3" fill="url(#goldB)" opacity="0.8" />
    <rect x="705" y="880" width="30" height="50" rx="3" fill="url(#goldB)" opacity="0.8" />

    <!-- Bride Traditional Silhouette & Motif -->
    <g transform="translate(400, 480)" text-anchor="middle">
      <circle cx="0" cy="-140" r="75" fill="url(#goldB)" opacity="0.25" filter="url(#glowB)"/>
      <!-- Bridal hair / Jasmine flowers (Malli poo) arch -->
      <path d="M -50 -140 C -55 -195 55 -195 50 -140" stroke="#FFF8E7" stroke-width="16" stroke-linecap="round" fill="none" />
      <!-- Maang Tikka (Nethi Chutti) -->
      <circle cx="0" cy="-170" r="6" fill="url(#goldB)" />
      <path d="M 0 -170 L 0 -148" stroke="url(#goldB)" stroke-width="3" />
      <circle cx="0" cy="-146" r="8" fill="url(#goldB)" />
      <!-- Face -->
      <circle cx="0" cy="-130" r="38" fill="#E8D9A0" />
      <!-- Bridal Jhumkas (Earrings) -->
      <circle cx="-38" cy="-120" r="5" fill="url(#goldB)" />
      <circle cx="38" cy="-120" r="5" fill="url(#goldB)" />
      <!-- Kanjeevaram Saree & Silk Drape -->
      <path d="M -85 -75 C -35 -95 35 -95 85 -75 C 105 50 85 200 65 260 L -65 260 C -85 200 -105 50 -85 -75 Z" fill="#9E1248" />
      <!-- Gold Zari Border & Temple Jewellery -->
      <path d="M -85 -75 L 45 260 L 70 260 L -60 -75 Z" fill="url(#goldB)" />
      <path d="M -30 -60 C -15 -20 15 -20 30 -60" stroke="url(#goldB)" stroke-width="8" fill="none" />
      <path d="M -45 -40 C -20 10 20 10 45 -40" stroke="url(#goldB)" stroke-width="6" fill="none" />
      <!-- Bangles -->
      <circle cx="-75" cy="110" r="14" stroke="url(#goldB)" stroke-width="5" fill="none" />
      <circle cx="75" cy="110" r="14" stroke="url(#goldB)" stroke-width="5" fill="none" />
    </g>

    <!-- Names & Typography -->
    <text x="400" y="810" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="url(#goldB)" text-anchor="middle" letter-spacing="2">P. AKSHAYA</text>
    <text x="400" y="850" font-family="Georgia, serif" font-size="20" fill="#E8D9A0" text-anchor="middle" letter-spacing="4">BNYS</text>
    <text x="400" y="890" font-family="Georgia, serif" font-size="16" fill="#FCE7F3" text-anchor="middle" letter-spacing="3" opacity="0.8">THE BRIDE</text>
  </svg>
  `;
  await generateJpeg(brideSvg, path.join(imagesDir, "bride.jpg"), 800, 1000);

  // Gallery Images 1 through 8
  const galleryItems = [
    { id: 1, title: "The Beginning of Forever", sub: "Divine union in sacred holy matrimony", color1: "#2D051B", color2: "#700938", w: 800, h: 600, motif: "rings" },
    { id: 2, title: "Divine Blessings", sub: "Arulmigu Kuzhandhai Velappar Temple", color1: "#4A0E2E", color2: "#9E1248", w: 800, h: 1000, motif: "temple" },
    { id: 3, title: "Soulful Smiles", sub: "Laughter, family joy & heartfelt blessings", color1: "#700938", color2: "#B0125B", w: 800, h: 600, motif: "hearts" },
    { id: 4, title: "Silk & Gold Elegance", sub: "Kanjeevaram weaves & traditional jewellery", color1: "#2D051B", color2: "#4A0E2E", w: 800, h: 1000, motif: "jewelry" },
    { id: 5, title: "Misty Hills of Poombarai", sub: "Scenic serenity of Kodaikanal valley", color1: "#3B1E32", color2: "#6B1D48", w: 800, h: 600, motif: "hills" },
    { id: 6, title: "Two Hearts, One Journey", sub: "Holding hands toward an eternal tomorrow", color1: "#4A0E2E", color2: "#B0125B", w: 800, h: 600, motif: "hands" },
    { id: 7, title: "Fragrance of Jasmine", sub: "Auspicious wedding garlands & flowers", color1: "#700938", color2: "#2D051B", w: 800, h: 1000, motif: "garland" },
    { id: 8, title: "Step into Eternity", sub: "Sapthapadi vows amidst sacred blessings", color1: "#2D051B", color2: "#9E1248", w: 800, h: 600, motif: "fire" }
  ];

  for (const item of galleryItems) {
    const gallerySvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${item.w} ${item.h}" width="${item.w}" height="${item.h}">
      <defs>
        <linearGradient id="gGrad${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${item.color1}" />
          <stop offset="100%" stop-color="${item.color2}" />
        </linearGradient>
        <linearGradient id="goldG${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF3C4" />
          <stop offset="50%" stop-color="#C9A227" />
          <stop offset="100%" stop-color="#8C6B0F" />
        </linearGradient>
      </defs>
      <rect width="${item.w}" height="${item.h}" fill="url(#gGrad${item.id})" />
      
      <!-- Border Inset -->
      <rect x="25" y="25" width="${item.w - 50}" height="${item.h - 50}" fill="none" stroke="url(#goldG${item.id})" stroke-width="2" opacity="0.6" />
      <rect x="35" y="35" width="${item.w - 70}" height="${item.h - 70}" fill="none" stroke="url(#goldG${item.id})" stroke-width="1" stroke-dasharray="5 5" opacity="0.4" />

      <!-- Center Art Motif -->
      <g transform="translate(${item.w / 2}, ${item.h / 2 - 30})" text-anchor="middle">
        <circle cx="0" cy="0" r="65" fill="#C9A227" opacity="0.12" />
        <circle cx="0" cy="0" r="50" fill="none" stroke="url(#goldG${item.id})" stroke-width="1.5" />
        <text y="12" font-family="Georgia, serif" font-size="32" fill="url(#goldG${item.id})">❖</text>
      </g>

      <!-- Captions -->
      <text x="${item.w / 2}" y="${item.h - 90}" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="url(#goldG${item.id})" text-anchor="middle" letter-spacing="1.5">${item.title.replace(/&/g, "&amp;")}</text>
      <text x="${item.w / 2}" y="${item.h - 55}" font-family="Georgia, serif" font-size="14" fill="#FFF8E7" text-anchor="middle" letter-spacing="2" opacity="0.85">${item.sub.replace(/&/g, "&amp;")}</text>
    </svg>
    `;
    await generateJpeg(gallerySvg, path.join(imagesDir, `gallery-${item.id}.jpg`), item.w, item.h);
  }

  // Create a minimal fallback mp3 file in public/audio/bg-music.mp3
  // A tiny valid MP3 silence/header frame buffer
  const silentMp3Header = Buffer.from([
    0xff, 0xfb, 0x90, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x58, 0x69, 0x6e, 0x67, 0x00, 0x00, 0x00, 0x0f, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x01, 0xa4
  ]);
  fs.writeFileSync(path.join(audioDir, "bg-music.mp3"), silentMp3Header);
  console.log("All wedding placeholder assets generated successfully!");
}

createAllImages().catch(err => {
  console.error("Error generating assets:", err);
  process.exit(1);
});
