import { object, instanceof as instanceof_, array, literal, infer as infer_, union } from 'zod';

// TODO add extra rules such as oversize, check files extension.
export const schema = object({
  idFront: union([instanceof_(File), literal(null)]).refine((file) => file instanceof File && file.size > 0, {
    message: 'Please upload front of your ID card!',
  }),
  idBack: union([instanceof_(File), literal(null)]).refine((file) => file instanceof File && file.size > 0, {
    message: 'Please upload back of your ID card!',
  }),
  additionalDocs: array(instanceof_(File)),
});

export type UploadDocs = infer_<typeof schema>;
