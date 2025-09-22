"use client";
import { useMemo, useState, useRef, useEffect } from 'react'
import TextButton from '../buttons/TextButton'

type Option = { value: string; label: string }

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  className?: string
  wrapperClassName?: string
  id?: string
}

export default function Dropdown({ options, value, onChange, className = '', wrapperClassName = '', id }: Props) {
  const base = 'flex items-center w-full h-10 border border-black px-3 cursor-pointer';
  const cls = className ? `${base} ${className}` : base;


  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const label = useMemo(() => options.find(o => o.value === value)?.label ?? '', [options, value]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={dropdownRef} className={`relative ${wrapperClassName || ''}`}>
      <button
        id={id}
        type="button"
        className={cls}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <span className="flex-1 min-w-0 truncate text-left">{label}</span>
        <span className="flex items-center justify-center w-6 h-6 ml-2">
          <span className={`font-mono text-[12px] leading-[12px] origin-center select-none transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}>v</span>
        </span>
      </button>

      <div className={`absolute left-0 right-0 top-full z-10 bg-white border border-black mt-1 ${open ? '' : 'hidden'}`} role="listbox" aria-labelledby={id}>
        {options.map((o) => (
          <TextButton
            key={o.value}
            active={o.value === value}
            ariaSelected={o.value === value}
            className="block w-full text-left px-3 py-2"
            onClick={() => {
              onChange(o.value);
              setOpen(false);
            }}
            variant="primary"
          >
            {o.label}
          </TextButton>
        ))}
      </div>
    </div>
  );
}
