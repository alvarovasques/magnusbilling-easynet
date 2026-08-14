import type { ColDef } from 'ag-grid-community';
import { Refill } from './api';
export const refillColumns: ColDef<Refill>[] = [
  { field: 'date', headerName: 'Data', minWidth: 150 },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'credit', headerName: 'Valor', minWidth: 120, type: 'rightAligned',
    valueFormatter: (p) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(p.value ?? 0)) },
  { field: 'description', headerName: 'Descrição', minWidth: 200, flex: 1 },
];
