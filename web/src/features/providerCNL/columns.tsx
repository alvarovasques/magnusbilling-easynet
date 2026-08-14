import type { ColDef } from 'ag-grid-community';
import { ProviderCNL } from './api';

export const providerCNLColumns: ColDef<ProviderCNL>[] = [
  { field: 'cnl', headerName: 'CNL', minWidth: 130, pinned: 'left' },
  { field: 'zone', headerName: 'Zona / Área', minWidth: 150 },
  { field: 'idProviderprovider_name', headerName: 'Provedor', minWidth: 180 },
];
