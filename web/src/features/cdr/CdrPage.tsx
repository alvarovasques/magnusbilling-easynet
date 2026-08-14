import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { KpiCard } from '@/design-system/components/KpiCard';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { brl, int } from '@/lib/format';
import { callResource, Call, getCallTotals, csvUrl } from './api';
import { cdrColumns } from './columns';

export function CdrPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Call>(callResource), []);
  const totals = useQuery({ queryKey: ['cdr', 'totals'], queryFn: getCallTotals });
  const download = (preset: 'Padrao' | 'Anatel') => window.open(csvUrl(preset), '_blank');

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Bilhetes / CDR</h1>
          <p className="text-sm text-ink-secondary">Registros de chamada. Exporte no layout padrão ou Anatel.</p></div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => download('Padrao')}><Download size={16} /> CSV</Button>
          <Button onClick={() => download('Anatel')}><Download size={16} /> Anatel</Button>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard label="Chamadas" value={totals.isLoading ? '…' : int(totals.data?.totalCall)} />
        <KpiCard label="Faturado" value={totals.isLoading ? '…' : brl(totals.data?.sumsessionbill)} />
        <KpiCard label="Custo" value={totals.isLoading ? '…' : brl(totals.data?.sumbuycost)} />
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Call> columns={cdrColumns} datasource={datasource} />
      </div>
    </div>
  );
}
