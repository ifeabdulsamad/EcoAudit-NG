import { useState } from "react";
import applianceDatabase from "../../engine/applianceDatabase.js";

export default function ApplianceSelector({ selected, onUpdate }) {
  const [category, setCategory] = useState("all");
  const categories = ["all", ...new Set(applianceDatabase.map((a) => a.category))];

  const filtered =
    category === "all"
      ? applianceDatabase
      : applianceDatabase.filter((a) => a.category === category);

  const toggleAppliance = (app) => {
    const existing = selected.find((a) => a.id === app.id);
    if (existing) {
      onUpdate(selected.filter((a) => a.id !== app.id));
    } else {
      onUpdate([...selected, { id: app.id, quantity: 1, hoursPerDay: 8 }]);
    }
  };

  const updateAppliance = (id, field, value) => {
    onUpdate(
      selected.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const CATEGORY_ICONS = {
    cooling: "AC",
    cooking: "CK",
    lighting: "LB",
    electronics: "EL",
    heavy_duty: "HD",
  };

  return (
    <div className="appliance-selector">
      <label className="form-label">Select Your Appliances</label>
      <p className="form-hint">Click appliances to add them. Set quantity and daily usage hours.</p>

      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c}
            className={`category-tab ${category === c ? "active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c === "all"
              ? "All"
              : `${CATEGORY_ICONS[c] || c.charAt(0).toUpperCase()} ${c.charAt(0).toUpperCase() + c.slice(1)}`}
          </button>
        ))}
      </div>

      <div className="appliance-grid">
        {filtered.map((app) => {
          const isSelected = selected.find((a) => a.id === app.id);

          return (
            <div
              key={app.id}
              className={`appliance-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggleAppliance(app)}
            >
              <div className="appliance-icon-initial">{app.icon}</div>
              <span className="appliance-name">{app.label}</span>
              <span className="appliance-wattage">{app.wattage}W</span>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="selected-appliances">
          <div className="selected-appliances-header">
            <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="20" x2="12" y2="10" />
              <line x1="18" y1="20" x2="18" y2="4" />
              <line x1="6" y1="20" x2="6" y2="16" />
            </svg>
            Selected Appliances<span className="sel-count">({selected.length})</span>
          </div>
          {selected.map((app) => {
            const info = applianceDatabase.find((a) => a.id === app.id);
            return (
              <div key={app.id} className="selected-appliance-row">
                <span className="sel-info">
                  <div className="appliance-icon-initial">{info?.icon}</div>
                  {info?.label}
                </span>
                <div className="sel-controls">
                  <label>
                    Qty:
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={app.quantity}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updateAppliance(app.id, "quantity", Number(e.target.value))
                      }
                    />
                  </label>
                  <label>
                    Hrs/day:
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={app.hoursPerDay}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updateAppliance(app.id, "hoursPerDay", Number(e.target.value))
                      }
                    />
                  </label>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAppliance(app);
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
