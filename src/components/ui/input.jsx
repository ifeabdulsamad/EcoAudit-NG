import * as React from "react";
import { cn } from "../../lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-zinc-500 selection:bg-emerald-500/30 selection:text-white",
        "flex h-10 w-full min-w-0 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm shadow-sm transition-all outline-none",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus-visible:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/20",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };