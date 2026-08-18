import type { ColDef } from 'ag-grid-community';
import { PhoneBook } from './api';
import { Badge } from '@/design-system/components/Badge';

export const phoneBookColumns: ColDef<PhoneBook>[] = [
  { field: 'name', headerName: 'Nome', minWidth: 160, pinned: 'left', filter: true },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'status', headerName: 'Status', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
  { field: 'description', headerName: 'Descrição', minWidth: 250, flex: 1 },
];
