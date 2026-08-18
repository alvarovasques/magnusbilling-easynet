import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { didDestinationResource, DidDestination } from './api';
import { didDestinationColumns } from './columns';
import { DidDestinationForm } from './DidDestinationForm';

export function DidDestinationPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<DidDestination>(didDestinationResource), []);
  const api = useRef<GridApi<DidDestination> | null>(null);
  const del = useDelete(didDestinationResource);
  const [editing, setEditing] = useState<DidDestination | null>(null);
  const [open, setOpen] = useState(false);
  const refresh = () => api.current?.refreshInfiniteCache();

  const columns: ColDef<DidDestination>[] = useMemo(() => [
    ...didDestinationColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); refresh(); }} /> },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Destino dos DIDs (entrada)</h1>
          <p className="text-sm text-ink-secondary">Para onde cada número de entrada toca: conta SIP, URA, fila ou número externo.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo destino</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<DidDestination> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<DidDestination>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<DidDestination>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <DidDestinationForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
