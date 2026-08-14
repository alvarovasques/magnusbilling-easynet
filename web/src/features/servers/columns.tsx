import type { ColDef } from 'ag-grid-community';
import { Server } from './api';
import { Badge } from '@/design-system/components/Badge';
export const serversColumns: ColDef<Server>[] = [
  { field: 'name', headerName: 'Nome', minWidth: 160, pinned: 'left' },
  { field: 'host', headerName: 'Host', minWidth: 160 },
  { field: 'type', headerName: 'Tipo', minWidth: 120 },
  { field: 'sip_port', headerName: 'Porta SIP', minWidth: 110 },
  { field: 'public_ip', headerName: 'IP público', minWidth: 150 },
  { field: 'weight', headerName: 'Peso', minWidth: 100, type: 'rightAligned' },
  { field: 'status', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
  { field: 'description', headerName: 'Descrição', minWidth: 200, flex: 1 },
];
