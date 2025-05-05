import { useController, useFormContext } from 'react-hook-form';
import { type BasicInfo } from '@/components/forms/BasicInfo/schema';
import Input from '../../ui/Input';
import { MAX_PHONE_LENGTH } from '@/constants/fieldLengthLimitation';
import { type CountryCode, getExampleNumber, formatNumber, formatIncompletePhoneNumber } from 'libphonenumber-js';
import examples from 'libphonenumber-js/mobile/examples';

const Phone = () => {
  const { field, fieldState } = useController<BasicInfo>({ name: 'phone' });
  const { getValues } = useFormContext<BasicInfo>();

  const nationality = getValues('nationality') as CountryCode;
  const exampleNumber = getExampleNumber(nationality, examples);
  const placeholder = exampleNumber ? `ex: ${formatNumber(exampleNumber.number, 'NATIONAL')}` : 'Phone Number';

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedPhone = event.target.value;

    //.format('E.164'); for BE
    const formattedPhone = formatIncompletePhoneNumber(unformattedPhone, nationality);
    //const phone = parsePhoneNumberFromString(formattedPhone, nationality);

    field.onChange(formattedPhone);
  };

  return (
    <>
      <Input
        required
        id={field.name}
        {...field}
        onChange={changeHandler}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        spellCheck="false"
        placeholder={placeholder}
        maxLength={MAX_PHONE_LENGTH}
        error={fieldState.error?.message}
      />
    </>
  );
};

export default Phone;
