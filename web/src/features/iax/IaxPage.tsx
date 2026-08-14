import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { iaxResource, Iax } from './api';
import { iaxColumns } from './columns';
import { IaxForm } from './IaxForm';

export function IaxPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Iax>(iaxResource), []);
  const gridApi = useRef<GridApi<Iax> | null>(null);
  const [editing, setEditing] = useState<Iax | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<Iax>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">Contas IAX</h1>
          <p className="text-sm text-ink-secondary">Ramais e troncos IAX2 entregues aos clientes.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Nova conta IAX</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Iax> columns={iaxColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Iax>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <IaxForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
