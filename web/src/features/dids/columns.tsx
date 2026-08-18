import type { ColDef } from 'ag-grid-community';
import { Did, didStatus } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
export const didColumns: ColDef<Did>[] = [
  { field: 'did', headerName: 'Número (DDR)', minWidth: 160, pinned: 'left' },
  { headerName: 'Situação', minWidth: 140, sortable: false, filter: false,
    cellRenderer: (p: any) => { const s = didStatus(p.data ?? {}); return <Badge tone={s.tone}>{s.label}</Badge>; } },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'connection_charge', headerName: 'Custo conexão', minWidth: 140, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
];
