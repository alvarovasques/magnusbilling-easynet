import type { ColDef } from 'ag-grid-community';
import { Sipuras } from './api';
import { Badge } from '@/design-system/components/Badge';

export const sipurasColumns: ColDef<Sipuras>[] = [
  { field: 'macadr', headerName: 'MAC', minWidth: 150, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'marca', headerName: 'Marca', minWidth: 100 },
  { field: 'User_ID_1', headerName: 'Linha 1', minWidth: 120 },
  { field: 'last_ip', headerName: 'Último IP', minWidth: 130 },
  { field: 'altera', headerName: 'Provisionar', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (String(p.value) === 'si' ? <Badge tone="warning">Pendente</Badge> : <Badge tone="success">Aplicado</Badge>) },
  { field: 'fultmov', headerName: 'Últ. movimento', minWidth: 160 },
];
