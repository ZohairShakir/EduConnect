import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
