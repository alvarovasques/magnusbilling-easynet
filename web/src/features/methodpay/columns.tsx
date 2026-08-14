import type { ColDef } from 'ag-grid-community';
import { Methodpay } from './api';
import { Badge } from '@/design-system/components/Badge';
const money = (v: unknown) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v ?? 0));
export const methodpayColumns: ColDef<Methodpay>[] = [
  { field: 'payment_method', headerName: 'Forma de pagamento', minWidth: 180, pinned: 'left' },
  { field: 'show_name', headerName: 'Exibição', minWidth: 160 },
  { field: 'country', headerName: 'País', minWidth: 110 },
  { field: 'fee', headerName: 'Taxa', minWidth: 100, type: 'rightAligned' },
  { field: 'min', headerName: 'Mínimo', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'max', headerName: 'Máximo', minWidth: 110, type: 'rightAligned', valueFormatter: (p) => money(p.value) },
  { field: 'active', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
];
