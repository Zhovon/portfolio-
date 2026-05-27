const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');

async function generate() {
    // Standard business card: 3.5 x 2 inches -> 252 x 144 points
    const doc = new PDFDocument({ size: [252, 144], margins: { top: 0, bottom: 0, left: 0, right: 0 } });
    doc.pipe(fs.createWriteStream('./public/rashed-card-print.pdf'));

    // Front Side
    doc.rect(0, 0, 252, 144).fill('#0a0a0b');
    doc.rect(0, 0, 252, 2).fill('#f59e0b'); // Top accent

    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(16).text('Md Rashed Khan', 20, 50);
    doc.fillColor('#f59e0b').font('Helvetica-Bold').fontSize(7).text('BUSINESS CONSULTANT', 20, 72, { characterSpacing: 1.5 });
    doc.fillColor('#9ca3af').font('Helvetica').fontSize(6).text('Strategic Growth & Brand Excellence', 20, 85);

    // Back Side
    doc.addPage();
    doc.rect(0, 0, 252, 144).fill('#0a0a0b');
    doc.rect(0, 142, 252, 2).fill('#f59e0b'); // Bottom accent

    // Generate QR
    const qrDataUrl = await QRCode.toDataURL('https://zhovon.com/card/rashed', { 
        width: 60, 
        margin: 0,
        color: { dark: '#000000', light: '#ffffff' }
    });
    const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');
    
    // Draw QR Code and frame
    doc.rect(168, 38, 64, 64).fill('#ffffff'); // White background for QR
    doc.image(qrBuffer, 170, 40, { width: 60 });
    doc.fillColor('#f59e0b').font('Helvetica-Bold').fontSize(5).text('SCAN TO CONNECT', 170, 107, { characterSpacing: 1, width: 60, align: 'center' });
    
    // Contact Info
    doc.fillColor('#f59e0b').font('Helvetica-Bold').fontSize(6).text('P', 20, 45);
    doc.fillColor('#ffffff').font('Helvetica').fontSize(7).text('+966 56 210 1651', 30, 44.5);
    
    doc.fillColor('#f59e0b').font('Helvetica-Bold').fontSize(6).text('E', 20, 65);
    doc.fillColor('#ffffff').font('Helvetica').fontSize(7).text('rashedkhan25003@gmail.com', 30, 64.5);
    
    doc.fillColor('#f59e0b').font('Helvetica-Bold').fontSize(6).text('W', 20, 85);
    doc.fillColor('#ffffff').font('Helvetica').fontSize(7).text('zhovon.com/card/rashed', 30, 84.5);

    doc.end();
    console.log('PDF generated at /public/rashed-card-print.pdf');
}

generate().catch(console.error);
