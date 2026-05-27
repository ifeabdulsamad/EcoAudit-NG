function GlobeIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2-4h-8l-2 4-2.5.1C2.7 10.3 2 11.1 2 12v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function CarbonCard({ totalCo2, comparisons }) {
  const tonnes = (totalCo2 / 1000).toFixed(2);

  return (
    <div className="dashboard-card carbon-card">
      <div className="card-header">
        <div className="card-icon">
          <GlobeIcon />
        </div>
        <h3 className="card-title">Carbon Footprint</h3>
      </div>
      <div className="carbon-main">
        <span className="carbon-value">{tonnes}</span>
        <span className="carbon-unit">tonnes CO&#8322; / year</span>
      </div>

      <div className="carbon-bar-wrapper">
        <div
          className="carbon-bar"
          style={{ width: `${Math.min((totalCo2 / 5000) * 100, 100)}%` }}
        />
      </div>

      {comparisons && (
        <div className="carbon-comparisons">
          <div className="carbon-comparisons-header">
            <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span>That's like&hellip;</span>
          </div>
          <div className="comparison-list">
            <div className="comparison-item">
              <div className="comparison-icon danger">
                <CarIcon />
              </div>
              <span>
                <strong>{comparisons.lagosAbujaRoadTrip?.toLocaleString()}</strong>{" "}
                Lagos–Abuja road trips
              </span>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon warning">
                <DropletIcon />
              </div>
              <span>
                <strong>{comparisons.litresOfDieselBurned?.toLocaleString()}</strong>{" "}
                litres of diesel burned
              </span>
            </div>
            <div className="comparison-item">
              <div className="comparison-icon accent">
                <UsersIcon />
              </div>
              <span>
                <strong>{(comparisons.nigerianMonthlyAvg || 0).toLocaleString()}</strong>{" "}
                average Nigerians' monthly footprint each
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
