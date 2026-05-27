import { useEffect, useState } from "react";
import { generateAuditReport } from "../../api/geminiAudit.js";

function BrainIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
    </svg>
  );
}

export default function AIReport({ auditResults }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchReport() {
      setLoading(true);
      setError(false);
      try {
        const text = await generateAuditReport(auditResults);
        if (cancelled) return;
        if (text) {
          setReport(text);
        } else {
          setError(true);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchReport();
    return () => { cancelled = true; };
  }, [auditResults]);

  return (
    <div className="dashboard-card ai-report-card">
      <div className="card-header">
        <div className="card-icon">
          <BrainIcon />
        </div>
        <h3 className="card-title">AI Audit Report</h3>
      </div>

      {loading && (
        <div className="report-skeleton">
          <div className="skeleton-line skeleton-line-short" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-medium" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line-short" />
        </div>
      )}

      {error && !loading && (
        <div className="report-fallback">
          <p>
            The AI report is temporarily unavailable. Your audit results are still
            displayed above &mdash; all calculations are based on standard appliance
            ratings and Nigerian grid averages.
          </p>
        </div>
      )}

      {report && !loading && (
        <div className="report-content">
          {report.split("\n").filter(Boolean).map((line, i) => {
            const isHeading = line.startsWith("**") && line.endsWith("**");
            const isNairaLine = line.includes("₦");
            if (isHeading) {
              return (
                <h4 key={i} className="report-heading">
                  {line.replace(/\*\*/g, "")}
                </h4>
              );
            }
            return (
              <p key={i} className={`report-line ${isNairaLine ? "report-naira" : ""}`}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
