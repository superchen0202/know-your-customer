export const MIN_AGE = 18;
export const MAX_AGE = 85;
export const DATE_FORMAT = 'yyyy-MM-dd';

export const today = new Date();

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

export const currentMonth = today.getMonth();
export const currentYear = today.getFullYear();

export const yearsList = Array.from({ length: MAX_AGE + 1 }, (_, i) => currentYear - MAX_AGE + i);
