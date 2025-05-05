import { useController } from 'react-hook-form';
import { type BasicInfoSchema } from '@/components/forms/BasicInfo/schema';
import Select from '../../ui/Select';
import { nationOptions } from '@/constants/nation';

const Nationality = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'nationality' });
  // console.log(fieldState.error?.message);

  return (
    <>
      <Select options={nationOptions} {...field} placeholder="Please select your nationality" />
    </>
  );
};

export default Nationality;
