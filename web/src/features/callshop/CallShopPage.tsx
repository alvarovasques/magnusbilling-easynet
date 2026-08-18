import { useMemo, useRef, useState } from 'react';
import { Plus, Unlock, Receipt } from 'lucide-react';
import type { GridApi, GridReadyEvent, RowClickedEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Button } from '@/design-system/components/Button';
import { DeleteAction } from '@/design-system/components/DeleteAction';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { useDelete } from '@/api/hooks';
import { callShopResource, CallShop, liberarCabine, cobrarCabine } from './api';
import { callShopColumns } from './columns';
import { CallShopForm } from './CallShopForm';

export function CallShopPage() {
  const datasource = useMemo(() => makeInfiniteDatasource<CallShop>(callShopResource), []);
  const api = useRef<GridApi<CallShop> | null>(null);
  const [editing, setEditing] = useState<CallShop | null>(null);
  const [open, setOpen] = useState(false);
  const refresh = () => api.current?.refreshInfiniteCache();
  const del = useDelete(callShopResource);

  const columns: ColDef<CallShop>[] = useMemo(() => [
    ...callShopColumns,
    { headerName: '', width: 128, pinned: 'right', sortable: false, filter: false, resizable: false,
      cellRenderer: (p: any) => {
        const c: CallShop = p.data ?? {};
        if (!c.id) return null;
        return (
          <div className="flex items-center gap-2">
            <button title="Liberar cabine" className="text-success-strong hover:text-success"
              onClick={async (e) => { e.stopPropagation(); await liberarCabine(c.id!); refresh(); }}><Unlock size={16} /></button>
            <button title="Cobrar / fechar" className="text-warning-strong hover:text-warning"
              onClick={async (e) => { e.stopPropagation(); await cobrarCabine(c.id!); refresh(); }}><Receipt size={16} /></button>
            <DeleteAction message="Excluir esta cabine remove a conta SIP (pkg_sip) associada. Esta ação não pode ser desfeita."
              onConfirm={async () => { await del.mutateAsync(c.id!); refresh(); }} />
          </div>
        );
      } },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div><h1 className="text-lg font-semibold text-ink">CallShop / Cabines</h1>
          <p className="text-sm text-ink-secondary">Cabines das lojas. Libere para uso ou feche a conta pelos ícones.</p></div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}><Plus size={16} /> Nova cabine</Button>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<CallShop> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<CallShop>) => { api.current = e.api; },
            onRowClicked: (e: RowClickedEvent<CallShop>) => { if (e.data) { setEditing(e.data); setOpen(true); } },
            rowStyle: { cursor: 'pointer' } }} />
      </div>
      <CallShopForm open={open} initial={editing} onClose={() => setOpen(false)} onSaved={refresh} />
    </div>
  );
}
