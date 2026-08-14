import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { refillResource, Refill } from './api';
import { refillColumns } from './columns';
import { RefillForm } from './RefillForm';

export function RefillPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Refill>(refillResource), []);
  const api = useRef<GridApi<Refill> | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Recargas</h1>
          <p className="text-sm text-ink-secondary">Créditos que entram. Alimenta o KPI de recargas do mês.</p></div>
        <Button onClick={() => setOpen(true)}><Plus size={16} /> Nova recarga</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Refill> columns={refillColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Refill>) => { api.current = e.api; } }} />
      </div>
      <RefillForm open={open} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
