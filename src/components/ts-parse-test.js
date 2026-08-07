const ts = require('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/node_modules/typescript');
const fs = require('fs');
const content = fs.readFileSync('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/src/components/navbar.tsx', 'utf8');
const sourceFile = ts.createSourceFile('navbar.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diagnostics = [];
function checkNode(node) {
  if (ts.isJsxElement(node) || ts.isJsxFragment(node) || ts.isJsxOpeningElement(node) || ts.isJsxClosingElement(node)) {
    // Valid JSX node
  }
  ts.forEachChild(node, checkNode);
}
checkNode(sourceFile);
console.log('Parse completed. Diag count:', sourceFile.parseDiagnostics ? sourceFile.parseDiagnostics.length : 'N/A');
if (sourceFile.parseDiagnostics) {
  sourceFile.parseDiagnostics.forEach(d => {
    console.log('Diag:', ts.flattenDiagnosticMessageText(d.messageText, '\n'));
  });
}
