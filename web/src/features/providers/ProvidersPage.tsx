import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useAuth } from '@/auth/AuthProvider';
import { providerResource, Provider } from './api';
import { providerColumns } from './columns';
import { ProviderForm } from './ProviderForm';

export function ProvidersPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<Provider>(providerResource), []);
  const api = useRef<GridApi<Provider> | null>(null);
  const [editing, setEditing] = useState<Provider | null>(null);
  const [open, setOpen] = useState(false);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem gerenciar provedores.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Provedores</h1>
          <p className="text-sm text-ink-secondary">Operadoras/provedores usados pelas rotas de saída.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo provedor</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Provider> columns={providerColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Provider>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Provider>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <ProviderForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
