import { useMemo, useRef } from 'react';
import type { GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { userTypeResource, UserType } from './api';
import { userTypeColumns } from './columns';

export function UserTypePage() {
  const datasource = useMemo(() => makeInfiniteDatasource<UserType>(userTypeResource), []);
  const api = useRef<GridApi<UserType> | null>(null);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Tipos de usuário</h1>
          <p className="text-sm text-ink-secondary">Perfis base usados pelos grupos de usuário.</p></div>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<UserType> columns={userTypeColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<UserType>) => { api.current = e.api; } }} />
      </div>
    </div>
  );
}
