import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNaira(amount) {
  if (amount == null || isNaN(amount)) return "₦0";
  return `₦${Math.round(amount).toLocaleString("en-US")}`;
}

export function formatNumber(num) {
  if (num == null || isNaN(num)) return "0";
  return num.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function formatDecimal(num, decimals = 1) {
  if (num == null || isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatPercentage(value, total) {
  if (!total || total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export function formatDate() {
  return new Date().toISOString().split("T")[0];
}