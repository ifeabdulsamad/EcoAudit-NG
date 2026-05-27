import { formatNaira } from "../../utils/formatters.js";

function SunIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function CloudSunIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="M20 12h2" />
      <path d="m19.07 4.93-1.41 1.41" />
      <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

const VERDICT_CONFIG = {
  Viable: { color: "#00ff88", bg: "rgba(0,255,136,0.12)", icon: SunIcon },
  Marginal: { color: "#ffa502", bg: "rgba(255,165,2,0.12)", icon: CloudSunIcon },
  "Not Yet": { color: "#ff4757", bg: "rgba(255,71,87,0.12)", icon: CloudIcon },
};

function SolarIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PackageCard({ pkg, rank }) {
  const isBest = rank === 1;
  const bgColor = isBest ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.02)";
  const borderColor = isBest ? "rgba(0,255,136,0.2)" : "var(--border-color)";

  return (
    <div
      className={`solar-pkg ${isBest ? "solar-pkg-best" : ""}`}
      style={{ background: bgColor, borderColor }}
    >
      {isBest && (
        <div className="solar-pkg-badge">
          <StarIcon />
          Best Match
        </div>
      )}

      <div className="solar-pkg-header">
        <div className="solar-pkg-info">
          <div className="solar-pkg-merchant">{pkg.merchantName}</div>
          <div className="solar-pkg-name">{pkg.name}</div>
        </div>
        <div className="solar-pkg-pricing">
          <div className="solar-pkg-price">{formatNaira(pkg.totalPrice)}</div>
          <div className="solar-pkg-warranty">{pkg.warrantyMonths}mo warranty</div>
        </div>
      </div>

      <div className="solar-pkg-desc">{pkg.description}</div>

      <div className="solar-pkg-specs">
        <div className="solar-pkg-spec">
          System: <strong>{pkg.systemKw} kW</strong>
        </div>
        <div className="solar-pkg-spec">
          Panels: <strong>{pkg.panelCount}</strong>
        </div>
        <div className="solar-pkg-spec">
          Battery: <strong>{pkg.batteryKwh} kWh</strong>
        </div>
        <div className="solar-pkg-spec">
          {pkg.estimatedMonthlySavings > 0 ? (
            <>
              Save: <strong className="solar-pkg-save">{formatNaira(pkg.estimatedMonthlySavings)}/mo</strong>
            </>
          ) : (
            <span className="solar-pkg-save-na">Savings: N/A</span>
          )}
        </div>
      </div>

      <div className="solar-pkg-components">
        <div className="solar-pkg-components-label">Components:</div>
        <div>{pkg.components.inverter}</div>
        <div>{pkg.components.panels}</div>
        <div>{pkg.components.battery}</div>
      </div>

      <div className="solar-pkg-match">
        <div className="solar-pkg-match-labels">
          <span>Match Score</span>
          <span className={`solar-pkg-match-pct ${pkg.matchScore >= 70 ? "good" : pkg.matchScore >= 50 ? "ok" : "bad"}`}>
            {pkg.matchScore}%
          </span>
        </div>
        <div className="solar-pkg-match-bar">
          <div
            className={`solar-pkg-match-fill ${pkg.matchScore >= 70 ? "fill-good" : pkg.matchScore >= 50 ? "fill-ok" : "fill-bad"}`}
            style={{ width: `${pkg.matchScore}%` }}
          />
        </div>
      </div>

      <div className="solar-pkg-contact">
        <a href={pkg.merchantWebsite} target="_blank" rel="noopener noreferrer" className="solar-pkg-link">
          <ExternalLinkIcon />
          Visit website
        </a>
        <span className="solar-pkg-phone">
          <PhoneIcon />
          {pkg.merchantPhone}
        </span>
        <span className="solar-pkg-mail">
          <MailIcon />
          {pkg.merchantEmail}
        </span>
      </div>
    </div>
  );
}

export default function SolarVerdictCard({ solarData }) {
  if (!solarData) return null;

  const { verdict, verdictLabel, matchedPackages } = solarData;
  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG["Not Yet"];
  const VerdictIcon = config.icon;

  return (
    <div className="dashboard-card solar-card">
      <div className="card-header">
        <div className="card-icon">
          <SolarIcon />
        </div>
        <h3 className="card-title">Solar Viability Verdict</h3>
      </div>

      <div
        className="verdict-badge"
        style={{ borderColor: `${config.color}44`, color: config.color, background: config.bg }}
      >
        <VerdictIcon />
        <span>{verdict}</span>
      </div>
      <p className="verdict-label">{verdictLabel}</p>

      <div className="solar-pkg-badge-real">
        <CheckIcon />
        <span>Priced from real Nigerian solar merchants</span>
      </div>

      {matchedPackages && matchedPackages.length > 0 ? (
        <div className="solar-pkg-list">
          {matchedPackages.slice(0, 3).map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} rank={i + 1} />
          ))}
        </div>
      ) : (
        <div className="solar-pkg-empty">
          <p>
            No suitable solar packages found for your current energy profile.
            Consider reducing your energy costs first, then revisit solar options.
          </p>
        </div>
      )}
    </div>
  );
}
