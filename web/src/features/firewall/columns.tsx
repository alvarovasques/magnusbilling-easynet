import type { ColDef } from 'ag-grid-community';
import { Firewall } from './api';
import { Badge } from '@/design-system/components/Badge';
export const firewallColumns: ColDef<Firewall>[] = [
  { field: 'ip', headerName: 'IP', minWidth: 150, pinned: 'left' },
  { field: 'action', headerName: 'Ação', minWidth: 130, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 3
      ? <Badge tone="success">Liberado</Badge>
      : <Badge tone="danger">Bloqueado</Badge>) },
  { field: 'jail', headerName: 'Jail', minWidth: 140 },
  { field: 'idServername', headerName: 'Servidor', minWidth: 150 },
  { field: 'date', headerName: 'Data', minWidth: 160 },
  { field: 'description', headerName: 'Descrição', minWidth: 220, flex: 1 },
];
