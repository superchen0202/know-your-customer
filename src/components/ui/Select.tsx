import { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn';
import { Option } from '@/types/basicInfo';

type SelectProps = {
  options: readonly Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  placeholder?: string;
  useDatalistFallback?: boolean;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { options, value, onChange, onBlur, name, placeholder = 'Select an option' } = props;
  return (
    <div className="w-full">
      <select
        ref={ref}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={cn(
          'dark:bg-input/30 border-input h-9 w-full rounded-md border bg-white px-3 py-1 text-sm shadow-sm',
          'focus:ring-ring focus:ring-2 focus:outline-none',
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

Select.displayName = 'Select';

export default memo(Select);
