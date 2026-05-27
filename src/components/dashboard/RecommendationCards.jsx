import { motion } from "framer-motion";
import { Lightbulb, ArrowUpRight, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { formatNaira } from "../../lib/utils";

const PRIORITY_CONFIG = {
  high: {
    color: "rose",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    textColor: "text-rose-400",
    icon: AlertCircle,
    label: "High Priority"
  },
  medium: {
    color: "amber",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    textColor: "text-amber-400",
    icon: TrendingDown,
    label: "Medium Priority"
  },
  low: {
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
    icon: CheckCircle2,
    label: "Low Priority"
  }
};

export default function RecommendationCards({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <Card className="glass-card-hover">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Recommendations</CardTitle>
              <CardDescription>Personalized savings tips</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-zinc-500">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-500/30" />
            <p>No recommendations at this time</p>
            <p className="text-sm mt-1">Your energy profile looks good!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSavings = recommendations.reduce((sum, r) => sum + (r.savings || 0), 0);

  return (
    <Card className="glass-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Recommendations</CardTitle>
              <CardDescription>Personalized savings tips</CardDescription>
            </div>
          </div>
          {totalSavings > 0 && (
            <Badge variant="success" className="text-xs">
              Save {formatNaira(totalSavings)}/year
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.map((rec, i) => {
          const config = PRIORITY_CONFIG[rec.priority] || PRIORITY_CONFIG.low;
          const Icon = config.icon;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${config.bgColor} ${config.borderColor} group hover:border-opacity-50 transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-medium text-white text-sm">{rec.title}</h4>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    {rec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "warning" : "success"}
                      className="text-xs"
                    >
                      {config.label}
                    </Badge>
                    {rec.savings > 0 && (
                      <span className="text-sm font-medium text-emerald-400">
                        Save {formatNaira(rec.savings)}/yr
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Total savings summary */}
        {totalSavings > 0 && (
          <div className="pt-4 border-t border-zinc-800">
            <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div>
                <p className="text-sm text-emerald-300">Total Potential Savings</p>
                <p className="text-xs text-emerald-400/70">If all recommendations are implemented</p>
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                {formatNaira(totalSavings)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}