import { useAudit } from "../../context/AuditContext.jsx";
import { formatNaira } from "../../utils/formatters.js";

export default function SpendConfirmation({ onSubmit }) {
  const { auditData, updateAuditData } = useAudit();

  // Calculate estimated fuel spend from inputs
  const genKva = auditData.generator?.capacityKVA || 5;
  const genHours = auditData.generator?.hoursPerDay || 8;
  const kW = genKva * 0.8 * 0.85;
  const litresPerHour = kW * 0.7 * 0.28;
  const dailyLitres = litresPerHour * genHours;
  const estimatedMonthlySpend = dailyLitres * 30 * 1650; // Diesel price per litre
  const actualSpend =
    auditData.monthlyFuelSpend || estimatedMonthlySpend;

  const totalAppliances = auditData.appliances?.length || 0;
  const totalItems = auditData.appliances?.reduce((s, a) => s + a.quantity, 0) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="audit-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Confirm Your Details</h2>
      <p className="form-subtitle">Review and confirm your monthly energy spend.</p>

      <div className="summary-section">
        <h3>Business Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Type</span>
            <span className="summary-value">{auditData.businessType}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Location</span>
            <span className="summary-value">{auditData.location}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Size</span>
            <span className="summary-value">{auditData.size}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Operating Hours</span>
            <span className="summary-value">{auditData.operatingHours}/day</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Generator</span>
            <span className="summary-value">{auditData.generator.capacityKVA}KVA, {auditData.generator.hoursPerDay}h/day</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">PHCN Grid</span>
            <span className="summary-value">{auditData.gridHoursPerDay}h/day</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Appliances</span>
            <span className="summary-value">{totalAppliances} types ({totalItems} total items)</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Monthly Fuel Spend</h3>
        <p className="form-hint">
          Based on your generator usage, we estimate{" "}
          <strong>{formatNaira(estimatedMonthlySpend)}</strong> per month.
        </p>
        <div className="form-group">
          <label className="form-label">
            Enter your actual monthly fuel spend (₦)
          </label>
          <input
            className="form-input"
            type="number"
            min="0"
            step="1000"
            placeholder={estimatedMonthlySpend.toLocaleString()}
            value={auditData.monthlyFuelSpend || ""}
            onChange={(e) =>
              updateAuditData({ monthlyFuelSpend: Number(e.target.value) || 0 })
            }
          />
          <p className="form-hint">
            Leave blank to use the estimated amount of{" "}
            {formatNaira(estimatedMonthlySpend)}.
          </p>
        </div>
      </div>

      <button type="submit" className="btn-primary btn-large">
        Run Energy Audit →
      </button>
    </form>
  );
}
