import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base = 'inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors focus-visible:shadow-focus focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
const variants: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-surface text-primary border border-linestrong hover:bg-surfacealt',
  ghost: 'bg-transparent text-primary hover:bg-info-bg',
  danger: 'bg-danger text-white hover:bg-danger-strong',
};
const sizes: Record<Size, string> = {
  sm: 'h-7 px-3 text-sm', md: 'h-[34px] px-4 text-sm', lg: 'h-10 px-5 text-sm',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; }
export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: Props) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest} />;
}
