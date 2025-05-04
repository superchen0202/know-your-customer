import { object, string, z } from 'zod';
import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH } from '@/constants/constants';
import { createMaxLengthErrorMessage } from '@/utils/validation/validate';
import { genderEnum } from '@/constants/gender';
// import { nationalitiesEnum } from '@/constants/nationality';

/*
• Name (Input, required)
• Email (Input, required, must follow email format)
• Phone (Input, required, must follow phone format)
• Nationality (Select, required, provide common country options)
• Gender (Select, optional, options include "Male", "Female", and "Prefer not to say")
• Address (Input, optional)
• Date of Birth (DatePicker, required, must verify age between 18-85 years)
// */

export const schema = object({
  name: string()
    .trim()
    .nonempty('Name is required!')
    .max(MAX_NAME_LENGTH, createMaxLengthErrorMessage('Name', MAX_NAME_LENGTH)),
  email: string()
    .trim()
    .nonempty('Email is required')
    .email('Invalid email format!')
    .max(MAX_NAME_LENGTH, createMaxLengthErrorMessage('Email', MAX_EMAIL_LENGTH)),
  // phone: string().nonempty('Phone is required'),
  nationality: string().optional(),
  gender: string().optional(),
  // address: string().optional(),
  // birthDate: string(),
});

export type BasicInfoSchema = z.infer<typeof schema>;

export const defaultValues = {
  name: '',
  email: '',
  // phone: '',
  // nationality: undefined,
  gender: undefined,
  // address: '',
  // birthDate: '',
} satisfies BasicInfoSchema;
