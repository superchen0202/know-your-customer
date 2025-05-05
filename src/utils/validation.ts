import { nationsEnum, PartialCountryCode } from '@/constants/nation';
import { genderEnum, type Gender } from '@/constants/gender';

export const add = (summand: number, addend: number) => summand + addend;

export const isLegalGenderOptions = (genderOption: string) => genderEnum.includes(genderOption as Gender);

export const isLegalNationOptions = (nationOption: string) => nationsEnum.includes(nationOption as PartialCountryCode);
