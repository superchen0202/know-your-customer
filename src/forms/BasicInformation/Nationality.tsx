import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Select from '../../components/Select';
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
