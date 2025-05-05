import { useController } from 'react-hook-form';
import { type BasicInfoSchema } from '@/components/forms/BasicInfo/schema';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { today } from '@/constants/dates';
import { parseStringToDateSafely } from '@/utils/timeParsingHelper';
import ErrorMessage from '@/shared/components/ErrorMessage';

const BirthDate = () => {
  const {
    field,
    fieldState: { error },
  } = useController<BasicInfoSchema>({ name: 'birthDate' });

  const parsedDate = parseStringToDateSafely(field.value);

  return (
    <>
      <DatePicker maxDate={today} onChange={field.onChange} value={parsedDate} />
      {error && <ErrorMessage error={error.message} />}
    </>
  );
};

export default BirthDate;
