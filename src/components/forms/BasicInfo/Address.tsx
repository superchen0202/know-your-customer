import { useController } from 'react-hook-form';
import { type BasicInfoSchema } from '@/components/forms/BasicInfo/schema';
import Input from '../../ui/Input';
import { MAX_ADDRESS_LENGTH } from '@/constants/fieldLengthLimitation';

const Address = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'address' });

  return (
    <>
      <Input
        required
        id={field.name}
        {...field}
        type="text"
        inputMode="text"
        autoComplete="address-line1"
        placeholder="Your address"
        maxLength={MAX_ADDRESS_LENGTH}
        error={fieldState.error?.message}
      />
    </>
  );
};

export default Address;
