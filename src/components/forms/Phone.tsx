import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const Phone = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue('phone', event.target.value);

  return (
    <>
      <input placeholder="phone" {...register('phone')} onChange={changeHandler} />
    </>
  );
};

export default memo(Phone);
