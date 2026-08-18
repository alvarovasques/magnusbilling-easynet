import type { ColDef } from 'ag-grid-community';
import { Ivr } from './api';
import { Badge } from '@/design-system/components/Badge';

// Filtro só na coluna real `name`. direct_extension é tinyint(1) (flag Sim/Não, não um
// número de ramal) — renderizado como badge. monFriStart/satStart são varchar de intervalo
// (sortable:false). use_holidays é flag.
export const ivrColumns: ColDef<Ivr>[] = [
  { field: 'name', headerName: 'URA / IVR', minWidth: 200, pinned: 'left', filter: true },
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  { field: 'direct_extension', headerName: 'Ramal direto', minWidth: 130, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="info">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
  { field: 'monFriStart', headerName: 'Seg–Sex', minWidth: 140, sortable: false },
  { field: 'satStart', headerName: 'Sábado', minWidth: 130, sortable: false },
  { field: 'use_holidays', headerName: 'Feriados', minWidth: 110, sortable: false, filter: false,
    cellRenderer: (p: any) => (Number(p.value) === 1 ? <Badge tone="info">Sim</Badge> : <Badge tone="neutral">Não</Badge>) },
];
