const fs = require('fs');
const path = require('path');

// Simple prerender script that creates placeholder SVG thumbnails for each lesson
// It writes to public/scores/[slug].svg so pages can display a fast thumbnail.

const lessonsDir = path.join(process.cwd(), 'content', 'lessons');
const outDir = path.join(process.cwd(), 'public', 'scores');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const slugs = fs.readdirSync(lessonsDir).filter((f) => fs.statSync(path.join(lessonsDir, f)).isDirectory());

slugs.forEach((slug) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">\n` +
    `<rect width="100%" height="100%" fill="#0f172a" />\n` +
    `<text x="20" y="40" fill="#60a5fa" font-size="28">${slug}</text>\n` +
    `<text x="20" y="80" fill="#94a3b8" font-size="16">Pre-rendered thumbnail placeholder</text>\n` +
    `</svg>`;

  fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg, 'utf8');
  console.log('Wrote thumbnail for', slug);
});

console.log('Prerender complete.');
