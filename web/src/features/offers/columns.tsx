import type { ColDef } from 'ag-grid-community';
import { Offer } from './api';
import { brl } from '@/lib/format';
const packageTypes = ['Chamadas ilimitadas', 'Nº de chamadas grátis', 'Segundos grátis'];
const billingTypes = ['Mensal', 'Semanal'];
export const offerColumns: ColDef<Offer>[] = [
  { field: 'label', headerName: 'Oferta', minWidth: 180, pinned: 'left', filter: true },
  { field: 'packagetype', headerName: 'Tipo de pacote', minWidth: 170, sortable: false, filter: false,
    valueFormatter: (p) => packageTypes[Number(p.value)] ?? '' },
  { field: 'billingtype', headerName: 'Cobrança', minWidth: 120, sortable: false, filter: false,
    valueFormatter: (p) => billingTypes[Number(p.value)] ?? '' },
  { field: 'freetimetocall', headerName: 'Tempo grátis', minWidth: 130, type: 'rightAligned' },
  { field: 'price', headerName: 'Preço', minWidth: 130, type: 'rightAligned', valueFormatter: (p) => brl(p.value) },
  { field: 'idUserusername', headerName: 'Usuário', minWidth: 140 },
];
