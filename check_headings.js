const fs = require('fs');
const path = require('path');
const dir = 'C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/src/app/(main)/career-library';
const files = ['engineering-technology/page.tsx','medicine-healthcare/page.tsx','commerce-finance-accounting/page.tsx','management-business/page.tsx','design-creative/page.tsx','law-governance/page.tsx','architecture-construction/page.tsx','science-research/page.tsx'];
files.forEach(f => {
  const c = fs.readFileSync(path.join(dir, f), 'utf8');
  const h1 = c.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const title = c.match(/title: "([^"]+)"/);
  console.log(f + ':');
  console.log('  H1: ' + (h1 ? h1[1] : 'NOT FOUND'));
  console.log('  Title: ' + (title ? title[1] : 'NOT FOUND'));
});
