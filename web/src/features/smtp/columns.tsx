import type { ColDef } from 'ag-grid-community';
import { Smtp } from './api';
export const smtpColumns: ColDef<Smtp>[] = [
  { field: 'host', headerName: 'Host', minWidth: 180, pinned: 'left' },
  { field: 'username', headerName: 'Usuário / E-mail', minWidth: 220 },
  { field: 'port', headerName: 'Porta', minWidth: 100 },
  { field: 'encryption', headerName: 'Criptografia', minWidth: 130 },
  // idUserusername é extraValue de relação (idUser->username), não é coluna da tabela base:
  // não filtrar nem ordenar (ORDER BY dispararia erro de SQL no read).
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150, flex: 1, sortable: false, filter: false },
];
