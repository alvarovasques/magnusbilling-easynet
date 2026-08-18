import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { phoneBookResource, PhoneBook } from './api';
import { phoneBookColumns } from './columns';
import { PhoneBookForm } from './PhoneBookForm';

export function PhoneBookPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<PhoneBook>(phoneBookResource), []);
  const gridApi = useRef<GridApi<PhoneBook> | null>(null);
  const [editing, setEditing] = useState<PhoneBook | null>(null);
  const [open, setOpen] = useState(false);
  const del = useDelete(phoneBookResource);

  const refresh = () => gridApi.current?.refreshInfiniteCache();
  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (e: RowClickedEvent<PhoneBook>) => { if (e.data) { setEditing(e.data); setOpen(true); } };

  const columns: ColDef<PhoneBook>[] = useMemo(() => [
    ...phoneBookColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); refresh(); }} /> },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-ink">Agenda</h1>
          <p className="text-sm text-ink-secondary">Contatos da agenda telefônica por cliente.</p>
        </div>
        <Button onClick={openNew}><Plus size={16} /> Novo contato</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<PhoneBook> columns={columns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<PhoneBook>) => { gridApi.current = e.api; },
            onRowClicked: openEdit,
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <PhoneBookForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
