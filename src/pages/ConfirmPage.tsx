import { useState } from 'react';
import { useFilesContext } from '@/contexts/FilesHooks';
import SuccessPage from './SuccessPage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import DataDisplayer from '@/components/DataDisplayer';
import FileInfo from '@/components/FileInfo';
import Button from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { backStep } from '@/redux/formStepsSlice';

const ConfirmPage = () => {
  const dispatch = useAppDispatch();
  const { basicInfo } = useAppSelector((state) => state);
  const { idFront, idBack, additionalDocs } = useFilesContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };
  if (isSuccess) return <SuccessPage />;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <h1 className="mb-6 text-2xl font-bold">Confirmation</h1>

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div className="rounded-lg border border-gray-200 p-5">
          <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{basicInfo.name || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{basicInfo.email || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{basicInfo.phone || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nationality</p>
              <p className="font-medium">{basicInfo.nationality || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{basicInfo.gender || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth (YYYY-MM-DD)</p>
              <p className="font-medium">{basicInfo.birthDate || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{basicInfo.address || '-'}</p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="rounded-lg border border-gray-200 p-5">
          <h2 className="mb-4 text-lg font-semibold">Uploaded Documents</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">ID Card Front</p>
              {idFront ? (
                <FileInfo className="rounded-md border border-gray-200 p-2" file={idFront} />
              ) : (
                <p className="text-sm text-red-500">No file uploaded</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">ID Card Back</p>
              {idBack ? (
                <FileInfo className="rounded-md border border-gray-200 p-2" file={idBack} />
              ) : (
                <p className="text-sm text-red-500">No file uploaded</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Additional Documents</p>
              {additionalDocs && additionalDocs.length > 0 ? (
                <div className="mt-1 space-y-2">
                  {additionalDocs.map((file, index) => (
                    <FileInfo key={index} className="rounded-md border border-gray-200 p-2" file={file} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No additional documents uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between py-2">
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
