import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Input from '../../components/ui/Input';
import { MAX_EMAIL_LENGTH } from '@/constants/validation';
import FormControl from '@/components/ui/FormControl';

const Email = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'email' });

  return (
    <FormControl isRequired title={'Email'} htmlFor={field.name}>
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
    </FormControl>
  );
};

export default Email;
