import { createEnumOptions, defineEnumMap } from '@/utils/createEnumOptions';
import { CountryCode } from 'libphonenumber-js';

export const nationalityMap = {
  AU: 'Australia',
  US: 'United States',
  GB: 'United Kingdom',
  TW: 'Taiwan',
  IN: 'India',
  CA: 'Canada',
  CN: 'China',
  DE: 'Germany',
  SG: 'Singapore',
  BR: 'Brazil',
} as const;

export type PartialCountryCode = Extract<CountryCode, keyof typeof nationalityMap>;
export type CountryName = (typeof nationalityMap)[PartialCountryCode];

export const nationalitiesEnum = Object.keys(nationalityMap) as [PartialCountryCode, ...PartialCountryCode[]];

export const nationalitiesLabelMap = defineEnumMap<PartialCountryCode, { label: CountryName }>({
  AU: { label: 'Australia' },
  US: { label: 'United States' },
  GB: { label: 'United Kingdom' },
  TW: { label: 'Taiwan' },
  IN: { label: 'India' },
  CA: { label: 'Canada' },
  CN: { label: 'China' },
  DE: { label: 'Germany' },
  SG: { label: 'Singapore' },
  BR: { label: 'Brazil' },
});

export const nationalityOptions = createEnumOptions(nationalitiesEnum, nationalitiesLabelMap);
