import { motion } from "framer-motion";
import { Wallet, TrendingUp, Zap, Battery } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatNaira } from "../../lib/utils";

export default function CostCard({ annualCost, monthlyFuelCost, gridHoursPerDay, genHoursPerDay }) {
  const totalHours = gridHoursPerDay + genHoursPerDay;
  const gridPct = totalHours > 0 ? Math.round((gridHoursPerDay / totalHours) * 100) : 0;
  const genPct = totalHours > 0 ? Math.round((genHoursPerDay / totalHours) * 100) : 0;
  const monthlyCost = annualCost / 12;

  return (
    <Card className="glass-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Annual Energy Cost</CardTitle>
            <CardDescription>Total estimated spend</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Cost */}
        <div className="text-center py-4">
          <motion.div 
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {formatNaira(annualCost)}
          </motion.div>
          <p className="text-sm text-zinc-500 mt-1">per year (estimated)</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3 pt-4 border-t border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Monthly average</span>
            <span className="text-sm font-medium text-white">{formatNaira(monthlyCost)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Monthly fuel spend</span>
            <span className="text-sm font-medium text-amber-400">{formatNaira(monthlyFuelCost)}</span>
          </div>
        </div>

        {/* Grid vs Generator Split */}
        <div className="pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-zinc-500" />
            <span className="text-sm font-medium text-zinc-300">Power Source Split</span>
          </div>
          
          {/* Progress bar */}
          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden flex">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${gridPct}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
              initial={{ width: 0 }}
              animate={{ width: `${genPct}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500" />
              <span className="text-sm text-zinc-400">Grid {gridPct}%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-zinc-400">Generator {genPct}%</span>
            </div>
          </div>
        </div>

        {/* Savings hint */}
        <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">
            Potential savings identified in recommendations below
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// Clock icon for generator hours
function Clock(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}