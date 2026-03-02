import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoicePDF = async (bookingData, paymentMethod) => {
  const pdf = new jsPDF();
  
  // Set up the PDF
  pdf.setFontSize(20);
  pdf.text('CAR RENTAL INVOICE', 105, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text(`Invoice #: INV-${Date.now()}`, 20, 40);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);
  
  // Company Information
  pdf.setFontSize(14);
  pdf.text('Car Rental Agency', 20, 70);
  pdf.setFontSize(10);
  pdf.text('123 Main Street', 20, 80);
  pdf.text('Madrid, Spain', 20, 90);
  pdf.text('Phone: +34 123 456 789', 20, 100);
  pdf.text('Email: info@carrental.es', 20, 110);
  
  // Customer Information
  pdf.setFontSize(14);
  pdf.text('Customer Information', 20, 130);
  pdf.setFontSize(10);
  pdf.text(`Name: ${bookingData.userId}`, 20, 140);
  pdf.text(`Email: customer@example.com`, 20, 150);
  
  // Booking Details
  pdf.setFontSize(14);
  pdf.text('Booking Details', 20, 170);
  pdf.setFontSize(10);
  pdf.text(`Car: ${bookingData.car.make} ${bookingData.car.model}`, 20, 180);
  pdf.text(`Pickup Location: ${bookingData.pickupLocation}`, 20, 190);
  pdf.text(`Start Date: ${new Date(bookingData.startDate).toLocaleDateString()}`, 20, 200);
  pdf.text(`End Date: ${new Date(bookingData.endDate).toLocaleDateString()}`, 20, 210);
  
  // Calculate duration
  const duration = Math.ceil((new Date(bookingData.endDate) - new Date(bookingData.startDate)) / (1000 * 60 * 60 * 24));
  pdf.text(`Duration: ${duration} days`, 20, 220);
  
  // Payment Details
  pdf.setFontSize(14);
  pdf.text('Payment Details', 20, 240);
  pdf.setFontSize(10);
  pdf.text(`Payment Method: ${paymentMethod === 'online' ? 'Online Payment' : 'Pay at Agency'}`, 20, 250);
  pdf.text(`Daily Rate: $${bookingData.car.price}`, 20, 260);
  pdf.text(`Total Amount: $${bookingData.totalAmount}`, 20, 270);
  
  // Payment Status
  pdf.setFontSize(12);
  if (paymentMethod === 'online') {
    pdf.setTextColor(0, 128, 0);
    pdf.text('Payment Status: PAID', 20, 290);
  } else {
    pdf.setTextColor(255, 140, 0);
    pdf.text('Payment Status: PENDING (Pay at Agency)', 20, 290);
  }
  
  // Terms and Conditions
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(8);
  pdf.text('Terms and Conditions:', 20, 310);
  pdf.text('1. Rental period is as specified above.', 20, 320);
  pdf.text('2. Driver must have valid license.', 20, 330);
  pdf.text('3. Car must be returned in same condition.', 20, 340);
  pdf.text('4. Additional charges may apply for damages.', 20, 350);
  
  if (paymentMethod === 'agency') {
    pdf.text('5. Payment must be completed within 24 hours.', 20, 360);
  }
  
  // Footer
  pdf.setFontSize(10);
  pdf.text('Thank you for choosing our car rental service!', 105, 280, { align: 'center' });
  
  // Save the PDF
  const fileName = `invoice_${bookingData.carId}_${Date.now()}.pdf`;
  pdf.save(fileName);
  
  return fileName;
};

export const generateInvoiceFromHTML = async (elementId, bookingData, paymentMethod) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF generation');
    return null;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `invoice_${bookingData.carId}_${Date.now()}.pdf`;
    pdf.save(fileName);
    
    return fileName;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
};
