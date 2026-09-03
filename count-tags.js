const fs = require("fs");
const content = fs.readFileSync("src/components/navbar.tsx", "utf8");
const lines = content.split("\n");

let divBalance = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const openMatches = [...line.matchAll(/<([A-Za-z][A-Za-z0-9-]*)[\s>]/g)];
  const closeMatches = [...line.matchAll(/<\/([A-Za-z][A-Za-z0-9-]*)>/g)];
  
  let changed = false;
  for (const m of openMatches) {
    const tag = m[1];
    if (tag === "div") { divBalance++; changed = true; }
  }
  
  for (const m of closeMatches) {
    const tag = m[1];
    if (tag === "div") { divBalance--; changed = true; }
  }
  
  if (changed) {
    console.log(`Line ${i+1}: div=${divBalance} | ${line.trim().substring(0, 60)}`);
  }
}
