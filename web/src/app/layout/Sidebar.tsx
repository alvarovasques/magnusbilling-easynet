import { NavLink } from 'react-router-dom';
import { NAV } from './nav';
import logoWhite from '@/assets/easynet-logo-white.png';

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex h-full w-full flex-col bg-navy py-4 text-ondark">
      <div className="px-5 pb-4"><img src={logoWhite} alt="Easynet Telefônica" className="h-8 w-auto" /></div>
      <div className="flex-1 overflow-y-auto">
        {NAV.map((g, i) => (
          <div key={i} className="mb-1">
            {g.title && <div className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[.06em] text-ondark-muted">{g.title}</div>}
            {g.items.map((it) => (
              <NavLink key={it.to} to={it.to} end={it.to === '/'} onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-2 text-sm transition-colors ${
                    isActive ? 'bg-navy-700 font-semibold text-white shadow-[inset_3px_0_0_#54A8D8]' : 'text-ondark hover:bg-navy-800'
                  }`}>
                <it.icon size={17} />
                <span>{it.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
