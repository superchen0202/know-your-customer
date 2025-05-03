import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const Email = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue('email', event.target.value);

  return (
    <>
      <input placeholder="email" {...register('email')} onChange={changeHandler} />
    </>
  );
};

export default memo(Email);
