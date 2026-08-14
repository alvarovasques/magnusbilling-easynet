import { useQuery } from '@tanstack/react-query';
import { Users, Activity, TrendingUp, Wallet } from 'lucide-react';
import { fetchKpis } from './api';
import { apiGet } from '@/api/client';
import { KpiCard } from '@/design-system/components/KpiCard';
import { Badge } from '@/design-system/components/Badge';
import { brl, int } from '@/lib/format';

interface ChartPoint { date: string; total: number; answer?: number }
interface TrunkRow { id: number; trunkcode: string; registered?: number }

const fetchChart = async (): Promise<ChartPoint[]> => {
  const r = await apiGet<{ rows: ChartPoint[] }>('callOnlineChart/read', { start: 0, limit: 60, sort: 'id', dir: 'ASC' });
  return (r.rows ?? []).map((p) => ({ ...p, total: Number(p.total ?? 0), answer: Number(p.answer ?? 0) }));
};
const fetchTrunks = async (): Promise<TrunkRow[]> => {
  const r = await apiGet<{ rows: TrunkRow[] }>('trunk/read', { start: 0, limit: 60, sort: 'trunkcode', dir: 'ASC' });
  return r.rows ?? [];
};

export function DashboardPage() {
  const kpis = useQuery({ queryKey: ['dashboard', 'kpis'], queryFn: fetchKpis, refetchInterval: 15000 });
  const chart = useQuery({ queryKey: ['dashboard', 'chart'], queryFn: fetchChart, refetchInterval: 15000 });
  const trunks = useQuery({ queryKey: ['dashboard', 'trunks'], queryFn: fetchTrunks, refetchInterval: 30000 });

  const v = (x: React.ReactNode) => (kpis.isLoading ? '…' : x);
  const data = kpis.data;
  const points = chart.data ?? [];
  const max = Math.max(1, ...points.map((p) => p.total));

  return (
    <div>
      <h1 className="mb-4 text-lg font-semibold text-ink">Visão geral</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Usuários ativos" value={v(int(data?.totalActiveUsers))} icon={<Users size={20} />} />
        <KpiCard label="Pico de hoje" value={v(data?.maximumcc ?? 'CC 0 | CPS 0')} hint="chamadas concorrentes / CPS" icon={<Activity size={20} />} />
        <KpiCard label="Lucro do mês" value={v(brl(data?.monthprofit))} icon={<TrendingUp size={20} />} />
        <KpiCard label="Recargas do mês" value={v(brl(data?.monthRefill))} icon={<Wallet size={20} />} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded bg-surface p-4 shadow-sm ring-1 ring-line lg:col-span-2">
          <h2 className="mb-3 text-md font-semibold text-ink">Chamadas simultâneas</h2>
          {points.length === 0 ? (
            <div className="grid h-56 place-items-center text-sm text-ink-secondary">
              {chart.isLoading ? 'Carregando…' : 'Sem dados recentes'}
            </div>
          ) : (
            <div className="flex h-56 items-end gap-[2px]">
              {points.map((p, i) => (
                <div key={i} title={`${p.date}: ${p.total}`} className="flex-1 rounded-t bg-sky/70 hover:bg-sky"
                  style={{ height: `${Math.max(2, (p.total / max) * 100)}%` }} />
              ))}
            </div>
          )}
        </div>
        <div className="rounded bg-surface p-4 shadow-sm ring-1 ring-line">
          <h2 className="mb-3 text-md font-semibold text-ink">Troncos</h2>
          {(trunks.data ?? []).length === 0 ? (
            <div className="grid h-56 place-items-center text-sm text-ink-secondary">
              {trunks.isLoading ? 'Carregando…' : 'Nenhum tronco cadastrado'}
            </div>
          ) : (
            <ul className="max-h-56 space-y-2 overflow-auto text-sm">
              {trunks.data!.map((t) => (
                <li key={t.id} className="flex items-center justify-between">
                  <span className="text-ink">{t.trunkcode}</span>
                  {Number(t.registered) === 1
                    ? <Badge tone="success">Registrado</Badge>
                    : <Badge tone="danger">Caído</Badge>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
