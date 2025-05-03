import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, BasicInfoSchema, defaultValues } from './basicInfoSchema';
import DataDisplayer from '@/shared/components/DataDisplayer';
import Name from './Name';
import Email from './Email';
import Phone from './Phone';
import Address from './Address';
import Nationality from './Nationality';
import Gender from './Gender';
import BirthDate from './BirthDate';

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
          <div className="flex flex-col gap-2">
            <Name />
            <Email />
            <Phone />
            <Nationality />
            <Gender />
            <Address />
            <BirthDate />
          </div>
          <input type="submit" />
        </form>
      </FormProvider>
    </>
  );
};

export default BasicInfo;
