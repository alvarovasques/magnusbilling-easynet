import type { ColDef } from 'ag-grid-community';
import { CallShop, callShopStatus } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));

export const callShopColumns: ColDef<CallShop>[] = [
  { field: 'name', headerName: 'Cabine', minWidth: 160, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Loja / Cliente', minWidth: 160 },
  { field: 'callerid', headerName: 'Bina (CallerID)', minWidth: 150 },
  { field: 'callshopnumber', headerName: 'Nº discado', minWidth: 140 },
  { headerName: 'Situação', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => { const s = callShopStatus(p.data?.status); return <Badge tone={s.tone}>{s.label}</Badge>; } },
  { field: 'total', headerName: 'Total a pagar', minWidth: 140, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
];
