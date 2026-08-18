import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { rateResource, Rate } from './api';
import { rateColumns } from './columns';
import { RateForm } from './RateForm';

export function RatesPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Rate>(rateResource), []);
  const api = useRef<GridApi<Rate> | null>(null);
  const [editing, setEditing] = useState<Rate | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(rateResource);

  const columns: ColDef<Rate>[] = useMemo(() => [
    ...rateColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Tarifas</h1>
          <p className="text-sm text-ink-secondary">Preço de venda por prefixo/destino, plano e tronco.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova tarifa</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Rate> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Rate>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Rate>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <RateForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
