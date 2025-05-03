import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const Address = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue('address', event.target.value);

  return (
    <>
      <input placeholder="address" {...register('address')} onChange={changeHandler} />
    </>
  );
};

export default memo(Address);
