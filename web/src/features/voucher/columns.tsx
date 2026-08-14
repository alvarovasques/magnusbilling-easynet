import type { ColDef } from 'ag-grid-community';
import { Voucher } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
export const voucherColumns: ColDef<Voucher>[] = [
  { field: 'voucher', headerName: 'Voucher', minWidth: 160, pinned: 'left' },
  { field: 'credit', headerName: 'Valor', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'tag', headerName: 'Tag', minWidth: 120 },
  { field: 'used', headerName: 'Status', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="neutral">Usado</Badge> : <Badge tone="success">Disponível</Badge>) },
  { field: 'idUserusername', headerName: 'Usado por', minWidth: 150 },
  { field: 'expirationdate', headerName: 'Expira em', minWidth: 160 },
];
