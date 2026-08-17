import type { ColDef } from 'ag-grid-community';
import { Alarm } from './api';
import { Badge } from '@/design-system/components/Badge';
export const alarmColumns: ColDef<Alarm>[] = [
  { field: 'subject', headerName: 'Assunto', minWidth: 200, pinned: 'left' },
  { field: 'type', headerName: 'Tipo', minWidth: 100 },
  { field: 'amount', headerName: 'Valor', minWidth: 110, type: 'rightAligned' },
  { field: 'condition', headerName: 'Condição', minWidth: 110 },
  { field: 'period', headerName: 'Período', minWidth: 110 },
  { field: 'idPlanname', headerName: 'Plano', minWidth: 150 },
  { field: 'email', headerName: 'E-mail', minWidth: 200, flex: 1 },
  { field: 'status', headerName: 'Status', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Ativo</Badge> : <Badge tone="neutral">Inativo</Badge>) },
];
