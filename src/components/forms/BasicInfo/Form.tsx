import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type BasicInfo } from './schema';
import BasicInformationFields from './Fields';
import FormContainer from '@/components/FormContainer';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { updateBasicInfoForm } from '@/redux/basicInfoSlice';
import Button from '@/components/ui/Button';
import { nextStep } from '@/redux/formStepsSlice';

// https://react-hook-form.com/advanced-usage#WizardFormFunnel
const BasicInformation = () => {
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
    <FormContainer>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          {Object.entries(BasicInformationFields).map(([fieldName, BasicInfoField]) => (
            <BasicInfoField key={fieldName} />
          ))}
          <Button type="submit" btnText="Next" />
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default BasicInformation;
