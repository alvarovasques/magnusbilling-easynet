import { useMemo, useRef } from 'react';
import type { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { userTypeResource, UserType } from './api';
import { userTypeColumns } from './columns';

export function UserTypePage() {
  const datasource = useMemo(() => makeInfiniteDatasource<UserType>(userTypeResource), []);
  const api = useRef<GridApi<UserType> | null>(null);
  const del = useDelete(userTypeResource);

  const columns: ColDef<UserType>[] = useMemo(() => [
    ...userTypeColumns,
    { headerName: '', width: 56, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => <DeleteAction onConfirm={async () => { await del.mutateAsync(p.data.id); api.current?.refreshInfiniteCache(); }} /> },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Tipos de usuário</h1>
          <p className="text-sm text-ink-secondary">Perfis base usados pelos grupos de usuário.</p></div>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<UserType> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<UserType>) => { api.current = e.api; } }} />
      </div>
    </div>
  );
}
