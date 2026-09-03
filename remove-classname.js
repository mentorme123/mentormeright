const fs = require("fs");
let content = fs.readFileSync("src/components/navbar.tsx", "utf8");
content = content.replace(/ className="[^"]*"/g, "");
fs.writeFileSync("src/components/navbar.tsx", content, "utf8");
console.log("Removed className attributes");
