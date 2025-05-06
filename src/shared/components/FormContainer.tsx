import { ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { nextStep, backStep } from '@/redux/formStepsSlice';
import Button from '../../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type FormContainerProps = {
  children: ReactNode;
};

const FormContainer = (props: FormContainerProps) => {
  const { children } = props;

  const { steps, currentStepIndex } = useAppSelector((state) => state.formSteps);
  const currentStep = steps[currentStepIndex];
  const dispatch = useAppDispatch();

  return (
    <>
      {children}
      <>
        <div className="mt-8 flex justify-between">
          {currentStep !== 'basicInfo' && (
            <Button startIcon={<ArrowLeft size={16} />} variant="secondary" onClick={() => dispatch(backStep())}>
              Back
            </Button>
          )}
          {currentStep === 'uploadFiles' && (
            <Button
              endIcon={<ArrowRight size={16} />}
              // disabled={!isValid}
              onClick={() => dispatch(nextStep())}
            >
              Next
            </Button>
          )}
        </div>
      </>
    </>
  );
};

export default FormContainer;
