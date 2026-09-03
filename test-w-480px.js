const ts = require("typescript");
const code = `import React from 'react';
export function Test() {
  return (
    <div>
      <div className="w-[480px]">test</div>
    </div>
  );
}`;
const sourceFile = ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diagnostics = [];
ts.forEachChild(sourceFile, function visit(node) {
  if (ts.isJsxElement(node)) {
    const open = node.openingElement ? code.substring(node.openingElement.tagName.getFullStart(), node.openingElement.tagName.end) : "?";
    const close = node.closingElement ? code.substring(node.closingElement.tagName.getFullStart(), node.closingElement.tagName.end) : "NO CLOSE";
    console.log("<" + open + "> ... </" + close + ">");
  }
  ts.forEachChild(node, visit);
});
