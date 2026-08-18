import type { ColDef } from 'ag-grid-community';
import { RestrictedPhonenumber, DIRECTION_LABELS } from './api';

export const restrictedPhonenumberColumns: ColDef<RestrictedPhonenumber>[] = [
  { field: 'number', headerName: 'Número', minWidth: 160, pinned: 'left', filter: true },
  // idUserusername é extraValue de relação (idUser->username): NÃO filtrar.
  { field: 'idUserusername', headerName: 'Cliente', minWidth: 150 },
  // direction é coluna real, mas exibida como rótulo (1=Saída/2=Entrada);
  // filtrar pelo texto do rótulo não bate com o valor cru, então mantém sem filtro.
  { field: 'direction', headerName: 'Direção', minWidth: 130,
    valueFormatter: (p) => DIRECTION_LABELS[Number(p.value)] ?? '—' },
];
