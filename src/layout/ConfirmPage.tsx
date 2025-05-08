import { useState } from 'react';
import { useFilesContext } from '@/contexts/FilesHooks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { backStep, nextStep } from '@/redux/formStepsSlice';
import DisplayBasicInfo from './DisplayBasicInfo';
import DisplayUploadFiles from './DisplayUploadFiles';

const ConfirmPage = () => {
  const dispatch = useAppDispatch();
  const basicInfo = useAppSelector((state) => state.basicInfo);
  const uploadDocs = useFilesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    dispatch(nextStep());
  };

  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="my-4 text-2xl font-bold">Confirmation</h1>

      <div className="space-y-3">
        <DisplayBasicInfo {...basicInfo} />
        <DisplayUploadFiles {...uploadDocs} />
      </div>

      <div className="flex justify-between py-2">
        <Button startIcon={<ArrowLeft size={16} />} variant="secondary" onClick={() => dispatch(backStep())}>
          Back
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPage;
