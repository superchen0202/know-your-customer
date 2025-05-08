import { useAppSelector } from '@/redux/hooks';
import BasicInformation from './forms/BasicInformation';
import ConfirmPage from './pages/ConfirmPage';
import { FilesProvider } from './contexts/FilesContext';
import StepIndicator from './components/ui/StepIndicator';
import SuccessPage from './pages/SuccessPage';
import UploadDocument from './forms/UploadDocument';

const App = () => {
  const { steps, currentStepIndex } = useAppSelector((state) => state.formSteps);
  const currentStep = steps[currentStepIndex];

  return (
    <>
      {currentStep !== 'done' && <StepIndicator steps={['', '', '']} currentStep={currentStepIndex} />}
      <FilesProvider>
        {currentStep === 'basicInfo' && <BasicInformation />}
        {currentStep === 'uploadFiles' && <UploadDocument />}
        {currentStep === 'confirm' && <ConfirmPage />}
      </FilesProvider>
      {currentStep === 'done' && <SuccessPage />}
    </>
  );
};

export default App;
