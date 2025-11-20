'use client';

import React, { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', registration, id, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    return (
      <div className="w-full">
        <div className="flex items-center">
          <input
            {...registration}
            ref={ref}
            type="checkbox"
            id={checkboxId}
            suppressHydrationWarning
            className={`
              h-4 w-4 rounded border-gray-300 dark:border-gray-700
              text-blue-600 focus:ring-2 focus:ring-blue-500
              bg-white dark:bg-gray-800
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-500 dark:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

