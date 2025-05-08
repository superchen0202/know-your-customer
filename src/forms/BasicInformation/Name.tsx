import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Input from '../../components/ui/Input';
import { MAX_NAME_LENGTH } from '@/constants/validation';
import Label from '@/components/ui/Label';
import FormControl from '@/components/ui/FormControl';

// https://react-hook-form.com/advanced-usage#FormProviderPerformance
const Name = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'name' });

  return (
    <FormControl isRequired title={'Name'} htmlFor={field.name}>
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
    </FormControl>
  );
};

export default Name;
