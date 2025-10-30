import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50',
  secondary: 'bg-slate-900 text-white hover:bg-black disabled:opacity-50',
  outline: 'border border-slate-300 text-slate-900 hover:bg-slate-50 disabled:opacity-50',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({ variant = 'primary', size = 'md', loading, children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={`rounded transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`} disabled={loading || rest.disabled} {...rest}>
      {loading ? 'Loading…' : children}
    </button>
  );
}


