import { formatNaira } from "../../utils/formatters.js";

const PRIORITY_DOTS = {
  high: { color: "#ff4757", bg: "rgba(255,71,87,0.15)" },
  medium: { color: "#ffa502", bg: "rgba(255,165,2,0.15)" },
  low: { color: "#00ff88", bg: "rgba(0,255,136,0.15)" },
};

const PRIORITY_LABELS = {
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
};

function LightbulbIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

export default function RecommendationCards({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="dashboard-card recommendation-card">
      <div className="card-header">
        <div className="card-icon">
          <LightbulbIcon />
        </div>
        <h3 className="card-title">Top Recommendations</h3>
      </div>
      <div className="recommendation-list">
        {recommendations.map((rec, i) => (
          <div key={i} className={`recommendation-item priority-${rec.priority}`}>
            <div className="rec-header">
              <span
                className="rec-priority-dot"
                style={{ background: (PRIORITY_DOTS[rec.priority] || PRIORITY_DOTS.low).color }}
              />
              <span className="rec-title">{rec.title}</span>
            </div>
            <span className="rec-priority-tag" style={{
              color: (PRIORITY_DOTS[rec.priority] || PRIORITY_DOTS.low).color,
            }}>
              {PRIORITY_LABELS[rec.priority] || "Low Priority"}
            </span>
            <p className="rec-description">{rec.description}</p>
            {rec.savings > 0 && (
              <div className="rec-savings">
                <span className="savings-badge">
                  Save {formatNaira(rec.savings)}/year
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
