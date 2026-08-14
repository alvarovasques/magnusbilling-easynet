import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { KpiCard } from '@/design-system/components/KpiCard';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { Resource } from '@/api/crud';
import { brl, int } from '@/lib/format';
import {
  ReportRow, getReportTotals,
  callSummaryPerDayResource, callSummaryPerMonthResource, callSummaryPerUserResource,
  callSummaryPerTrunkResource, callFailedResource,
} from './api';
import {
  summaryPerDayColumns, summaryPerMonthColumns, summaryPerUserColumns,
  summaryPerTrunkColumns, callFailedColumns,
} from './columns';

interface ReportTab {
  key: string;
  label: string;
  description: string;
  resource: Resource<ReportRow>;
  columns: ColDef<ReportRow>[];
  money: boolean; // summaries mostram KPIs de dinheiro; falhadas mostram só contagem
}

const TABS: ReportTab[] = [
  { key: 'day', label: 'Resumo por dia', description: 'Chamadas agregadas por dia.', resource: callSummaryPerDayResource, columns: summaryPerDayColumns, money: true },
  { key: 'month', label: 'Resumo por mês', description: 'Chamadas agregadas por mês.', resource: callSummaryPerMonthResource, columns: summaryPerMonthColumns, money: true },
  { key: 'user', label: 'Resumo por usuário', description: 'Chamadas agregadas por cliente.', resource: callSummaryPerUserResource, columns: summaryPerUserColumns, money: true },
  { key: 'trunk', label: 'Resumo por tronco', description: 'Chamadas agregadas por tronco de saída.', resource: callSummaryPerTrunkResource, columns: summaryPerTrunkColumns, money: true },
  { key: 'failed', label: 'Chamadas falhadas', description: 'Tentativas de chamada não completadas.', resource: callFailedResource, columns: callFailedColumns, money: false },
];

function ReportView({ tab }: { tab: ReportTab }) {
  const datasource = useMemo(() => makeInfiniteDatasource<ReportRow>(tab.resource), [tab.resource]);
  const totals = useQuery({
    queryKey: ['reports', tab.key, 'totals'],
    queryFn: () => getReportTotals(tab.resource, tab.money ? 2000 : 1),
  });
  const t = totals.data;
  const loading = totals.isLoading;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <KpiCard label="Registros" value={loading ? '…' : int(t?.count)} />
        {tab.money && <KpiCard label="Atendidas" value={loading ? '…' : int(t?.sumnbcall)} />}
        {tab.money && <KpiCard label="Faturado" value={loading ? '…' : brl(t?.sumsessionbill)} />}
        {tab.money && <KpiCard label="Lucro" value={loading ? '…' : brl(t?.sumlucro)} />}
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<ReportRow> columns={tab.columns} datasource={datasource} />
      </div>
    </div>
  );
}

export function ReportsPage() {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((x) => x.key === active) ?? TABS[0];

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">Relatórios</h1>
        <p className="text-sm text-ink-secondary">{tab.description}</p>
      </div>
      <div className="mb-4 flex gap-1 border-b border-line">
        {TABS.map((x) => (
          <button
            key={x.key}
            onClick={() => setActive(x.key)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              x.key === active
                ? 'border-primary text-primary'
                : 'border-transparent text-ink-secondary hover:text-ink'
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <ReportView key={tab.key} tab={tab} />
    </div>
  );
}
