import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { useAuth } from '@/auth/AuthProvider';
import { groupUserResource, GroupUser } from './api';
import { groupUserColumns } from './columns';
import { GroupUserForm } from './GroupUserForm';

export function GroupUserPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<GroupUser>(groupUserResource), []);
  const api = useRef<GridApi<GroupUser> | null>(null);
  const [editing, setEditing] = useState<GroupUser | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(groupUserResource);

  const columns: ColDef<GroupUser>[] = useMemo(() => [
    ...groupUserColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem ver os grupos de usuário.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Grupos de usuário</h1>
          <p className="text-sm text-ink-secondary">Controle de acesso (RBAC): permissões e visibilidade por grupo.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo grupo</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<GroupUser> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<GroupUser>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<GroupUser>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <GroupUserForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
