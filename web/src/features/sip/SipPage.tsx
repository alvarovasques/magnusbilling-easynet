import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { sipResource, Sip } from './api';
import { sipColumns } from './columns';
import { SipForm } from './SipForm';

export function SipPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Sip>(sipResource), []);
  const gridApi = useRef<GridApi<Sip> | null>(null);
  const [editing, setEditing] = useState<Sip | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(sipResource);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<Sip>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  const columns: ColDef<Sip>[] = useMemo(() => [
    ...sipColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); refresh(); }} /> },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">Contas SIP</h1>
          <p className="text-sm text-ink-secondary">Troncos e ramais entregues aos clientes. Registro em tempo real.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Nova conta SIP</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Sip> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Sip>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <SipForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
