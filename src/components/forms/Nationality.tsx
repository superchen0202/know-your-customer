import { useController } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';
import { nationalityOptions } from '@/constants/nationality';
import Select from '../ui/Select';

const Nationality = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'nationality' });
  // console.log(fieldState.error?.message);

  return (
    <>
      <Select options={nationalityOptions} {...field} placeholder="Please select your nationality" />
    </>
  );
};

export default Nationality;
