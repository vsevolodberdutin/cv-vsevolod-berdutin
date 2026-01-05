import React from 'react';
import { cn } from '../../utils/cn';

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
          <label className="mb-2 block text-sm font-medium text-text-primary">
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            'w-full rounded-lg border bg-background px-4 py-2 text-text-primary',
            'placeholder:text-text-secondary',
            'transition duration-200',
            'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent',
            'disabled:cursor-not-allowed disabled:bg-background-secondary disabled:opacity-50',
            hasError
              ? 'border-error focus:ring-error'
              : 'border-border',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
          {...props}
        />

        {error && (
          <p id="error-message" className="mt-1 text-sm text-error">
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
