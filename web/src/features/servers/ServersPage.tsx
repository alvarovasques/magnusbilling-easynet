import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { serversResource, Server } from './api';
import { serversColumns } from './columns';
import { ServersForm } from './ServersForm';

export function ServersPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Server>(serversResource), []);
  const api = useRef<GridApi<Server> | null>(null);
  const [editing, setEditing] = useState<Server | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Servidores</h1>
          <p className="text-sm text-ink-secondary">Servidores Asterisk/mídia do sistema.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo servidor</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Server> columns={serversColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Server>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Server>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <ServersForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
