import { memo } from 'react';
import { useController } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

// https://react-hook-form.com/advanced-usage#FormProviderPerformance
const BirthDate = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'birthDate' });

  return (
    <>
      <input
        {...field}
        placeholder="birthDate"
        // onChange={changeHandler}
      />
    </>
  );
};

export default memo(BirthDate, (prevProps, nextProps) => prevProps.field.value === nextProps.field.value);
