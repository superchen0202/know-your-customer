import { memo } from 'react';
import type { CountryOption } from '@/types/basicInfo';
import { useFormContext } from 'react-hook-form';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const nationalityOptions: CountryOption[] = [
  { code: 'AU', label: 'Australia' },
  { code: 'US', label: 'United States' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'TW', label: 'Taiwan' },
  { code: 'IN', label: 'India' },
  { code: 'CA', label: 'Canada' },
  { code: 'CN', label: 'China' },
  { code: 'DE', label: 'Germany' },
  { code: 'SG', label: 'Singapore' },
  { code: 'BR', label: 'Brazil' },
];

const Nationality = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();
  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setValue('nationality', event.target.value);

  return (
    <>
      <select id="nationality" title="nationality" {...register('nationality')} onChange={changeHandler}>
        {nationalityOptions.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default memo(Nationality);
