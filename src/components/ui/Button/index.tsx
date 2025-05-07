import { type ComponentProps, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { type ButtonVariants, buttonVariants } from './buttonVariants';
import { cn } from '@/utils/cn';

type ButtonProps = ComponentProps<'button'> &
  ButtonVariants & {
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    children: ReactNode;
  };

const Button = (props: ButtonProps) => {
  const {
    className,
    variant,
    appearance,
    size,
    startIcon,
    endIcon,
    isLoading = false,
    isDisabled = false,
    children,
    ...restProps
  } = props;

  return (
    <button
      className={cn(buttonVariants({ variant, appearance, size }), className)}
      // ref={ref}
      disabled={isDisabled || isLoading}
      {...restProps}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : startIcon ? (
        <span className="mr-2">{startIcon}</span>
      ) : null}
      {children}
      {endIcon && !isLoading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
