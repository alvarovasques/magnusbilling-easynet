import type { ColDef } from 'ag-grid-community';
import { Prefix } from './api';
export const prefixColumns: ColDef<Prefix>[] = [
  { field: 'prefix', headerName: 'Prefixo', minWidth: 140, pinned: 'left' },
  { field: 'destination', headerName: 'Destino', minWidth: 260 },
];
