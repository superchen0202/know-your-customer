import { useAppSelector } from '@/redux/hooks';
import BasicInformation from './forms/BasicInformation';
import UploadPage from './forms/UploadPage';
import ConfirmPage from './pages/ConfirmPage';
import { FilesProvider } from './contexts/FilesContext';

const App = () => {
  const { steps, currentStepIndex } = useAppSelector((state) => state.formSteps);
  const currentStep = steps[currentStepIndex];

  return (
    <>
      <FilesProvider>
        {currentStep === 'basicInfo' && <BasicInformation />}
        {currentStep === 'uploadFiles' && <UploadPage />}
        {currentStep === 'confirm' && <ConfirmPage />}
      </FilesProvider>
    </>
  );
};

export default App;
