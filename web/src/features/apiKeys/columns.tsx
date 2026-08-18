import type { ColDef } from 'ag-grid-community';
import { ApiKey } from './api';
import { Badge } from '@/design-system/components/Badge';
export const apiKeysColumns: ColDef<ApiKey>[] = [
  // idUserusername é extraValue de relação (idUser->username), não é coluna da tabela base:
  // não filtrar nem ordenar (ORDER BY dispararia erro de SQL no read).
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 160, pinned: 'left', sortable: false, filter: false },
  { field: 'api_key', headerName: 'Chave (api_key)', minWidth: 260, flex: 1 },
  { field: 'api_restriction_ips', headerName: 'IPs permitidos', minWidth: 180 },
  { field: 'action', headerName: 'Ação', minWidth: 120 },
  { field: 'status', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
];
