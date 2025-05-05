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
