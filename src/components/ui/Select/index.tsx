import { type ComponentProps, useState, useRef, useEffect, memo } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/utils/cn';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: string;
  searchable?: boolean;
} & Omit<ComponentProps<'select'>, 'onChange'>;

const Select = (props: SelectProps) => {
  const {
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    className = '',
    disabled = false,
    error,
    searchable = true,
    ref,
    ...resetProps
  } = props;

  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { isOpen, setIsOpen } = useClickOutside(containerRef);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions =
    searchable && searchValue
      ? options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
      : options;

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchable) setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!isOpen || highlightedIndex < 0) return;
    optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchValue('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!isOpen || filteredOptions.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const selected = filteredOptions[highlightedIndex];
      if (selected) handleOptionSelect(selected);
    }
  };

  const baseStyles = cn(
    'flex h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none',
    'text-gray-900 placeholder:text-gray-400',
    'border-gray-300',
    'focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500/50',
    'aria-invalid:border-red-500 aria-invalid:ring-red-500/20',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    error && 'border-red-500 ring-red-500/20',
    className,
  );

  return (
    <div className="relative w-full" ref={containerRef} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Native select for form submission */}
      <select
        ref={ref || hiddenSelectRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="sr-only"
        disabled={disabled}
        {...resetProps}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Select */}
      <div
        role="combobox"
        onClick={handleToggle}
        className={baseStyles}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={!!error}
      >
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {isOpen && searchable ? (
            <input
              ref={inputRef}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onClick={(event) => event.stopPropagation()}
              placeholder={placeholder}
              className="w-full border-none bg-transparent p-0 outline-none"
            />
          ) : selectedOption ? (
            selectedOption.label
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <ChevronDown className={cn('h-4 w-4 text-gray-500 transition-transform', isOpen && 'rotate-180')} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                ref={(event) => void (optionRefs.current[index] = event)}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  'flex cursor-pointer items-center justify-between px-3 py-2 text-sm',
                  option.value === value && 'bg-blue-100 font-medium',
                  index === highlightedIndex && 'bg-blue-50',
                )}
              >
                {option.label}
                {option.value === value && <Check className="h-4 w-4 text-gray-700" />}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Select);
