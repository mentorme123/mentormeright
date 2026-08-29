const fs = require('fs');
const content = fs.readFileSync('careers.ts', 'utf8');
const matches = content.match(/"?category"?\s*:\s*"([^"]+)"/g) || [];
const cats = [...new Set(matches.map(m => {
  const match = m.match(/"?category"?\s*:\s*"([^"]+)"/);
  return match ? match[1] : '';
}).filter(Boolean))];
console.log('Total categories:', cats.length);
cats.forEach((c, i) => console.log(`${i+1}. ${c}`));
console.log('Total careers:', (content.match(/"id":\s*"/g) || []).length);
