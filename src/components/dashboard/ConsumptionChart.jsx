import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const CATEGORY_COLORS = {
  cooling: "#06b6d4",    // cyan-500
  cooking: "#f59e0b",    // amber-500
  lighting: "#eab308",   // yellow-500
  electronics: "#a855f7", // purple-500
  heavy_duty: "#71717a",  // zinc-500
};

const CATEGORY_LABELS = {
  cooling: "Cooling",
  cooking: "Cooking",
  lighting: "Lighting",
  electronics: "Electronics",
  heavy_duty: "Heavy Duty",
};

export default function ConsumptionChart({ applianceResults }) {
  const chartData = [...applianceResults]
    .sort((a, b) => b.dailyKwh - a.dailyKwh)
    .slice(0, 12)
    .map(item => ({
      ...item,
      shortLabel: item.label.length > 15 ? item.label.slice(0, 15) + "..." : item.label
    }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-xl">
          <p className="font-medium text-white mb-1">{d.label}</p>
          <p className="text-emerald-400 font-semibold">
            {d.dailyKwh.toFixed(1)} kWh/day
          </p>
          <p className="text-xs text-zinc-500 capitalize mt-1">
            {CATEGORY_LABELS[d.category] || d.category?.replace("_", " ")}
          </p>
        </div>
      );
    }
    return null;
  };

  const totalKwh = chartData.reduce((sum, d) => sum + d.dailyKwh, 0);

  return (
    <Card className="glass-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Energy Consumption</CardTitle>
              <CardDescription>Top appliances by daily kWh usage</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{totalKwh.toFixed(1)}</div>
            <div className="text-xs text-zinc-500">kWh/day total</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-zinc-400 capitalize">
                {CATEGORY_LABELS[category]}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 0, right: 20, top: 5, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                stroke="#52525b" 
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="shortLabel"
                stroke="#52525b"
                tick={{ fill: "#a1a1aa", fontSize: 11, fontWeight: 500 }}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
              <Bar 
                dataKey="dailyKwh" 
                radius={[0, 4, 4, 0]}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={CATEGORY_COLORS[entry.category] || "#10b981"}
                    style={{ 
                      filter: "brightness(1.1)",
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-zinc-800">
          {[
            { 
              label: "Highest Consumer", 
              value: chartData[0]?.label || "N/A",
              subvalue: `${chartData[0]?.dailyKwh.toFixed(1)} kWh/day`
            },
            { 
              label: "Total Appliances", 
              value: applianceResults.length.toString(),
              subvalue: "tracked"
            },
            { 
              label: "Avg per Appliance", 
              value: `${(totalKwh / (applianceResults.length || 1)).toFixed(1)}`,
              subvalue: "kWh/day"
            },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-zinc-500 mb-1">{stat.label}</div>
              <div className="text-sm font-medium text-white truncate">{stat.value}</div>
              <div className="text-xs text-zinc-600">{stat.subvalue}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}