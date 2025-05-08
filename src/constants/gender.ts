import { createEnumOptions, defineEnumMap } from '@/utils/converter';

export type GenderOption = 'male' | 'female' | 'prefer_not_to_say';
export const genderEnum = ['male', 'female', 'prefer_not_to_say'] as [GenderOption, ...GenderOption[]];

export const genderLabelMap = defineEnumMap<GenderOption>({
  male: { label: 'Male' },
  female: { label: 'Female' },
  prefer_not_to_say: { label: 'Prefer not to say' },
});

export const genderOptions = createEnumOptions(genderEnum, genderLabelMap);
