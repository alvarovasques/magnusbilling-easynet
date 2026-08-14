import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid h-full md:grid-cols-[240px_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden md:block"><Sidebar /></aside>
      {/* Sidebar mobile (drawer) */}
      {open && (
        <>
          <div className="fixed inset-0 z-[1040] bg-navy/45 md:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-[1050] w-[260px] md:hidden"><Sidebar onNavigate={() => setOpen(false)} /></aside>
        </>
      )}
      <div className="flex min-w-0 flex-col">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="flex-1 overflow-auto bg-app p-4 md:p-5">
          <Suspense fallback={<div className="grid h-full place-items-center text-sm text-ink-secondary">Carregando…</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
