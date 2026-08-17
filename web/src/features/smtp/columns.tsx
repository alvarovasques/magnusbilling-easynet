import type { ColDef } from 'ag-grid-community';
import { Smtp } from './api';
export const smtpColumns: ColDef<Smtp>[] = [
  { field: 'host', headerName: 'Host', minWidth: 180, pinned: 'left' },
  { field: 'username', headerName: 'Usuário / E-mail', minWidth: 220 },
  { field: 'port', headerName: 'Porta', minWidth: 100 },
  { field: 'encryption', headerName: 'Criptografia', minWidth: 130 },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150, flex: 1 },
];
