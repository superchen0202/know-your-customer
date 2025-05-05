import { object, string, infer as infer_ } from 'zod';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import {
  MAX_NAME_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_PHONE_LENGTH,
  MAX_ADDRESS_LENGTH,
} from '@/constants/fieldLengthLimitation';
import { today } from '@/constants/dates';
import { Gender } from '@/constants/gender';
import { PartialCountryCode } from '@/constants/nation';
import { possibleDefaultNation } from '@/utils/inferPossibleNationAsDefault';
import { isLegalNationOptions, isLegalGenderOptions } from '@/utils/validation';
import { formatDate } from '@/utils/timeParsingTools';

const createRequiredErrorMessage = (fieldName: string) => `${fieldName} is required!`;
const createMaxLengthErrorMessage = (fieldName: string, maxLength: number) =>
  `${fieldName} cannot exceed ${maxLength} characters!`;

export const schema = object({
  name: string()
    .trim()
    .nonempty(createRequiredErrorMessage('Name'))
    .max(MAX_NAME_LENGTH, createMaxLengthErrorMessage('Name', MAX_NAME_LENGTH)),
  email: string()
    .trim()
    .nonempty(createRequiredErrorMessage('Email'))
    .email('Invalid email format!')
    .max(MAX_EMAIL_LENGTH, createMaxLengthErrorMessage('Email', MAX_EMAIL_LENGTH)),
  phone: string()
    .trim()
    .nonempty(createRequiredErrorMessage('Phone'))
    .max(MAX_PHONE_LENGTH, createMaxLengthErrorMessage('Phone', MAX_PHONE_LENGTH)),
  // 'AU', ISO 3166 alpha-2
  nationality: string()
    .trim()
    .nonempty(createRequiredErrorMessage('Nationality'))
    .refine((val) => isLegalNationOptions(val as PartialCountryCode), {
      message: 'Invalid nation Code!',
    }),
  gender: string()
    .trim()
    .optional()
    .refine((val) => isLegalGenderOptions(val as Gender), {
      message: 'Invalid gender Option!',
    }),
  address: string()
    .trim()
    .max(MAX_ADDRESS_LENGTH, createMaxLengthErrorMessage('Address', MAX_ADDRESS_LENGTH))
    .optional(),
  // 2025-05-05, ISO 8601, must verify age between 18-85 years
  birthDate: string().trim().nonempty(createRequiredErrorMessage('Date')),
}).refine(
  (formContext) => {
    const { phone, nationality } = formContext;
    try {
      const phoneNumber = parsePhoneNumberFromString(phone, nationality as CountryCode);
      return phoneNumber?.isValid();
    } catch {
      return false;
    }
  },
  {
    path: ['phone'],
    message: 'Invalid phone number format',
  },
);

export type BasicInfoSchema = infer_<typeof schema>;

// for redux-toolkit later
export const defaultValues = {
  name: '',
  email: '',
  phone: '',
  nationality: possibleDefaultNation,
  gender: '',
  address: '',
  birthDate: formatDate(today), // formatDate(new Date('1981-15-31'))
} satisfies BasicInfoSchema;
