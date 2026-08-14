import type { ColDef } from 'ag-grid-community';
import { UserType } from './api';
export const userTypeColumns: ColDef<UserType>[] = [
  { field: 'id', headerName: 'ID', minWidth: 100, pinned: 'left', type: 'rightAligned' },
  { field: 'name', headerName: 'Nome', minWidth: 200, flex: 1 },
];
