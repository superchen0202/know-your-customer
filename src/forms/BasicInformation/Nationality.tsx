import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import Select from '../../components/ui/Select';
import { nationOptions } from '@/constants/nation';
import FormControl from '@/components/ui/FormControl';
import ErrorMessage from '@/components/ErrorMessage';

const Nationality = () => {
  const {
    field,
    fieldState: { error },
  } = useController<BasicInfo>({ name: 'nationality' });

  return (
    <FormControl isRequired title={'Nationality'} htmlFor={field.name}>
      <Select options={nationOptions} {...field} placeholder="Please select your nationality" />
      <ErrorMessage error={error?.message} />
    </FormControl>
  );
};

export default Nationality;
