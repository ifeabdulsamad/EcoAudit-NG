import { matchSolarPackages, getSolarVerdict } from "./solarMerchants.js";

/**
 * Estimate solar viability using real Nigerian solar merchant data.
 * Instead of abstract calculations, this matches the business to actual
 * products from Femtech Energy, Arnergy, GVE Projects, and SolarForce Nigeria.
 */
export function estimateSolar(auditResults) {
  const { totalAnnualKwh, effectiveMonthlyFuelCost, auditSummary } = auditResults;
  const { genHoursPerDay } = auditSummary;

  // Match against real merchant packages
  const matchedPackages = matchSolarPackages(auditResults);

  // Get verdict based on best match
  const verdictData = getSolarVerdict(matchedPackages, auditResults);

  // Calculate general system sizing info (still useful for context)
  const dailyKwhNeeded = totalAnnualKwh / 365;
  const genFraction = genHoursPerDay / 24;
  const dailyKwhFromGen = dailyKwhNeeded * genFraction;
  const systemKwNeeded = dailyKwhFromGen / 4.5; // Nigerian avg peak sun hours

  // Monthly savings estimate based on best match (if available)
  const bestMonthlySavings = matchedPackages[0]?.estimatedMonthlySavings || 0;
  const bestPaybackMonths = matchedPackages[0]?.estimatedPaybackMonths || 0;

  return {
    // Verdict from real merchant matching
    verdict: verdictData.verdict,
    verdictLabel: verdictData.label,
    bestPackage: verdictData.bestPackage,

    // General system context
    systemKwNeeded: Math.round(systemKwNeeded * 10) / 10,
    dailyGenOffset: Math.round(dailyKwhFromGen * 10) / 10,

    // Real merchant matched packages
    matchedPackages,

    // Best-case savings from top matched package
    monthlySavings: bestMonthlySavings,
    paybackPeriodMonths: bestPaybackMonths,
    annualSavings: bestMonthlySavings * 12,

    // Fallback calculated data (for when no good match exists)
    totalInstallCost: matchedPackages[0]?.totalPrice || 0,
    panelsNeeded: matchedPackages[0]?.panelCount || 0,
    batteryKwhNeeded: matchedPackages[0]?.batteryKwh || 0,

    // Count of available real options
    merchantMatches: matchedPackages.length,
    viableOptions: matchedPackages.filter((p) => p.matchScore >= 60).length,
  };
}
