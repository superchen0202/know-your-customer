import { BaseMeta } from '@/types/utilityTypes';
import { today } from '@/constants/dates';
import { DATE_FORMAT } from '@/constants/validation';
import { format, parse, isValid, differenceInYears, parseISO } from 'date-fns';

/**
 * @param date - Mon May 05 2025 00:00:00 GMT+0800.
 * @returns '2025-05-05'.
 */
export const formatDate = (date: Date) => format(date, DATE_FORMAT);

/**
 * @param date - '2025-05-05'.
 * @returns  Mon May 05 2025 00:00:00 GMT+0800.
 */
export const parseStringToDateSafely = (date: string | undefined) => {
  if (!date) return null;
  const parsedDate = parse(date, DATE_FORMAT, today); //parseISO(dateString);
  return isValid(parsedDate) ? parsedDate : null;
};

/**
 * @param date - '2025-05-05'.
 * @returns age.
 */
export const getAgeFromBirthDate = (date: string) => {
  const birth = parseISO(date);
  const age = differenceInYears(today, birth);
  return age;
};

// enumToOptions
export const defineEnumMap = <T extends string, V extends BaseMeta = BaseMeta>(mapDef: Record<T, V>): Record<T, V> =>
  mapDef;

export const createEnumOptions = <EnumString extends string[], V extends BaseMeta = BaseMeta>(
  enumList: EnumString,
  labelMap: Record<EnumString[number], V>,
): Array<{ value: EnumString[number] } & V> =>
  enumList.map((enumValue) => ({
    value: enumValue,
    ...labelMap[enumValue as EnumString[number]],
  }));

export const getFileTypeLabel = (fileType: File['type']) => {
  if (fileType.startsWith('image/')) return fileType.replace('image/', '').toUpperCase();
  if (fileType === 'application/pdf') return 'PDF';

  // Extract extension from filename if type is not recognized
  const extension = fileType.split('.').pop()?.toUpperCase() || 'UNKNOWN';
  return extension;
};

/**
 * .jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf'
 */
export const buildAcceptAttribute = (formatList: string[]) => formatList.join(',');

/**
 * Formats file size in bytes to a human-readable format
 */
export const formatFileSizeAsMB = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const convertMegaBytesToBytes = (mb: number) => mb * 1024 * 1024;
