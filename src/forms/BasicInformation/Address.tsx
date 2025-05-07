import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Input from '../../components/Input';
import { MAX_ADDRESS_LENGTH } from '@/constants/fieldLengthLimitation';

const Address = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'address' });

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
