import type { ColDef } from 'ag-grid-community';
import { GroupUser } from './api';
import { Badge } from '@/design-system/components/Badge';
const yesNo = (v: unknown) => (Number(v) === 1 ? <Badge tone="warning">Sim</Badge> : <Badge tone="neutral">Não</Badge>);
export const groupUserColumns: ColDef<GroupUser>[] = [
  { field: 'name', headerName: 'Grupo', minWidth: 180, pinned: 'left' },
  // idUserTypename é extraValue de relação (idUserType->name), não é coluna da tabela base:
  // não filtrar nem ordenar (ORDER BY dispararia erro de SQL no read).
  { field: 'idUserTypename', headerName: 'Tipo de usuário', minWidth: 160, sortable: false, filter: false },
  { field: 'user_prefix', headerName: 'Prefixo', minWidth: 120 },
  { field: 'hidden_prices', headerName: 'Oculta preços', minWidth: 140, sortable: false, filter: false,
    cellRenderer: (p: any) => yesNo(p.value) },
  { field: 'hidden_batch_update', headerName: 'Oculta edição em lote', minWidth: 180, sortable: false, filter: false,
    cellRenderer: (p: any) => yesNo(p.value) },
];
