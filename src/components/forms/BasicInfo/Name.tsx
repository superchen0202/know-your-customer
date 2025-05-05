import { useController } from 'react-hook-form';
import { type BasicInfoSchema } from '@/components/forms/BasicInfo/schema';
import Input from '../../ui/Input';
import { MAX_NAME_LENGTH } from '@/constants/fieldLengthLimitation';

// https://react-hook-form.com/advanced-usage#FormProviderPerformance
const Name = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'name' });

  return (
    <>
      <Input
        required
        id={field.name}
        {...field}
        type="text"
        inputMode="text"
        autoComplete="name"
        placeholder="Your name"
        maxLength={MAX_NAME_LENGTH}
        error={fieldState.error?.message}
      />
    </>
  );
};

export default Name;
