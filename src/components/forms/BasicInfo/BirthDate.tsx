import { useController } from 'react-hook-form';
import { type BasicInfoSchema } from '@/components/forms/BasicInfo/schema';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { today } from '@/constants/dates';
import { parseStringToDateSafely } from '@/utils/timeParsingTools';

const BirthDate = () => {
  const { field, fieldState } = useController<BasicInfoSchema>({ name: 'birthDate' });
  const parsedDate = parseStringToDateSafely(field.value);
  // console.log(parsedDate);

  return (
    <>
      <DatePicker onChange={field.onChange} maxDate={today} value={parsedDate} />
    </>
  );
};

export default BirthDate;
