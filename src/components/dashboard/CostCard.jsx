import { formatNaira } from "../../utils/formatters.js";

function NairaIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6v12" />
      <path d="M18 6v12" />
      <path d="M4 10h16" />
      <path d="M4 14h16" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  );
}

export default function CostCard({ annualCost, monthlyFuelCost, gridHoursPerDay, genHoursPerDay }) {
  const totalHours = gridHoursPerDay + genHoursPerDay;
  const gridPct = totalHours > 0 ? Math.round((gridHoursPerDay / totalHours) * 100) : 0;
  const genPct = totalHours > 0 ? Math.round((genHoursPerDay / totalHours) * 100) : 0;
  const monthlyCost = annualCost / 12;

  return (
    <div className="dashboard-card cost-card">
      <div className="card-header">
        <div className="card-icon">
          <NairaIcon />
        </div>
        <h3 className="card-title">Annual Energy Cost</h3>
      </div>
      <div className="cost-main">
        <span className="cost-value">{formatNaira(annualCost)}</span>
        <span className="cost-sub">per year (estimated)</span>
      </div>

      <div className="cost-breakdown">
        <div className="cost-row">
          <span className="cost-label">Monthly average</span>
          <span className="cost-amount">{formatNaira(monthlyCost)}</span>
        </div>
        <div className="cost-row">
          <span className="cost-label">Monthly fuel spend</span>
          <span className="cost-amount">{formatNaira(monthlyFuelCost)}</span>
        </div>
      </div>

      <div className="cost-split">
        <div className="cost-split-header">
          <GridIcon />
          <span>Grid vs Generator (by hours)</span>
        </div>
        <div className="split-bar">
          <div
            className="split-segment grid"
            style={{ width: `${gridPct}%` }}
            title={`Grid: ${gridPct}%`}
          />
          <div
            className="split-segment gen"
            style={{ width: `${genPct}%` }}
            title={`Generator: ${genPct}%`}
          />
        </div>
        <div className="split-labels">
          <span className="split-label">
            <span className="dot dot-grid" /> Grid {gridPct}%
          </span>
          <span className="split-label">
            <span className="dot dot-gen" /> Generator {genPct}%
          </span>
        </div>
      </div>
    </div>
  );
}
