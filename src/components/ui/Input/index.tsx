import { ComponentProps, memo, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import ErrorMessage from '@/components/ErrorMessage';
import { RequireProps } from '@/types/utilityTypes';

type InputProps = RequireProps<ComponentProps<'input'>, 'type'> & {
  error: string | undefined;
  prefixIcon?: ReactNode;
  postfixIcon?: ReactNode;
};

const Input = (props: InputProps) => {
  const { type, name, error, className, prefixIcon, postfixIcon, ...rest } = props;

  return (
    <>
      {prefixIcon}
      <input
        type={type}
        aria-label={name}
        aria-invalid={error ? 'true' : 'false'}
        data-slot="input"
        className={cn(
          // base style
          'flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none dark:bg-gray-800',

          // text & placeholder
          'text-gray-900 placeholder:text-gray-400',

          // file input styling
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:px-2 file:text-sm file:font-medium file:text-gray-900',

          // border & ring states
          'border-gray-300',
          'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50',

          // error styling (conditional)
          'aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40',

          // disabled styling
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...rest}
      />
      {postfixIcon}
      <ErrorMessage error={error} />
    </>
  );
};

export default memo(Input);
