import { useAudit } from "../context/AuditContext.jsx";
import { useNavigate } from "react-router-dom";
import { formatNaira } from "../utils/formatters.js";
import EnergyScoreMeter from "../components/dashboard/EnergyScoreMeter.jsx";
import ConsumptionChart from "../components/dashboard/ConsumptionChart.jsx";
import CarbonCard from "../components/dashboard/CarbonCard.jsx";
import CostCard from "../components/dashboard/CostCard.jsx";
import AIReport from "../components/dashboard/AIReport.jsx";
import RecommendationCards from "../components/dashboard/RecommendationCards.jsx";
import SolarVerdictCard from "../components/dashboard/SolarVerdictCard.jsx";
import ExportButton from "../components/shared/ExportButton.jsx";

function ClipboardIcon() {
  return (
    <svg className="icon-svg icon-svg-xl accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function NairaIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6v12" />
      <path d="M18 6v12" />
      <path d="M4 10h16" />
      <path d="M4 14h16" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export default function Dashboard() {
  const { auditResults, auditData, reset } = useAudit();
  const navigate = useNavigate();

  if (!auditResults) {
    return (
      <div className="dashboard-empty page">
        <div className="empty-state">
          <div className="empty-state-icon">
            <ClipboardIcon />
          </div>
          <h2>No audit data found</h2>
          <p>Complete an energy audit first to see your dashboard.</p>
          <button
            className="btn-primary btn-large"
            onClick={() => {
              reset();
              navigate("/audit");
            }}
          >
            Start Audit
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    );
  }

  const {
    score,
    totalAnnualCo2,
    totalAnnualCost,
    totalAnnualKwh,
    applianceResults,
    recommendations,
    carbonComparisons,
    effectiveMonthlyFuelCost,
    auditSummary,
    solarData,
  } = auditResults;

  const tonnesCo2 = (totalAnnualCo2 / 1000).toFixed(1);

  return (
    <div className="dashboard-page page" id="dashboard-content">
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h1 className="dashboard-title">Energy Audit Results</h1>
          <p className="dashboard-subtitle">
            <span className="icon-svg icon-svg-sm" style={{ color: "var(--text-muted)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
              </svg>
            </span>
            {auditData.businessType}
            <span className="dashboard-subtitle-sep">|</span>
            {auditData.location}
          </p>
        </div>
        <div className="dashboard-actions">
          <ExportButton businessName={auditData.businessType} />
          <button
            className="btn-secondary"
            onClick={() => {
              reset();
              navigate("/");
            }}
          >
            <PlusIcon />
            New Audit
          </button>
        </div>
      </div>

      {/* Hero Summary Bar */}
      <div className="dashboard-hero">
        <div className="hero-stat">
          <div className="hero-stat-icon">
            <ZapIcon />
          </div>
          <span className="hero-stat-value gradient-green">{totalAnnualKwh.toLocaleString()}</span>
          <span className="hero-stat-label">kWh / Year Consumption</span>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-icon">
            <NairaIcon />
          </div>
          <span className="hero-stat-value gradient-cyan">{formatNaira(totalAnnualCost)}</span>
          <span className="hero-stat-label">Total Annual Cost</span>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-icon">
            <GlobeIcon />
          </div>
          <span className="hero-stat-value gradient-red">{tonnesCo2} t</span>
          <span className="hero-stat-label">CO&#8322; Emissions / Year</span>
        </div>
      </div>

      <div className="dashboard-disclaimer">
        Estimates based on standard appliance ratings and Nigerian grid averages.
      </div>

      <div className="dashboard-grid">
        <div className="grid-item score-area">
          <EnergyScoreMeter score={score} />
        </div>
        <div className="grid-item cost-area">
          <CostCard
            annualCost={totalAnnualCost}
            monthlyFuelCost={effectiveMonthlyFuelCost}
            gridHoursPerDay={auditSummary.gridHoursPerDay}
            genHoursPerDay={auditSummary.genHoursPerDay}
          />
        </div>
        <div className="grid-item carbon-area">
          <CarbonCard totalCo2={totalAnnualCo2} comparisons={carbonComparisons} />
        </div>

        <div className="grid-item chart-area">
          <ConsumptionChart applianceResults={applianceResults} />
        </div>

        <div className="grid-item recs-area">
          <RecommendationCards recommendations={recommendations} />
        </div>

        <div className="grid-item solar-area">
          <SolarVerdictCard solarData={solarData} />
        </div>

        <div className="grid-item report-area">
          <AIReport auditResults={auditResults} />
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
