import type { ColDef } from 'ag-grid-community';
import { Iax } from './api';

export const iaxColumns: ColDef<Iax>[] = [
  { field: 'name', headerName: 'Usuário IAX', minWidth: 150, pinned: 'left', filter: true },
  // idUserusername é extraValue de relação (idUser->username): NÃO filtrar.
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'callerid', headerName: 'CallerID', minWidth: 140, filter: true },
  { field: 'host', headerName: 'Host', minWidth: 120, filter: true },
  { field: 'ipaddr', headerName: 'IP', minWidth: 120, filter: true },
  { field: 'context', headerName: 'Contexto', minWidth: 120, filter: true },
  { field: 'allow', headerName: 'Codecs', minWidth: 140, filter: true },
  { field: 'type', headerName: 'Tipo', minWidth: 100, filter: true },
];
