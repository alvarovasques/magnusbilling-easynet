import type { ColDef } from 'ag-grid-community';
import { LogUser } from './api';

export const logUsersColumns: ColDef<LogUser>[] = [
  { field: 'date', headerName: 'Data/Hora', minWidth: 170, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Usuário', minWidth: 150 },
  { field: 'ip', headerName: 'IP', minWidth: 130 },
  { field: 'idLogActionsname', headerName: 'Ação', minWidth: 150 },
  { field: 'description', headerName: 'Descrição', minWidth: 320, flex: 1 },
];
