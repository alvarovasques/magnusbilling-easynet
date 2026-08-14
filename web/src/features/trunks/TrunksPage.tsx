import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { trunkResource, Trunk } from './api';
import { trunkColumns } from './columns';
import { TrunkForm } from './TrunkForm';

export function TrunksPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Trunk>(trunkResource), []);
  const api = useRef<GridApi<Trunk> | null>(null);
  const [editing, setEditing] = useState<Trunk | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Rotas / Troncos de saída</h1>
          <p className="text-sm text-ink-secondary">Interconexões com as operadoras. Onde vive o custo de terminação.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo tronco</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Trunk> columns={trunkColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Trunk>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Trunk>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <TrunkForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
