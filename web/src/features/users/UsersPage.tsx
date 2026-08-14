import { useMemo, useRef, useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { userResource, User } from './api';
import { userColumns } from './columns';
import { UserForm } from './UserForm';
import { RefillForm } from '@/features/refill/RefillForm';
import type { ColDef } from 'ag-grid-community';

export function UsersPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<User>(userResource), []);
  const api = useRef<GridApi<User> | null>(null);
  const [editing, setEditing] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [refillUser, setRefillUser] = useState<number | undefined>();
  const [refillOpen, setRefillOpen] = useState(false);

  const columns: ColDef<User>[] = useMemo(() => [
    ...userColumns,
    { headerName: '', width: 60, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => (
        <button title="Recarregar" className="text-primary hover:text-primary-hover"
          onClick={(e) => { e.stopPropagation(); setRefillUser(p.data?.id); setRefillOpen(true); }}>
          <Wallet size={16} />
        </button>
      ) },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Clientes</h1>
          <p className="text-sm text-ink-secondary">Donos das contas SIP e do crédito. Recarregue pelo ícone à direita.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo cliente</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<User> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<User>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<User>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <UserForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
      <RefillForm open={refillOpen} presetUserId={refillUser} onClose={() => setRefillOpen(false)} />
    </div>
  );
}
