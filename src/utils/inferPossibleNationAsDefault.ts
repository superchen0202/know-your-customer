import { PartialCountryCode } from '@/constants/nation';
import { isLegalNationOptions } from './validation';

const inferPossibleNationAsDefault = () => {
  const fallback: PartialCountryCode = 'AU';
  // 'en-US', 'zh-TW', 'zh-Hant-HK' -> 'US', 'TW', 'HK
  const language = navigator.language || navigator.languages[0];
  const region = language.split('-').at(-1)?.toUpperCase();
  return isLegalNationOptions(region as PartialCountryCode) ? (region as PartialCountryCode) : fallback;
};

export const possibleDefaultNation = inferPossibleNationAsDefault();
