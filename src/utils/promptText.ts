export const createRequiredErrorMsg = (fieldName: string) => `${fieldName} Is Required!`;
export const createOverLengthErrorMsg = (fieldName: string, maxLength: number) =>
  `${fieldName} Cannot Exceed ${maxLength} Characters!`;
export const createInvalidValueErrorMsg = (fieldName: string) => `Invalid ${fieldName} Value!`;

export const descriptionOfUpload = (fieldName: string, maxSize: number) =>
  `Upload the ${fieldName} side of your ID card (jpg, png, pdf formats, ${maxSize} MB size limit)`;
