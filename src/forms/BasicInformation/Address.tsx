import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Input from '../../components/ui/Input';
import { MAX_ADDRESS_LENGTH } from '@/constants/fieldLengthLimitation';
import FormControl from '@/components/ui/FormControl';

const Address = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'address' });

  return (
    <FormControl title={'Address'} htmlFor={field.name}>
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
    </FormControl>
  );
};

export default Address;
