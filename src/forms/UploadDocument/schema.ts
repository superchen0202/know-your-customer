import { object, instanceof as instanceof_, array, literal, infer as infer_, union } from 'zod';
// import { convertMegaBytesToBytes, formatFileSizeAsMB } from '@/utils/converter';
// import { ACCEPTED_FORMATS, MAX_ID_FILE_MB, MULTI_FILES_MAX_MB } from '@/constants/validation';
// import { checkInvalidFormatFileNumbers, checkOverSizedFileNumbers } from '@/utils/validation';
// import { buildAcceptAttribute } from '@/utils/converter';

// const acceptAttributes = buildAcceptAttribute(ACCEPTED_FORMATS);
// const maxBytes = convertMegaBytesToBytes(MAX_ID_FILE_MB);

const requiredSingleFile = (fieldName: string) =>
  union([instanceof_(File), literal(null)]).refine((file): file is File => file instanceof File && file.size > 0, {
    message: `Please upload ${fieldName}!`,
  });
// .refine((file) => checkInvalidFormatFileNumbers([file], acceptAttributes), {
//   message: 'Invalid format: ID card must be jpg, png, or pdf!',
// })
// .refine((file) => checkOverSizedFileNumbers([file], maxBytes) === 0, {
//   message: `ID card exceeds ${MAX_ID_FILE_MB} MB size limit!`,
// });

export const schema = object({
  idFront: requiredSingleFile('front of your ID card'),
  idBack: requiredSingleFile('back of your ID card'),
  additionalDocs: array(
    instanceof_(File),
    // .refine((files) => checkInvalidFormatFileNumbers([files], buildAcceptAttribute(ACCEPTED_FORMATS)) === 0, {
    //   message: 'One or more additional documents have invalid format.',
    // })
    // .refine((files) => checkOverSizedFileNumbers([files], convertMegaBytesToBytes(MULTI_FILES_MAX_MB)) === 0, {
    //   message: `Each additional document must not exceed ${MULTI_FILES_MAX_MB} MB.`,
    // }),
  ),
});

export type UploadDocs = infer_<typeof schema>;
