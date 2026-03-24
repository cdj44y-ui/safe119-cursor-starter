/**
 * PDF 생성 유틸리티
 *
 * Cursor에서 html2canvas + jsPDF를 사용하여 구현하세요.
 *
 * 사용법:
 * 1. npm install html2canvas jspdf
 * 2. 결과 페이지의 특정 DOM 요소를 캡처하여 PDF로 변환
 *
 * 기본 구조:
 */

export async function generateResultPdf(elementId: string, fileName: string = 'SAFE119_진단결과.pdf') {
  try {
    // dynamic import for client-side only
    const html2canvas = (await import('html2canvas')).default;
    const jsPDF = (await import('jspdf')).default;

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
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

    pdf.save(fileName);
  } catch (error) {
    console.error('PDF 생성 실패:', error);
    throw error;
  }
}
