import { SelectHTMLAttributes, forwardRef } from 'react';
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className = '', children, ...rest }, ref) => (
    <select ref={ref}
      className={`h-[38px] w-full rounded-sm border border-linestrong bg-surface px-2 text-base text-ink focus:border-sky-emph focus:shadow-focus focus:outline-none ${className}`}
      {...rest}>{children}</select>
  ),
);
Select.displayName = 'Select';
