const ts = require("typescript");
const fs = require("fs");
const content = fs.readFileSync("src/components/navbar.tsx", "utf8");
const sourceFile = ts.createSourceFile("navbar.tsx", content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function visit(node, depth) {
  if (node.kind === ts.SyntaxKind.JsxElement) {
    const open = node.openingElement ? content.substring(node.openingElement.tagName.getFullStart(), node.openingElement.tagName.end) : "?";
    const close = node.closingElement ? content.substring(node.closingElement.tagName.getFullStart(), node.closingElement.tagName.end) : "NO CLOSE";
    if (open === "nav" || open === "div" || open === "Link" || open === "button" || open === "a") {
      const openLine = content.substring(0, node.getFullStart()).split("\n").length;
      const closeLine = node.closingElement ? content.substring(0, node.closingElement.getFullStart()).split("\n").length : "?";
      console.log(depth + " <" + open + "> line " + openLine + " ... </" + close + "> line " + closeLine);
    }
  }
  ts.forEachChild(node, child => visit(child, depth + "  "));
}

visit(sourceFile, "");
