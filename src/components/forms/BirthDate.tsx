import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const BirthDate = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => setValue('birthDate', event.target.value);

  return (
    <>
      <input placeholder="birthDate" {...register('birthDate')} onChange={changeHandler} />
    </>
  );
};

export default memo(BirthDate);
