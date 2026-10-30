'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export type ButtonState = 'active' | 'disabled' | 'clicked';

interface SecondaryButtonProps {
  label: string;
  state?: ButtonState;
  onClick?: () => void;
  id?: string;
  className?: string;
}

/**
 * SecondaryButton — three states from 11.png:
 *  active   → outlined border, full opacity, hover darkens
 *  disabled → muted opacity, no interaction
 *  clicked  → brief scale-down + deeper border flash (200ms)
 */
export default function SecondaryButton({
  label,
  state = 'active',
  onClick,
  id,
  className = '',
}: SecondaryButtonProps) {
  const [pressing, setPressing] = useState(false);

  const handleClick = () => {
    if (state === 'disabled') return;
    setPressing(true);
    setTimeout(() => setPressing(false), 200);
    onClick?.();
  };

  const isDisabled = state === 'disabled';

  return (
    <button
      id={id}
      type="button"
      disabled={isDisabled}
      onClick={handleClick}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-md border
        text-[11px] font-bold uppercase tracking-wider
        transition-all duration-150
        ${isDisabled
          ? 'border-button-outline text-slate-400 bg-white opacity-50 cursor-not-allowed'
          : `border-outline text-primary-text-grey bg-white
             hover:border-brand-crimson hover:text-brand-crimson hover:bg-red-fill
             active:scale-[0.97]
             ${pressing ? 'scale-[0.97] border-brand-crimson text-brand-crimson' : ''}`
        }
        ${className}
      `}
    >
      <span>{label}</span>
      {!isDisabled && <ChevronRight size={12} strokeWidth={2.5} />}
    </button>
  );
}
