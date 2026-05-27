export function buildPrompt(auditResults) {
  const { score, totalAnnualKwh, totalAnnualCost, totalAnnualCo2, recommendations, auditSummary } =
    auditResults;

  return `You are an energy efficiency advisor for Nigerian SMEs. The user has completed an energy audit. Below is their data.

**Business Profile:**
- Type: ${auditSummary.businessType}
- Location: ${auditSummary.location}
- Size: ${auditSummary.size}
- Operating hours: ${auditSummary.operatingHours}h/day
- Grid hours: ${auditSummary.gridHoursPerDay}h/day
- Generator: ${auditSummary.genCapacityKVA}KVA, ${auditSummary.genHoursPerDay}h/day

**Audit Results:**
- Energy Score: ${score}/100
- Annual Consumption: ${Math.round(totalAnnualKwh).toLocaleString()} kWh
- Annual Cost: ₦${Math.round(totalAnnualCost).toLocaleString()}
- Annual CO₂: ${totalAnnualCo2.toFixed(1)} kg
- Appliances audited: ${auditSummary.applianceCount}

**Top Recommendations:**${recommendations.slice(0, 3).map(r => `
- ${r.title}: ${r.description}`).join('')}

Write an audit report in plain English. Be direct, practical, and Nigerian context-aware. No jargon. Speak like a trusted advisor. Under 400 words.

Structure:
1. One opening summary sentence about their overall energy situation
2. Top 2-3 energy problems observed from their data
3. Three specific actions with estimated naira savings
4. A closing motivational line about reducing costs and environmental impact.`;
}

export async function generateAuditReport(auditResults) {
  try {
    const prompt = buildPrompt(auditResults);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("Gemini API key not configured. Skipping AI report.");
      return null;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      console.warn(`Gemini API returned ${response.status}`);
      return null;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.warn("Gemini API returned empty response");
      return null;
    }

    return text;
  } catch (err) {
    console.warn("Gemini API call failed:", err.message);
    return null;
  }
}
