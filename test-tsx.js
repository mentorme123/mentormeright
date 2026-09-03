const ts = require("typescript");
const code = `"use client";
export function Test() {
  return (
    <>
      <nav className="test">
        <div>hello</div>
      </nav>
    </>
  );
}`;
const sourceFile = ts.createSourceFile("test.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function visit(node) {
  if (node.kind === ts.SyntaxKind.JsxElement) {
    const open = node.openingElement ? code.substring(node.openingElement.tagName.getFullStart(), node.openingElement.tagName.end) : '?';
    const close = node.closingElement ? code.substring(node.closingElement.tagName.getFullStart(), node.closingElement.tagName.end) : 'NO CLOSE';
    console.log('<' + open + '> ... </' + close + '>');
  }
  ts.forEachChild(node, visit);
}

visit(sourceFile);
