import {
  type ComponentProps,
  // LabelHTMLAttributes
} from 'react';
import { cn } from '@/utils/cn';

export type LabelProps = ComponentProps<'label'>;

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
        className,
      )}
      {...props}
    />
  );
};

export default Label;
