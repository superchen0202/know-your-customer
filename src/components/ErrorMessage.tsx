import { memo } from 'react';
import { cn } from '@/utils/cn';

const ErrorMessage = ({ error }: { error: string | undefined }) => (
  <>
    <p
      className={cn(
        'mt-2 min-h-[1.5rem] text-sm font-medium text-red-500 transition-opacity duration-200',
        !error && 'opacity-0',
      )}
      role="alert"
      aria-live="polite"
    >
      {error || ''}
    </p>
  </>
);

export default memo(ErrorMessage);
