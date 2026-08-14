import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { sipurasResource, Sipuras } from './api';
import { sipurasColumns } from './columns';
import { SipurasForm } from './SipurasForm';

export function SipurasPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Sipuras>(sipurasResource), []);
  const gridApi = useRef<GridApi<Sipuras> | null>(null);
  const [editing, setEditing] = useState<Sipuras | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<Sipuras>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">ATA Linksys / Sipuras</h1>
          <p className="text-sm text-ink-secondary">Adaptadores telefônicos (ATA) Linksys/Sipura entregues aos clientes.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Novo ATA</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Sipuras> columns={sipurasColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Sipuras>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <SipurasForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
