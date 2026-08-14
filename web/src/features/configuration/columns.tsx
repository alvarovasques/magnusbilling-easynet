import type { ColDef } from 'ag-grid-community';
import { Configuration } from './api';
import { Badge } from '@/design-system/components/Badge';
export const configurationColumns: ColDef<Configuration>[] = [
  { field: 'config_group_title', headerName: 'Grupo', minWidth: 160, pinned: 'left' },
  { field: 'config_title', headerName: 'Nome', minWidth: 200,
    valueGetter: (p) => p.data?.config_title || p.data?.config_key },
  { field: 'config_value', headerName: 'Valor', minWidth: 160 },
  { field: 'config_description', headerName: 'Descrição', minWidth: 240, flex: 1 },
  { field: 'status', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
];
