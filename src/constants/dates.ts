import { MAX_AGE } from './validation';

export const today = new Date();
export const currentMonth = today.getMonth();
export const currentYear = today.getFullYear();
export const yearsList = Array.from({ length: MAX_AGE + 1 }, (_, i) => currentYear - MAX_AGE + i);

export const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
