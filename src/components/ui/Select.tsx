import { type ComponentProps, useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';
import Button from './Button';
import useClickOutside from '@/hooks/useClickOutside';

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
  clearable?: boolean;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenSelectRef = useRef<HTMLSelectElement>(null);

  const { isOpen, setIsOpen } = useClickOutside(containerRef);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions =
    searchable && searchValue
      ? options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
      : options;

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (isOpen) return;
    if (searchable) setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleOptionSelect = (option: SelectOption) => {
    onChange?.(option.value);
    setIsOpen(false);
    setSearchValue('');
  };

  const baseStyles = `
      relative w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
      shadow-sm transition-colors focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400
      ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}
    `;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hidden native select for form submission */}
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

      {/* Custom select trigger */}
      <div
        className={`${baseStyles} ${className} flex items-center justify-between`}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
      >
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {isOpen && searchable ? (
            <input
              ref={inputRef}
              type="text"
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
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                className={`flex cursor-pointer items-center justify-between px-3 py-2 text-sm ${option.value === value ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'} `}
                onClick={() => handleOptionSelect(option)}
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

export default Select;
