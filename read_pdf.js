const fs = require('fs');
const pdf = require('pdf-parse');
console.log(Object.keys(pdf));
if(pdf.default) {
    let dataBuffer = fs.readFileSync('C:\\mentorme\\sample reports for your understanding\\Syed_Basim_Ahmed_Career_Report.docx.pdf');
    pdf.default(dataBuffer).then(function(data) {
        console.log(data.text.substring(0, 2000));
    });
}
