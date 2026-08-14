import type { ColDef } from 'ag-grid-community';
import { Plan } from './api';
import { Badge } from '@/design-system/components/Badge';
export const planColumns: ColDef<Plan>[] = [
  { field: 'name', headerName: 'Plano', minWidth: 180, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Usuário', minWidth: 150 },
  { field: 'techprefix', headerName: 'Tech prefix', minWidth: 120 },
  { field: 'signup', headerName: 'No cadastro', minWidth: 130, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
  { field: 'play_audio', headerName: 'Avisos com áudio', minWidth: 150, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
];
