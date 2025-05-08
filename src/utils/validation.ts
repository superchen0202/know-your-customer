import { today } from '@/constants/dates';
import { parseStringToDateSafely } from './converter';
import { nationsEnum, PartialCountryCode } from '@/constants/nation';
import { genderEnum, type GenderOption } from '@/constants/gender';
import { differenceInYears, parseISO } from 'date-fns';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

export const add = (summand: number, addend: number) => summand + addend;

export const isPhoneValid = (phone: string, nationality: CountryCode) => {
  const phoneNumber = parsePhoneNumberFromString(phone, nationality);
  return phoneNumber?.isValid();
};

export const isGenderOptionsValid = (genderOption: string) => genderEnum.includes(genderOption as GenderOption);

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

export const checkInvalidFormatFileNumbers = (selectedFiles: File[], accept?: string) => {
  if (!accept) return 0;

  const acceptedTypes = accept.split(',');
  const invalidFiles = selectedFiles.filter((file) => {
    const fileExtension = `.${file.name.split('.').pop()}`;
    const fileType = file.type;
    return !acceptedTypes.some((type) =>
      type.startsWith('.') ? fileExtension.toLowerCase() === type.toLowerCase() : fileType === type,
    );
  });

  return invalidFiles.length;
};

export const checkOverSizedFileNumbers = (selectedFiles: File[], maxBytes?: number) => {
  if (maxBytes === undefined) return 0;
  const oversizedFiles = selectedFiles.filter((file) => file.size > maxBytes);
  return oversizedFiles.length;
};

export const pickDuplicatedFiles = (selectedFiles: File[], files: File[]) => {
  const existingNames = new Set((files ?? []).map((file) => file.name));
  const duplicatedFiles = selectedFiles.filter((file) => existingNames.has(file.name));
  return duplicatedFiles;
};
