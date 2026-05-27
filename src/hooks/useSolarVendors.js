/**
 * Hook for fetching and managing solar vendor data
 * Fetches fresh data on dashboard load, falls back to audit data if unavailable
 */

import { useState, useEffect, useCallback } from "react";
import { getSolarVendors, isCacheStale, getCacheAge } from "../services/solarVendorService";
import { matchSolarPackages, getSolarVerdict } from "../engine/solarMerchants";

/**
 * Hook to fetch and refresh solar vendor data
 * @param {Object} auditResults - The audit results to match against
 * @returns {Object} { solarData, loading, error, refresh, lastUpdated }
 */
export function useSolarVendors(auditResults) {
  const [solarData, setSolarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Initial data from audit results (fallback)
  const initialSolarData = auditResults?.solarData;

  const fetchVendors = useCallback(async (options = {}) => {
    if (!auditResults) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch fresh vendor data
      const vendors = await getSolarVendors(options);
      
      // Re-run matching with fresh data
      const matchedPackages = matchSolarPackagesWithFreshData(
        auditResults,
        vendors
      );

      const verdictData = getSolarVerdict(matchedPackages, auditResults);

      // Calculate system sizing (same as original)
      const { totalAnnualKwh, auditSummary } = auditResults;
      const { genHoursPerDay } = auditSummary;
      const dailyKwhNeeded = totalAnnualKwh / 365;
      const genFraction = genHoursPerDay / 24;
      const dailyKwhFromGen = dailyKwhNeeded * genFraction;
      const systemKwNeeded = dailyKwhFromGen / 4.5;

      const bestMonthlySavings = matchedPackages[0]?.estimatedMonthlySavings || 0;
      const bestPaybackMonths = matchedPackages[0]?.estimatedPaybackMonths || 0;

      const freshSolarData = {
        verdict: verdictData.verdict,
        verdictLabel: verdictData.label,
        bestPackage: verdictData.bestPackage,
        systemKwNeeded: Math.round(systemKwNeeded * 10) / 10,
        dailyGenOffset: Math.round(dailyKwhFromGen * 10) / 10,
        matchedPackages,
        monthlySavings: bestMonthlySavings,
        paybackPeriodMonths: bestPaybackMonths,
        annualSavings: bestMonthlySavings * 12,
        totalInstallCost: matchedPackages[0]?.totalPrice || 0,
        panelsNeeded: matchedPackages[0]?.panelCount || 0,
        batteryKwhNeeded: matchedPackages[0]?.batteryKwh || 0,
        merchantMatches: matchedPackages.length,
        viableOptions: matchedPackages.filter((p) => p.matchScore >= 60).length,
        // Metadata
        _fresh: true,
        _timestamp: new Date().toISOString(),
      };

      setSolarData(freshSolarData);
      setLastUpdated(new Date());
    } catch (err) {
      console.warn("Failed to fetch fresh solar data:", err);
      setError(err.message);
      // Fall back to initial data
      if (initialSolarData) {
        setSolarData({
          ...initialSolarData,
          _fresh: false,
          _fallback: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [auditResults, initialSolarData]);

  // Initial fetch
  useEffect(() => {
    // Check if we should fetch fresh data
    const shouldFetchFresh = isCacheStale() || !initialSolarData;
    
    if (shouldFetchFresh) {
      fetchVendors({ preferCache: false });
    } else {
      // Use initial data but still try to refresh in background
      setSolarData(initialSolarData);
      setLoading(false);
      fetchVendors({ preferCache: true }).catch(() => {});
    }
  }, [fetchVendors, initialSolarData]);

  const refresh = useCallback(() => {
    return fetchVendors({ forceRefresh: true });
  }, [fetchVendors]);

  return {
    solarData: solarData || initialSolarData,
    loading,
    error,
    refresh,
    lastUpdated,
    isFresh: solarData?._fresh || false,
    isFallback: solarData?._fallback || false,
  };
}

/**
 * Match packages using fresh vendor data
 */
function matchSolarPackagesWithFreshData(auditResults, vendors) {
  const { totalAnnualKwh, effectiveMonthlyFuelCost, auditSummary } = auditResults;
  const { size, genHoursPerDay } = auditSummary;

  const dailyKwhNeeded = totalAnnualKwh / 365;
  const genFraction = genHoursPerDay / 24;
  const dailyKwhFromGen = dailyKwhNeeded * genFraction;
  const monthlyFuelBudget = effectiveMonthlyFuelCost;

  const matchedPackages = [];

  vendors.forEach((vendor) => {
    // Check if package size is suitable
    const sizeMatch = vendor.suitableFor?.includes(size) ?? true;

    // Calculate coverage
    const coverageRatio = Math.min(vendor.systemKw / (dailyKwhFromGen || 1), 1);

    // Affordability check
    const monthlyPaymentEstimate = vendor.totalPrice / 36;
    const affordable = monthlyPaymentEstimate <= monthlyFuelBudget * 1.5;

    // Score the match
    let matchScore = 0;
    if (sizeMatch) matchScore += 30;
    matchScore += coverageRatio * 40;
    if (affordable) matchScore += 20;
    if (vendor.systemKw >= dailyKwhFromGen && vendor.systemKw <= dailyKwhFromGen * 2) {
      matchScore += 10;
    }

    matchedPackages.push({
      ...vendor,
      matchScore: Math.round(matchScore),
      coveragePercent: Math.round(coverageRatio * 100),
      estimatedMonthlySavings: Math.round(effectiveMonthlyFuelCost * 0.75 * coverageRatio),
      estimatedPaybackMonths: monthlyFuelBudget > 0
        ? Math.round(vendor.totalPrice / (effectiveMonthlyFuelCost * 0.75 * coverageRatio || 1))
        : 0,
    });
  });

  return matchedPackages
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)
    .map((pkg, i) => ({ ...pkg, rank: i + 1 }));
}

/**
 * Simple hook to check if solar data is stale
 */
export function useSolarDataStatus() {
  const [isStale, setIsStale] = useState(false);
  const [cacheAge, setCacheAge] = useState(null);

  useEffect(() => {
    setIsStale(isCacheStale());
    setCacheAge(getCacheAge());
  }, []);

  return { isStale, cacheAge };
}
