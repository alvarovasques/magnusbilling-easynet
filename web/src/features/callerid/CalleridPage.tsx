import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { calleridResource, Callerid } from './api';
import { calleridColumns } from './columns';
import { CalleridForm } from './CalleridForm';

export function CalleridPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Callerid>(calleridResource), []);
  const gridApi = useRef<GridApi<Callerid> | null>(null);
  const [editing, setEditing] = useState<Callerid | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<Callerid>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">CallerID</h1>
          <p className="text-sm text-ink-secondary">Bilhetes de identificação de chamada autorizados por cliente.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Novo CallerID</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Callerid> columns={calleridColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Callerid>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <CalleridForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
