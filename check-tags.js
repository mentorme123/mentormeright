const fs = require("fs");
const content = fs.readFileSync("src/components/navbar.tsx", "utf8");
const lines = content.split("\n");

const tagRegex = /<\/?([A-Za-z][A-Za-z0-9-]*)[\s>]/g;
const stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const fullMatch = match[0];
    const tagName = match[1];
    
    if (fullMatch.startsWith("</")) {
      const lastOpenIndex = [...stack].reverse().findIndex(s => s.tag === tagName);
      if (lastOpenIndex >= 0) {
        const actualIndex = stack.length - 1 - lastOpenIndex;
        stack.splice(actualIndex, 1);
      }
    } else if (!fullMatch.endsWith("/>")) {
      stack.push({ tag: tagName, line: i + 1 });
    }
  }
}

console.log("Unclosed tags:", stack);
