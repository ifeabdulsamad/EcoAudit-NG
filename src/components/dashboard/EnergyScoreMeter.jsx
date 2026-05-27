import { useEffect, useState } from "react";

function ZapIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export default function EnergyScoreMeter({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getColor = (s) => {
    if (s < 40) return "#ff4757";
    if (s < 70) return "#ffa502";
    return "#00ff88";
  };

  const color = getColor(score);
  const label =
    score < 40
      ? "Needs Improvement"
      : score < 70
      ? "Fair"
      : "Good";

  return (
    <div className="dashboard-card score-meter">
      <div className="card-header">
        <div className="card-icon">
          <ZapIcon />
        </div>
        <h3 className="card-title">Energy Score</h3>
      </div>
      <div className="score-ring-wrapper">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Track ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="12"
          />
          {/* Progress ring with glow */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "url(#glow)",
            }}
          />
          {/* Second ring for brighter glow */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: 0.4,
            }}
          />
          <text
            x="100"
            y="88"
            textAnchor="middle"
            className="score-number"
            fill={color}
            style={{ filter: "url(#glow)" }}
          >
            {animatedScore}
          </text>
          <text
            x="100"
            y="116"
            textAnchor="middle"
            className="score-label"
            fill="#4d5f6b"
          >
            / 100
          </text>
        </svg>
      </div>
      <span className="score-badge" style={{ background: `${color}22`, color }}>
        <span className="score-dot" style={{ background: color }} />
        <span>{label}</span>
      </span>
    </div>
  );
}
