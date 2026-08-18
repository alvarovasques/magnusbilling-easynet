import { useMemo, useRef } from 'react';
import type { GridApi, GridReadyEvent, ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { Badge } from '@/design-system/components/Badge';
import { PhoneOff } from 'lucide-react';
import { callOnlineResource, CallOnline, hangupCall } from './api';

export function CallOnlinePage() {
  const datasource = useMemo(() => makeInfiniteDatasource<CallOnline>(callOnlineResource), []);
  const api = useRef<GridApi<CallOnline> | null>(null);

  // O backend derruba pelo canal (canal), não pelo id do registro.
  const hangup = async (canal?: string) => {
    if (!canal) return;
    await hangupCall(canal);
    api.current?.refreshInfiniteCache();
  };

  // Filtro só em coluna real do pkg_call_online (sip_account, ndiscado). status/badge é
  // sortable:false; a coluna de ação não filtra/ordena.
  const columns: ColDef<CallOnline>[] = useMemo(() => [
    { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
    { field: 'sip_account', headerName: 'Origem', minWidth: 140, filter: true },
    { field: 'ndiscado', headerName: 'Destino', minWidth: 150, filter: true },
    { field: 'tronco', headerName: 'Tronco', minWidth: 130 },
    { field: 'duration', headerName: 'Duração', minWidth: 110, type: 'rightAligned',
      valueFormatter: (p) => { const s = Number(p.value ?? 0); return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`; } },
    { field: 'status', headerName: 'Status', minWidth: 120, sortable: false,
      cellRenderer: (p: any) => <Badge tone={String(p.value).toUpperCase().includes('UP') ? 'success' : 'info'}>{p.value || '—'}</Badge> },
    { field: 'server', headerName: 'Servidor', minWidth: 120 },
    { headerName: '', width: 60, pinned: 'right', sortable: false, filter: false,
      cellRenderer: (p: any) => (
        <button title="Derrubar chamada" className="text-danger hover:text-danger-strong" onClick={() => hangup(p.data?.canal)}>
          <PhoneOff size={16} />
        </button>
      ) },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">Chamadas ativas</h1>
        <p className="text-sm text-ink-secondary">Chamadas em andamento em tempo real. Derrube um canal pelo ícone.</p>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<CallOnline> columns={columns} datasource={datasource}
          gridOptions={{ onGridReady: (e: GridReadyEvent<CallOnline>) => { api.current = e.api; } }} />
      </div>
    </div>
  );
}
