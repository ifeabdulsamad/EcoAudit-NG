import { jsPDF } from "jspdf";
import { formatDate } from "./formatters.js";

export async function exportPdf(elementId, businessName) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn("Dashboard element not found for PDF export");
    return;
  }

  try {
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(element, {
      backgroundColor: "#0a0f0d",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 1200,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = pdfHeight;
    let position = 0;
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    const sanitizedName = (businessName || "Business").replace(/[^a-zA-Z0-9]/g, "_");
    pdf.save(`EcoAudit-${sanitizedName}-${formatDate()}.pdf`);
  } catch (err) {
    console.warn("PDF export failed:", err.message);
    throw err;
  }
}
