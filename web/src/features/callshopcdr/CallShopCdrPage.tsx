import { useMemo } from 'react';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { callShopCdrResource, CallShopCdr } from './api';
import { callShopCdrColumns } from './columns';

export function CallShopCdrPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<CallShopCdr>(callShopCdrResource), []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">CallShop / Bilhetes</h1>
          <p className="text-sm text-ink-secondary">Registros de chamada por cabine, com valor, custo e markup.</p></div>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<CallShopCdr> columns={callShopCdrColumns} datasource={datasource} />
      </div>
    </div>
  );
}
