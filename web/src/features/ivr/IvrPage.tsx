import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { ivrResource, Ivr } from './api';
import { ivrColumns } from './columns';
import { IvrForm } from './IvrForm';

export function IvrPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Ivr>(ivrResource), []);
  const api = useRef<GridApi<Ivr> | null>(null);
  const [editing, setEditing] = useState<Ivr | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(ivrResource);

  const columns: ColDef<Ivr>[] = useMemo(() => [
    ...ivrColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => {
        if (!p.data?.id) return null;
        return <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} />;
      } },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">URA / IVR</h1>
          <p className="text-sm text-ink-secondary">Menus de atendimento por voz. Destino usado pelas campanhas de torpedo.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova URA</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Ivr> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Ivr>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Ivr>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <IvrForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
