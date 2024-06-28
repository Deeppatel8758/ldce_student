const fs = require("fs");
const path = require("path");
const Docxtemplater = require("docxtemplater");
const pizZip = require("pizzip");
const mammoth = require("mammoth");
const puppeteer = require('puppeteer');
const { PDFDocument, rgb } = require('pdf-lib');


// Function to convert Word buffer to HTML
function convertWordToHTML(wordBuffer) {
  return new Promise((resolve, reject) => {
    mammoth.extractRawText({ buffer: wordBuffer })
      .then((result) => {
        convertHTMLToPDF(result.value)
        resolve(result.value);

      })
      .catch(reject);
  });
}


// Function to convert HTML to PDF
async function convertHTMLToPDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);

  const pdfBuffer = await page.pdf({
    format: 'Letter',
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
}
const convertFunc = async (buffer) => {
  
 
}




























const generate = async (filename, values,res) => {
  console.log("generate function called");
  console.log(values);
  const filesFolderPath = path.join(__dirname, "../uploads/certificateFormat/");
  const filePath = path.join(filesFolderPath, filename);
  const content =fs.readFileSync(
    filePath,"binary"
  );
  
  // console.log(content);
  const zip = new pizZip(content);

  const doc = new Docxtemplater(zip);
  console.log("doc created");
  doc.setData(values);
  console.log("data set");
  
  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }
  console.log("doc rendered");

  const buf = doc.getZip().generate({ type: "nodebuffer" });
  console.log("buf generated");
  // fs.writeFileSync("./newfile.docx", buf)
  return buf


/* 
 const output = await data(buf)
  console.log(output)
  fs.writeFileSync("./write.pdf",output.data)
  // return output  */


};
const generate1 = async (filename, values,enrollment,requestId) => {
  console.log("generate function called");
  console.log(values);
  const filesFolderPath = path.join(__dirname, "../uploads/certificateFormat/");
  const filePath = path.join(filesFolderPath, filename);
  const content =fs.readFileSync(
    filePath,"binary"
  );
  
  // console.log(content);
  const zip = new pizZip(content);

  const doc = new Docxtemplater(zip);
  console.log("doc created");
  doc.setData(values);
  console.log("data set");
  
  try {
    doc.render();
  } catch (error) {
    const e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }
  console.log("doc rendered");
const publicFolder=path.join(__dirname,"../public")
  const filePaths = path.join(publicFolder, `${enrollment}-${requestId}.docx`);

  const buf = doc.getZip().generate({ type: "nodebuffer" });
  console.log("buf generated");
   fs.writeFile(filePaths, buf, (err) => {
    console.log(err)
  })
  return buf

/* 

  console.log(output)
  fs.writeFileSync("./write.pdf",output.data)
  // return output  */


};

module.exports= {generate,generate1};
