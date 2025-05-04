import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, BasicInfoSchema, defaultValues } from './basicInfoSchema';
import DataDisplayer from '@/shared/components/DataDisplayer';
import BasicInfoField from './Field';

const BasicInfo = () => {
  const formMethods = useForm<BasicInfoSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { handleSubmit, watch } = formMethods;
  const formValue = watch();
  const submitHandler = (formData: BasicInfoSchema) => console.log(formData);

  return (
    <>
      <DataDisplayer debugData={formValue} />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          {Object.entries(BasicInfoField).map(([key, Component]) => (
            <Component key={key} />
          ))}
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default BasicInfo;
