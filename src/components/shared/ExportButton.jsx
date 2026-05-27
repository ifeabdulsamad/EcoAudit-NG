import { useState } from "react";
import { exportPdf } from "../../utils/pdfExport.js";

export default function ExportButton({ businessName }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportPdf("dashboard-content", businessName);
    } catch (err) {
      console.warn("Export failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="export-btn"
      onClick={handleExport}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner" />
          Generating PDF…
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export PDF
        </>
      )}
    </button>
  );
}
