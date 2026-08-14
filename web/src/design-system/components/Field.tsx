import { ReactNode } from 'react';
export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink-secondary">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger-strong">{error}</span>}
    </label>
  );
}
