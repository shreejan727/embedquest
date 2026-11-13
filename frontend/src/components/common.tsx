// ============================================================
// EMBEDQUEST — small reusable UI building blocks
// Dark theme by default, light theme via Tailwind dark: classes.
// ============================================================
import type { ReactNode } from 'react';

export function Card({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border bg-white/80 border-slate-200 dark:bg-slate-900/70 dark:border-slate-800 ${
        onClick ? 'cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ProgressBar({
  pct,
  className = '',
  barClass = 'bg-gradient-to-r from-indigo-500 to-violet-500',
}: {
  pct: number;
  className?: string;
  barClass?: string;
}) {
  return (
    <div className={`h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

export function Btn({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger' | 'success';
  className?: string;
  disabled?: boolean;
}) {
  const styles = {
    primary:
      'bg-gradient-to-r from-indigo-500 to-violet-500 text-white eq-chunky hover:brightness-110',
    ghost:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-500 text-white eq-chunky hover:brightness-110',
    success:
      'bg-gradient-to-r from-emerald-500 to-teal-500 text-white eq-chunky hover:brightness-110',
  }[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function Chip({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

/** Section heading with a colored dot — used across lesson pages. */
export function SectionTitle({ children, color = 'bg-indigo-500' }: { children: ReactNode; color?: string }) {
  return (
    <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
      <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
      {children}
    </h3>
  );
}
