import { ReactNode } from 'react';
import { X } from 'lucide-react';

export function Drawer({ open, title, onClose, children, footer }:
  { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[1040] bg-navy/45" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 z-[1050] flex w-full max-w-md flex-col bg-surface shadow-md">
        <header className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 className="text-md font-semibold text-ink">{title}</h2>
          <button onClick={onClose} className="text-ink-secondary hover:text-ink"><X size={18} /></button>
        </header>
        <div className="flex-1 overflow-auto p-5">{children}</div>
        {footer && <footer className="flex justify-end gap-2 border-t border-line px-5 py-3">{footer}</footer>}
      </aside>
    </>
  );
}
