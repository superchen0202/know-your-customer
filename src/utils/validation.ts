import { today } from '@/constants/dates';
import { parseStringToDateSafely } from './timeParsingHelper';
import { nationsEnum, PartialCountryCode } from '@/constants/nation';
import { genderEnum, type Gender } from '@/constants/gender';
import { differenceInYears, parseISO } from 'date-fns';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export const add = (summand: number, addend: number) => summand + addend;

export const isPhoneValid = (phone: string, nationality: CountryCode) => {
  const phoneNumber = parsePhoneNumberFromString(phone, nationality);
  return phoneNumber?.isValid();
};

export const isGenderOptionsValid = (genderOption: string) => genderEnum.includes(genderOption as Gender);

export const isNationOptionsValid = (nationOption: string) => nationsEnum.includes(nationOption as PartialCountryCode);

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
export const isDateMatchFormat = (date: string) => ISO_DATE_REGEX.test(date);

export const isDateValid = (date: string) => parseStringToDateSafely(date);

export const isAgeRangeValid = (date: string, lowerBound: number, upperBound: number) => {
  const birth = parseISO(date);
  const age = differenceInYears(today, birth);
  // console.log('age is from differenceInYears(today, parseISO(date))', age);
  return lowerBound <= age && age <= upperBound;
};
