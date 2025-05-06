import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

export type ButtonVariants = VariantProps<typeof buttonVariants>;

const base = cn(
  'inline-flex items-center justify-center',
  'rounded-md text-sm font-medium transition-colors',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
);

// Define button variants using class-variance-authority
export const buttonVariants = cva(base, {
  variants: {
    variant: {
      primary: '',
      secondary: '',
      success: '',
      info: '',
      danger: '',
    },
    appearance: {
      filled: 'text-white shadow hover:opacity-90',
      outlined: 'bg-transparent border shadow-sm hover:bg-slate-100',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 py-2 px-4',
      lg: 'h-12 px-6 text-base',
    },
  },
  compoundVariants: [
    // Filled appearance variants
    {
      appearance: 'filled',
      variant: 'info',
      class: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    },
    {
      appearance: 'filled',
      variant: 'success',
      class: 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500',
    },
    {
      appearance: 'filled',
      variant: 'danger',
      class: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
    },
    {
      appearance: 'filled',
      variant: 'primary',
      class: 'bg-purple-600 hover:bg-purple-700 focus-visible:ring-purple-500',
    },
    {
      appearance: 'filled',
      variant: 'secondary',
      class: 'bg-gray-600 hover:bg-gray-700 focus-visible:ring-gray-500',
    },
    // Outlined appearance variants
    {
      appearance: 'outlined',
      variant: 'info',
      class: 'border-blue-200 text-blue-700 hover:border-blue-300 focus-visible:ring-blue-300',
    },
    {
      appearance: 'outlined',
      variant: 'success',
      class: 'border-green-200 text-green-700 hover:border-green-300 focus-visible:ring-green-300',
    },
    {
      appearance: 'outlined',
      variant: 'danger',
      class: 'border-red-200 text-red-700 hover:border-red-300 focus-visible:ring-red-300',
    },
    {
      appearance: 'outlined',
      variant: 'primary',
      class: 'border-purple-200 text-purple-700 hover:border-purple-300 focus-visible:ring-purple-300',
    },
    {
      appearance: 'outlined',
      variant: 'secondary',
      class: 'border-gray-200 text-gray-700 hover:border-gray-300 focus-visible:ring-gray-300',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    appearance: 'filled',
    size: 'md',
  },
});
