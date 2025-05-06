import { object, custom, array, infer as infer_ } from 'zod';
import { createRequiredErrorMsg } from '@/utils/promptText';
// 1  ID Card Front：required, supports jpg, png, pdf formats, 5MB size limit)
// 2. ID Card Back：required, supports jpg, png, pdf formats, 5MB size limit)
// 3. Additional Documents (optional, supports multiple file uploads, jpg, png, pdf formats, 10MB size limit)
// • Each upload section must display uploaded file names and provide delete functionality

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
export const schema = object({
  idFront: custom<File>()
    .refine((file) => !!file, { message: createRequiredErrorMsg('ID Card Front') })
    .refine((file) => ACCEPTED_TYPES.includes(file.type), { message: 'Supported formats: JPG, PNG, PDF' })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File must be under 5MB' }),
  /*
  idBack: custom<File>()
    .refine((file) => !!file, { message: createRequiredErrorMsg('ID Card Back') })
    .refine((file) => ACCEPTED_TYPES.includes(file.type), { message: 'Supported formats: JPG, PNG, PDF' })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File must be under 5MB' }),
  // */
  /*
  additionalDocs: array(
    custom<File>()
      .refine((file) => ACCEPTED_TYPES.includes(file.type), {
        message: 'Supported formats: JPG, PNG, PDF',
      })
      .refine((file) => file.size <= 10 * 1024 * 1024, {
        message: 'Each file must be under 10MB',
      }),
  ).optional(),
  // */
});

export type UploadDocuments = infer_<typeof schema>;
