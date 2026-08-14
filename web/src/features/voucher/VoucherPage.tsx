import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { voucherResource, Voucher } from './api';
import { voucherColumns } from './columns';
import { VoucherForm } from './VoucherForm';

export function VoucherPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Voucher>(voucherResource), []);
  const api = useRef<GridApi<Voucher> | null>(null);
  const [editing, setEditing] = useState<Voucher | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Vouchers</h1>
          <p className="text-sm text-ink-secondary">Cartões de crédito pré-pago para recarga de saldo.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Novo voucher</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Voucher> columns={voucherColumns} datasource={datasource}
          gridOptions={{
            onGridReady: (e: GridReadyEvent<Voucher>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Voucher>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' },
          }} />
      </div>
      <VoucherForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
