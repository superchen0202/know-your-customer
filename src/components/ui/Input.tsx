import { ComponentProps, memo } from 'react';
import { cn } from '@/utils/cn';
import ErrorMessage from '@/shared/components/ErrorMessage';
import { RequireProps } from '@/types/basicInfo';
// import { ControllerFieldState } from 'react-hook-form';

type InputProps = RequireProps<ComponentProps<'input'>, 'type' | 'required'> & {
  error: string | undefined;
  // fieldState: ControllerFieldState;
};

// TODO
// required sign for <label htmlFor>
// prefix icon
// postfix icon
const Input = (props: InputProps) => {
  const { className, type, error, required, name, ...rest } = props;

  return (
    <>
      <input
        type={type}
        // required={required}
        aria-label={name}
        aria-invalid={error ? 'true' : 'false'}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          error
            ? 'border-red-500 focus:border-red-500'
            : // 'border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40'
              'border-input',
          className,
        )}
        {...rest}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default memo(
  Input,
  // (prevProps, nextProps) => prevProps.fieldState.isDirty === nextProps.fieldState.isDirty
);
