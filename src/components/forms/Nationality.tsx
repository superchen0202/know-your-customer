import { useController } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';
import { nationalityOptions } from '@/constants/nationality';
import Select from '../ui/Select';

const Nationality = () => {
  const { field } = useController<BasicInfoSchema>({ name: 'nationality' });

  return (
    <>
      <Select options={nationalityOptions} {...field} />
    </>
  );
};

export default Nationality;
