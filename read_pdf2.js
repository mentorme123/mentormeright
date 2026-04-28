const fs = require('fs');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const rawText = pdfParser.getRawTextContent();
    console.log(rawText.substring(0, 4000));
});

pdfParser.loadPDF('C:\\mentorme\\sample reports for your understanding\\Syed_Basim_Ahmed_Career_Report.docx.pdf');
