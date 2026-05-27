/**
 * Local fallback report generator when Gemini API fails
 * Provides structured insights based on audit results without AI dependency
 */

export function generateLocalReport(auditResults) {
  const { 
    score, 
    annualCost, 
    totalCo2, 
    recommendations = [],
    solarData,
    applianceResults = [],
    fuelData
  } = auditResults;

  const sections = [];

  // Executive Summary
  sections.push(`**Executive Summary**`);
  sections.push(`Your business scored ${score}/100 on energy efficiency, placing you in the ${getScoreCategory(score)} category.`);
  sections.push(`Annual energy spend: ₦${annualCost.toLocaleString()} with a carbon footprint of ${(totalCo2/1000).toFixed(1)} tonnes CO₂.`);
  sections.push("");

  // Key Findings
  sections.push(`**Key Findings**`);
  
  // Top consumers
  const topConsumers = [...applianceResults]
    .sort((a, b) => b.dailyKwh - a.dailyKwh)
    .slice(0, 3);
  
  if (topConsumers.length > 0) {
    sections.push(`Highest energy consumers:`);
    topConsumers.forEach((app, i) => {
      sections.push(`${i + 1}. ${app.label}: ${app.dailyKwh.toFixed(1)} kWh/day`);
    });
  }

  // Generator dependency
  if (fuelData?.generator?.hoursPerDay > 0) {
    const genCost = fuelData.generator.litersPerDay * 850 * 30; // Approx monthly
    sections.push(`Generator dependency costs approximately ₦${genCost.toLocaleString()}/month in fuel.`);
  }
  sections.push("");

  // Recommendations
  if (recommendations.length > 0) {
    sections.push(`**Priority Actions**`);
    const highPriority = recommendations.filter(r => r.priority === 'high');
    const mediumPriority = recommendations.filter(r => r.priority === 'medium');
    
    if (highPriority.length > 0) {
      sections.push(`High impact (${highPriority.length} items):`);
      highPriority.slice(0, 3).forEach(r => {
        sections.push(`• ${r.title} — Save ₦${r.savings.toLocaleString()}/year`);
      });
    }
    
    if (mediumPriority.length > 0) {
      sections.push(`Medium impact (${mediumPriority.length} items):`);
      mediumPriority.slice(0, 2).forEach(r => {
        sections.push(`• ${r.title} — Save ₦${r.savings.toLocaleString()}/year`);
      });
    }
    sections.push("");
  }

  // Solar Assessment
  if (solarData) {
    sections.push(`**Solar Viability: ${solarData.verdict}**`);
    sections.push(solarData.verdictLabel);
    
    if (solarData.matchedPackages?.length > 0) {
      const bestMatch = solarData.matchedPackages[0];
      sections.push(`Recommended: ${bestMatch.name} (${bestMatch.systemKw}kW) at ₦${bestMatch.totalPrice.toLocaleString()}`);
      sections.push(`Estimated payback: ${Math.round(bestMatch.estimatedPaybackMonths / 12 * 10) / 10} years`);
    }
    sections.push("");
  }

  // Next Steps
  sections.push(`**Recommended Next Steps**`);
  sections.push(`1. Implement high-priority recommendations first for immediate savings`);
  sections.push(`2. Schedule follow-up audit in 3 months to track improvement`);
  if (score < 60) {
    sections.push(`3. Consider solar consultation — your profile shows good potential`);
  }
  sections.push(`4. Monitor monthly diesel spend and track reduction`);
  sections.push("");

  // Footer
  sections.push(`---`);
  sections.push(`*This report was generated locally. Connect to the internet for AI-enhanced insights with detailed analysis and custom recommendations.*`);

  return sections.join("\n");
}

function getScoreCategory(score) {
  if (score >= 70) return "good efficiency";
  if (score >= 40) return "fair efficiency with room for improvement";
  return "needs improvement — significant savings opportunities identified";
}

/**
 * Quick summary for dashboard cards when full report isn't needed
 */
export function generateQuickSummary(auditResults) {
  const { score, recommendations = [] } = auditResults;
  const totalSavings = recommendations.reduce((sum, r) => sum + (r.savings || 0), 0);
  
  if (score >= 70) {
    return `Your energy profile is efficient. Focus on maintaining current practices and consider solar for further optimization. Potential additional savings: ₦${totalSavings.toLocaleString()}/year.`;
  }
  
  if (score >= 40) {
    return `Moderate efficiency with clear improvement opportunities. Implementing recommended actions could save ₦${totalSavings.toLocaleString()} annually.`;
  }
  
  return `Significant savings opportunities identified. Priority recommendations could reduce costs by ₦${totalSavings.toLocaleString()}/year. Consider solar to reduce generator dependency.`;
}
