import type { ColDef } from 'ag-grid-community';
import { ProviderCNL } from './api';

export const providerCNLColumns: ColDef<ProviderCNL>[] = [
  { field: 'cnl', headerName: 'CNL', minWidth: 130, pinned: 'left', filter: true },
  { field: 'zone', headerName: 'Zona / Área', minWidth: 150, filter: true },
  // idProviderprovider_name é extraValue de relação (idProvider->provider_name): NÃO filtrar.
  { field: 'idProviderprovider_name', headerName: 'Provedor', minWidth: 180 },
];
