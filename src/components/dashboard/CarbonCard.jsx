import { motion } from "framer-motion";
import { Globe, Car, Droplets, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export default function CarbonCard({ totalCo2, comparisons }) {
  const tonnes = (totalCo2 / 1000).toFixed(2);
  const carbonIntensity = totalCo2 / 5000; // Normalized to max 5000kg

  const getCarbonLevel = (t) => {
    if (t < 2) return { label: "Low", color: "emerald", variant: "success" };
    if (t < 5) return { label: "Moderate", color: "amber", variant: "warning" };
    return { label: "High", color: "rose", variant: "destructive" };
  };

  const level = getCarbonLevel(parseFloat(tonnes));

  const comparisonItems = [
    {
      icon: Car,
      value: comparisons?.lagosAbujaRoadTrip?.toLocaleString() || "0",
      label: "Lagos–Abuja road trips",
      color: "text-rose-400",
      bgColor: "bg-rose-500/10"
    },
    {
      icon: Droplets,
      value: comparisons?.litresOfDieselBurned?.toLocaleString() || "0",
      label: "litres of diesel burned",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10"
    },
    {
      icon: Users,
      value: (comparisons?.nigerianMonthlyAvg || 0).toLocaleString(),
      label: "average Nigerians' monthly footprint each",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    }
  ];

  return (
    <Card className="glass-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Carbon Footprint</CardTitle>
              <CardDescription>Annual CO₂ emissions</CardDescription>
            </div>
          </div>
          <Badge variant={level.variant}>{level.label}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Value */}
        <div className="text-center py-4">
          <motion.div 
            className="text-4xl font-bold bg-gradient-to-r from-rose-400 to-orange-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {tonnes}
          </motion.div>
          <p className="text-sm text-zinc-500 mt-1">tonnes CO₂ / year</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Low</span>
            <span>High</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(carbonIntensity * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Comparisons */}
        <div className="pt-4 border-t border-zinc-800">
          <p className="text-sm font-medium text-zinc-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            That&apos;s equivalent to...
          </p>
          
          <div className="space-y-3">
            {comparisonItems.map((item, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-lg font-semibold text-white">{item.value}</span>
                  <span className="text-sm text-zinc-400 ml-2">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Context hint */}
        <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <p className="text-xs text-zinc-500 leading-relaxed">
            The average Nigerian emits approximately 150kg of CO₂ per month. 
            Your business footprint is compared to this baseline.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}