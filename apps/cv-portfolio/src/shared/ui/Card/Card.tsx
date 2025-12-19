import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
}

const variantStyles = {
  default: 'bg-white border border-border',
  outlined: 'bg-transparent border-2 border-border',
  elevated: 'bg-white shadow-lg shadow-gray-600/10',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl transition duration-300',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
