/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { unzipSync } = require('fflate');

const base = path.join(process.cwd(), 'content', 'lessons', 'testing');
const mxl = path.join(base, 'pianoFourBarExample.mxl');
const mp3 = path.join(base, 'pianoFourBarExample.mp3');

console.log('mxl exists:', fs.existsSync(mxl));
console.log('mp3 exists:', fs.existsSync(mp3));

if (fs.existsSync(mxl)) {
  const raw = fs.readFileSync(mxl);
  const entries = unzipSync(raw);
  const xmlEntries = Object.keys(entries).filter(n => n.toLowerCase().endsWith('.xml'));
  console.log('xml entries:', xmlEntries);
  if (xmlEntries.length > 0) {
    const directXml = xmlEntries.find(n => !n.toLowerCase().includes('container')) || xmlEntries[0];
    const content = new TextDecoder().decode(entries[directXml]);
    console.log('first 200 chars of extracted xml:\n', content.slice(0,200));
  }
}
