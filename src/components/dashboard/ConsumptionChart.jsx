import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CATEGORY_COLORS = {
  cooling: "#00d4d4",
  cooking: "#ffa502",
  lighting: "#ffeb3b",
  electronics: "#a855f7",
  heavy_duty: "#795548",
};

function BarChartIcon() {
  return (
    <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

export default function ConsumptionChart({ applianceResults }) {
  const chartData = [...applianceResults]
    .sort((a, b) => b.dailyKwh - a.dailyKwh)
    .slice(0, 12);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const d = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{d.label}</p>
          <p style={{ color: "var(--accent)", fontWeight: 600 }}>
            {d.dailyKwh.toFixed(1)} kWh/day
          </p>
          <p style={{ fontSize: 11, color: "#4d5f6b", textTransform: "capitalize", marginTop: 2 }}>
            {d.category?.replace("_", " ")}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-icon">
          <BarChartIcon />
        </div>
        <h3 className="card-title">Energy Consumption by Appliance</h3>
      </div>
      <p className="card-subtitle">kWh per day (top 12 appliances)</p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 40)}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
          >
            <XAxis type="number" stroke="#4d5f6b" tick={{ fill: "#4d5f6b", fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="label"
              stroke="#4d5f6b"
              tick={{ fill: "#ccddee", fontSize: 12, fontWeight: 500 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="dailyKwh" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={CATEGORY_COLORS[entry.category] || "#00ff88"}
                  style={{ filter: "brightness(1.1)" }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
