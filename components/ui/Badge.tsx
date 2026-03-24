'use client';

interface BadgeProps {
  variant?: 'danger' | 'warning' | 'success' | 'neutral' | 'copper';
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  danger: 'bg-semantic-red-bg text-semantic-red-text',
  warning: 'bg-semantic-amber-bg text-semantic-amber-text',
  success: 'bg-semantic-green-bg text-semantic-green-text',
  neutral: 'bg-sand-200 text-ink-3',
  copper: 'bg-copper-light text-copper',
};

export default function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
