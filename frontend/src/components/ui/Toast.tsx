import { useEffect, useState } from 'react';

type ToastProps = { message: string; type?: 'success' | 'error' | 'info'; duration?: number };

export default function Toast({ message, type = 'info', duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);
  if (!visible) return null;
  const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-slate-900';
  return <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 text-white rounded ${color}`}>{message}</div>;
}


