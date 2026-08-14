import { useMemo } from 'react';
import type { ColDef } from 'ag-grid-community';
import { DataGrid } from '@/design-system/components/DataGrid';
import { Badge } from '@/design-system/components/Badge';
import { makeInfiniteDatasource } from '@/api/aggrid';
import { sipTraceResource, SipPacket } from './api';

// Tom do badge conforme a família do código de resposta SIP (2xx ok, 4xx+ erro…).
function methodTone(method?: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
  const code = Number(String(method ?? '').trim().slice(0, 1));
  if (code === 2) return 'success';
  if (code === 1) return 'info';
  if (code === 3) return 'warning';
  if (code === 4 || code === 5 || code === 6) return 'danger';
  return 'neutral';
}

export function SipTracePage() {
  const datasource = useMemo(() => makeInfiniteDatasource<SipPacket>(sipTraceResource), []);

  const columns: ColDef<SipPacket>[] = useMemo(() => [
    { field: 'method', headerName: 'Método / Resposta', minWidth: 170, pinned: 'left',
      cellRenderer: (p: any) => <Badge tone={methodTone(p.value)}>{p.value || '—'}</Badge> },
    { field: 'fromip', headerName: 'Origem (IP)', minWidth: 200 },
    { field: 'toip', headerName: 'Destino (IP)', minWidth: 200 },
    { field: 'sipto', headerName: 'SIP To', minWidth: 220 },
    { field: 'callid', headerName: 'Call-ID', minWidth: 260, flex: 1 },
  ], []);

  return (
    <div className="flex h-[calc(100vh-92px)] flex-col">
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-ink">SIP Trace / Depuração SIP</h1>
        <p className="text-sm text-ink-secondary">Pacotes SIP capturados para depurar registro e chamada. Filtre por método, IP ou Call-ID.</p>
      </div>
      <div className="flex-1 overflow-hidden rounded ring-1 ring-line">
        <DataGrid<SipPacket> columns={columns} datasource={datasource} />
      </div>
    </div>
  );
}
