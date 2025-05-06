import { object, string, infer as infer_ } from 'zod';
import { CountryCode } from 'libphonenumber-js';
import {
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_ADDRESS_LENGTH,
} from '@/constants/fieldLengthLimitation';
import { MAX_AGE, MIN_AGE } from '@/constants/dates';
import { GenderOption } from '@/constants/gender';
import { PartialCountryCode } from '@/constants/nation';
import {
  isPhoneValid,
  isNationOptionsValid,
  isGenderOptionsValid,
  isDateMatchFormat,
  isDateValid,
  isAgeRangeValid,
} from '@/utils/validation';

const createRequiredErrorMsg = (fieldName: string) => `${fieldName} Is Required!`;
const createOverLengthErrorMsg = (fieldName: string, maxLength: number) =>
  `${fieldName} Cannot Exceed ${maxLength} Characters!`;
const createInvalidValueErrorMsg = (fieldName: string) => `Invalid ${fieldName} Value!`;

export const schema = object({
  name: string()
    .trim()
    .nonempty(createRequiredErrorMsg('Name'))
    .max(MAX_NAME_LENGTH, createOverLengthErrorMsg('Name', MAX_NAME_LENGTH)),
  email: string()
    .trim()
    .nonempty(createRequiredErrorMsg('Email'))
    .email('Invalid email format!')
    .max(MAX_EMAIL_LENGTH, createOverLengthErrorMsg('Email', MAX_EMAIL_LENGTH)),
  phone: string()
    .trim()
    .nonempty(createRequiredErrorMsg('Phone'))
    .max(MAX_PHONE_LENGTH, createOverLengthErrorMsg('Phone', MAX_PHONE_LENGTH)),
  // 'AU', ISO 3166 alpha-2
  nationality: string()
    .trim()
    .nonempty(createRequiredErrorMsg('Nationality'))
    .refine((val) => isNationOptionsValid(val as PartialCountryCode), {
      message: createInvalidValueErrorMsg('Nation'),
    }),
  gender: string()
    .trim()
    .refine((val) => val === '' || isGenderOptionsValid(val as GenderOption), {
      message: 'Invalid gender',
    })
    .optional(),
  address: string().trim().max(MAX_ADDRESS_LENGTH, createOverLengthErrorMsg('Address', MAX_ADDRESS_LENGTH)).optional(),
  // 2025-05-05, ISO 8601, must verify age between 18-85 years
  birthDate: string()
    .trim()
    .nonempty(createRequiredErrorMsg('Date'))
    .refine((val) => isDateMatchFormat(val), {
      message: 'Date Must Be In YYYY-MM-DD Format!',
    })
    .refine((val) => isDateValid(val), {
      message: createInvalidValueErrorMsg('Date'),
    })
    .refine((val) => isAgeRangeValid(val, MIN_AGE, MAX_AGE), {
      message: `Age Must Be Between ${MIN_AGE} And ${MAX_AGE} Years Old!`,
    }),
}).refine(
  ({ phone, nationality }) => {
    try {
      return isPhoneValid(phone, nationality as CountryCode);
    } catch {
      return false;
    }
  },
  {
    path: ['phone'],
    message: 'Invalid phone number format',
  },
);

export type BasicInfo = infer_<typeof schema>;
