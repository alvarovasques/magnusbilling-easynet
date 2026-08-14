import type { ColDef } from 'ag-grid-community';
import { Iax } from './api';

export const iaxColumns: ColDef<Iax>[] = [
  { field: 'name', headerName: 'Usuário IAX', minWidth: 150, pinned: 'left' },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'callerid', headerName: 'CallerID', minWidth: 140 },
  { field: 'host', headerName: 'Host', minWidth: 120 },
  { field: 'ipaddr', headerName: 'IP', minWidth: 120 },
  { field: 'context', headerName: 'Contexto', minWidth: 120 },
  { field: 'allow', headerName: 'Codecs', minWidth: 140 },
  { field: 'type', headerName: 'Tipo', minWidth: 100 },
];
