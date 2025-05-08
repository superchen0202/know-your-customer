import { BaseMeta } from '@/types/utilityTypes';
import { today } from '@/constants/dates';
import { format, parse, isValid } from 'date-fns';
import { DATE_FORMAT } from '@/constants/dates';

// Mon May 05 2025 00:00:00 GMT+0800 -> '2025-05-05'
export const formatDate = (date: Date) => format(date, DATE_FORMAT);

// '2025-05-05' ->  Mon May 05 2025 00:00:00 GMT+0800
export const parseStringToDateSafely = (dateString: string | undefined) => {
  if (!dateString) return null;
  const parsedDate = parse(dateString, DATE_FORMAT, today); //parseISO(dateString);
  return isValid(parsedDate) ? parsedDate : null;
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
