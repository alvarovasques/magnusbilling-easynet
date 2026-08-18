import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { planResource, Plan } from './api';
import { planColumns } from './columns';
import { PlanForm } from './PlanForm';

export function PlansPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Plan>(planResource), []);
  const api = useRef<GridApi<Plan> | null>(null);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(planResource);

  const columns: ColDef<Plan>[] = useMemo(() => [
    ...planColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Planos</h1>
          <p className="text-sm text-ink-secondary">Planos comerciais referenciados por clientes e tarifas.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo plano</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Plan> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Plan>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Plan>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <PlanForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
