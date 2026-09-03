const fs = require("fs");
const content = fs.readFileSync("src/components/navbar.tsx", "utf8");
const updated = content.replace(/\sclassName="[^"]*"/g, "");
fs.writeFileSync("src/components/navbar.tsx", updated, "utf8");
console.log("Removed className attributes");
