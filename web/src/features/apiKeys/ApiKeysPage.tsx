import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useAuth } from '@/auth/AuthProvider';
import { apiKeysResource, ApiKey } from './api';
import { apiKeysColumns } from './columns';
import { ApiKeysForm } from './ApiKeysForm';

export function ApiKeysPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<ApiKey>(apiKeysResource), []);
  const api = useRef<GridApi<ApiKey> | null>(null);
  const [editing, setEditing] = useState<ApiKey | null>(null);
  const [open, setOpen] = useState(false);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem ver as chaves de API.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Chaves de API</h1>
          <p className="text-sm text-ink-secondary">Chaves de integração da API. Clique numa linha para editar.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova chave</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<ApiKey> columns={apiKeysColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<ApiKey>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<ApiKey>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <ApiKeysForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
