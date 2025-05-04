import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';
import { useController } from 'react-hook-form';
import { genderOptions } from '@/constants/gender';
import Select from '../ui/Select';

const Gender = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'gender' });
  // console.log(fieldState.error?.message);

  return (
    <>
      <Select options={genderOptions} {...field} placeholder="Please select your gender" />
    </>
  );
};

export default Gender;
