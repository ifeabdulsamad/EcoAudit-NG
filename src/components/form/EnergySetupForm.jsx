import { useAudit } from "../../context/AuditContext.jsx";
import ApplianceSelector from "./ApplianceSelector.jsx";

export default function EnergySetupForm({ onNext, onPrev }) {
  const { auditData, updateAuditData, updateGenerator, setAppliances } = useAudit();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auditData.appliances.length === 0) return;
    onNext();
  };

  return (
    <form className="audit-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Energy Setup</h2>
      <p className="form-subtitle">Tell us about your power sources and equipment.</p>

      <div className="form-section">
        <h3 className="form-section-title">Generator</h3>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Capacity (KVA)</label>
            <input
              className="form-input"
              type="number"
              min="1"
              max="100"
              step="0.5"
              value={auditData.generator.capacityKVA}
              onChange={(e) =>
                updateGenerator({ capacityKVA: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hours used per day</label>
            <input
              className="form-input"
              type="number"
              min="0"
              max="24"
              value={auditData.generator.hoursPerDay}
              onChange={(e) =>
                updateGenerator({ hoursPerDay: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Fuel type</label>
          <select
            className="form-select"
            value={auditData.generator.fuelType}
            onChange={(e) => updateGenerator({ fuelType: e.target.value })}
          >
            <option value="diesel">Diesel</option>
            <option value="petrol">Petrol</option>
          </select>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">PHCN Grid Supply</h3>
        <div className="form-group">
          <label className="form-label">Average grid hours per day</label>
          <input
            className="form-input"
            type="number"
            min="0"
            max="24"
            value={auditData.gridHoursPerDay}
            onChange={(e) =>
              updateAuditData({ gridHoursPerDay: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <ApplianceSelector
        selected={auditData.appliances}
        onUpdate={setAppliances}
      />

      <div className="form-nav">
        <button type="button" className="btn-secondary" onClick={onPrev}>
          ← Back
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={auditData.appliances.length === 0}
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}
