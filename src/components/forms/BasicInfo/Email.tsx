import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/components/forms/BasicInfo/schema';
import Input from '../../ui/Input';
import { MAX_EMAIL_LENGTH } from '@/constants/fieldLengthLimitation';

const Email = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'email' });

  return (
    <>
      <Input
        required
        id={field.name}
        {...field}
        type="email"
        inputMode="email"
        autoComplete="email"
        spellCheck="false"
        placeholder="you@example.com"
        maxLength={MAX_EMAIL_LENGTH}
        error={fieldState.error?.message}
      />
    </>
  );
};

export default Email;
