const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

const dir = 'C:\\mentorme\\sample reports for your understanding';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));

let currentFile = 0;

function parseNext() {
    if (currentFile >= files.length) return;
    
    const file = files[currentFile];
    const pdfParser = new PDFParser(this, 1);
    
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        const rawText = pdfParser.getRawTextContent();
        fs.writeFileSync(path.join('c:\\mentorme', file + '.txt'), rawText, 'utf8');
        console.log(`Parsed ${file}`);
        currentFile++;
        parseNext();
    });
    
    pdfParser.loadPDF(path.join(dir, file));
}

parseNext();
