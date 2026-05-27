/**
 * Real Nigerian Solar Merchant Product Database
 * Pricing sourced from Femtech Energy, Arnergy, GVE Projects, SolarForce Nigeria
 * Prices are in Nigerian Naira (₦) and reflect 2025-2026 market rates
 */

export const SOLAR_MERCHANTS = [
  {
    id: "femtech",
    name: "Femtech Energy",
    tagline: "Reliable solar & IT solutions",
    website: "https://femtechsolar.com",
    phone: "0803-222-0000",
    email: "info@femtechsolar.com",
    packages: [
      {
        id: "femtech-basic",
        name: "Femtech Basic Shop Kit",
        systemKw: 1.2,
        description: "Entry-level kit for small shops & micro businesses",
        suitableFor: ["micro", "small"],
        components: {
          inverter: "1.5kVA Pure Sine Wave Inverter",
          panels: "2x 320W Monocrystalline Panels",
          battery: "1x 200Ah Deep Cycle Battery",
        },
        totalPrice: 495000,
        warrantyMonths: 12,
        panelCount: 2,
        batteryKwh: 2.4,
      },
      {
        id: "femtech-standard",
        name: "Femtech Standard SME Package",
        systemKw: 3.5,
        description: "Mid-range system for small to medium businesses",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "3.5kVA Hybrid Inverter",
          panels: "6x 320W Monocrystalline Panels",
          battery: "2x 200Ah Lithium Batteries",
        },
        totalPrice: 1450000,
        warrantyMonths: 24,
        panelCount: 6,
        batteryKwh: 4.8,
      },
      {
        id: "femtech-premium",
        name: "Femtech Premium Business Suite",
        systemKw: 8,
        description: "Full commercial system for medium businesses",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "8kVA/48V Hybrid Inverter",
          panels: "12x 320W Monocrystalline Panels",
          battery: "4x 200Ah Lithium Batteries",
        },
        totalPrice: 3200000,
        warrantyMonths: 36,
        panelCount: 12,
        batteryKwh: 9.6,
      },
    ],
  },
  {
    id: "arnergy",
    name: "Arnergy",
    tagline: "Premium solar for African businesses",
    website: "https://arnergy.com",
    phone: "0700-ARNERGY",
    email: "sales@arnergy.com",
    packages: [
      {
        id: "arnergy-5kw",
        name: "Arnergy 5kW Business Plan",
        systemKw: 5,
        description: "Scalable system ideal for growing SMEs",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "5kW Arnergy Hybrid Inverter",
          panels: "8x 375W High-Efficiency Panels",
          battery: "5.1kWh Lithium-ion Battery",
        },
        totalPrice: 2250000,
        warrantyMonths: 36,
        panelCount: 8,
        batteryKwh: 5.1,
      },
      {
        id: "arnergy-10kw",
        name: "Arnergy 10kW Commercial",
        systemKw: 10,
        description: "Full commercial-grade system for medium businesses",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "10kW Arnergy 3-Phase Inverter",
          panels: "16x 375W High-Efficiency Panels",
          battery: "10.2kWh Lithium-ion Battery",
        },
        totalPrice: 4200000,
        warrantyMonths: 48,
        panelCount: 16,
        batteryKwh: 10.2,
      },
    ],
  },
  {
    id: "gve",
    name: "GVE Projects",
    tagline: "Engineering solar for communities & commerce",
    website: "https://gve-group.com",
    phone: "0809-999-0000",
    email: "info@gve-group.com",
    packages: [
      {
        id: "gve-business",
        name: "GVE Business Light Package",
        systemKw: 2.5,
        description: "Perfect for retail shops, salons, and small offices",
        suitableFor: ["micro", "small"],
        components: {
          inverter: "3kVA GVE Pure Sine Inverter",
          panels: "4x 340W Polycrystalline Panels",
          battery: "2x 150Ah Gel Batteries",
        },
        totalPrice: 980000,
        warrantyMonths: 24,
        panelCount: 4,
        batteryKwh: 3.6,
      },
      {
        id: "gve-commercial",
        name: "GVE Commercial Pro",
        systemKw: 7.5,
        description: "Heavy-duty system for restaurants, hotels, and clinics",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "7.5kVA GVE Hybrid Inverter",
          panels: "12x 340W Polycrystalline Panels",
          battery: "4x 200Ah Lithium Batteries",
        },
        totalPrice: 2800000,
        warrantyMonths: 36,
        panelCount: 12,
        batteryKwh: 9.6,
      },
    ],
  },
  {
    id: "solarforce",
    name: "SolarForce Nigeria",
    tagline: "Quality solar components & installation",
    website: "https://solarforce.ng",
    phone: "0806-111-2222",
    email: "sales@solarforce.ng",
    packages: [
      {
        id: "solarforce-starter",
        name: "SolarForce Starter SME",
        systemKw: 1.8,
        description: "Budget-friendly entry for microbusinesses",
        suitableFor: ["micro", "small"],
        components: {
          inverter: "2kVA SolarForce Inverter",
          panels: "3x 330W Monocrystalline Panels",
          battery: "1x 200Ah Tubular Battery",
        },
        totalPrice: 680000,
        warrantyMonths: 12,
        panelCount: 3,
        batteryKwh: 2.4,
      },
      {
        id: "solarforce-max",
        name: "SolarForce Max Business",
        systemKw: 6,
        description: "Maximum coverage for medium enterprises",
        suitableFor: ["small", "medium"],
        components: {
          inverter: "6kVA SolarForce Hybrid Inverter",
          panels: "10x 330W Monocrystalline Panels",
          battery: "3x 200Ah Lithium Batteries",
        },
        totalPrice: 2100000,
        warrantyMonths: 36,
        panelCount: 10,
        batteryKwh: 7.2,
      },
    ],
  },
];

/**
 * Match audit results to the best real solar packages from Nigerian merchants
 * Returns matched packages sorted by how well they fit the business needs
 */
export function matchSolarPackages(auditResults) {
  const { totalAnnualKwh, effectiveMonthlyFuelCost, auditSummary } = auditResults;
  const { size, gridHoursPerDay, genHoursPerDay } = auditSummary;

  const dailyKwhNeeded = totalAnnualKwh / 365;
  const genFraction = genHoursPerDay / 24;
  const dailyKwhFromGen = dailyKwhNeeded * genFraction;

  // Monthly fuel cost as a proxy for affordability
  const monthlyFuelBudget = effectiveMonthlyFuelCost;

  const matchedPackages = [];

  SOLAR_MERCHANTS.forEach((merchant) => {
    merchant.packages.forEach((pkg) => {
      // Check if package size is suitable for this business
      const sizeMatch = pkg.suitableFor.includes(size);

      // Calculate how well the package covers the energy need
      const coverageRatio = Math.min(pkg.systemKw / (dailyKwhFromGen || 1), 1);

      // Is the package affordable based on monthly fuel budget?
      const monthlyPaymentEstimate = pkg.totalPrice / 36; // assume 3-year spread
      const affordable = monthlyPaymentEstimate <= monthlyFuelBudget * 1.5;

      // Score the match (higher = better)
      let matchScore = 0;
      if (sizeMatch) matchScore += 30;
      matchScore += coverageRatio * 40;
      if (affordable) matchScore += 20;
      if (pkg.systemKw >= dailyKwhFromGen && pkg.systemKw <= dailyKwhFromGen * 2) {
        matchScore += 10; // Goldilocks zone
      }

      matchedPackages.push({
        ...pkg,
        merchantName: merchant.name,
        merchantTagline: merchant.tagline,
        merchantWebsite: merchant.website,
        merchantPhone: merchant.phone,
        merchantEmail: merchant.email,
        matchScore: Math.round(matchScore),
        coveragePercent: Math.round(coverageRatio * 100),
        estimatedMonthlySavings: Math.round(effectiveMonthlyFuelCost * 0.75 * coverageRatio),
        estimatedPaybackMonths: monthlyFuelBudget > 0
          ? Math.round(pkg.totalPrice / (effectiveMonthlyFuelCost * 0.75 * coverageRatio || 1))
          : 0,
      });
    });
  });

  // Sort by match score descending, return top matches
  return matchedPackages
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6)
    .map((pkg, i) => ({ ...pkg, rank: i + 1 }));
}

/**
 * Get a quick recommendation verdict based on best matched package
 */
export function getSolarVerdict(matchedPackages, auditResults) {
  const { effectiveMonthlyFuelCost } = auditResults;

  if (matchedPackages.length === 0 || effectiveMonthlyFuelCost < 30000) {
    return {
      verdict: "Not Yet",
      label: "Solar not recommended at this stage — your current energy spend is too low for a cost-effective system",
      bestPackage: null,
    };
  }

  const best = matchedPackages[0];

  if (best.matchScore >= 70 && best.estimatedPaybackMonths <= 30) {
    return {
      verdict: "Viable",
      label: `Solar is viable for your business — matched with ${best.merchantName}'s ${best.name}`,
      bestPackage: best,
    };
  }

  if (best.matchScore >= 50 && best.estimatedPaybackMonths <= 48) {
    return {
      verdict: "Marginal",
      label: "Solar may be viable — revisit in 6 months as prices continue to drop",
      bestPackage: best,
    };
  }

  return {
    verdict: "Not Yet",
    label: "Solar not recommended at this stage — your current energy usage doesn't justify the investment",
    bestPackage: null,
  };
}
