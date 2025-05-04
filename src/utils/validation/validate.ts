export const add = (summand: number, addend: number) => summand + addend;

export const createMaxLengthErrorMessage = (fieldName: string, maxLength: number) =>
  `${fieldName} cannot exceed ${maxLength} characters!`;
