import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/components/forms/BasicInfo/schema';
import Select from '../../ui/Select';
import { nationOptions } from '@/constants/nation';

const Nationality = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'nationality' });
  // console.log(fieldState.error?.message);

  return (
    <>
      <Select options={nationOptions} {...field} placeholder="Please select your nationality" />
    </>
  );
};

export default Nationality;
