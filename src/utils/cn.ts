import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Utility function to merge class names using clsx and tailwind-merge.
 * @param inputs - Class names to be merged.
 * @returns Merged class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
