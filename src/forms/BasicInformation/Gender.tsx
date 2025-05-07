import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Select from '../../components/ui/Select';
import { genderOptions } from '@/constants/gender';
import FormControl from '@/components/ui/FormControl';
import ErrorMessage from '@/components/ErrorMessage';

const Gender = () => {
  const {
    field,
    fieldState: { error },
  } = useController<BasicInfo>({ name: 'gender' });

  return (
    <FormControl isRequired title={'Gender'} htmlFor={field.name}>
      <Select options={genderOptions} {...field} placeholder="Please select your gender" />
      <ErrorMessage error={error?.message} />
    </FormControl>
  );
};

export default Gender;
