import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, BasicInfoSchema, defaultValues } from './schema';
import BasicInfoFields from './Fields';
import DataDisplayer from '@/shared/components/DataDisplayer';

const BasicInfo = () => {
  const formMethods = useForm<BasicInfoSchema>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onSubmit', //TODO mode: 'onSubmit',
  });

  const { handleSubmit, watch } = formMethods;
  const formValue = watch();
  const submitHandler = (formData: BasicInfoSchema) => console.log(formData);

  return (
    <>
      {/* TODO remove after development */}
      <DataDisplayer debugData={formValue} />
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitHandler)}>
          {Object.entries(BasicInfoFields).map(([fieldName, BasicInfoField]) => (
            <BasicInfoField key={fieldName} />
          ))}
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default BasicInfo;
