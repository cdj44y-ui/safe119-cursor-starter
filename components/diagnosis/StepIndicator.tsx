'use client';

import { STEPS } from '@/data/questions';
import { useDiagnosisStore } from '@/store/diagnosisStore';

export default function StepIndicator() {
  const { currentStep, goToStep, isStepComplete } = useDiagnosisStore();

  return (
    <div className="flex gap-1.5 flex-wrap">
      {STEPS.map((step) => {
        const isActive = step.step === currentStep;
        const isComplete = isStepComplete(step.step);

        return (
          <button
            key={step.step}
            onClick={() => goToStep(step.step)}
            title={step.name}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all cursor-pointer border ${
              isActive
                ? 'bg-copper text-white border-copper'
                : isComplete
                ? 'bg-semantic-green-bg text-semantic-green-text border-semantic-green-bg'
                : 'bg-white text-ink-4 border-sand-300 hover:border-sand-400'
            }`}
            aria-label={`STEP ${step.step}: ${step.name}`}
          >
            {step.step}
          </button>
        );
      })}
    </div>
  );
}
