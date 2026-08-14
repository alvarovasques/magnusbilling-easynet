import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { restrictedPhonenumberResource, RestrictedPhonenumber } from './api';
import { restrictedPhonenumberColumns } from './columns';
import { RestrictedPhonenumberForm } from './RestrictedPhonenumberForm';

export function RestrictedPhonenumberPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<RestrictedPhonenumber>(restrictedPhonenumberResource), []);
  const gridApi = useRef<GridApi<RestrictedPhonenumber> | null>(null);
  const [editing, setEditing] = useState<RestrictedPhonenumber | null>(null);
  const [open, setOpen] = useState(false);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<RestrictedPhonenumber>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">Números bloqueados</h1>
          <p className="text-sm text-ink-secondary">Números com discagem restrita por cliente e direção.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Novo bloqueio</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<RestrictedPhonenumber> columns={restrictedPhonenumberColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<RestrictedPhonenumber>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <RestrictedPhonenumberForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
