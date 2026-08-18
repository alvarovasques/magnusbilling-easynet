import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { prefixResource, Prefix } from './api';
import { prefixColumns } from './columns';
import { PrefixForm } from './PrefixForm';

export function PrefixesPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Prefix>(prefixResource), []);
  const api = useRef<GridApi<Prefix> | null>(null);
  const [editing, setEditing] = useState<Prefix | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(prefixResource);

  const columns: ColDef<Prefix>[] = useMemo(() => [
    ...prefixColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Prefixos / Destinos</h1>
          <p className="text-sm text-ink-secondary">Códigos de destino referenciados pelas tarifas.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo prefixo</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Prefix> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Prefix>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Prefix>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <PrefixForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
