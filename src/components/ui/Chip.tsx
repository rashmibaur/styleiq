'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type ChipVariant = 'default' | 'active-positive' | 'active-negative' | 'highlighted-positive' | 'highlighted-negative' | 'neutral';

export interface ChipProps {
  label: string;
  change?: string;
  isPositive?: boolean;
  isNeutral?: boolean;
  variant?: ChipVariant;
  onClick?: () => void;
  className?: string;
}

/**
 * Chip — replicates the three states from 11.png:
 *  default       → slate fill, neutral text
 *  active-pos    → green stroke + fill, "▲ 5%" green label
 *  active-neg    → red stroke + fill, "▼ 2%" red label — used for highlighted assortment
 *  highlighted-* → color text on white, up/down arrow, used for attribute pills
 *  neutral       → slate bg, muted label "N/A"
 */
export default function Chip({ label, change, isPositive, isNeutral, variant, onClick, className = '' }: ChipProps) {
  // Resolve variant from props if not explicitly provided
  const resolvedVariant: ChipVariant = variant ?? (
    isNeutral ? 'neutral' :
    isPositive === true ? 'active-positive' :
    isPositive === false ? 'active-negative' :
    'default'
  );

  const base = 'inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-semibold border transition-all duration-150 select-none';

  const styles: Record<ChipVariant, string> = {
    'default':               'bg-chip-fill border-outline text-primary-text-grey',
    'active-positive':       'bg-green-fill border-green-stroke text-positive-green',
    'active-negative':       'bg-red-fill border-red-stroke text-negative-red',
    'highlighted-positive':  'bg-white border-green-stroke text-positive-green shadow-xs',
    'highlighted-negative':  'bg-white border-red-stroke text-negative-red shadow-xs',
    'neutral':               'bg-chip-fill border-outline text-slate-400',
  };

  const ArrowIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;
  const iconColor = isNeutral ? 'text-slate-400' : isPositive ? 'text-positive-green' : 'text-negative-red';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`${base} ${styles[resolvedVariant]} ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
    >
      <span className="truncate">{label}</span>
      {change && (
        <span className={`flex items-center gap-0.5 font-bold text-[10px] ml-0.5 whitespace-nowrap ${iconColor}`}>
          <ArrowIcon size={9} strokeWidth={2.5} />
          {change.replace('▲', '').replace('▼', '').trim()}
        </span>
      )}
    </div>
  );
}
