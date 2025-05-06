import { useAppSelector } from '@/redux/hooks';
import BasicInformation from './components/forms/BasicInformation';
import UploadPage from './components/UploadPage';
import ConfirmPage from './components/ConfirmPage';
import ButtonDemo from './components/DemoButton';

const App = () => {
  const { steps, currentStepIndex } = useAppSelector((state) => state.formSteps);
  const currentStep = steps[currentStepIndex];

  // return <ButtonDemo />;
  if (currentStep === 'basicInfo') return <BasicInformation />;
  if (currentStep === 'uploadFiles') return <UploadPage />;
  if (currentStep === 'confirm') return <ConfirmPage />;

  return <></>;
};

export default App;
