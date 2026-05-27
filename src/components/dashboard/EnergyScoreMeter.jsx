import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";

export default function EnergyScoreMeter({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const getScoreConfig = (s) => {
    if (s >= 70) return {
      color: "#10b981",
      bgColor: "bg-emerald-500",
      label: "Good",
      description: "Your energy efficiency is above average",
      icon: TrendingUp,
      variant: "success"
    };
    if (s >= 40) return {
      color: "#f59e0b",
      bgColor: "bg-amber-500",
      label: "Fair",
      description: "Room for improvement in key areas",
      icon: Minus,
      variant: "warning"
    };
    return {
      color: "#ef4444",
      bgColor: "bg-red-500",
      label: "Needs Improvement",
      description: "Significant savings opportunities identified",
      icon: TrendingDown,
      variant: "destructive"
    };
  };

  const config = getScoreConfig(score);
  const Icon = config.icon;

  return (
    <Card className="glass-card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Energy Score</CardTitle>
              <CardDescription>Overall efficiency rating</CardDescription>
            </div>
          </div>
          <Badge variant={config.variant} className="capitalize">
            <Icon className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          {/* Score Ring */}
          <div className="relative w-44 h-44">
            {/* Background glow */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: config.color }}
            />
            
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="10"
              />
              
              {/* Progress */}
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={config.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  filter: `drop-shadow(0 0 6px ${config.color}40)`
                }}
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span 
                className="text-5xl font-bold"
                style={{ color: config.color }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {animatedScore}
              </motion.span>
              <span className="text-sm text-zinc-500 mt-1">/ 100</span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-zinc-400 text-center mt-4 max-w-[200px]">
            {config.description}
          </p>
          
          {/* Score breakdown hint */}
          <div className="flex items-center gap-4 mt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>70-100 Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>40-69 Fair</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>0-39 Low</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}