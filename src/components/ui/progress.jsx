import * as React from "react";
import { cn } from "../../lib/utils";

function Progress({ className, value, max = 100, variant = "default", ...props }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const variantStyles = {
    default: "bg-emerald-500",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    destructive: "bg-red-500",
    cyan: "bg-cyan-500",
  };

  return (
    <div
      data-slot="progress"
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-zinc-800",
        className
      )}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className={cn("h-full transition-all duration-500 ease-out", variantStyles[variant])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export { Progress };