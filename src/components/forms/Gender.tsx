import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';
import { useController } from 'react-hook-form';
import { genderOptions } from '@/constants/gender';
import Select from '../ui/Select';

const Gender = () => {
  const { field } = useController<BasicInfoSchema>({ name: 'gender' });

  return (
    <>
      <Select options={genderOptions} {...field} />
    </>
  );
};

export default Gender;
