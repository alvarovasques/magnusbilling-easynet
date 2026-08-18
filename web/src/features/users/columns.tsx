import type { ColDef } from 'ag-grid-community';
import { User } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
export const userColumns: ColDef<User>[] = [
  { field: 'username', headerName: 'Usuário', minWidth: 150, pinned: 'left', filter: true },
  { field: 'active', headerName: 'Status', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
  { field: 'credit', headerName: 'Saldo', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'creditlimit', headerName: 'Limite', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'typepaid', headerName: 'Tipo', minWidth: 110, valueFormatter: (p) => (Number(p.value) === 1 ? 'Pós-pago' : 'Pré-pago') },
  { field: 'idGroupname', headerName: 'Grupo', minWidth: 130 },
  { field: 'email', headerName: 'E-mail', minWidth: 200, flex: 1 },
];
