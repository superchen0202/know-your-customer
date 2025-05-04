import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Utility function to merge class names using clsx and tailwind-merge.
 * @param inputs - Class names to be merged.
 * @returns Merged class names.
 */
// This function is useful for conditionally applying class names in a React component.
// It uses clsx to handle conditional class names and tailwind-merge to merge Tailwind CSS classes.
// This is particularly useful when you want to apply different styles based on certain conditions or props.
// For example, you can use it to apply different styles based on a component's state or props.
// It helps to keep your code clean and maintainable by avoiding repetitive class name strings.
// It also ensures that conflicting Tailwind CSS classes are resolved correctly.
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
