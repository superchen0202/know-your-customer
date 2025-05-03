import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const Name = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue('name', event.target.value);

  return (
    <>
      <input placeholder="name" {...register('name')} onChange={changeHandler} />
    </>
  );
};

export default memo(Name);
