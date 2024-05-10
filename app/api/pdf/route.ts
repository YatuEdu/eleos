// pages/api/generate-pdf.js
import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument 
                from 'pdfkit';
import { pipeline } from 'stream';
               

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
  
    pipeline(doc, res, (err) => {
        if (err) console.error(err);
    });

    doc.fontSize(25).text('PDF Content Here!', 100, 100);

    // Add a new page
    doc.addPage()
       .fontSize(25)
       .text('This is the second page!', 100, 100);

    // Add another page with different settings
    doc.addPage({
        size: 'A5',  // Smaller page size
        layout: 'landscape'  // Change layout to landscape
    })
    .fontSize(20)
    .text('Third page in landscape orientation and A5 size.', 100, 50);
    
    doc.end();
};
