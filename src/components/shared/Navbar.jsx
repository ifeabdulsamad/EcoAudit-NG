import { NavLink } from "react-router-dom";
import { useAudit } from "../../context/AuditContext.jsx";

function LeafIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg className="icon-svg icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

export default function Navbar() {
  const { auditResults } = useAudit();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <LeafIcon />
          <span className="navbar-brand-text">
            EcoAudit <span className="accent">NG</span>
          </span>
        </NavLink>

        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            <HomeIcon />
            <span className="navbar-link-label">Home</span>
          </NavLink>

          <NavLink
            to="/audit"
            className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
          >
            <ClipboardIcon />
            <span className="navbar-link-label">Audit</span>
          </NavLink>

          {auditResults && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
            >
              <BarChartIcon />
              <span className="navbar-link-label">Dashboard</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
