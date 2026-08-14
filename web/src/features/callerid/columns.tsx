import type { ColDef } from 'ag-grid-community';
import { Callerid } from './api';
import { Badge } from '@/design-system/components/Badge';

const isOn = (v: unknown) => String(v) === 't' || String(v) === '1';

export const calleridColumns: ColDef<Callerid>[] = [
  { field: 'cid', headerName: 'CallerID', minWidth: 150, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'name', headerName: 'Nome', minWidth: 150 },
  { field: 'activated', headerName: 'Status', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (isOn(p.value) ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
  { field: 'description', headerName: 'Descrição', minWidth: 200, flex: 1 },
];
