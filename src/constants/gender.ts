import { createEnumOptions, defineEnumMap } from '@/utils/enumToOptionsFactory';

export type Gender = 'male' | 'female' | 'prefer_not_to_say';
export const genderEnum = ['male', 'female', 'prefer_not_to_say'] as [Gender, ...Gender[]];

export const genderLabelMap = defineEnumMap<Gender>({
  male: { label: 'Male' },
  female: { label: 'Female' },
  prefer_not_to_say: { label: 'Prefer not to say' },
});

export const genderOptions = createEnumOptions(genderEnum, genderLabelMap);
