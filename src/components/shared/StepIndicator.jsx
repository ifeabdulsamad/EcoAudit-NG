const STEPS = [
  { step: 1, label: "Profile" },
  { step: 2, label: "Energy" },
  { step: 3, label: "Confirm" },
];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="step-indicator">
      {STEPS.map((s, i) => (
        <div key={s.step} className="step-item">
          <div
            className={`step-circle ${
              currentStep === s.step
                ? "active"
                : currentStep > s.step
                ? "completed"
                : ""
            }`}
          >
            {currentStep > s.step ? "✓" : s.step}
          </div>
          <span className="step-label">{s.label}</span>
          {i < STEPS.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
}
