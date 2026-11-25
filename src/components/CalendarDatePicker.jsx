import { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

function parseDateValue(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
}

function toDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function CalendarDatePicker({
  id,
  value,
  min,
  language,
  onChange,
  className,
  placeholder,
  clearLabel,
  previousLabel,
  nextLabel,
}) {
  const pickerRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(parseDateValue(value) || parseDateValue(min) || new Date())
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!pickerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const locale = language === 'ar' ? 'ar-EG' : 'en';
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const minDate = parseDateValue(min);
  const selectedDate = parseDateValue(value);
  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth);
  const dateLabel = selectedDate
    ? new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(selectedDate)
    : placeholder;
  const weekStartsOn = language === 'ar' ? 6 : 0;
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    weekdayFormatter.format(new Date(2023, 0, 1 + weekStartsOn + index))
  );

  const daysInMonth = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0
  ).getDate();
  const firstWeekday = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth(),
    1
  ).getDay();
  const offset = (firstWeekday - weekStartsOn + 7) % 7;
  const cellCount = Math.ceil((offset + daysInMonth) / 7) * 7;
  const todayValue = min;
  const cells = Array.from({ length: cellCount }, (_, index) => {
    const day = index - offset + 1;
    return day > 0 && day <= daysInMonth
      ? new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), day)
      : null;
  });

  const changeMonth = (amount) => {
    setVisibleMonth(
      (current) => new Date(current.getFullYear(), current.getMonth() + amount, 1)
    );
  };
  const openCalendar = () => {
    setVisibleMonth(startOfMonth(selectedDate || minDate || new Date()));
    setIsOpen(true);
  };
  const selectDate = (date) => {
    onChange(toDateValue(date));
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const canGoPrevious =
    !minDate ||
    visibleMonth.getFullYear() > minDate.getFullYear() ||
    (visibleMonth.getFullYear() === minDate.getFullYear() &&
      visibleMonth.getMonth() > minDate.getMonth());
  const previousIcon = direction === 'rtl' ? ChevronRight : ChevronLeft;
  const nextIcon = direction === 'rtl' ? ChevronLeft : ChevronRight;
  const PreviousIcon = previousIcon;
  const NextIcon = nextIcon;

  return (
    <div ref={pickerRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        dir={direction}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${id}-calendar`}
        onClick={() => (isOpen ? setIsOpen(false) : openCalendar())}
        className={`${className} flex items-center justify-between gap-3 text-start ${
          selectedDate ? '' : 'text-[#2A0E14]/45'
        }`}
      >
        <span>{dateLabel}</span>
        <CalendarDays className="h-4 w-4 shrink-0 text-[#4B0011]/70" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={`${id}-calendar`}
          role="dialog"
          aria-label={monthLabel}
          dir={direction}
          className="absolute start-0 top-full z-30 mt-2 w-80 max-w-[calc(100vw-2.5rem)] rounded-2xl border border-[#4B0011]/15 bg-[#FFF7EB] p-4 shadow-xl shadow-[#2A0E14]/10"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              aria-label={previousLabel}
              disabled={!canGoPrevious}
              onClick={() => changeMonth(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#4B0011] transition-colors hover:bg-[#4B0011]/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <PreviousIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <h2 className="text-sm font-semibold text-[#4B0011]">{monthLabel}</h2>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => changeMonth(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#4B0011] transition-colors hover:bg-[#4B0011]/10"
            >
              <NextIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center" aria-hidden="true">
            {weekdays.map((weekday, index) => (
              <span
                key={`${weekday}-${index}`}
                className="flex h-8 items-center justify-center text-[11px] font-medium text-[#2A0E14]/55"
              >
                {weekday}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1" role="group" aria-label={monthLabel}>
            {cells.map((date, index) => {
              if (!date) {
                return <span key={`empty-${index}`} aria-hidden="true" className="aspect-square" />;
              }

              const dateValue = toDateValue(date);
              const isSelected = dateValue === value;
              const isToday = dateValue === todayValue;
              const isDisabled = !!min && dateValue < min;
              return (
                <button
                  key={dateValue}
                  type="button"
                  aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(date)}
                  aria-pressed={isSelected}
                  disabled={isDisabled}
                  onClick={() => selectDate(date)}
                  className={`aspect-square w-full rounded-lg border text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4B0011] ${
                    isSelected
                      ? 'border-[#4B0011] bg-[#4B0011] font-semibold text-[#FFF7EB]'
                      : `border-transparent text-[#2A0E14] hover:bg-[#4B0011]/10 ${
                          isToday ? 'border-[#DFAC6D] font-semibold text-[#4B0011]' : ''
                        }`
                  } ${
                    isDisabled
                      ? 'cursor-not-allowed text-[#2A0E14]/25 hover:bg-transparent'
                      : 'cursor-pointer'
                  }`}
                >
                  {new Intl.NumberFormat(locale, { useGrouping: false }).format(date.getDate())}
                </button>
              );
            })}
          </div>

          {value && (
            <div className="mt-3 border-t border-[#4B0011]/10 pt-3">
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className="text-xs font-medium text-[#4B0011]/75 transition-colors hover:text-[#4B0011]"
              >
                {clearLabel}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
