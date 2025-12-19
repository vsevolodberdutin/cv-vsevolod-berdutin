import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    const hasError = Boolean(error);

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-text-primary">
            {label}
            {props.required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 text-text-primary bg-white border rounded-lg',
            'placeholder:text-text-secondary',
            'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent',
            'transition duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-secondary',
            hasError
              ? 'border-red-500 focus:ring-red-500'
              : 'border-border',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
          {...props}
        />

        {error && (
          <p id="error-message" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id="helper-text" className="mt-1 text-sm text-text-secondary">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
