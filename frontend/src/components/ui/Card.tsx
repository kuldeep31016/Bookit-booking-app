import type { ReactNode } from 'react';

type CardProps = {
  image?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  footer?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
};

export default function Card({ image, title, subtitle, badge, footer, onClick, children }: CardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer" onClick={onClick}>
      {image && <img src={image} alt={title} className="h-48 w-full object-cover" />}
      <div className="p-4">
        {badge && <div className="text-xs inline-block bg-sky-50 text-sky-700 px-2 py-0.5 rounded mb-2">{badge}</div>}
        {title && <div className="font-semibold">{title}</div>}
        {subtitle && <div className="text-sm text-slate-500">{subtitle}</div>}
        {children}
      </div>
      {footer && <div className="px-4 py-3 border-t bg-white">{footer}</div>}
    </div>
  );
}


