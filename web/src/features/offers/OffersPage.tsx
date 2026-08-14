import { useMemo, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { offerResource, Offer } from './api';
import { offerColumns } from './columns';
import { OfferForm } from './OfferForm';

export function OffersPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<Offer>(offerResource), []);
  const api = useRef<GridApi<Offer> | null>(null);
  const [editing, setEditing] = useState<Offer | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">Ofertas</h1>
          <p className="text-sm text-ink-secondary">Pacotes e ofertas comerciais oferecidos aos clientes.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova oferta</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<Offer> columns={offerColumns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<Offer>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<Offer>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <OfferForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={() => api.current?.refreshInfiniteCache()} />
    </div>
  );
}
