import { Menu, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/auth/AuthProvider';

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user, signOut } = useAuth();
  const initials = (user?.name || user?.username || '?').slice(0, 2).toUpperCase();
  return (
    <header className="sticky top-0 z-[1020] flex h-[52px] items-center gap-3 border-b border-line bg-surface px-4">
      <button className="md:hidden" onClick={onMenu} aria-label="Menu"><Menu size={20} /></button>
      <div className="relative flex-1 max-w-[320px]">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input placeholder="Buscar…" className="h-8 w-full rounded-sm border border-line bg-surfacealt pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:shadow-focus" />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="hidden text-sm text-ink-secondary sm:inline">{user?.name || user?.username}</span>
        <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-sky text-xs font-semibold text-white">{initials}</div>
        <button onClick={() => signOut()} className="text-ink-secondary hover:text-danger" title="Sair"><LogOut size={18} /></button>
      </div>
    </header>
  );
}
