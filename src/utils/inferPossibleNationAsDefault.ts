import { PartialCountryCode } from '@/constants/nationality';
import { nationalitiesEnum } from '@/constants/nationality';

export const isLegalNation = (candidateNation: string) =>
  nationalitiesEnum.includes(candidateNation as PartialCountryCode);

export const inferPossibleNationAsDefault = () => {
  const fallback: PartialCountryCode = 'AU';
  // 'en-US', 'zh-TW', 'zh-Hant-HK' -> 'US', 'TW', 'HK
  const language = navigator.language || navigator.languages[0];
  const region = language.split('-').at(-1)?.toUpperCase();
  return isLegalNation(region as PartialCountryCode) ? (region as PartialCountryCode) : fallback;
};

export const defaultNation = inferPossibleNationAsDefault();
