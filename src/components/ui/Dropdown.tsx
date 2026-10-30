'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
}

interface SingleSelectDropdownProps {
  mode: 'single';
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

interface MultiSelectDropdownProps {
  mode: 'multi';
  label: string;
  options: DropdownOption[];
  value: string[];
  onChange: (values: string[]) => void;
  id?: string;
}

type DropdownProps = SingleSelectDropdownProps | MultiSelectDropdownProps;

/**
 * Dropdown — replicates both open states from 11.png:
 *  single → radio-style list (Women / Men / Kids)
 *  multi  → checkbox array (Dior ☑ / Gucci ☑ / Jimmy Choo ☐)
 */
export default function Dropdown(props: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getDisplayLabel = () => {
    if (props.mode === 'single') {
      const selected = props.options.find(o => o.value === props.value);
      return `${props.label}: ${selected?.label ?? '—'}`;
    } else {
      const count = props.value.length;
      return count === 0
        ? `${props.label}: None`
        : count === props.options.length
        ? `${props.label}: All`
        : `${props.label}: ${count} selected`;
    }
  };

  return (
    <div ref={ref} className="relative inline-block" id={props.id}>
      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 border border-button-outline bg-white rounded-md px-3 py-1.5 text-[11px] font-semibold text-primary-text-grey hover:bg-chip-fill hover:border-outline transition-all duration-150 cursor-pointer shadow-xs whitespace-nowrap"
      >
        <span>{getDisplayLabel()}</span>
        <ChevronDown
          size={12}
          className={`text-grey transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 bg-white border border-outline rounded-lg shadow-lg z-50 min-w-[160px] py-1.5 animate-slideDown"
          role="listbox"
        >
          {props.mode === 'single'
            ? props.options.map(opt => (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={props.value === opt.value}
                  onClick={() => {
                    (props as SingleSelectDropdownProps).onChange(opt.value);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-medium text-slate-700 hover:bg-chip-fill transition-colors cursor-pointer"
                >
                  {/* Radio circle */}
                  <span className={`h-3.5 w-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    props.value === opt.value
                      ? 'border-brand-crimson bg-brand-crimson'
                      : 'border-outline bg-white'
                  }`}>
                    {props.value === opt.value && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))
            : props.options.map(opt => {
                const isChecked = (props as MultiSelectDropdownProps).value.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={isChecked}
                    onClick={() => {
                      const multi = props as MultiSelectDropdownProps;
                      multi.onChange(
                        isChecked
                          ? multi.value.filter(v => v !== opt.value)
                          : [...multi.value, opt.value]
                      );
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[11px] font-medium text-slate-700 hover:bg-chip-fill transition-colors cursor-pointer"
                  >
                    {/* Checkbox */}
                    <span className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'border-brand-crimson bg-brand-crimson'
                        : 'border-outline bg-white'
                    }`}>
                      {isChecked && <Check size={9} strokeWidth={3} className="text-white" />}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })
          }
        </div>
      )}
    </div>
  );
}
