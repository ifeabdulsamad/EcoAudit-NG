import { useAudit } from "../context/AuditContext.jsx";
import { calculateAudit } from "../engine/calculationEngine.js";
import { estimateSolar } from "../engine/solarEstimator.js";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../components/shared/StepIndicator.jsx";
import ProgressBar from "../components/shared/ProgressBar.jsx";
import BusinessProfileForm from "../components/form/BusinessProfileForm.jsx";
import EnergySetupForm from "../components/form/EnergySetupForm.jsx";
import SpendConfirmation from "../components/form/SpendConfirmation.jsx";

export default function Audit() {
  const { currentStep, setStep, auditData, setResults } = useAudit();
  const navigate = useNavigate();

  const handleNext = () => setStep(currentStep + 1);
  const handlePrev = () => setStep(currentStep - 1);

  const handleSubmit = () => {
    const results = calculateAudit(auditData);
    const solarData = estimateSolar(results);
    setResults({ ...results, solarData });
    navigate("/dashboard");
  };

  return (
    <div className="audit-page page">
      <div className="audit-container">
        <StepIndicator currentStep={currentStep} />
        <ProgressBar currentStep={currentStep} totalSteps={3} />

        <div className="form-step">
          {currentStep === 1 && <BusinessProfileForm onNext={handleNext} />}
          {currentStep === 2 && (
            <EnergySetupForm onNext={handleNext} onPrev={handlePrev} />
          )}
          {currentStep === 3 && <SpendConfirmation onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
}
