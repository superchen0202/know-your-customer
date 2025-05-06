import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type UploadDocuments } from './schema';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import FormContainer from '@/shared/components/FormContainer';
import UploadDocsFields from './Fields';
import Button from '@/components/ui/Button';
// import { updateBasicInfoForm } from '@/redux/basicInfoSlice';
// import { nextStep } from '@/redux/formStepsSlice';
import { ArrowRight, Save } from 'lucide-react';

// https://react-hook-form.com/advanced-usage#WizardFormFunnel
const BasicInformation = () => {
  // const defaultValues = useAppSelector((state) => state.basicInfo);
  const dispatch = useAppDispatch();

  const formMethods = useForm<UploadDocuments>({
    // defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const { handleSubmit } = formMethods;
  const submitHandler = (formData: UploadDocuments) => {
    // dispatch(updateBasicInfoForm(formData));
    // dispatch(nextStep());
    console.log(formData);
  };

  return (
    <>
      <FormContainer>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(submitHandler)}>
            {Object.entries(UploadDocsFields).map(([fieldName, UploadDocsField]) => (
              <UploadDocsField key={fieldName} />
            ))}

            <Button type="submit" startIcon={<Save />} endIcon={<ArrowRight />}>
              Next
            </Button>
          </form>
        </FormProvider>
      </FormContainer>
    </>
  );
};

export default BasicInformation;
