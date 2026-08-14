import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { methodpayResource, Methodpay } from './api';
import { methodpayColumns } from './columns';
import { MethodpayForm } from './MethodpayForm';

export function MethodpayPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Methodpay>(methodpayResource), []);
  const api = useRef<GridApi<Methodpay> | null>(null);
  const [editing, setEditing] = useState<Methodpay | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Formas de pagamento</h1>
          <p className="text-sm text-ink-secondary">Gateways e métodos disponíveis para recarga dos clientes.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova forma</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Methodpay> columns={methodpayColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Methodpay>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Methodpay>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <MethodpayForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
