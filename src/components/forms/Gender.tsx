import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import type { Gender } from '../../types/basicInfo';
import type { BasicInfoSchema } from '@/components/forms/basicInfoSchema';

const labelMap: Record<Gender, string> = {
  male: 'Male',
  female: 'Female',
  prefer_not_to_say: 'Prefer not to say',
};

const Gender = () => {
  const { register, setValue } = useFormContext<BasicInfoSchema>();

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => setValue('gender', event.target.value);

  return (
    <>
      <select id="gender" title="gender" {...register('gender')} onChange={changeHandler}>
        {Object.entries(labelMap).map((gender) => {
          const [genderKey, genderLabel] = gender;
          return (
            <option key={genderKey} value={genderKey}>
              {genderLabel}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default memo(Gender);
