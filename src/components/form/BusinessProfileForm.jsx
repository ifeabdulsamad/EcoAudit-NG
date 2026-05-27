import { useAudit } from "../../context/AuditContext.jsx";

const BUSINESS_TYPES = [
  { value: "restaurant", label: "Restaurant / Food Service" },
  { value: "retail", label: "Retail Shop" },
  { value: "office", label: "Office" },
  { value: "salon", label: "Salon / Barber" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "hotel", label: "Hotel / Guest House" },
  { value: "other", label: "Other" },
];

const BUSINESS_SIZES = [
  { value: "micro", label: "Micro (1–5 employees)" },
  { value: "small", label: "Small (6–20 employees)" },
  { value: "medium", label: "Medium (21–100 employees)" },
];

export default function BusinessProfileForm({ onNext }) {
  const { auditData, updateAuditData } = useAudit();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auditData.businessType || !auditData.location || !auditData.size) return;
    onNext();
  };

  return (
    <form className="audit-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Business Profile</h2>
      <p className="form-subtitle">Tell us about your business so we can tailor the audit.</p>

      <div className="form-group">
        <label className="form-label">What type of business do you run?</label>
        <select
          className="form-select"
          value={auditData.businessType}
          onChange={(e) => updateAuditData({ businessType: e.target.value })}
          required
        >
          <option value="">Select business type…</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Business Location</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g., Ibadan, Oyo State"
          value={auditData.location}
          onChange={(e) => updateAuditData({ location: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Business Size</label>
        <div className="radio-group">
          {BUSINESS_SIZES.map((s) => (
            <label key={s.value} className={`radio-card ${auditData.size === s.value ? "selected" : ""}`}>
              <input
                type="radio"
                name="size"
                value={s.value}
                checked={auditData.size === s.value}
                onChange={(e) => updateAuditData({ size: e.target.value })}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Daily operating hours</label>
        <input
          className="form-input"
          type="number"
          min="1"
          max="24"
          value={auditData.operatingHours}
          onChange={(e) => updateAuditData({ operatingHours: Number(e.target.value) })}
        />
      </div>

      <button type="submit" className="btn-primary" disabled={!auditData.businessType || !auditData.location || !auditData.size}>
        Next Step →
      </button>
    </form>
  );
}
