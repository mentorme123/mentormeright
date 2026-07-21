const ts = require('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/node_modules/typescript');
const fs = require('fs');
const content = fs.readFileSync('C:/Users/RathodMaruthi/Downloads/mentorme/mentorme/src/components/navbar.tsx', 'utf8');
const sourceFile = ts.createSourceFile('navbar.tsx', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diagnostics = sourceFile.parseDiagnostics;
diagnostics.forEach(d => {
  const pos = d.file ? d.file.getLineAndCharacterOfPosition(d.start) : { line: 0, character: 0 };
  console.log(`Line ${pos.line + 1}, Col ${pos.character + 1}: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
  if (d.file) {
    const text = d.file.getText();
    const start = Math.max(0, d.start - 20);
    const end = Math.min(text.length, d.start + 20);
    console.log('Context:', JSON.stringify(text.substring(start, end)));
  }
});
