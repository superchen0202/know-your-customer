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

type CountryCode = keyof typeof nationalityMap;
type CountryLabel = (typeof nationalityMap)[CountryCode];

export type CountryOption = {
  code: CountryCode;
  label: CountryLabel;
};

export type Gender = 'male' | 'female' | 'prefer_not_to_say';
