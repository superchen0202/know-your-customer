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

// Generate array of years (from 85 years ago)
export const currentYear = today.getFullYear();

export const yearsList = Array.from({ length: 85 + 1 }, (_, i) => currentYear - 85 + i);
