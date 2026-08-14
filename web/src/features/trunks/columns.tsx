import type { ColDef } from 'ag-grid-community';
import { Trunk } from './api';
import { Badge } from '@/design-system/components/Badge';
export const trunkColumns: ColDef<Trunk>[] = [
  { field: 'trunkcode', headerName: 'Tronco', minWidth: 160, pinned: 'left' },
  { field: 'idProviderprovider_name', headerName: 'Provedor', minWidth: 150 },
  { field: 'providertech', headerName: 'Tecnologia', minWidth: 120 },
  { field: 'host', headerName: 'Host', minWidth: 140 },
  { field: 'registered', headerName: 'Registro', minWidth: 130, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Registrado</Badge> : <Badge tone="danger">Caído</Badge>) },
  { field: 'status', headerName: 'Ativo', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="success">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
];
