import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function BrandedDropdown({
  id,
  label,
  value,
  options,
  onChange,
  className,
  invalid,
  describedBy,
}) {
  const dropdownRef = useRef(null);
  const activeOptionRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    activeOptionRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  const chooseOption = (index) => {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setActiveIndex(index);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      if (!isOpen) {
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        setIsOpen(true);
        return;
      }
      setActiveIndex((current) => (current + direction + options.length) % options.length);
    } else if (event.key === 'Home' && isOpen) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End' && isOpen) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    } else if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
      event.preventDefault();
      chooseOption(activeIndex);
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        aria-activedescendant={isOpen ? `${id}-option-${activeIndex}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => {
          if (!isOpen) setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
          setIsOpen((open) => !open);
        }}
        onKeyDown={handleKeyDown}
        className={`${className} flex cursor-pointer items-center justify-between gap-3 pe-4 text-start`}
      >
        <span className={value ? '' : 'text-[#2A0E14]/45'}>
          {selectedOption?.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#4B0011]/65 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          id={`${id}-options`}
          role="listbox"
          aria-label={label}
          className="absolute start-0 top-full z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-[#4B0011]/15 bg-[#FFF7EB] p-1.5 shadow-lg shadow-[#2A0E14]/10"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <div
                key={`${option.value}-${index}`}
                ref={isActive ? activeOptionRef : null}
                id={`${id}-option-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={isSelected}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseOption(index)}
                className={`w-full rounded-lg px-3 py-2.5 text-start text-sm transition-colors ${
                  isSelected
                    ? 'bg-[#4B0011] font-medium text-[#FFF7EB]'
                    : 'text-[#2A0E14] hover:bg-[#4B0011]/10 hover:text-[#4B0011]'
                } ${isActive && !isSelected ? 'bg-[#4B0011]/10 text-[#4B0011]' : ''}`}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
