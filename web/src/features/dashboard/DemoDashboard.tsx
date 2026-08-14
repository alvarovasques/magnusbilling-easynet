import { Users, Activity, TrendingUp, Wallet } from 'lucide-react';
import { KpiCard } from '@/design-system/components/KpiCard';
import { Badge } from '@/design-system/components/Badge';
import { brl, int } from '@/lib/format';

export function DemoDashboard() {
  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold text-ink">Visão geral</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Usuários ativos" value={int(128)} icon={<Users size={20} />} />
        <KpiCard label="Pico de hoje" value="CC 42 | CPS 6" hint="chamadas concorrentes / CPS" icon={<Activity size={20} />} />
        <KpiCard label="Lucro do mês" value={brl(18450.9)} icon={<TrendingUp size={20} />} />
        <KpiCard label="Recargas do mês" value={brl(56200)} icon={<Wallet size={20} />} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded bg-surface p-4 shadow-sm ring-1 ring-line lg:col-span-2">
          <h2 className="mb-3 text-md font-semibold text-ink">Chamadas simultâneas</h2>
          <div className="grid h-56 place-items-end gap-1" style={{ gridTemplateColumns: 'repeat(24,1fr)' }}>
            {[8,10,14,22,30,26,18,24,34,40,33,28,36,44,38,30,26,32,42,46,40,34,30,24].map((h,i)=>(
              <div key={i} className="rounded-t bg-sky/70" style={{ height: `${h*4}px` }} />
            ))}
          </div>
        </div>
        <div className="rounded bg-surface p-4 shadow-sm ring-1 ring-line">
          <h2 className="mb-3 text-md font-semibold text-ink">Troncos</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between"><span className="text-ink">Tronco-Vivo</span><Badge tone="success">Registrado</Badge></li>
            <li className="flex items-center justify-between"><span className="text-ink">Tronco-Claro</span><Badge tone="success">Registrado</Badge></li>
            <li className="flex items-center justify-between"><span className="text-ink">Tronco-TIM</span><Badge tone="warning">Instável</Badge></li>
            <li className="flex items-center justify-between"><span className="text-ink">Tronco-Backup</span><Badge tone="danger">Caído</Badge></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
