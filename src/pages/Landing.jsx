import { Link } from "react-router-dom";

function BoltIcon() {
  return (
    <svg className="icon-svg icon-svg-lg accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
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

function BrainIcon() {
  return (
    <svg className="icon-svg icon-svg-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
    </svg>
  );
}

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

function ArrowRightIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default function Landing() {
  return (
    <div className="landing page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <BoltIcon />
            <span>GDGoCUnilorin CareerFest26</span>
          </div>
          <h1 className="hero-title">
            EcoAudit <span className="accent">NG</span>
          </h1>
          <p className="hero-subtitle">
            Know your energy costs. <span className="accent">Cut them.</span>
          </p>
          <p className="hero-description">
            AI-powered energy audit for Nigerian SMEs. Get your energy score, carbon
            footprint, and actionable savings recommendations in under 5 minutes.
          </p>
          <Link to="/audit" className="btn-primary btn-large hero-cta">
            Start Free Audit
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon-wrap">
            <ZapIcon />
          </div>
          <h3>Energy Score</h3>
          <p>
            Get a 0–100 energy efficiency score with appliance-by-appliance breakdown
            of your consumption.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrap">
            <BrainIcon />
          </div>
          <h3>AI-Powered Report</h3>
          <p>
            Receive a personalised audit report with naira savings estimates and
            plain-English recommendations.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrap">
            <SunIcon />
          </div>
          <h3>Solar Viability</h3>
          <p>
            Find out if solar is right for your business with cost, savings, and
            payback period analysis.
          </p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>
          Estimates based on standard appliance ratings and Nigerian grid averages.
        </p>
      </footer>
    </div>
  );
}
