import { motion } from "framer-motion";
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  Star, 
  ExternalLink, 
  Phone, 
  Mail, 
  CheckCircle2,
  TrendingDown,
  Clock,
  Zap,
  Battery,
  PanelTop,
  Loader2,
  RefreshCw,
  WifiOff,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { formatNaira } from "../../lib/utils";

const VERDICT_CONFIG = {
  Viable: {
    icon: Sun,
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-400",
    badgeVariant: "success"
  },
  Marginal: {
    icon: CloudSun,
    color: "amber",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    textColor: "text-amber-400",
    badgeVariant: "warning"
  },
  "Not Yet": {
    icon: Cloud,
    color: "zinc",
    bgColor: "bg-zinc-500/10",
    borderColor: "border-zinc-500/20",
    textColor: "text-zinc-400",
    badgeVariant: "secondary"
  }
};

function PackageCard({ pkg, rank }) {
  const isBest = rank === 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className={`p-4 rounded-xl border ${isBest ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-zinc-900/50 border-zinc-800'} relative`}
    >
      {isBest && (
        <div className="absolute -top-3 left-4">
          <Badge variant="success" className="text-xs">
            <Star className="w-3 h-3 mr-1" />
            Best Match
          </Badge>
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <p className="text-xs text-emerald-400 font-medium uppercase tracking-wide">{pkg.merchantName}</p>
          <h4 className="font-semibold text-white text-sm mt-0.5">{pkg.name}</h4>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-emerald-400">{formatNaira(pkg.totalPrice)}</p>
          <p className="text-xs text-zinc-500">{pkg.warrantyMonths}mo warranty</p>
        </div>
      </div>
      
      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{pkg.description}</p>
      
      {/* Specs */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Zap className="w-3 h-3" />
          <span>{pkg.systemKw} kW system</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <PanelTop className="w-3 h-3" />
          <span>{pkg.panelCount} panels</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Battery className="w-3 h-3" />
          <span>{pkg.batteryKwh} kWh battery</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <TrendingDown className="w-3 h-3" />
          <span>Save {formatNaira(pkg.estimatedMonthlySavings)}/mo</span>
        </div>
      </div>
      
      {/* Match Score */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-500">Match Score</span>
          <span className={`font-medium ${pkg.matchScore >= 70 ? 'text-emerald-400' : pkg.matchScore >= 50 ? 'text-amber-400' : 'text-zinc-400'}`}>
            {pkg.matchScore}%
          </span>
        </div>
        <Progress 
          value={pkg.matchScore} 
          variant={pkg.matchScore >= 70 ? 'success' : pkg.matchScore >= 50 ? 'warning' : 'default'}
          className="h-1.5"
        />
      </div>
      
      {/* Payback */}
      {pkg.estimatedPaybackMonths > 0 && (
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
          <Clock className="w-3 h-3" />
          <span>Est. payback: {Math.round(pkg.estimatedPaybackMonths / 12 * 10) / 10} years</span>
        </div>
      )}
      
      {/* Contact */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800">
        <a 
          href={pkg.merchantWebsite} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Visit website
        </a>
        <span className="text-zinc-700">|</span>
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500">
          <Phone className="w-3 h-3" />
          {pkg.merchantPhone}
        </span>
      </div>
    </motion.div>
  );
}

export default function SolarVerdictCard({ solarData, loading, isFresh, isFallback, onRefresh }) {
  if (loading && !solarData) {
    return (
      <Card className="glass-card-hover">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Solar Viability</CardTitle>
              <CardDescription>Loading vendor data...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!solarData) {
    return (
      <Card className="glass-card-hover">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Sun className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Solar Viability</CardTitle>
              <CardDescription>Solar recommendations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-zinc-500">
            <Cloud className="w-12 h-12 mx-auto mb-3 text-zinc-600" />
            <p>No solar data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { verdict, verdictLabel, matchedPackages } = solarData;
  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG["Not Yet"];
  const VerdictIcon = config.icon;

  return (
    <Card className="glass-card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              <Sun className={`w-4 h-4 ${config.textColor}`} />
            </div>
            <div>
              <CardTitle className="text-lg">Solar Viability</CardTitle>
              <CardDescription>Is solar right for you?</CardDescription>
            </div>
          </div>
          {isFresh && (
            <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Live
            </Badge>
          )}
          {isFallback && (
            <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">
              <WifiOff className="w-3 h-3 mr-1" />
              Cached
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Verdict Badge */}
        <div className={`p-4 rounded-xl border ${config.bgColor} ${config.borderColor} text-center`}>
          <div className={`w-12 h-12 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-3`}>
            <VerdictIcon className={`w-6 h-6 ${config.textColor}`} />
          </div>
          <Badge variant={config.badgeVariant} className="mb-2">
            {verdict}
          </Badge>
          <p className="text-sm text-zinc-300">{verdictLabel}</p>
        </div>

        {/* Data freshness indicator */}
        {isFallback && onRefresh && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3"
          >
            <WifiOff className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-300">
                Using cached vendor data. Prices may be outdated.
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onRefresh}
                disabled={loading}
                className="mt-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 h-auto py-1 px-2"
              >
                {loading ? (
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                ) : (
                  <RefreshCw className="w-3 h-3 mr-1" />
                )}
                Refresh
              </Button>
            </div>
          </motion.div>
        )}

        {/* Real pricing badge */}
        <div className="flex items-center gap-2 p-3 bg-zinc-900/50 rounded-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <p className="text-xs text-zinc-400">
            Pricing from verified Nigerian solar vendors
          </p>
        </div>

        {/* Matched Packages */}
        {matchedPackages && matchedPackages.length > 0 ? (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              Recommended Packages
            </h4>
            {matchedPackages.slice(0, 2).map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} rank={i + 1} />
            ))}
          </div>
        ) : (
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-center">
            <Cloud className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-zinc-400">
              No suitable solar packages found for your current energy profile.
            </p>
            <p className="text-xs text-zinc-500 mt-2">
              Consider reducing energy costs first, then revisit solar options.
            </p>
          </div>
        )}

        {/* System sizing info */}
        {solarData.systemKwNeeded > 0 && (
          <div className="pt-4 border-t border-zinc-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-zinc-900/50 rounded-lg">
                <div className="text-lg font-bold text-white">{solarData.systemKwNeeded} kW</div>
                <div className="text-xs text-zinc-500">Recommended system size</div>
              </div>
              <div className="text-center p-3 bg-zinc-900/50 rounded-lg">
                <div className="text-lg font-bold text-white">{solarData.dailyGenOffset} kWh</div>
                <div className="text-xs text-zinc-500">Daily generator offset</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
