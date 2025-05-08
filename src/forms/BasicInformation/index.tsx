import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type BasicInfo } from './schema';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import BasicInfoFields from './Fields';
import Button from '@/components/ui/Button';
import { updateBasicInfoForm } from '@/redux/basicInfoSlice';
import { nextStep } from '@/redux/formStepsSlice';
import { ArrowRight, Save } from 'lucide-react';

// https://react-hook-form.com/advanced-usage#WizardFormFunnel
const BasicInformation = () => {
  // const { steps, currentStepIndex } = useAppSelector((state) => state.formSteps);
  const { Name, Email, Phone, Nationality, Gender, Address, BirthDate } = BasicInfoFields;

  const defaultValues = useAppSelector((state) => state.basicInfo);
  const dispatch = useAppDispatch();

  const formMethods = useForm<BasicInfo>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const { handleSubmit } = formMethods;
  const submitHandler = (formData: BasicInfo) => {
    dispatch(updateBasicInfoForm(formData));
    dispatch(nextStep());
    console.log(formData);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form className="mx-auto w-3xl px-4" noValidate onSubmit={handleSubmit(submitHandler)}>
          <Name />
          <Email />
          <Phone />
          <Nationality />
          <Gender />
          <Address />
          <BirthDate />
          <Button type="submit" variant="primary" startIcon={<Save />} endIcon={<ArrowRight />}>
            Next
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default BasicInformation;
