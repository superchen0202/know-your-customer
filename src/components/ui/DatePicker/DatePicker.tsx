import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react';
import { today, yearsList, months, currentMonth, currentYear } from '@/constants/dates';
import useClickOutside from '@/hooks/useClickOutside';
import { getDaysInMonth, startOfMonth, getDay, isAfter, isBefore, isValid } from 'date-fns';
import { formatDate, parseStringToDateSafely } from '@/utils/timeParsingHelper';
import CalendarHeader from './CalendarHeader';

type DatePickerProps = {
  value?: Date | null;
  onChange: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
};

const DatePicker = (props: DatePickerProps) => {
  const { onChange, value = null, minDate, maxDate, placeholder = `ex: ${formatDate(today)}` } = props;

  const [displayMonth, setDisplayMonth] = useState(currentMonth);
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(value);
  const [inputValue, setInputValue] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);

  const { isOpen: isOpenCalendar, setIsOpen: setIsOpenCalendar } = useClickOutside(datePickerRef);

  useEffect(() => {
    if (!value) return;
    setSelectedDate(value);
    setDisplayMonth(value.getMonth());
    setDisplayYear(value.getFullYear());
    setInputValue(formatDate(value));
  }, [value]);

  const parseDate = (dateString: string) => {
    const parsedDate = parseStringToDateSafely(dateString);
    if (!parsedDate) return null;
    if (!isValid(parsedDate)) return null;
    if (minDate && isBefore(parsedDate, minDate)) return null;
    if (maxDate && isAfter(parsedDate, maxDate)) return null;

    return parsedDate;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const parsedDate = parseDate(value);
    if (parsedDate) {
      setSelectedDate(parsedDate);
      setDisplayMonth(parsedDate.getMonth());
      setDisplayYear(parsedDate.getFullYear());
      onChange(value);
    } else if (value === '') {
      setSelectedDate(null);
      onChange('');
    }
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(displayYear, displayMonth, day);
    const formattedDate = formatDate(newDate);

    // Validate against min/max dates
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
    setInputValue(formattedDate);
    onChange(formattedDate);
    setIsOpenCalendar(false);
  };

  const handlePrevMonth = () => {
    if (displayMonth === 0) {
      setDisplayMonth(11);
      setDisplayYear(displayYear - 1);
    } else {
      setDisplayMonth(displayMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (displayMonth === 11) {
      setDisplayMonth(0);
      setDisplayYear(displayYear + 1);
    } else {
      setDisplayMonth(displayMonth + 1);
    }
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDisplayMonth(parseInt(event.target.value));

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setDisplayYear(parseInt(event.target.value));

  const handleClear = () => {
    setSelectedDate(null);
    setInputValue('');
    onChange('');
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(new Date(displayYear, displayMonth));
    const firstDay = getDay(startOfMonth(new Date(displayYear, displayMonth)));

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-8 w-8" />);

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(displayYear, displayMonth, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${isSelected ? 'bg-gray-900 text-white' : ''} ${isToday && !isSelected ? 'border border-gray-300' : ''} ${isDisabled ? 'cursor-not-allowed text-gray-300' : 'hover:bg-gray-100'} `}
          aria-selected={isSelected}
          aria-disabled={isDisabled}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <>
      <div className="relative" ref={datePickerRef}>
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onClick={() => setIsOpenCalendar(true)}
            placeholder={placeholder}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            aria-label="Date input"
          />
          <div className="absolute top-0 right-0 flex h-full items-center pr-3">
            {inputValue ? (
              <button onClick={handleClear} className="text-gray-400 hover:text-gray-600" aria-label="Clear date">
                <X size={16} />
              </button>
            ) : (
              <button
                onClick={() => setIsOpenCalendar(true)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Open calendar"
              >
                <Calendar size={16} />
              </button>
            )}
          </div>
        </div>

        {isOpenCalendar && (
          <div className="absolute z-10 mt-1 w-64 rounded-md border border-gray-200 bg-white p-3 shadow-lg">
            {/* < Month, Year > */}
            <div className="mb-2 flex items-center justify-between">
              {/* < */}
              <button
                onClick={handlePrevMonth}
                className="rounded-full p-1 hover:bg-gray-100"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Month and Year */}
              <div className="flex gap-1">
                <select
                  value={displayMonth}
                  onChange={handleMonthChange}
                  className="rounded border border-gray-200 px-1 py-0.5 text-sm"
                  aria-label="Select month"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={displayYear}
                  onChange={handleYearChange}
                  className="rounded border border-gray-200 px-1 py-0.5 text-sm"
                  aria-label="Select year"
                >
                  {yearsList.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* > */}
              <button onClick={handleNextMonth} className="rounded-full p-1 hover:bg-gray-100" aria-label="Next month">
                <ChevronRight size={16} />
              </button>
            </div>
            {/* Calendar */}
            <>
              <CalendarHeader />
              <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => {
                    // 今天小於最小允許日期
                    if (minDate && today < minDate) return;
                    if (maxDate && today > maxDate) return;
                    setSelectedDate(today);
                    setDisplayMonth(today.getMonth());
                    setDisplayYear(today.getFullYear());
                    setInputValue(formatDate(today));
                    onChange(formatDate(today));
                    setIsOpenCalendar(false);
                  }}
                  className="rounded-md bg-gray-100 px-2 py-1 text-xs hover:bg-gray-200"
                >
                  Today
                </button>

                <button
                  onClick={() => setIsOpenCalendar(false)}
                  className="rounded-md bg-gray-900 px-2 py-1 text-xs text-white hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default DatePicker;
