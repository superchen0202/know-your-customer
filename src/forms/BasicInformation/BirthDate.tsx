import { useController } from 'react-hook-form';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import DatePicker from '@/components/ui/DatePicker';
import { today } from '@/constants/dates';
import { parseStringToDateSafely } from '@/utils/converter';
import ErrorMessage from '@/components/ErrorMessage';
import FormControl from '@/components/ui/FormControl';

const BirthDate = () => {
  const {
    field,
    fieldState: { error },
  } = useController<BasicInfo>({ name: 'birthDate' });

  const parsedDate = parseStringToDateSafely(field.value);

  return (
    <FormControl isRequired title={'Birth Date'} htmlFor={field.name}>
      <DatePicker maxDate={today} onChange={field.onChange} value={parsedDate} />
      <ErrorMessage error={error?.message} />
    </FormControl>
  );
};

export default BirthDate;
