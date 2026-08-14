import { apiGet } from '@/api/client';

export interface DashboardKpis {
  totalActiveUsers?: number;
  maximumcc?: string;   // "CC n | CPS n"
  monthprofit?: number;
  monthRefill?: number;
}
// StatusSystemController::actionRead — os KPIs vêm no primeiro item de rows.
export async function fetchKpis(): Promise<DashboardKpis> {
  const r = await apiGet<{ rows: DashboardKpis[] }>('statusSystem/read', { start: 0, limit: 1 });
  return r.rows?.[0] ?? {};
}
