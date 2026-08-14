import type { ColDef } from 'ag-grid-community';
import { RestrictedPhonenumber, DIRECTION_LABELS } from './api';

export const restrictedPhonenumberColumns: ColDef<RestrictedPhonenumber>[] = [
  { field: 'number', headerName: 'Número', minWidth: 160, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'direction', headerName: 'Direção', minWidth: 130,
    valueFormatter: (p) => DIRECTION_LABELS[Number(p.value)] ?? '—' },
];
