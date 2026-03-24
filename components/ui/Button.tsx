'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-copper text-white hover:bg-copper-hover shadow-[0_2px_8px_rgba(181,105,79,0.2)] hover:shadow-[0_4px_16px_rgba(181,105,79,0.25)]',
  secondary: 'bg-ink text-white hover:bg-ink-2',
  outline: 'border border-sand-300 text-ink-3 hover:border-sand-400 hover:text-ink bg-white',
  ghost: 'text-ink-4 hover:text-ink hover:bg-sand-100',
};

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-8 py-3.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-bold rounded transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
