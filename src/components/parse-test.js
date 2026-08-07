const fs = require('fs');
const content = fs.readFileSync('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/src/components/navbar.tsx', 'utf8');
try {
  const parser = require('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/node_modules/@babel/parser');
  const ast = parser.parse(content, { sourceType: 'module', plugins: ['jsx'] });
  console.log('Parse successful');
} catch (e) {
  console.error('Parse error:', e.message);
}
