import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type BasicInfo } from './schema';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import BasicInfoFields from './Fields';
import Button from '@/components/ui/Button';
import { updateBasicInfoForm } from '@/redux/basicInfoSlice';
import { nextStep } from '@/redux/formStepsSlice';
import { ArrowRight } from 'lucide-react';

// https://react-hook-form.com/advanced-usage#WizardFormFunnel
const BasicInformation = () => {
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
    console.log(formData);
    dispatch(updateBasicInfoForm(formData));
    dispatch(nextStep());
  };

  return (
    <div className="mx-auto w-3xl px-4">
      <h1 className="my-4 text-2xl font-bold">Basic Information</h1>

      <FormProvider {...formMethods}>
        <form noValidate onSubmit={handleSubmit(submitHandler)}>
          <Name />
          <Email />
          <Phone />
          <Nationality />
          <Gender />
          <Address />
          <BirthDate />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" endIcon={<ArrowRight />}>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default BasicInformation;
