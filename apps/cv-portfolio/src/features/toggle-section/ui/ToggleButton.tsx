'use client';

import React from 'react';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';

export interface ToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  label: string;
  icon?: string;
  className?: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onToggle,
  label,
  icon,
  className,
}) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex w-full items-center justify-between gap-3',
        'rounded-xl border border-gray-300 bg-white p-4',
        'transition duration-300',
        'hover:border-accent hover:shadow-md',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
        isOpen && 'border-accent shadow-md',
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="flex items-center gap-3">
        {icon && (
          <span className="flex-shrink-0 text-2xl" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="text-left text-lg font-semibold text-text-primary">
          {label}
        </span>
      </span>

      <span
        className={cn(
          'flex-shrink-0 text-text-secondary transition-transform duration-300',
          isOpen && 'rotate-180'
        )}
        aria-hidden="true"
      >
        ▼
      </span>
    </button>
  );
};

ToggleButton.displayName = 'ToggleButton';
