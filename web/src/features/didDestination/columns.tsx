import type { ColDef } from 'ag-grid-community';
import { DidDestination } from './api';
import { Badge } from '@/design-system/components/Badge';

// "Destino" legível a partir do que estiver preenchido (client-side, sem risco).
function destinoText(d: DidDestination): string {
  if (d.idSipname || d.id_sip) return `Conta SIP: ${d.idSipname ?? d.id_sip}`;
  if (d.idIvrname || d.id_ivr) return `URA: ${d.idIvrname ?? d.id_ivr}`;
  if (d.idQueuename || d.id_queue) return `Fila: ${d.idQueuename ?? d.id_queue}`;
  if (d.destination) return `Externo: ${d.destination}`;
  return '—';
}
export const didDestinationColumns: ColDef<DidDestination>[] = [
  { field: 'idDiddid', headerName: 'DID (número)', minWidth: 160, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { headerName: 'Destino', minWidth: 200, flex: 1, sortable: false,
    valueGetter: (p) => (p.data ? destinoText(p.data) : '') },
  { field: 'activated', headerName: 'Ativo', minWidth: 100, sortable: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
];
