import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Select from '../../components/Select';
import { genderOptions } from '@/constants/gender';

const Gender = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'gender' });
  // console.log(fieldState.error?.message);

  return (
    <>
      <Select options={genderOptions} {...field} placeholder="Please select your gender" />
    </>
  );
};

export default Gender;
