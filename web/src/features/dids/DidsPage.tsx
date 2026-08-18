import { useMemo, useRef, useState } from 'react';
import { Plus, Unlink } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { didResource, Did, liberarDid } from './api';
import { didColumns } from './columns';
import { DidForm } from './DidForm';

export function DidsPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Did>(didResource), []);
  const api = useRef<GridApi<Did> | null>(null);
  const [editing, setEditing] = useState<Did | null>(null);
  const [open, setOpen] = useState(false);
  const refresh = () => api.current?.refreshInfiniteCache();
  const del = useDelete(didResource);

  const columns: ColDef<Did>[] = useMemo(() => [
    ...didColumns,
    { headerName: '', width: 92, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => (
        <div className="flex items-center gap-3">
          {Number(p.data?.id_user) > 0
            ? <button title="Liberar (devolver ao pool)" className="text-warning-strong hover:text-warning"
                onClick={async (e) => { e.stopPropagation(); await liberarDid(p.data.id); refresh(); }}><Unlink size={16} /></button>
            : null}
          <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); refresh(); }} />
        </div>) },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Numeração / DIDs</h1>
          <p className="text-sm text-ink-secondary">Inventário de numeração: disponível, reservado ou ativo. Libere pelo ícone.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo DID</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Did> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Did>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Did>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <DidForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
