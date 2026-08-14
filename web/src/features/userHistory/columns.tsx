import type { ColDef } from 'ag-grid-community';
import { UserHistory } from './api';

const fmtDate = (v: unknown) => {
  if (!v) return '—';
  const d = new Date(String(v).replace(' ', 'T'));
  return isNaN(d.getTime()) ? String(v) : d.toLocaleString('pt-BR');
};

export const userHistoryColumns: ColDef<UserHistory>[] = [
  { field: 'date', headerName: 'Data', minWidth: 170, pinned: 'left', valueFormatter: (p) => fmtDate(p.value) },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'description', headerName: 'Descrição', minWidth: 300, flex: 1 },
];
