import { useController } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';
import Input from '../ui/Input';
import { MAX_NAME_LENGTH } from '@/constants/constants';

// https://react-hook-form.com/advanced-usage#FormProviderPerformance
const Name = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'name' });

  return (
    <>
      <Input
        maxLength={MAX_NAME_LENGTH}
        {...field}
        type="text"
        error={fieldState.error?.message}
        placeholder="your name"
      />
    </>
  );
};

export default Name;
