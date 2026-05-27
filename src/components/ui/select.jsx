import * as React from "react";
import { cn } from "../../lib/utils";

function Select({ className, children, ...props }) {
  return (
    <div className={cn("relative", className)}>
      <select
        data-slot="select"
        className={cn(
          "w-full h-10 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm",
          "text-zinc-100 placeholder:text-zinc-500",
          "focus-visible:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/20",
          "focus-visible:outline-none transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "appearance-none cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <option
      data-slot="select-item"
      className={cn("py-2 px-3", className)}
      {...props}
    >
      {children}
    </option>
  );
}

export { Select, SelectItem };