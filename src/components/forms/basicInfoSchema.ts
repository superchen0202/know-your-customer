import { object, string, z, nativeEnum } from 'zod';
import { CountryCode, Gender } from '@/types/basicInfo';
/*
• Name (Input, required)
• Email (Input, required, must follow email format)
• Phone (Input, required, must follow phone format)
• Nationality (Select, required, provide common country options)
• Gender (Select, optional, options include "Male", "Female", and "Prefer not to say")
• Address (Input, optional)
• Date of Birth (DatePicker, required, must verify age between 18-85 years)
• Form has a "Next" button at the bottom, clicking requires form validation
// */
export const schema = object({
  name: string().nonempty('Name is required'),
  email: string().email('Invalid email format').nonempty('Email is required'),
  phone: string().nonempty('Phone is required'),
  nationality: string(),
  gender: string().optional(),
  address: string().optional(),
  birthDate: string().refine(
    (date) => {
      const age = new Date().getFullYear() - new Date(date).getFullYear();
      return age >= 18 && age <= 85;
    },
    { message: 'Age must be between 18 and 85 years' },
  ),
});

export type BasicInfoSchema = z.infer<typeof schema>;

export const defaultValues: BasicInfoSchema = {
  name: '',
  email: '',
  phone: '',
  nationality: '',
  gender: '',
  address: '',
  birthDate: '',
};
