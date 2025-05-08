import { Check } from 'lucide-react';

type StepIndicatorProps = {
  steps: string[]; //;readonly string[];
  currentStep: number;
  className?: string;
};

const StepIndicator = (props: StepIndicatorProps) => {
  const { steps, currentStep, className } = props;
  return (
    <div className={`flex w-full justify-center ${className || ''}`}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          // Determine step status
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          // Set colors based on status
          const dotColor = isCompleted
            ? 'bg-green-500 text-white' // completed
            : isActive
              ? 'bg-blue-500 text-white' // in-progress
              : 'bg-gray-200 text-gray-500'; // not-started

          // text color based on status
          const textColor = isCompleted ? 'text-green-500' : isActive ? 'text-blue-500' : 'text-gray-500';

          return (
            <div key={index} className="flex flex-col items-center">
              {/* Step label */}
              <div className={`mb-2 text-sm font-medium ${textColor}`}>{step}</div>

              {/* connecting line */}
              <div className="flex items-center">
                {/* dot with number */}
                <div
                  className={`h-6 w-6 rounded-full ${dotColor} flex items-center justify-center text-xs font-medium`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
                </div>

                {/* Connecting line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="mx-1 h-[1px] w-16 sm:w-24">
                    <div className={isCompleted ? 'h-full bg-green-500' : 'h-full bg-gray-300'} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
