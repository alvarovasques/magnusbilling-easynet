import { InputHTMLAttributes, forwardRef } from 'react';
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...rest }, ref) => (
    <input ref={ref}
      className={`h-[38px] w-full rounded-sm border border-linestrong bg-surface px-3 text-base text-ink
        placeholder:text-ink-muted focus:border-sky-emph focus:shadow-focus focus:outline-none ${className}`}
      {...rest} />
  ),
);
Input.displayName = 'Input';
