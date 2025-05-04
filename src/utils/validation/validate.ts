export const add = (summand: number, addend: number) => summand + addend;

export const createRequiredErrorMessage = (fieldName: string) => `${fieldName} is required!`;

export const createMaxLengthErrorMessage = (fieldName: string, maxLength: number) =>
  `${fieldName} cannot exceed ${maxLength} characters!`;
