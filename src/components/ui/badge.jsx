import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
        secondary:
          "border-transparent bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
        destructive:
          "border-transparent bg-red-500/20 text-red-400 hover:bg-red-500/30",
        outline:
          "text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-zinc-200",
        success:
          "border-transparent bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30",
        warning:
          "border-transparent bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
        info:
          "border-transparent bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };