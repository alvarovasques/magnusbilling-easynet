import type { ColDef } from 'ag-grid-community';
import { Sip } from './api';
import { Badge } from '@/design-system/components/Badge';

function StatusCell({ value }: { value?: string }) {
  const s = (value || '').toUpperCase();
  if (s.includes('OK') || s.includes('REACH')) return <Badge tone="success">Registrado</Badge>;
  if (s.includes('UNREG')) return <Badge tone="warning">Não registrado</Badge>;
  if (s.includes('UNAVAIL') || s.includes('LAG')) return <Badge tone="danger">Indisponível</Badge>;
  return <Badge tone="neutral">{value || '—'}</Badge>;
}

export const sipColumns: ColDef<Sip>[] = [
  { field: 'name', headerName: 'Usuário SIP', minWidth: 150, pinned: 'left', filter: true },
  // idUserusername é extraValue de relação (idUser->username): NÃO filtrar.
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'lineStatus', headerName: 'Registro', minWidth: 150, cellRenderer: StatusCell, filter: false, sortable: false },
  { field: 'callerid', headerName: 'CallerID', minWidth: 140, filter: true },
  { field: 'host', headerName: 'Host', minWidth: 120, filter: true },
  { field: 'allow', headerName: 'Codecs', minWidth: 140, filter: true },
  { field: 'sip_group', headerName: 'Grupo', minWidth: 110, filter: true },
];
