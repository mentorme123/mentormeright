const fs = require('fs');
const html = fs.readFileSync('wp_page_raw.html', 'utf8');

// Find the start of the <style> that belongs to the test
const testStart = html.lastIndexOf('<style>', 36000);
// Find the end of the <script> that belongs to the test
const testEnd = html.indexOf('</script>', 36000) + 9;

if (testStart !== -1 && testEnd !== -1) {
  const testHtml = html.substring(testStart, testEnd);
  const out = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Free Mini Assessment</title>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
</head>
<body style="background-color: #f5f9ff; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 40px auto;">
    ${testHtml}
  </div>
</body>
</html>`;
  
  fs.writeFileSync('public/free-mini-assessment.html', out, 'utf8');
  console.log('Successfully created free-mini-assessment.html');
} else {
  console.log('Could not find the test code bounds.');
}
