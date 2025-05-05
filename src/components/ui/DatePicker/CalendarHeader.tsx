import { week } from '@/constants/dates';

const CalendarHeader = () => (
  <>
    <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
      {week.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  </>
);

export default CalendarHeader;
