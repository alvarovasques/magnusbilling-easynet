import type { ColDef } from 'ag-grid-community';
import { Provider } from './api';
import { Badge } from '@/design-system/components/Badge';
import { brl } from '@/lib/format';
export const providerColumns: ColDef<Provider>[] = [
  { field: 'provider_name', headerName: 'Provedor', minWidth: 180, pinned: 'left', filter: true },
  { field: 'credit', headerName: 'Crédito', minWidth: 140, type: 'rightAligned', valueFormatter: (p) => brl(p.value) },
  { field: 'credit_control', headerName: 'Controle de crédito', minWidth: 170, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
  { field: 'description', headerName: 'Descrição', minWidth: 240, filter: true },
];
