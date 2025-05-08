import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type UploadDocs } from './schema';
import { useAppDispatch } from '@/redux/hooks';
import UploadDocsFields from './Fields';
import Button from '@/components/ui/Button';
import { backStep, nextStep } from '@/redux/formStepsSlice';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useFilesContext, useFilesDispatch } from '@/contexts/FilesHooks';
import DataDisplayer from '@/components/DataDisplayer';

const { IDFront, IDBack, AdditionalDocs } = UploadDocsFields;

const UploadDocuments = () => {
  const defaultValues = useFilesContext();
  const dispatchFiles = useFilesDispatch();
  const dispatch = useAppDispatch();

  const formMethods = useForm<UploadDocs>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const { handleSubmit } = formMethods;
  const submitHandler = (formData: UploadDocs) => {
    console.log(formData);
    dispatchFiles({ type: 'update', payload: formData });
    dispatch(nextStep());
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-4">
      <div className="mx-auto max-w-3xl px-4 py-4">
        <h1 className="mb-3 text-2xl font-bold">Document Upload</h1>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="space-y-3">
              <IDFront />
              <IDBack />
              <AdditionalDocs />
            </div>
            <div className="flex justify-between py-2">
              <Button type="button" startIcon={<ArrowLeft />} variant="secondary" onClick={() => dispatch(backStep())}>
                Back
              </Button>
              <Button type="submit" variant="primary" endIcon={<ArrowRight />}>
                Next
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UploadDocuments;
