import React from 'react';

interface AcademicBadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'oxford' | 'sage' | 'sepia' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export function AcademicBadge({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
}: AcademicBadgeProps) {
  const variantStyles = {
    neutral: 'bg-paper-200 text-ink-600 border-paper-300',
    oxford: 'bg-oxford-light text-oxford-dark border-oxford/20',
    sage: 'bg-sage-light text-sage-dark border-sage-border',
    sepia: 'bg-sepia-light text-sepia border-sepia-border',
    outline: 'bg-transparent text-ink-500 border-paper-300',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded',
    md: 'text-xs sm:text-sm px-2.5 py-1 rounded-md',
  };

  return (
    <span
      className={`inline-flex items-center font-medium border font-mono tracking-tight transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
