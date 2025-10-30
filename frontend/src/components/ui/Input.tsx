import type { InputHTMLAttributes } from 'react';

type InputProps = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, error, className = '', ...rest }: InputProps) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium mb-1">{label}</span>}
      <input
        className={`w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500 ${error ? 'border-red-400' : 'border-slate-300'} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600 mt-1 block">{error}</span>}
    </label>
  );
}


