import { createEnumOptions, defineEnumMap } from '@/utils/converter';

export const genderMap = {
  male: 'Male',
  female: 'Female',
  prefer_not_to_say: 'Prefer Not To Say',
} as const;

export type GenderOption = keyof typeof genderMap;
export const genderEnum = ['male', 'female', 'prefer_not_to_say'] as [GenderOption, ...GenderOption[]];

// TODO  remove and design
export const genderLabelMap = defineEnumMap<GenderOption>({
  male: { label: 'Male' },
  female: { label: 'Female' },
  prefer_not_to_say: { label: 'Prefer not to say' },
});

export const genderOptions = createEnumOptions(genderEnum, genderLabelMap);
