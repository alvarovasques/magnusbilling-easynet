import { useMemo, useRef } from 'react';
import type { GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { userHistoryResource, UserHistory } from './api';
import { userHistoryColumns } from './columns';

export function UserHistoryPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<UserHistory>(userHistoryResource), []);
  const api = useRef<GridApi<UserHistory> | null>(null);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">Histórico do cliente</h1>
        <p className="text-sm text-ink-secondary">Registro cronológico de alterações e eventos por cliente.</p>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<UserHistory> columns={userHistoryColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<UserHistory>) => { api.current = e.api; } }} />
      </div>
    </div>
  );
}
