import { CountryCode } from 'libphonenumber-js';
import { createEnumOptions, defineEnumMap } from '@/utils/converter';

export const nationMap = {
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

export type PartialCountryCode = Extract<CountryCode, keyof typeof nationMap>;
export type CountryName = (typeof nationMap)[PartialCountryCode];

export const nationsEnum = Object.keys(nationMap) as [PartialCountryCode, ...PartialCountryCode[]];

export const nationLabelMap = defineEnumMap<PartialCountryCode, { label: CountryName }>({
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

export const nationOptions = createEnumOptions(nationsEnum, nationLabelMap);
