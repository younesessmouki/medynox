'use client';

import React, { useId } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  registration?: UseFormRegisterReturn;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', registration, id, autoComplete, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Auto-generate autocomplete attribute based on field name and type if not provided
    const getAutocomplete = (): string | undefined => {
      // If autocomplete is explicitly provided, use it
      if (autoComplete) return autoComplete;
      
      // Get field name from registration
      const fieldName = registration?.name || '';
      const inputType = props.type || 'text';
      
      // Password fields - handled explicitly in forms
      if (inputType === 'password') {
        if (fieldName.includes('confirm') || fieldName.includes('Confirm')) {
          return 'new-password';
        }
        // Default password field - use current-password for login pages
        // This will be overridden if explicitly provided
        return 'current-password';
      }
      
      // Email fields
      if (inputType === 'email' || fieldName.toLowerCase().includes('email')) {
        return 'email';
      }
      
      // Phone fields
      if (inputType === 'tel' || fieldName.toLowerCase().includes('phone') || fieldName.toLowerCase().includes('telephone')) {
        return 'tel';
      }
      
      // Name fields
      if (fieldName.toLowerCase().includes('firstname') || fieldName.toLowerCase().includes('first_name') || fieldName.toLowerCase().includes('prenom')) {
        return 'given-name';
      }
      if (fieldName.toLowerCase().includes('lastname') || fieldName.toLowerCase().includes('last_name') || fieldName.toLowerCase().includes('nom')) {
        return 'family-name';
      }
      
      // Date fields - no standard autocomplete for single date inputs
      // (bday-day, bday-month, bday-year are only for separate day/month/year fields)
      if (inputType === 'date') {
        // Return undefined for date inputs as there's no standard autocomplete value
        return undefined;
      }
      
      // Address fields
      if (fieldName.toLowerCase().includes('address') || fieldName.toLowerCase().includes('adresse')) {
        return 'street-address';
      }
      if (fieldName.toLowerCase().includes('city') || fieldName.toLowerCase().includes('ville')) {
        return 'address-level2';
      }
      if (fieldName.toLowerCase().includes('postal') || fieldName.toLowerCase().includes('zip')) {
        return 'postal-code';
      }
      if (fieldName.toLowerCase().includes('country') || fieldName.toLowerCase().includes('pays')) {
        return 'country';
      }
      
      return undefined;
    };

    const autocompleteValue = getAutocomplete();

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100"
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          {...registration}
          ref={ref}
          id={inputId}
          autoComplete={autocompleteValue}
          suppressHydrationWarning
          className={`
            w-full px-4 py-2.5 border rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            transition-colors duration-200
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            border-gray-300 dark:border-gray-700
            placeholder-gray-400 dark:placeholder-gray-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 dark:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

