import { getApplianceById } from "./applianceDatabase.js";

// Core constants (from spec — do not change)
const DIESEL_EMISSIONS_FACTOR = 2.68; // kg CO₂ per litre (IPCC standard)
const DIESEL_PRICE_NGN = 1650; // ₦/litre
const GENERATOR_EFFICIENCY = 0.85; // 85% load efficiency factor
const SOLAR_COST_PER_KW_NGN = 600000; // ₦600k per kW installed (2025 Nigeria avg)

// Helper: diesel consumption in litres/hour for a given KVA at given load
function dieselConsumptionLitresPerHour(kva, loadFactor = 0.7) {
  // Typical diesel genset: ~0.25–0.3 L/kWh at full load
  // kVA * powerFactor(0.8) = kW
  const kW = kva * 0.8;
  // ~0.28 L per kWh produced
  return kW * loadFactor * 0.28;
}

export function calculateAudit(auditData) {
  const {
    businessType,
    location,
    size,
    operatingHours,
    generator,
    appliances,
    gridHoursPerDay,
    monthlyFuelSpend,
  } = auditData;

  // ----- Appliance energy consumption -----
  const applianceResults = appliances.map((app) => {
    const appInfo = getApplianceById(app.id);
    if (!appInfo) return null;

    const dailyKwh = (appInfo.wattage * app.quantity * app.hoursPerDay) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const annualKwh = dailyKwh * 365;

    // Grid vs generator split
    const gridFraction = Math.min(gridHoursPerDay / 24, 1);
    const genFraction = 1 - gridFraction;

    const gridAnnualKwh = annualKwh * gridFraction;
    const genAnnualKwh = annualKwh * genFraction;

    // Cost: grid at ~₦65/kWh (NERC avg), generator at diesel cost
    const gridRate = 65; // ₦/kWh (Nigerian grid average)
    const genRate = dieselCostPerKwh(generator.capacityKVA);

    const annualGridCost = gridAnnualKwh * gridRate;
    const annualGenCost = genAnnualKwh * genRate;
    const annualCost = annualGridCost + annualGenCost;

    // Carbon
    const co2PerKwhGen = (DIESEL_EMISSIONS_FACTOR * 0.28) / GENERATOR_EFFICIENCY;
    const annualCo2 = genAnnualKwh * co2PerKwhGen;
    // Grid has minimal marginal CO₂ attribution (gen is the problem)

    return {
      id: app.id,
      label: appInfo.label,
      category: appInfo.category,
      wattage: appInfo.wattage,
      quantity: app.quantity,
      hoursPerDay: app.hoursPerDay,
      dailyKwh,
      monthlyKwh,
      annualKwh,
      annualCost,
      annualCo2,
      efficiencyRating: appInfo.efficiencyRating,
    };
  }).filter(Boolean);

  // ----- Totals -----
  const totalAnnualKwh = applianceResults.reduce((s, a) => s + a.annualKwh, 0);

  // ----- Generator fuel consumption & cost -----
  const genKva = generator.capacityKVA;
  const genHoursPerDay = generator.hoursPerDay;
  const genLitresPerHour = dieselConsumptionLitresPerHour(genKva);
  const dailyGenLitres = genLitresPerHour * genHoursPerDay;
  const monthlyGenLitres = dailyGenLitres * 30;

  // Cost from fuel consumption
  const calculatedMonthlyFuelCost = monthlyGenLitres * DIESEL_PRICE_NGN;
  // Use user's actual fuel spend if provided, otherwise use calculated
  const effectiveMonthlyFuelCost =
    monthlyFuelSpend && monthlyFuelSpend > 0
      ? monthlyFuelSpend
      : calculatedMonthlyFuelCost;

  // Total annual energy cost = actual monthly fuel spend * 12 (primary cost for Nigerian SMEs)
  const totalAnnualEnergyCost = effectiveMonthlyFuelCost * 12;
  const genOverheadAnnualCost = effectiveMonthlyFuelCost * 12;

  // Total CO₂ from actual fuel burned (derived from spend, not appliance kWh)
  const annualLitres = (effectiveMonthlyFuelCost / DIESEL_PRICE_NGN) * 12;
  const totalAnnualCo2 = annualLitres * DIESEL_EMISSIONS_FACTOR;

  // ----- Energy Score (0–100) -----
  const score = calculateEnergyScore(applianceResults, auditData, effectiveMonthlyFuelCost);

  // ----- Industry benchmarks (for context / score) -----
  const industryBenchmarks = {
    restaurant: { micro: 80000, small: 180000, medium: 500000 },
    retail: { micro: 50000, small: 100000, medium: 300000 },
    office: { micro: 40000, small: 80000, medium: 200000 },
    salon: { micro: 30000, small: 60000, medium: 150000 },
    pharmacy: { micro: 50000, small: 120000, medium: 350000 },
    hotel: { micro: 150000, small: 400000, medium: 1000000 },
    other: { micro: 50000, small: 100000, medium: 250000 },
  };

  const benchmark =
    industryBenchmarks[businessType]?.[size] || industryBenchmarks.other.small;

  // ----- Recommendations (derived from data) -----
  const recommendations = generateRecommendations(
    applianceResults,
    auditData,
    score,
    totalAnnualEnergyCost
  );

  // --- Carbon comparisons (Nigerian context) ---
  const carbonComparisons = {
    lagosAbujaRoadTrip: Math.round(totalAnnualCo2 / 0.18), // ~180 kg CO₂ per trip in average car
    nigerianMonthlyAvg: Math.round(totalAnnualCo2 / 12 / 150), // avg Nigerian emits ~150kg/month
    litresOfDieselBurned: Math.round(totalAnnualCo2 / DIESEL_EMISSIONS_FACTOR),
  };

  return {
    applianceResults,
    totalAnnualKwh,
    totalAnnualCost: totalAnnualEnergyCost,
    totalAnnualCo2,
    score,
    benchmark,
    effectiveMonthlyFuelCost,
    genOverheadAnnualCost,
    calculatedMonthlyFuelCost,
    recommendations,
    carbonComparisons,
    auditSummary: {
      businessType,
      location,
      size,
      operatingHours,
      gridHoursPerDay,
      genHoursPerDay: generator.hoursPerDay,
      genCapacityKVA: generator.capacityKVA,
      applianceCount: appliances.length,
    },
  };
}

function dieselCostPerKwh(kva) {
  const kW = kva * 0.8;
  const litresPerKwh = 0.28 / GENERATOR_EFFICIENCY;
  return litresPerKwh * DIESEL_PRICE_NGN;
}

function calculateEnergyScore(applianceResults, auditData, monthlyFuelCost) {
  let score = 68; // start at neutral

  // 1. Appliance efficiency ratings
  const avgEfficiency =
    applianceResults.reduce((s, a) => s + a.efficiencyRating, 0) /
    applianceResults.length;
  score += (avgEfficiency - 3) * 5; // -10 to +10

  // 2. Generator vs PHCN ratio (more grid = better)
  const gridFraction = auditData.gridHoursPerDay / 24;
  score += (gridFraction - 0.5) * 20; // -10 to +10

  // 3. Cooling load % (high cooling = lower score)
  const coolingLoad = applianceResults
    .filter((a) => a.category === "cooling")
    .reduce((s, a) => s + a.annualKwh, 0);
  const coolingFraction = coolingLoad / (applianceResults.reduce((s, a) => s + a.annualKwh, 0) || 1);
  if (coolingFraction > 0.5) score -= 12;
  else if (coolingFraction > 0.35) score -= 7;
  else if (coolingFraction < 0.15) score += 5;

  // 4. Spend vs benchmark
  const benchmarkMonthly = {
    micro: 60000,
    small: 120000,
    medium: 300000,
  }[auditData.size] || 120000;

  const spendRatio = monthlyFuelCost / benchmarkMonthly;
  if (spendRatio > 2) score -= 15;
  else if (spendRatio > 1.3) score -= 10;
  else if (spendRatio > 1) score -= 3;
  else if (spendRatio < 0.5) score += 10;

  // 5. Generator hours (heavy gen use = lower)
  const genFractionDay = auditData.generator.hoursPerDay / 24;
  if (genFractionDay > 0.7) score -= 10;
  else if (genFractionDay > 0.4) score -= 6;
  else if (genFractionDay < 0.2) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function generateRecommendations(applianceResults, auditData, score, totalCost) {
  const recs = [];

  // Find the worst efficiency appliances
  const lowEff = applianceResults
    .filter((a) => a.efficiencyRating <= 2)
    .sort((a, b) => b.annualKwh - a.annualKwh);

  if (lowEff.length > 0) {
    lowEff.slice(0, 2).forEach((app) => {
      const potentialSavings = Math.round(app.annualCost * 0.4);
      recs.push({
        priority: "high",
        title: `Replace ${app.label}`,
        description: `Upgrade to an energy-efficient ${app.label} model. Could save ~₦${potentialSavings.toLocaleString()}/year.`,
        savings: potentialSavings,
      });
    });
  }

  // Check generator reliance
  const genFraction = auditData.generator.hoursPerDay / 24;
  if (genFraction > 0.5) {
    const savings = Math.round(auditData.monthlyFuelSpend * 12 * 0.3);
    recs.push({
      priority: "high",
      title: "Reduce Generator Hours",
      description: `You run your generator ${auditData.generator.hoursPerDay}h/day. Consider switching high-load tasks to grid hours. Save ~₦${savings.toLocaleString()}/year.`,
      savings,
    });
  }

  // Check cooling load
  const coolingKwh = applianceResults
    .filter((a) => a.category === "cooling")
    .reduce((s, a) => s + a.annualKwh, 0);
  const totalKwh = applianceResults.reduce((s, a) => s + a.annualKwh, 0);
  if (coolingKwh / totalKwh > 0.3 && totalKwh > 0) {
    recs.push({
      priority: "medium",
      title: "Optimise Cooling Usage",
      description: `Air conditioning is ${Math.round((coolingKwh / totalKwh) * 100)}% of your load. Set thermostats to 24°C, clean filters monthly, and service AC units before dry season.`,
      savings: Math.round(totalCost * 0.15),
    });
  }

  // Check lighting
  const lightingApps = applianceResults.filter((a) => a.category === "lighting");
  const hasInefficientLighting = lightingApps.some((a) => a.efficiencyRating < 3);
  if (hasInefficientLighting) {
    recs.push({
      priority: "medium",
      title: "Switch to LED Lighting",
      description: `Replace fluorescent and incandescent bulbs with LEDs. LEDs use ~80% less energy and last 10x longer.`,
      savings: Math.round(
        lightingApps.reduce((s, a) => s + a.annualCost, 0) * 0.7
      ),
    });
  }

  // Solar recommendation if spend is high enough
  if (auditData.monthlyFuelSpend > 100000) {
    recs.push({
      priority: "medium",
      title: "Consider Solar Hybrid",
      description: `With monthly energy spend of ₦${auditData.monthlyFuelSpend.toLocaleString()}, solar could reduce your bills by 60–80%. Check the Solar Verdict on the dashboard.`,
      savings: Math.round(auditData.monthlyFuelSpend * 12 * 0.6),
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs.slice(0, 3);
}
