import type { ColDef } from 'ag-grid-community';
import { CallShop, callShopStatus } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));

// Filtro só em coluna REAL do pkg_sip (name, callerid, callshopnumber). `total` é
// calculado no getAttributesModels (SUM), não existe no banco: sortable:false/sem filter
// para não quebrar o ORDER BY nem cair no antifraude. Situação é badge computado.
export const callShopColumns: ColDef<CallShop>[] = [
  { field: 'name', headerName: 'Cabine', minWidth: 160, pinned: 'left', filter: true },
  { field: 'idUserusername', headerName: 'Loja / Cliente', minWidth: 160 },
  { field: 'callerid', headerName: 'Bina (CallerID)', minWidth: 150, filter: true },
  { field: 'callshopnumber', headerName: 'Nº discado', minWidth: 140, filter: true },
  { headerName: 'Situação', minWidth: 120, sortable: false, filter: false,
    cellRenderer: (p: any) => { const s = callShopStatus(p.data?.status); return <Badge tone={s.tone}>{s.label}</Badge>; } },
  { field: 'total', headerName: 'Total a pagar', minWidth: 140, type: 'rightAligned', sortable: false, valueFormatter: (p) => money(p.value) },
];
