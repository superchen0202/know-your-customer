import { createEnumOptions, defineEnumMap } from '@/utils/createEnumOptions';

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

export type CountryCode = keyof typeof nationalityMap;
export type CountryName = (typeof nationalityMap)[CountryCode];

// export const nationalitiesEnum = ['AU', 'US', 'GB', 'TW', 'IN', 'CA', 'CN', 'DE', 'SG', 'BR'] as const;
export const nationalitiesEnum = Object.keys(nationalityMap) as [CountryCode, ...CountryCode[]];

export const nationalitiesLabelMap = defineEnumMap<CountryCode, { label: CountryName }>({
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
