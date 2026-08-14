import type { ColDef } from 'ag-grid-community';
import { Rate } from './api';
const n4 = (v: unknown) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 5 }).format(Number(v ?? 0));
export const rateColumns: ColDef<Rate>[] = [
  { field: 'idPrefixprefix', headerName: 'Prefixo', minWidth: 120, pinned: 'left' },
  { field: 'idPrefixdestination', headerName: 'Destino', minWidth: 180 },
  { field: 'idTrunktrunkcode', headerName: 'Tronco', minWidth: 140 },
  { field: 'rateinitial', headerName: 'Tarifa', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => n4(p.value) },
  { field: 'rate_offpeak', headerName: 'Off-peak', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => n4(p.value) },
  { field: 'billingblock', headerName: 'Bloco', minWidth: 100, type: 'rightAligned' },
  { field: 'connectcharge', headerName: 'Conexão', minWidth: 120, type: 'rightAligned', valueFormatter: (p) => n4(p.value) },
];
