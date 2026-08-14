import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useAuth } from '@/auth/AuthProvider';
import { configurationResource, Configuration } from './api';
import { configurationColumns } from './columns';
import { ConfigurationForm } from './ConfigurationForm';

export function ConfigurationPage() {
  const { user } = useAuth();
  const datasource = useMemo(() => makeInfiniteDatasource<Configuration>(configurationResource), []);
  const api = useRef<GridApi<Configuration> | null>(null);
  const [editing, setEditing] = useState<Configuration | null>(null);
  const [open, setOpen] = useState(false);

  if (!user?.isAdmin) {
    return (
      <div className="flex h-[calc(100vh-92px)] items-center justify-center">
        <p className="rounded-sm bg-warning-bg px-4 py-3 text-sm text-warning-strong">
          Acesso restrito. Apenas administradores podem ver as configurações do sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Configurações do sistema</h1>
          <p className="text-sm text-ink-secondary">Parâmetros chave/valor. Clique numa linha para editar.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova configuração</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Configuration> columns={configurationColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Configuration>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Configuration>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <ConfigurationForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
