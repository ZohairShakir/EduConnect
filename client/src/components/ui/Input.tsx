import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      <input
        className={`
          w-full rounded-md bg-[var(--bg-secondary)] border border-transparent 
          px-3.5 py-2.5 text-sm text-[var(--text-primary)] transition-colors
          focus:border-[var(--border-focus)] focus:bg-[var(--bg-primary)] focus:outline-none
          placeholder:text-[var(--text-muted)]
          ${error ? 'border-red-400' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};
