const fs = require("fs");
const content = fs.readFileSync("src/components/navbar.tsx", "utf8");
const lines = content.split("\n");

const line = lines[352];
console.log("Line 353:", JSON.stringify(line));
const openMatches = [...line.matchAll(/<([A-Za-z][A-Za-z0-9-]*)[\s>]/g)];
console.log("Open matches:", openMatches.map(m => m[1]));
const closeMatches = [...line.matchAll(/<\/([A-Za-z][A-Za-z0-9-]*)>/g)];
console.log("Close matches:", closeMatches.map(m => m[1]));
