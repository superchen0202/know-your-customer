import { ReactNode } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { nextStep, backStep } from '@/redux/formStepsSlice';
import Button from './ui/Button';

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
        {currentStep !== 'basicInfo' && <Button btnText="Back" onClick={() => dispatch(backStep())} />}
        {currentStep === 'uploadFiles' && <Button btnText="Next" onClick={() => dispatch(nextStep())} />}
      </>
    </>
  );
};

export default FormContainer;
