import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { useAuth } from '@/auth/AuthProvider';
import { trunkResource, Trunk } from './api';
import { trunkColumns } from './columns';
import { TrunkForm } from './TrunkForm';

export function TrunksPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<Trunk>(trunkResource), []);
  const api = useRef<GridApi<Trunk> | null>(null);
  const [editing, setEditing] = useState<Trunk | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(trunkResource);

  const columns: ColDef<Trunk>[] = useMemo(() => [
    ...trunkColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);

  // Módulo 'trunk' é only_admin no backend (permissions.php).
  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem gerenciar troncos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Rotas / Troncos de saída</h1>
          <p className="text-sm text-ink-secondary">Interconexões com as operadoras. Onde vive o custo de terminação.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo tronco</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Trunk> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Trunk>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Trunk>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <TrunkForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
