const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('CONSOLE ERROR:', msg.text());
    }
  });

  try {
    await page.goto('https://mentormeright.vercel.app/assessment', { waitUntil: 'networkidle0' });
    console.log("Assessment Page loaded successfully.");
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.error('Failed to load page:', err);
  } finally {
    await browser.close();
  }
})();
