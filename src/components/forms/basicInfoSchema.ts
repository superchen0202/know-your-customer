import { z, object, string, infer as infer_ } from 'zod';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH, MAX_PHONE_LENGTH, MAX_ADDRESS_LENGTH } from '@/constants/constants';
import { createRequiredErrorMessage, createMaxLengthErrorMessage } from '@/utils/validation/validate';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { isLegalNation } from '@/utils/inferPossibleNationAsDefault';
import { PartialCountryCode } from '@/constants/nationality';
import { defaultNation } from '@/utils/inferPossibleNationAsDefault';

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
  // ISO 3166 alpha-2, 'AU',
  nationality: string()
    .trim()
    .nonempty(createRequiredErrorMessage('Nationality'))
    .refine((val) => isLegalNation(val as PartialCountryCode), {
      message: 'Invalid Nation Code!',
    }),
  gender: string().optional(),
  address: string()
    .trim()
    .max(MAX_ADDRESS_LENGTH, createMaxLengthErrorMessage('Address', MAX_ADDRESS_LENGTH))
    .optional(),
  // birthDate: string(), // (DatePicker, required, must verify age between 18-85 years)
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
  nationality: defaultNation,
  gender: '',
  address: '',
  // birthDate: '',
} satisfies BasicInfoSchema;
